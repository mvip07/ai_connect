import API from "../lib/axios"

export const login = async (data) => {
	const response = await API.post('/api/auth/login', data)
	return response.data.result
}

export const refreshToken = async () => {
	const response = await API.post('/api/auth/refresh')
	return response.data.result
}
