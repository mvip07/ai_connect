import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { campaignService } from '../services/compaigns.service'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useCampaigns = (companyId) => {
	const [loading, setLoading] = useState(false)
	const [campaigns, setCampaigns] = useState([])

	const fetchCampaigns = useCallback(async () => {
		setLoading(true)
		try {
			if (companyId) {
				const data = await campaignService.getUser(companyId)
				setCampaigns(data)
			} else {
				const data = await campaignService.getAll()
				setCampaigns(data)
			}
		} catch (err) {
			handleApiError(err, 'Campaign yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [])

	const fetchCampaign = useCallback(async (id) => {
		setLoading(true)
		try {
			return await campaignService.getById(id)
		} catch (err) {
			handleApiError(err, "Campaign ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const handleCreate = useCallback(
		async (campaign) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await campaignService.create(campaign)
					fetchCampaigns()
					notify('success', 'Campaign yaratildi!')
				} catch (err) {
					handleApiError(err, 'Campaign yaratishda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCampaigns]
	)

	const handleUpdate = useCallback(
		async (id, campaign) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				if (!id || !campaign) return
				setLoading(true)
				try {
					await campaignService.update(id, campaign)
					fetchCampaigns()
					notify('success', 'Campaign yangilandi!')
				} catch (err) {
					handleApiError(err, 'Campaign yangilashda xatolik!')
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCampaigns]
	)

	const handleDelete = useCallback(
		async (id) => {
			if (['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role)) {
				setLoading(true)
				try {
					await campaignService.delete(id)
					fetchCampaigns()
					notify('success', "Campaign o'chirildi!")
				} catch (err) {
					handleApiError(err, "Campaign o'chirishda xatolik!")
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchCampaigns]
	)

	useEffect(() => {
		fetchCampaigns()
	}, [fetchCampaigns])

	return {
		loading,
		campaigns,
		fetchCampaign,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchCampaigns,
	}
}
