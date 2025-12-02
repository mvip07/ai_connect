import API from '../lib/axios'

export const companyService = {
    async getAll() {
        const res = await API.get('/api/company/')
        return res.data.result
    },
    async getCUser() {
        const res = await API.get(`/api/company/user`)
        return res.data.result
    },
   
    async getById(id) {
        const res = await API.get(`/api/company/${id}`)
        return res.data.result
    },
    async create(data) {
        await API.post('/api/company/', data)
    },
    async update(id, data) {
        await API.patch(`/api/company/${id}`, data)
    },
    async delete(id) {
        await API.delete(`/api/company/${id}`)
    },
}