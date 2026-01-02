import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AiConfigs from './AIConfig'
import Campaigns from './Campaigns'
import InteractionLogs from './InteractionLogs'
import Users from './Users'
import MainLayout from '../components/layout/MainLayout'
import { getOpenedSection, setOpenedSection } from '../lib/helpers/companyDetailState'
import CompanyLids from './CompanyLid'
import CompanyInfo from './CompanyInfo'
import { useLanguageContext } from '../context/Language'

export default function CompanyDetail() {
	const {t} = useLanguageContext()
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
				{opened === 'info' && <CompanyInfo companyIdProps={id} />}
				{opened === 'ai' && <AiConfigs companyIdProps={id} />}
				{opened === 'campaigns' && <Campaigns companyIdProps={id} />}
				{opened === 'logs' && <InteractionLogs companyIdProps={id} />}
				{opened === 'users' && <Users companyIdProps={id} />}
				{opened === 'lids' && <CompanyLids companyIdProps={id} />}
			</>
		)
	}

	return (
		<MainLayout>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
				{/* COMPANY INFO */}
				<div onClick={() => openSection('info')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('COMPANY_INFO')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('VIEW_COMPANY_DETAILS')}</p>
				</div>

				{/* AI CONFIGS */}
				<div onClick={() => openSection('ai')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('AI_CONFIGS')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('MANAGE_AI_SETTINGS_COMPANY')}</p>
				</div>

				{/* CAMPAIGNS */}
				<div onClick={() => openSection('campaigns')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('CAMPAIGNS')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('CAMPAIGN_REVIEW')}</p>
				</div>

				{/* INTERACTION LOGS */}
				<div onClick={() => openSection('logs')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('INTERACTION_LOGS')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('SEE_MESSAGES_LOGS')}</p>
				</div>

				{/* USERS */}
				<div onClick={() => openSection('users')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('USERS')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('MANAGE_COMPANY_USERS')}</p>
				</div>

				{/* COMPANY LIDS */}
				<div onClick={() => openSection('lids')} className="bg-white border rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-all">
					<div className="flex items-center justify-between">
						<h2 className="text-secondary text-xl font-semibold">{t('COMPANY_LIDS')}</h2>
						<span className="material-symbols-outlined text-primary">chevron_right</span>
					</div>
					<p className="text-sm text-gray-500 mt-2">{t('MANAGE_COMPANY_LEADS')}</p>
				</div>
			</div>
		</MainLayout>
	)
}