import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './auth/Login'
import Register from './auth/Register'
import Users from './pages/Users'
import OPerator from './pages/Operator'
import Settings from './pages/Settings'
import AiConfigs from './pages/AIConfig'
import Companies from './pages/Companies'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns'
import CompanyDetail from './pages/CompanyDetail'
import InteractionLogs from './pages/InteractionLogs'

import { ModalProvider } from './components/UI/Modal'
import CompanyLids from './pages/CompanyLid'
import UserDetail from './pages/details/UserDetail'
import AiConfigDetail from './pages/details/AiConfigDetail'
import InteractionLogDetail from './pages/details/InteractionLogDetail'
import CampaignDetail from './pages/details/CampaignDetail'
import CompanyLidDetail from './pages/details/CompanyLidDetail'

function App() {
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
					<Route path="/client/companies/:id" element={<CompanyDetail />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/" element={<Dashboard />} />
					<Route path="/users" element={<Users />} />
					<Route path="/operator" element={<OPerator />} />
					<Route path="/ai/configs" element={<AiConfigs />} />
					<Route path="/interaction" element={<InteractionLogs />} />
					<Route path="/lids" element={<CompanyLids />} />

					<Route path="/client/companies/:id/user/:detailId" element={<UserDetail />} />
					<Route path="/client/companies/:id/ai/:detailId" element={<AiConfigDetail />} />
					<Route path="/client/companies/:id/log/:detailId" element={<InteractionLogDetail />} />
					<Route path="/client/companies/:id/lid/:detailId" element={<CompanyLidDetail />} />
					<Route path="/client/companies/:id/campaign/:detailId" element={<CampaignDetail />} />
				</Routes>
			</ModalProvider>
		</>
	)
}

export default App
