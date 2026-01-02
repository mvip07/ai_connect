import API from '../lib/axios'

export const languageService = {
	async getAll() {
		const res = await API.get('/api/language/')
		return res.data.result
	},
	async getById(id) {
		const res = await API.get(`/api/language/${id}`)
		return res.data.result
	},
    async create(data) {
		const res = await API.post('/api/language/', data)
		return res.data.result
	},
	async update(id, data) {
		const res = await API.patch(`/api/language/${id}`, data)
		return res.data.result
	},
	async delete(id) {
		const res = await API.delete(`/api/language/${id}`)
		return res.data.result
	},
}
