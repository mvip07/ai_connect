import { useState, useEffect, useCallback } from 'react'
import { dashboardService } from '../services/dashboard.service'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { handleApiError } from '../lib/helpers/handleApiError'

export const useDashboard = () => {
	const [data, setData] = useState(null)
	const [data2, setData2] = useState(null)
	const [loading, setLoading] = useState(true)

	const fetchDashboard = useCallback(async () => {
		setLoading(true)
		try {
			const user = getUserFromStorage()?.user
			let result, result2
			if (user?.role === 'SUPERADMIN') {
				result = await dashboardService.getDashboard()
				result2 = await dashboardService.getDashboardDaily()
			} else {
				result = await dashboardService.getUserDashboard(user?.company_id)
				result2 = await dashboardService.getUserDashboardDaily(user?.company_id)
			}
			setData(result)
			setData2(result2)
		} catch (err) {
			handleApiError(err, 'Dashboard yuklashda xatolik!')
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchDashboard()
	}, [fetchDashboard])

	return { data, data2, loading, fetchDashboard }
}
