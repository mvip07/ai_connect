import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { interactionLogService } from '../services/interaction.service'

export const useInteractionLogs = (comapnyId) => {
	const [loading, setLoading] = useState(false)
	const [interactionLogs, setInteractionLogs] = useState([])

	const fetchInteractionLogs = useCallback(async () => {
		setLoading(true)
		try {
			if (comapnyId) {
				const data = await interactionLogService.getByCompany(comapnyId)
				setInteractionLogs(data)
			} else {
				const data = await interactionLogService.getAll()
				setInteractionLogs(data)
			}
		} catch (err) {
			handleApiError(err, 'Interaction Logs yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [])

	const fetchInteractionLog = useCallback(async (id) => {
		setLoading(true)
		try {
			return await interactionLogService.getById(id)
		} catch (err) {
			handleApiError(err, "Interaction Log ma'lumotini yuklashda xatolik!")
		} finally {
			setLoading(false)
		}
	}, [])

	const handleDelete = useCallback(
		async (id) => {
			if (getUserFromStorage()?.user?.role === 'SUPERADMIN') {
				setLoading(true)
				try {
					await interactionLogService.delete(id)
					fetchInteractionLogs()
					notify('success', "Interaction Log o'chirildi!")
				} catch (err) {
					handleApiError(err, "Interaction Log o'chirishda xatolik!")
				} finally {
					setLoading(false)
				}
			}
		},
		[fetchInteractionLogs]
	)

	useEffect(() => {
		fetchInteractionLogs()
	}, [fetchInteractionLogs])

	return {
		loading,
		interactionLogs,
		fetchInteractionLog,
		handleDelete,
		fetchInteractionLogs,
	}
}
