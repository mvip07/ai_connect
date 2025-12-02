import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { companyService } from '../services/companyService'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useCompanies = () => {
	const [loading, setLoading] = useState(false)
	const [companies, setCompanies] = useState([])

	const fetchCompanies = useCallback(async () => {
		if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
			setLoading(true)
			try {
				const data = await companyService.getAll()
				setCompanies(data)
			} catch (err) {
				handleApiError(err, 'Companies yuklashda xatolik!')
			} finally {
				setLoading(false)
			}
		}
	}, [getUserFromStorage])

	const fetchCompany = useCallback(async (id) => {
		setLoading(true)
		try {
			return await companyService.getById(id)
		} catch (err) {
			handleApiError(err, "Company ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const fetchCompaniesUser = useCallback(async () => {
		if (getUserFromStorage()?.user.role !== 'SUPERADMIN') {
			setLoading(true)
			try {
				const data = await companyService.getCUser()
				setCompanies(data)
			} catch (err) {
				handleApiError(err, 'Companies User yuklashda xatolik!')
			} finally {
				setLoading(false)
			}
		}
	}, [getUserFromStorage])

	const handleCreate = useCallback(
		async (company) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await companyService.create(company)
					if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
						fetchCompanies()
					} else {
						fetchCompaniesUser()
					}
					notify('success', 'Company yaratildi!')
				} catch (err) {
					handleApiError(err, 'Company yaratishda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies, fetchCompaniesUser]
	)

	const handleUpdate = useCallback(
		async (id, company) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				if (!id || !company) return
				setLoading(true)
				try {
					await companyService.update(id, company)
					if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
						fetchCompanies()
					} else {
						fetchCompaniesUser()
					}
					notify('success', 'Company yangilandi!')
				} catch (err) {
					handleApiError(err, 'Company yangilashda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies, fetchCompaniesUser]
	)

	const handleDelete = useCallback(
		async (id) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await companyService.delete(id)
					if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
						fetchCompanies()
					} else {
						fetchCompaniesUser()
					}
					notify('success', "Company o'chirildi!")
				} catch (err) {
					handleApiError(err, "Company o'chirishda xatolik!")
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies, fetchCompaniesUser]
	)

	useEffect(() => {
		if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
			fetchCompanies()
		} else {
			fetchCompaniesUser()
		}
	}, [fetchCompanies, getUserFromStorage])

	return {
		loading,
		companies,
		fetchCompany,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchCompanies,
		fetchCompaniesUser,
	}
}
