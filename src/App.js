import { Route, Routes, Navigate } from 'react-router-dom'
import Companies from './pages/Companies'
import Campaigns from './pages/Campaigns'
import AdminDashboard from './pages/AdminDashboard'
import SuperAdminDashboard from './pages/SuperAdminDashboard'
import Login from './auth/Login'
import Register from './auth/Register'
import BillingPlans from './pages/BillingPlans'
import { ToastContainer } from 'react-toastify'
import { ModalProvider } from './components/UI/Modal'
import Settings from './pages/Settings'
import { useAuthRedirect } from './hooks/useAuthRedirect'
import Users from './pages/Users'
import OPerator from './pages/Operator'

function App() {
	// useAuthRedirect()
	return (
		<>
			<ToastContainer />
			<ModalProvider>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/campaigns" element={<Campaigns />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/client/companies" element={<Companies />} />
					<Route path="/billing-plans" element={<BillingPlans />} />
					<Route path="/dashboard" element={<AdminDashboard />} />
					<Route path="/" element={<SuperAdminDashboard />} />
					<Route path="/users" element={<Users />} />
					<Route path="/operator" element={<OPerator />} />
				</Routes>
			</ModalProvider>
		</>
	)
}

export default App
