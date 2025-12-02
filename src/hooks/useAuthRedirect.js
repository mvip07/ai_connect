import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthRedirect = () => {
	const router = useNavigate()

	useEffect(() => {
		if (typeof window === 'undefined') return

		const stored = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || 'AI_CONNECT')
		const token = stored ? JSON.parse(stored).access_token : null

		if (token && stored?.user?.role === 'SUPERADMIN') {
			router('/')
		} else if (token && stored?.user?.role === 'ADMIN') {
			router('/dashboard')
		} else {
			
			router('/login')
		}
	}, [])
}
