import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const stored = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY || 'AI_CONNECT')

        if (!stored) {
            setIsAuth(false)
            setLoading(false)
            navigate('/login', { replace: true })
            return
        }

        try {
            const token = JSON.parse(stored)?.access_token
            if (!token) {
                setIsAuth(false)
                navigate('/login', { replace: true })
            } else {
                setIsAuth(true)
            }
        } catch {
            setIsAuth(false)
            navigate('/login', { replace: true })
        } finally {
            setLoading(false)
        }
    }, [])

    if (loading) return null

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
