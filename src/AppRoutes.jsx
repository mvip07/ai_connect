import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import API from './lib/axios'
import AuthGate from './lib/AuthGate'
import { useLanguageContext } from './context/Language'

import Login from './auth/Login'
import Register from './auth/Register'

import Users from './pages/Users'
import Operator from './pages/Operator'
import Settings from './pages/Settings'
import AiConfigs from './pages/AIConfig'
import Companies from './pages/Companies'
import Languages from './pages/Languages'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import CompanyLids from './pages/CompanyLid'
import CompanyDetail from './pages/CompanyDetail'
import UserDetail from './pages/details/UserDetail'
import InteractionLogs from './pages/InteractionLogs'
import AiConfigDetail from './pages/details/AiConfigDetail'
import CampaignDetail from './pages/details/CampaignDetail'
import CompanyLidDetail from './pages/details/CompanyLidDetail'
import InteractionLogDetail from './pages/details/InteractionLogDetail'

const AppRoutes = () => {
	const { setLanguages } = useLanguageContext()

	useEffect(() => {
		API.get('/api/language/')
			.then(res => {
				setLanguages(res.data.result)
			})
			.catch(console.error)
	}, [setLanguages])

	return (
		<>
			<Routes>
				<Route path="/login" element={<Login />} />
			</Routes>

			<AuthGate>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/register" element={<Register />} />
					<Route path="/campaigns" element={<Campaigns />} />
					<Route path="/languages" element={<Languages />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/client/companies" element={<Companies />} />
					<Route path="/client/companies/:id" element={<CompanyDetail />} />
					<Route path="/users" element={<Users />} />
					<Route path="/operator" element={<Operator />} />
					<Route path="/ai/configs" element={<AiConfigs />} />
					<Route path="/interaction" element={<InteractionLogs />} />
					<Route path="/lids" element={<CompanyLids />} />

					<Route path="/client/companies/:id/user/:detailId" element={<UserDetail />} />
					<Route path="/client/companies/:id/ai/:detailId" element={<AiConfigDetail />} />
					<Route path="/client/companies/:id/log/:detailId" element={<InteractionLogDetail />} />
					<Route path="/client/companies/:id/lid/:detailId" element={<CompanyLidDetail />} />
					<Route path="/client/companies/:id/campaign/:detailId" element={<CampaignDetail />} />
				</Routes>
			</AuthGate>
		</>
	)
}

export default AppRoutes
