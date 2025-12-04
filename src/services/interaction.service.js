import API from '../lib/axios'

export const interactionLogService = {
	async getAll() {
		const res = await API.get('/api/interaction_log/')
		return res.data.result
	},
	async getByCompany(companyId) {
		const res = await API.get(`/api/interaction_log/company/${companyId}`)
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/interaction_log/${id}`)
		return res.data.result
	},
	async delete(id) {
		await API.delete(`/api/interaction_log/${id}`)
	},
}
