import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { companyService } from '../services/companies.service'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useCompanies = () => {
	const [loading, setLoading] = useState(false)
	const [companies, setCompanies] = useState([])

	const fetchCompanies = useCallback(async () => {
		setLoading(true)
		try {
			if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
				const data = await companyService.getAll()
				setCompanies(data)
			} else {
				const data = await companyService.getCUser()
				setCompanies(data)
			}
		} catch (err) {
			handleApiError(err, 'Companies yuklashda xatolik!')
		} finally {
			setLoading(false)
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

	const handleCreate = useCallback(
		async (company) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await companyService.create(company)
					fetchCompanies()
					notify('success', 'Company yaratildi!')
				} catch (err) {
					handleApiError(err, 'Company yaratishda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies]
	)

	const handleUpdate = useCallback(
		async (id, company) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				if (!id || !company) return
				setLoading(true)
				try {
					await companyService.update(id, company)
					fetchCompanies()
					notify('success', 'Company yangilandi!')
				} catch (err) {
					handleApiError(err, 'Company yangilashda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies]
	)

	const handleDelete = useCallback(
		async (id) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await companyService.delete(id)
					fetchCompanies()
					notify('success', "Company o'chirildi!")
				} catch (err) {
					handleApiError(err, "Company o'chirishda xatolik!")
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCompanies]
	)

	useEffect(() => {
		fetchCompanies()
	}, [fetchCompanies])

	return {
		loading,
		companies,
		fetchCompany,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchCompanies,
	}
}
