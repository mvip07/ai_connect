import { useState } from 'react'
import { useModal } from '../components/UI/Modal'
import MainLayout from '../components/layout/MainLayout'
import { InteractionLogsModal } from '../components/InteractionModal'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { useInteractionLogs } from '../hooks/useInteractionLogs'

export default function InteractionLogs({ companyIdProps }) {
	const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
	const { openModal, closeModal } = useModal()
	const { interactionLogs, handleDelete } = useInteractionLogs(companyId)
	const { handleOpenDelete } = InteractionLogsModal(closeModal, openModal, handleDelete)

	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState('created_at')
	const [sortOrder, setSortOrder] = useState('desc')
	const itemsPerPage = 5

	const filteredInteractionLogs =
		interactionLogs?.filter((log) => {
			const query = searchQuery.toLowerCase()
			return log.username.toLowerCase().includes(query) || log.interaction_type.toLowerCase().includes(query) || log.message.toLowerCase().includes(query)
		}) || []

	const sortedInteractionLogs = [...filteredInteractionLogs].sort((a, b) => {
		if (sortBy === 'created_at') {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
		} else if (sortBy === 'username') {
			return sortOrder === 'asc' ? a.username.localeCompare(b.username) : b.username.localeCompare(a.username)
		}
		return 0
	})

	const totalItems = sortedInteractionLogs.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const paginatedInteractionLogs = sortedInteractionLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
			<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
				<div className="flex flex-col gap-2">
					<p className="text-secondary text-3xl font-bold leading-tight">Interaction Logs</p>
					<p className="text-text-secondary text-base font-normal leading-normal">Review and manage interaction logs.</p>
				</div>
			</div>
			<div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
					<div className="relative min-w-72">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
						<input
							className="w-full h-10 pl-10 pr-4 rounded-DEFAULT border-border-color focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
							placeholder="Search by username or type..."
							type="text"
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setCurrentPage(1)
							}}
						/>
					</div>
					<div className="flex gap-2">
						<button onClick={() => handleSort('username')} className="flex items-center justify-center gap-2 h-10 px-4 text-secondary bg-white border border-border-color rounded-DEFAULT hover:bg-gray-50 transition-colors text-sm">
							<span>Sort: Username ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</span>
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-border-color">
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">User Instagram ID</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Username</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Interaction Type</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Message</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">AI Response</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Created At</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{paginatedInteractionLogs.map((log) => (
								<tr key={log.id} className="px-4 py-4 border-b last:border-b-0 border-border-color hover:bg-gray-50/50 cursor-pointer ">
									<td className="px-4 py-3 text-sm text-text-secondary">{log.user_instagram_id}</td>
									<td className="px-4 py-3 text-sm font-medium text-secondary text-nowrap">{log.username}</td>
									<td className="px-4 py-3 text-sm text-text-secondary">{log.interaction_type}</td>
									<td className="px-4 py-3 text-sm text-text-secondary truncate max-w-xs">{log.message}</td>
									<td className="px-4 py-3 text-sm text-text-secondary truncate max-w-xs">{log.ai_response}</td>
									<td className="px-4 py-3 text-sm text-text-secondary">{new Date(log.created_at).toLocaleDateString()}</td>
									<td className="px-4 py-3 text-right">
										<div className="flex items-center justify-end gap-3">
											{getUserFromStorage()?.user?.role === 'SUPERADMIN' && (
												<button onClick={() => handleOpenDelete(log.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
													<span className="material-symbols-outlined text-xl">delete</span>
												</button>
											)}
											{getUserFromStorage()?.user?.role !== 'SUPERADMIN' && 'No Action'}
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
						<a
							className={`flex size-9 items-center justify-center rounded-DEFAULT text-text-secondary ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 transition-colors'}`}
							href="#"
							onClick={(e) => {
								e.preventDefault()
								if (currentPage > 1) setCurrentPage(currentPage - 1)
							}}
						>
							<span className="material-symbols-outlined text-lg">chevron_left</span>
						</a>
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
