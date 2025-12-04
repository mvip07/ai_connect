import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { clearToken, getUserFromStorage } from '../lib/helpers/userStore'
import { resetOpenedSection } from '../lib/helpers/companyDetailState'

export const ROLE_PAGES = {
	SUPERADMIN: ['/dashboard', '/client/companies', '/client/companies/:id', '/settings'],
	ADMIN: ['/dashboard', '/ai/configs', '/interaction', '/users', '/campaigns', '/settings'],
	MANAGER: ['/dashboard', '/ai/configs', '/interaction', '/users', '/campaigns', '/settings'],
	OPERATOR: ['/dashboard', '/ai/configs', '/interaction', '/users', '/campaigns', '/settings'],
}

const SIDEBAR_ITEMS = [
	{ path: '/dashboard', icon: 'space_dashboard', label: 'Dashboard' },
	{ path: '/ai/configs', icon: 'smart_toy', label: 'AI Response' },
	{ path: '/client/companies', icon: 'groups', label: 'Clients' },
	{ path: '/campaigns', icon: 'track_changes', label: 'Campaigns' },
	{ path: '/users', icon: 'group', label: 'Users' },
	{ path: '/interaction', icon: 'list_alt', label: 'Interaction Logs' },
	{ path: '/settings', icon: 'settings', label: 'Settings' },
]

const matchRoute = (path, pattern) => {
	if (pattern.includes(':id')) {
		const regex = new RegExp('^' + pattern.replace(':id', '[^/]+') + '$')
		return regex.test(path)
	}
	return path === pattern
}

const SideBar = React.memo(function SideBar({ active, userData }) {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { id } = useParams()

	const role = userData?.role || getUserFromStorage()?.user?.role
	const allowedPages = ROLE_PAGES[role] || []

	useEffect(() => {
		const allowed = allowedPages.some((p) => matchRoute(pathname, p))
		if (!allowed) {
			navigate(allowedPages[0] || '/', { replace: true })
		}
	}, [pathname, allowedPages, navigate])

	const filteredItems = SIDEBAR_ITEMS.filter((item) => allowedPages.some((p) => matchRoute(item.path, p)))

	return (
		<nav className={`h-full w-20 flex-col items-center border-r border-[#E0E7FF] bg-white pt-6 pb-4 transtion-all duration-300 ease-in-out ${active ? 'fixed top-0 start-0 w-20 flex z-50 lg:static lg:flex' : 'hidden lg:flex'}`}>
			<div className="mb-8">
				<div
					className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
					style={{
						backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_TynlpL-APzoIRRg9vWZQi5643L1SkpRjsa4pPztAsuR150bV7lSyOQdy5Dq_kHsQG3egYlDoz9HwO8FLQTiEb5_JAv2w_nQiBpSrfrBPsyqcFx8ZN4nwRSZ_Fc09PVhhuVCEqMlVDgGwRocsSnm0-SNsvlRFEwd5zjw7pXYV5VuTILneihg3SMmAnZgtfQe0sBQkFfG7mOlsGJfroUSf04t8fHPXzUJEJ0VxJAL9KSeCROtKcT0vq6UXtNkYgtAVVl8XF2Dqdq1F")`,
					}}
				></div>
			</div>

			<div className="flex flex-col items-center gap-2">
				{getUserFromStorage()?.user?.role === 'SUPERADMIN' && id && (
					<div
						onClick={() => {
							resetOpenedSection()
							window.location.reload()
						}}
						className="group relative flex cursor-pointer items-center justify-center rounded-lg p-3 bg-primary/20 text-primary"
					>
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
