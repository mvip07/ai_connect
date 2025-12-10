import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { companyLidService } from '../services/companylid.service'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useCompanyLids = (companyId) => {
	const [loading, setLoading] = useState(false)
	const [companyLids, setCompanyLids] = useState([])

	const fetchCompanyLids = useCallback(async () => {
		setLoading(true)
		try {
			if (companyId) {
				const data = await companyLidService.getCUser(companyId)
				setCompanyLids(data)
			} else {
				const data = await companyLidService.getAll()
				setCompanyLids(data)
			}
		} catch (err) {
			handleApiError(err, 'Company Lid yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [companyId])

	const fetchCompanyLid = useCallback(async (id) => {
		setLoading(true)
		try {
			return await companyLidService.getById(id)
		} catch (err) {
			handleApiError(err, "Company Lid ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const handleUpdate = useCallback(
		async (id, companyLid) => {
			if (!id || !companyLid) return
			setLoading(true)
			try {
				await companyLidService.update(id, companyLid)
				fetchCompanyLids()
				notify('success', 'Company Lid yangilandi!')
			} catch (err) {
				handleApiError(err, 'Company Lid yangilashda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchCompanyLids]
	)

	useEffect(() => {
		fetchCompanyLids()
	}, [fetchCompanyLids])

	return {
		loading,
		companyLids,
		fetchCompanyLid,
		handleUpdate,
		fetchCompanyLids,
	}
}
