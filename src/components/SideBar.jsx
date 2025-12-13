import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { clearToken, getUserFromStorage } from '../lib/helpers/userStore'
import { companyService } from '../services/companies.service'

export const ROLE_PAGES = {
	SUPERADMIN: [
		'/dashboard',
		'/client/companies',
		'/client/companies/:id',
		'/settings',
		"/client/companies",
		"/client/companies/:id",
		"/client/companies/:id/user/:detailId",
		"/client/companies/:id/ai/:detailId",
		"/client/companies/:id/log/:detailId",
		"/client/companies/:id/lid/:detailId",
		"/client/companies/:id/campaign/:detailId",
		"/dashboard",
		"/settings"
	],
	ADMIN: ['/dashboard', '/ai/configs', '/lids', '/interaction', '/users', '/campaigns', '/settings'],
	MANAGER: ['/dashboard', '/ai/configs', '/lids', '/interaction', '/users', '/campaigns', '/settings'],
	OPERATOR: ['/dashboard', '/ai/configs', '/lids', '/interaction', '/users', '/campaigns', '/settings'],
}

const SIDEBAR_ITEMS = [
	{ path: '/dashboard', icon: 'space_dashboard', label: 'Dashboard' },
	{ path: '/ai/configs', icon: 'smart_toy', label: 'AI Response' },
	{ path: '/client/companies', icon: 'groups', label: 'Clients' },
	{ path: '/campaigns', icon: 'track_changes', label: 'Campaigns' },
	{ path: '/users', icon: 'group', label: 'Users' },
	{ path: '/interaction', icon: 'list_alt', label: 'Interaction Logs' },
	{ path: '/lids', icon: 'list_alt', label: 'Lids' },
	{ path: '/settings', icon: 'settings', label: 'Settings' },
]

const matchRoute = (path, pattern) => {
	const regexPattern = pattern.replace(/:[^/]+/g, '[^/]+');
	const regex = new RegExp(`^${regexPattern}$`);

	return regex.test(path);
};

const SideBar = React.memo(function SideBar({ active, userData }) {
	const navigate = useNavigate()
	const { id } = useParams()
	const { pathname } = useLocation()
	const [company, setCompany] = useState({})

	useEffect(() => {
		const load = async () => {
			const company_id = userData?.company_id || getUserFromStorage()?.user.company_id
			if (company_id) {
				const res = await companyService.getById(company_id)
				setCompany(res)
			}
		}
		load()
	}, [])

	const role = userData?.role || getUserFromStorage()?.user?.role
	const allowedPages = ROLE_PAGES[role] || []

	useEffect(() => {
		const allowed = allowedPages.some((p) => matchRoute(pathname, p))
		if (!allowed) {
			navigate(allowedPages[0] || '/', { replace: true })
		}
	}, [pathname, allowedPages, navigate])

	const filteredItems = SIDEBAR_ITEMS.filter((item) => allowedPages.some((p) => matchRoute(item.path, p)))

	const goBack = () => {
		const path = window.location.pathname

		if (/\/client\/companies\/[^/]+\/\w+\/[^/]+$/.test(path)) {
			return navigate(`/client/companies/${id}`)
		}

		const openedSection = localStorage.getItem('openedSection')
		if (openedSection) {
			localStorage.removeItem('openedSection')
			return
		}

		if (/\/client\/companies\/[^/]+$/.test(path)) {
			return navigate(`/client/companies`)
		}

		navigate(-1)
	}
	return (
		<nav className={`h-full w-20 flex-col items-center border-r border-[#E0E7FF] bg-white pt-6 pb-4 transtion-all duration-300 ease-in-out ${active ? 'fixed top-0 start-0 w-20 flex z-50 lg:static lg:flex' : 'hidden lg:flex'}`}>
			<div className="mb-8">
				<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url(${company?.logo_path || ''} )`, }}></div>
			</div>

			<div className="flex flex-col items-center gap-2">
				{getUserFromStorage()?.user?.role === 'SUPERADMIN' && id && (
					<div onClick={() => goBack()} className="group relative flex cursor-pointer items-center justify-center rounded-lg p-3 bg-primary/20 text-primary">
						<span className="material-symbols-outlined">arrow_back</span>
						<span className="absolute left-full ml-4 hidden -translate-x-2 whitespace-nowrap rounded-md bg-[#1D1F23] px-2 py-1 text-xs text-white group-hover:block">Back</span>
					</div>
				)}
				{filteredItems.map((item) => (
					<div key={item.path} onClick={() => navigate(item.path)} className={`group relative flex cursor-pointer items-center justify-center rounded-lg p-3 ${pathname === item.path ? 'bg-primary/20 text-primary' : 'text-[#1D1F23]/60 hover:bg-primary/10 hover:text-primary'}`}>
						<span className="material-symbols-outlined">{item.icon}</span>
						<span className="absolute left-full ml-4 hidden -translate-x-2 whitespace-nowrap rounded-md bg-[#1D1F23] px-2 py-1 text-xs text-white group-hover:block">{item.label}</span>
					</div>
				))}

				<div onClick={() => clearToken()} className="group relative flex cursor-pointer items-center justify-center rounded-lg p-3 text-[#1D1F23]/60 hover:bg-primary/10 hover:text-primary">
					<span className="material-symbols-outlined">logout</span>
					<span className="absolute left-full ml-4 hidden -translate-x-2 whitespace-nowrap rounded-md bg-[#1D1F23] px-2 py-1 text-xs text-white group-hover:block">Logout</span>
				</div>
			</div>
		</nav>
	)
})

export default SideBar
