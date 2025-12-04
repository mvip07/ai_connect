import API from '../lib/axios'

export const campaignService = {
	async getAll() {
		const res = await API.get('/api/campaign/')
		return res.data.result
	},
	async getUser(id) {
		const res = await API.get(`/api/campaign/user/${id}`)
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/campaign/${id}`)
		return res.data.result
	},
	async create(data) {
		await API.post('/api/campaign/', data)
	},
	async update(id, data) {
		await API.patch(`/api/campaign/${id}`, data)
	},
	async delete(id) {
		await API.delete(`/api/campaign/${id}`)
	},
}
