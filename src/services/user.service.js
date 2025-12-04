import API from '../lib/axios'

export const userService = {
	async getAll() {
		const res = await API.get('/api/user/')
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/user/${id}`)
		return res.data.result
	},
	async getCUserFromId(companyId) {
		const res = await API.get(`/api/user/company/${companyId}`)
		return res.data.result
	},
	async getProfile() {
		const res = await API.get(`/api/auth/profile/me`)
		return res.data.result
	},
	async postProfile(data) {
		const res = await API.post(`/api/auth/profile/me`, data)
		return res.data.result
	},
	async create(data) {
		await API.post('/api/user/', data)
	},
	async update(id, data) {
		await API.patch(`/api/user/${id}`, data)
	},
	async delete(id) {
		await API.delete(`/api/user/${id}`)
	},
	async changePassword(data) {
		await API.post('/api/auth/change-password', data)
	},
}
