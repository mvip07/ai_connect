import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { userService } from '../services/user.serive'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useUsers = () => {
	const [loading, setLoading] = useState(false)
	const [users, setUsers] = useState([])

	const fetchUsers = useCallback(async () => {
		setLoading(true)
		try {
			if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
				const data = await userService.getAll()
				setUsers(data)
			} else {
				const data = await userService.getCUserFromId(getUserFromStorage()?.user?.company_id)
				setUsers(data)
			}
		} catch (err) {
			handleApiError(err, 'Users yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [getUserFromStorage])

	const fetchUser = useCallback(async (id) => {
		setLoading(true)
		try {
			return await userService.getById(id)
		} catch (err) {
			handleApiError(err, "User ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const getProfile = async () => {
		try {
			setLoading(true)
			return await userService.getProfile()
		} catch (err) {
			handleApiError(err, "User ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}

	const updateProfile = async (payload) => {
		try {
			setLoading(true)
			return await userService.postProfile(payload)
		} catch (err) {
			handleApiError(err, 'User yangilashda xatolik!')
		} finally {
			setLoading(false)
		}
	}

	const handleCreate = useCallback(
		async (user) => {
			setLoading(true)
			try {
				await userService.create(user)
				fetchUsers()
				notify('success', 'User yaratildi!')
			} catch (err) {
				handleApiError(err, 'User yaratishda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers]
	)

	const handleUpdate = useCallback(
		async (id, user) => {
			if (!id || !user) return
			setLoading(true)
			try {
				await userService.update(id, user)
				fetchUsers()
				notify('success', 'User yangilandi!')
			} catch (err) {
				handleApiError(err, 'User yangilashda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers]
	)

	const handleDelete = useCallback(
		async (id) => {
			setLoading(true)
			try {
				await userService.delete(id)
				fetchUsers()
				notify('success', "User o'chirildi!")
			} catch (err) {
				handleApiError(err, "User o'chirishda xatolik!")
			} finally {
				setLoading(false)
			}
		},
		[fetchUsers]
	)

	useEffect(() => {
		fetchUsers()
	}, [fetchUsers])

	return {
		loading,
		users,
		fetchUser,
		getProfile,
		updateProfile,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchUsers,
	}
}
