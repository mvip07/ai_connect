import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthGate = ({ children }) => {
	const [ready, setReady] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const raw = localStorage.getItem('AI_CONNECT')

		if (!raw) {
			navigate('/login', { replace: true })
			return
		}

		try {
			const token = JSON.parse(raw)?.access_token
			if (!token) {
				navigate('/login', { replace: true })
				return
			}
		} catch {
			navigate('/login', { replace: true })
			return
		}

		setReady(true)
	}, [navigate])

	if (!ready) return null // ⛔ hech narsa chizilmaydi

	return children
}

export default AuthGate
