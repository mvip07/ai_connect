import { useState } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'

export default function MainLayout({ children }) {
	const [active, setActive] = useState(true)
	const toggleSideBar = () => {
		setActive((prev) => !prev)
	}
	return (
		<div className="font-display bg-[#f5f9ff]">
			<div className="flex h-screen w-full">
				<SideBar active={active} />
				<main className="flex-1 overflow-y-auto bg-[#F5F9FF]">
					<Header active={active} toggleSideBar={toggleSideBar} />
					<div className="p-4 md:p-8 lg:p-10">{children}</div>
				</main>
			</div>
		</div>
	)
}
