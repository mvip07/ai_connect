import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { aiConfigService } from '../services/aiconfigs.service'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useAiConfigs = (companyId) => {
	const [loading, setLoading] = useState(false)
	const [aiConfigs, setAiConfigs] = useState([])
	console.log(companyId)
	const fetchAiConfigs = useCallback(async () => {
		setLoading(true)
		try {
			if (companyId) {
				const data = await aiConfigService.getByCompany(companyId)
				setAiConfigs(data)
			} else {
				const data = await aiConfigService.getAll()
				setAiConfigs(data)
			}
		} catch (err) {
			handleApiError(err, 'AI Configs yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [])

	const fetchAiConfig = useCallback(async (id) => {
		setLoading(true)
		try {
			return await aiConfigService.getById(id)
		} catch (err) {
			handleApiError(err, "AI Config ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const handleCreate = useCallback(
		async (config) => {
			setLoading(true)
			try {
				await aiConfigService.create(config)
				fetchAiConfigs()
				notify('success', 'AI Config yaratildi!')
			} catch (err) {
				handleApiError(err, 'AI Config yaratishda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchAiConfigs]
	)

	const handleUpdate = useCallback(
		async (id, config) => {
			if (!id || !config) return
			setLoading(true)
			try {
				await aiConfigService.update(id, config)
				fetchAiConfigs()
				notify('success', 'AI Config yangilandi!')
			} catch (err) {
				handleApiError(err, 'AI Config yangilashda xatolik!')
			} finally {
				setLoading(false)
			}
		},
		[fetchAiConfigs]
	)

	const handleDelete = useCallback(
		async (id) => {
			setLoading(true)
			try {
				await aiConfigService.delete(id)
				fetchAiConfigs()
				notify('success', "AI Config o'chirildi!")
			} catch (err) {
				handleApiError(err, "AI Config o'chirishda xatolik!")
			} finally {
				setLoading(false)
			}
		},
		[fetchAiConfigs]
	)

	useEffect(() => {
		fetchAiConfigs()
	}, [fetchAiConfigs])

	return {
		loading,
		aiConfigs,
		fetchAiConfig,
		handleCreate,
		handleUpdate,
		handleDelete,
		fetchAiConfigs,
	}
}
