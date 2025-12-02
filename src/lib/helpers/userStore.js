import { redirectToLogin } from './redirectToLogin'

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY || 'AI_CONNECT'

export const getToken = () => {
	if (typeof window === 'undefined') return ''
	const stored = localStorage.getItem(TOKEN_KEY)
	if (!stored) return ''
	try {
		const parsed = JSON.parse(stored)
		return parsed?.access_token || ''
	} catch {
		return ''
	}
}

export const clearToken = () => {
	if (typeof window === 'undefined') return
	localStorage.removeItem(TOKEN_KEY)
	redirectToLogin()
}

export const setToken = (tokenData) => {
	localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData))
}

export const getUserFromStorage = () => {
	if (typeof window === 'undefined') return null
	const stored = localStorage.getItem(TOKEN_KEY)
	if (!stored) return null
	try {
		const parsed = JSON.parse(stored)
		return parsed || null
	} catch {
		return null
	}
}
