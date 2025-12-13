import axios from 'axios'
import { clearToken } from './helpers/userStore'
import { HOST } from '../constants/Host'

const API = axios.create({
	baseURL: HOST,
	withCredentials: true,
})

API.interceptors.request.use((config) => {
	let token = ''

	try {
		const stored = localStorage.getItem('AI_CONNECT')
		if (stored) token = JSON.parse(stored)?.access_token || ''
	} catch {}

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	if (!(config.data instanceof FormData)) {
		config.headers['Content-Type'] = 'application/json'
	}

	if (typeof window !== 'undefined') {
		config.headers['Frontend-Path'] = window.location.pathname
	}

	return config
})

API.interceptors.response.use(
	(res) => res,
	(err) => {
		if (err?.response?.status === 401) {
			return clearToken()
		}
		return Promise.reject(err)
	}
)

export default API
