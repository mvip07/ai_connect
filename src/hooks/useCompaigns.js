import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { campaignService } from '../services/compaignsService'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useCampaigns = () => {
	const [loading, setLoading] = useState(false)
	const [campaigns, setCampaigns] = useState([])

	const fetchCampaigns = useCallback(async () => {
		if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
			setLoading(true)
			try {
				const data = await campaignService.getAll()
				setCampaigns(data)
			} catch (err) {
				handleApiError(err, 'Campaign yuklashda xatolik!')
			} finally {
				setLoading(false)
			}
		}
	}, [getUserFromStorage])

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

	const fetchCampaignsUser = useCallback(async () => {
		if (getUserFromStorage()?.user?.role !== 'SUPERADMIN') {
			setLoading(true)
			try {
				const data = await campaignService.getUser(getUserFromStorage()?.user?.company_id)
				setCampaigns(data)
			} catch (err) {
				handleApiError(err, "Campaign ma'lumotini yuklashda xatolik!")
			} finally {
				setLoading(false)
			}
		}
	}, [getUserFromStorage])

	const handleCreate = useCallback(
		async (campaign) => {
			setLoading(true)
			try {
				await campaignService.create(campaign)
				if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
					fetchCampaigns()
				} else {
					fetchCampaignsUser()
				}
				notify('success', 'Campaign yaratildi!')
			} catch (err) {
				handleApiError(err, 'Campaign yaratishda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchCampaigns, fetchCampaignsUser]
	)

	const handleUpdate = useCallback(
		async (id, campaign) => {
			if (!id || !campaign) return
			setLoading(true)
			try {
				await campaignService.update(id, campaign)
				if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
					fetchCampaigns()
				} else {
					fetchCampaignsUser()
				}
				notify('success', 'Campaign yangilandi!')
			} catch (err) {
				handleApiError(err, 'Campaign yangilashda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchCampaigns, fetchCampaignsUser]
	)

	const handleDelete = useCallback(
		async (id) => {
			setLoading(true)
			try {
				await campaignService.delete(id)
				if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
					fetchCampaigns()
				} else {
					fetchCampaignsUser()
				}
				notify('success', "Campaign o'chirildi!")
			} catch (err) {
				handleApiError(err, "Campaign o'chirishda xatolik!")
			} finally {
				setLoading(false)
			}
		},
		[fetchCampaigns, fetchCampaignsUser]
	)

	useEffect(() => {
		if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
			fetchCampaigns()
		} else {
			fetchCampaignsUser()
		}
	}, [fetchCampaigns, getUserFromStorage])

	return {
		loading,
		campaigns,
		fetchCampaign,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchCampaigns,
		fetchCampaignsUser,
	}
}
