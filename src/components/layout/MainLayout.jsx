import { useCallback, useEffect, useState } from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import { userService } from '../../services/user.service'

export default function MainLayout({ children }) {
	const [active, setActive] = useState(false)
	const [userData, setUserData] = useState({ full_name: '', role: '', phone_number: '', pic_path: '', username: '' })

	const toggleSideBar = useCallback(() => {
		setActive((prev) => !prev)
	}, [])

	useEffect(() => {
		const load = async () => {
			try {
				const data = await userService.getProfile()
				setUserData(data)
			} catch (err) {
				console.log(err)
			}
		}
		load()
	}, [])

	return (
		<div className="font-display bg-[#f5f9ff]">
			<div className="flex h-screen w-full">
				<SideBar active={active} userData={userData} />
				<main className="flex-1 overflow-y-auto bg-[#F5F9FF]">
					<Header active={active} toggleSideBar={toggleSideBar} userData={userData} />
					<div className="p-4 md:p-8 lg:p-10">{children}</div>
				</main>
			</div>
		</div>
	)
}
