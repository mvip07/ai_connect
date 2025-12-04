import API from '../lib/axios'

export const aiConfigService = {
	async getAll() {
		const res = await API.get('/api/ai_config/')
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/ai_config/${id}`)
		return res.data.result
	},
	async getByCompany(companyId) {
		const res = await API.get(`/api/ai_config/company/${companyId}`)
		return res.data.result
	},
	async create(data) {
		await API.post('/api/ai_config/', data)
	},
	async update(id, data) {
		await API.patch(`/api/ai_config/${id}`, data)
	},
	async delete(id) {
		await API.delete(`/api/ai_config/${id}`)
	},
}
