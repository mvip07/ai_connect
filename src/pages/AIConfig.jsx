import { useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { useModal } from '../components/UI/Modal'
import { AiConfigsModal } from '../components/AIConfigsModal'
import { useAiConfigs } from '../hooks/useAiConfig'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { Link } from 'react-router-dom'

export default function AiConfigs({ companyIdProps }) {
	const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
	const { closeModal, openModal } = useModal()
	const { aiConfigs, fetchAiConfig, handleCreate, handleUpdate, handleDelete } = useAiConfigs(companyId)
	const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = AiConfigsModal(closeModal, openModal, fetchAiConfig, handleCreate, handleUpdate, handleDelete)

	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState('template_name')
	const [sortOrder, setSortOrder] = useState('asc')
	const itemsPerPage = 5

	const filteredAiConfigs =
		aiConfigs?.filter((config) => {
			const query = searchQuery.toLowerCase()
			return config.template_name.toLowerCase().includes(query) || config.language.toLowerCase().includes(query)
		}) || []

	const sortedAiConfigs = [...filteredAiConfigs].sort((a, b) => {
		if (sortBy === 'template_name') {
			return sortOrder === 'asc' ? a.template_name.localeCompare(b.template_name) : b.template_name.localeCompare(a.template_name)
		}
		return 0
	})

	const totalItems = sortedAiConfigs.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const paginatedAiConfigs = sortedAiConfigs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
					<p className="text-secondary text-3xl font-bold leading-tight tracking-tight">AI Config List</p>
					<p className="text-secondary/60 text-base font-normal leading-normal">Review and manage AI configurations.</p>
				</div>
				<button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
					<span className="material-symbols-outlined">add</span>
					<span className="truncate">Add AI Config</span>
				</button>
			</div>
			<div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
					<div className="relative min-w-72">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
						<input
							className="w-full h-10 pl-10 pr-4 rounded-DEFAULT border-border-color focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
							placeholder="Search by template name..."
							type="text"
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setCurrentPage(1)
							}}
						/>
					</div>
					<div className="flex gap-2">
						<button onClick={() => handleSort('template_name')} className="flex items-center justify-center gap-2 h-10 px-4 text-secondary bg-white border border-border-color rounded-DEFAULT hover:bg-gray-50 transition-colors text-sm">
							<span>Sort: Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</span>
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-border-color">
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Template Name</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Language</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Use OpenAI</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Template Text</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{paginatedAiConfigs.map((config) => (
								<tr key={config.id} className="border-b border-border-color last:border-b-0 hover:bg-gray-50/50 cursor-pointer">
									<td className="px-4 py-3 text-sm text-text-secondary">
										<Link to={`ai/${config.id}`}>
											{config.template_name}
										</Link>
									</td>
									<td className="px-4 py-3 text-sm text-text-secondary">{config.language}</td>
									<td className="px-4 py-3 text-sm text-text-secondary">
										<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.use_openai ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{config.use_openai ? 'Yes' : 'No'}</span>
									</td>
									<td className="px-4 py-3 text-sm text-text-secondary truncate max-w-xs">{config.template_text}</td>
									<td className="px-4 py-3 text-right">
										<div className="flex items-center justify-end gap-3 text-secondary/60">
											<button onClick={() => handleOpenUpdate(config.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
												<span className="material-symbols-outlined text-xl">edit</span>
											</button>
											<button onClick={() => handleOpenDelete(config.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
												<span className="material-symbols-outlined text-xl">delete</span>
											</button>
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
		</MainLayout >
	)
}
