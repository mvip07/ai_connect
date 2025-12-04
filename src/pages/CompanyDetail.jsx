import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AiConfigs from './AIConfig'
import Campaigns from './Campaigns'
import InteractionLogs from './InteractionLogs'
import Users from './Users'
import MainLayout from '../components/layout/MainLayout'
import { getOpenedSection, setOpenedSection } from '../lib/helpers/companyDetailState'

export default function CompanyDetail() {
	const { id } = useParams()

	const [opened, setOpened] = useState(getOpenedSection())

	useEffect(() => {
		setOpened(getOpenedSection())
	}, [])

	const openSection = (key) => {
		setOpenedSection(key)
		setOpened(key)
	}

	if (opened) {
		return (
			<>
				{opened === 'ai' && <AiConfigs companyIdProps={id} />}
				{opened === 'campaigns' && <Campaigns companyIdProps={id} />}
				{opened === 'logs' && <InteractionLogs companyIdProps={id} />}
				{opened === 'users' && <Users companyIdProps={id} />}
			</>
		)
	}

	return (
		<MainLayout>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
				{/* AI CONFIGS */}
				<div onClick={() => openSection('ai')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">AI Configs</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">Manage AI settings for this company</p>
				</div>

				{/* CAMPAIGNS */}
				<div onClick={() => openSection('campaigns')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">Campaigns</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">View and manage campaigns</p>
				</div>

				{/* INTERACTION LOGS */}
				<div onClick={() => openSection('logs')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">Interaction Logs</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">See all messages and logs</p>
				</div>

				{/* USERS */}
				<div onClick={() => openSection('users')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">Users</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">Manage company users</p>
				</div>
			</div>
		</MainLayout>
	)
}
