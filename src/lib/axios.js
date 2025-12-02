import axios from 'axios'
import { clearToken } from './helpers/userStore'
import { HOST } from '../constants/Host'

const containsFiles = (data) => {
	if (typeof data !== 'object' || data === null) return false
	for (const key in data) {
		const value = data[key]
		if (value instanceof File || value instanceof Blob) {
			return true
		}
	}
	return false
}

const API = axios.create({ baseURL: HOST })

API.interceptors.request.use(
	(config) => {
		let token = ''
		const stored = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || 'AI_CONNECT')
		token = stored ? JSON.parse(stored).access_token : ''
		if (token) config.headers.Authorization = `Bearer ${token}`
		if (config.data && containsFiles(config.data)) config.headers['Content-Type'] = 'multipart/form-data'
		else config.headers['Content-Type'] = 'application/json'
		if (typeof window !== 'undefined') {
			config.headers['Frontend-Path'] = window.location.pathname
		}
		return config
	},
	(error) => Promise.reject(error)
)

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
			if (currentPath.startsWith('/admin')) {
				return Promise.reject(error)
			}
			clearToken()
			if (typeof window !== 'undefined') {
				window.location.href = '/login'
			}
			return Promise.reject(error)
		}
		return Promise.reject(error)
	}
)

export default API
