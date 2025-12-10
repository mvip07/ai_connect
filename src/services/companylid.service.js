import API from '../lib/axios'

export const companyLidService = {
	async getAll() {
		const res = await API.get('/api/company_lid/')
		return res.data.result
	},
	async getCUser(company_id) {
		const res = await API.get(`/api/company_lid/user/${company_id}`)
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/company_lid/${id}`)
		return res.data.result
	},
	async update(id, data) {
		await API.patch(`/api/company_lid/${id}`, data)
	},
}
