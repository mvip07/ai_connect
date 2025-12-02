import { useLocation, useNavigate } from 'react-router-dom'
import { clearToken, getUserFromStorage } from '../lib/helpers/userStore'
import { useEffect } from 'react'

export const ROLE_PAGES = {
	SUPERADMIN: ['/', '/client/companies', '/campaigns', '/users', '/robots', '/settings'],
	ADMIN: ['/dashboard', '/users', '/campaigns', '/settings'],
	MANAGER: ['/dashboard', '/client/companies', '/campaigns', '/settings'],
	OPERATOR: ['/dashboard', '/client/companies', '/campaigns', '/settings'],
}

const SIDEBAR_ITEMS = [
	{ path: '/', icon: 'dashboard', label: 'Dashboard' },
	{ path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
	{ path: '/client/companies', icon: 'group', label: 'Clients' },
	{ path: '/campaigns', icon: 'target', label: 'Campaigns' },
	{ path: '/users', icon: 'group', label: 'Users' },
	{ path: '/operator', icon: 'dashboard', label: 'Dashboard' },
	{ path: '/settings', icon: 'settings', label: 'Settings' },
]

export default function SideBar({ active }) {
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const role = getUserFromStorage()?.user?.role
	const allowedPages = ROLE_PAGES[role] || []

	useEffect(() => {
		if (!allowedPages.includes(pathname)) {
			navigate(allowedPages[0] || '/', { replace: true })
		}
	}, [pathname])

	const filteredItems = SIDEBAR_ITEMS.filter((item) => allowedPages.includes(item.path))

	return (
		<nav className={`h-full w-20 flex-col items-center border-r border-[#E0E7FF] bg-white pt-6 pb-4 transtion-all duration-300 ease-in-out   ${active ? 'fixed top-0 start-0 w-20 flex z-50 lg:static lg:flex' : 'hidden lg:flex'}`}>
			<div className="mb-8">
				<div
					className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
					style={{
						backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuA_TynlpL-APzoIRRg9vWZQi5643L1SkpRjsa4pPztAsuR150bV7lSyOQdy5Dq_kHsQG3egYlDoz9HwO8FLQTiEb5_JAv2w_nQiBpSrfrBPsyqcFx8ZN4nwRSZ_Fc09PVhhuVCEqMlVDgGwRocsSnm0-SNsvlRFEwd5zjw7pXYV5VuTILneihg3SMmAnZgtfQe0sBQkFfG7mOlsGJfroUSf04t8fHPXzUJEJ0VxJAL9KSeCROtKcT0vq6UXtNkYgtAVVl8XF2Dqdq1F")`,
					}}
				></div>
			</div>

			<div className="flex flex-col items-center gap-2">
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
}
