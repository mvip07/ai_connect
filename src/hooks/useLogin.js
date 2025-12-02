import { useState } from 'react'
import { login } from '../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../lib/helpers/userStore'
import { handleApiError } from '../lib/helpers/handleApiError'
import { ROLE_PAGES } from '../components/SideBar'

export const useLogin = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleLogin = async (payload) => {
		try {
			setLoading(true)
			const res = await login(payload)
			setToken(res)
			const role = res?.user?.role
			const allowedPages = ROLE_PAGES[role] || []
			const firstPage = allowedPages[0] || '/'
			navigate(firstPage, { replace: true })
		} catch (err) {
			handleApiError(err)
		} finally {
			setLoading(false)
		}
	}

	return { handleLogin, loading }
}
