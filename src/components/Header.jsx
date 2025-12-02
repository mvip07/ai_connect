import { useEffect, useState } from 'react'
import { userService } from '../services/user.serive'
import { useNavigate } from 'react-router-dom'

export default function Header({ active, toggleSideBar }) {
	const navigate = useNavigate()
	const [form, setForm] = useState({ full_name: '', role: '', phone_number: '', pic_path: '', username: '' })

	useEffect(() => {
		const load = async () => {
			const data = await userService.getProfile()
			setForm({
				role: data.role || '',
				full_name: data.full_name || '',
				phone_number: data.phone_number || '',
				pic_path: data.pic_path || '',
				username: data.username || '',
			})
		}
		load()
	}, [])
	return (
		<header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#E0E7FF] bg-white/80 px-10 backdrop-blur-sm">
			<div className="flex-1 hidden md:block">
				<label className="flex flex-col h-11 max-w-sm">
					<div className="flex w-full flex-1 items-stretch rounded-lg h-full">
						<div className="text-[#1D1F23]/40 flex items-center justify-center pl-4">
							<span className="material-symbols-outlined">search</span>
						</div>
						<input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border-none bg-transparent text-[#1D1F23] focus:outline-0 focus:ring-0 h-full placeholder:text-[#1D1F23]/40 pl-2 text-base font-normal leading-normal" placeholder="Search..." defaultValue="" />
					</div>
				</label>
			</div>
			<div className=" flex flex-none items-center w-full md:w-auto justify-end gap-6">
				<button onClick={toggleSideBar} className="block lg:hidden flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white text-[#1D1F23]/60 shadow-[0_4px_14px_rgba(0,0,0,0.05)] ring-1 ring-[#E0E7FF]/50">
					<span className="material-symbols-outlined">{active ? 'close' : 'menu'}</span>
				</button>
				<button className="flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-white text-[#1D1F23]/60 shadow-[0_4px_14px_rgba(0,0,0,0.05)] ring-1 ring-[#E0E7FF]/50">
					<span className="material-symbols-outlined">notifications</span>
				</button>
				<div className="flex items-center gap-4">
					<div className="text-secondary text-md font-medium text-end">
						<h4 className="text-md">{form.full_name}</h4>
						<p className="text-sm">{form.role}</p>
					</div>
					<div onClick={() => navigate('/settings')} className="bg-center bg-no-repeat cursor-pointer aspect-square bg-cover rounded-full size-12 ring-2 ring-white" data-alt="User profile avatar image">
						<img className="w-full h-full rounded-full" src={form.pic_path} alt="User Image" />
					</div>
				</div>
			</div>
		</header>
	)
}
