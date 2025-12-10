import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'
import { useModal } from '../components/UI/Modal'
import { UsersModal } from '../components/UsersModal'
import { getUserFromStorage } from '../lib/helpers/userStore'
import MainLayout from '../components/layout/MainLayout'

export default function Users({ companyIdProps }) {
	const companyId = companyIdProps || getUserFromStorage()?.user?.company_id

	const { closeModal, openModal } = useModal()
	const { users, fetchUser, handleCreate, handleUpdate, handleDelete } = useUsers(companyId)
	const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = UsersModal(closeModal, openModal, fetchUser, handleCreate, handleUpdate, handleDelete)

	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState('full_name')
	const [sortOrder, setSortOrder] = useState('asc')
	const itemsPerPage = 5

	const filteredUsers =
		users?.filter((user) => {
			const query = searchQuery.toLowerCase()
			return user.full_name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query)
		}) || []

	const sortedUsers = [...filteredUsers].sort((a, b) => {
		if (sortBy === 'full_name') {
			return sortOrder === 'asc' ? a.full_name.localeCompare(b.full_name) : b.full_name.localeCompare(a.full_name)
		} else if (sortBy === 'created_at') {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
		}
		return 0
	})

	const totalItems = sortedUsers.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	const handleSort = (field) => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(field)
			setSortOrder('desc')
		}
		setCurrentPage(1)
	}

	const getPaginationLinks = () => {
		const links = []
		const startPage = Math.max(1, currentPage - 2)
		const endPage = Math.min(totalPages, currentPage + 2)

		if (startPage > 1) {
			links.push(
				<span key="start-ellipsis" className="text-sm font-normal leading-normal flex size-9 items-center justify-center text-text-secondary rounded-DEFAULT">
					...
				</span>
			)
		}

		for (let i = startPage; i <= endPage; i++) {
			links.push(
				<a
					key={i}
					className={`text-sm font-${i === currentPage ? 'bold' : 'normal'} leading-normal flex size-9 items-center justify-center rounded-DEFAULT ${i === currentPage ? 'text-white bg-primary' : 'text-text-secondary hover:bg-gray-100 transition-colors'}`}
					href="#"
					onClick={(e) => {
						e.preventDefault()
						setCurrentPage(i)
					}}
				>
					{i}
				</a>
			)
		}

		if (endPage < totalPages) {
			links.push(
				<span key="end-ellipsis" className="text-sm font-normal leading-normal flex size-9 items-center justify-center text-text-secondary rounded-DEFAULT">
					...
				</span>
			)
		}

		return links
	}

	return (
		<MainLayout>
			<div className="flex flex-wrap justify-between gap-3 items-center mb-6">
				<div className="flex flex-col gap-1">
					<p className="text-secondary text-3xl font-bold leading-tight tracking-tight">User List</p>
					<p className="text-secondary/60 text-base font-normal leading-normal">Review and manage users.</p>
				</div>
				<button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
					<span className="material-symbols-outlined">add</span>
					<span className="truncate">Add New User</span>
				</button>
			</div>
			<div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
					<div className="relative min-w-72">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
						<input
							className="w-full h-10 pl-10 pr-4 rounded-DEFAULT border-border-color focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
							placeholder="Search by user name..."
							type="text"
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setCurrentPage(1)
							}}
						/>
					</div>
					<div className="flex gap-2">
						<button onClick={() => handleSort('full_name')} className="flex items-center justify-center gap-2 h-10 px-4 text-secondary bg-white border border-border-color rounded-DEFAULT hover:bg-gray-50 transition-colors text-sm">
							<span>Sort: Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</span>
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-border-color">
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">User</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Phone Number</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Status</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Is Super Admin</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Role</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Date</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{paginatedUsers.map((user) => (
								<tr key={user.id} className="px-4 py-4 border-b border-border-color hover:bg-gray-50/50 cursor-pointer last:border-b-0">
									<td className="px-4 py-3 text-sm text-text-secondary">
										<Link to={`user/${user.id}`}>
											<div className="flex items-center gap-3">
												<img className="size-10 rounded-full" src={user?.pic_path} />
												<div className="flex flex-col">
													<p className="font-semibold text-secondary">{user.full_name}</p>
													<p className="text-sm text-secondary/60">@{user.username}</p>
												</div>
											</div>
										</Link>
									</td>
									<td className="px-4 py-3 text-sm text-text-secondary">{user.phone_number}</td>
									<td className="px-4 py-3 text-sm text-text-secondary">
										<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user.is_active ? 'Active' : 'InActive'}</span>
									</td>
									<td className="px-4 py-3 text-sm text-text-secondary">
										<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_superadmin ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user.is_superadmin ? 'SuperAdmin' : 'Not SuperAdmin'}</span>
									</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary/80">{user.role}</td>
									<td className="px-4 py-3 text-sm text-secondary/60 text-nowrap">{user.created_at}</td>
									<td className="px-4 py-3 text-right">
										<div className="flex items-center justify-end gap-3 text-secondary/60">
											{['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) &&
												(getUserFromStorage()?.user?.id !== user.id && (
													<>
														<button onClick={() => handleOpenUpdate(user.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
															<span className="material-symbols-outlined text-xl">edit</span>
														</button>
														<button onClick={() => handleOpenDelete(user.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
															<span className="material-symbols-outlined text-xl">delete</span>
														</button>
													</>
												))}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex items-center justify-between pt-4 border-t border-border-color">
					<p className="text-sm text-text-secondary">
						Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
					</p>
					<div className="flex items-center justify-center">
						<NavLink
							className={`flex size-9 items-center justify-center rounded-DEFAULT text-text-secondary ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 transition-colors'}`}
							to="#"
							onClick={(e) => {
								e.preventDefault()
								if (currentPage > 1) setCurrentPage(currentPage - 1)
							}}
						>
							<span className="material-symbols-outlined text-lg">chevron_left</span>
						</NavLink>
						{getPaginationLinks()}
						<a
							className={`flex size-9 items-center justify-center rounded-DEFAULT text-text-secondary ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 transition-colors'}`}
							href="#"
							onClick={(e) => {
								e.preventDefault()
								if (currentPage < totalPages) setCurrentPage(currentPage + 1)
							}}
						>
							<span className="material-symbols-outlined text-lg">chevron_right</span>
						</a>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
