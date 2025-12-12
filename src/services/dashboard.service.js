import API from '../lib/axios'

export const dashboardService = {
	async getDashboard() {
		const res = await API.get('/api/main/dashboard/')
		return res.data.result
	},
	async getUserDashboard(id) {
		const res = await API.get(`/api/main/dashboard/user/${id}`)
		return res.data.result
	},
}
