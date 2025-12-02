import { useState } from 'react'
import { Edit, Trash } from 'lucide-react'
import { useCompanies } from '../hooks/useCompanies'
import { useModal } from '../components/UI/Modal'
import MainLayout from '../components/layout/MainLayout'
import { CompaniesModal } from '../components/CompaniesModal'
import { getUserFromStorage } from '../lib/helpers/userStore'

export default function Companies() {
	const { openModal, closeModal } = useModal()
	const { companies, fetchCompany, handleCreate, handleUpdate, handleDelete } = useCompanies()
	const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = CompaniesModal(closeModal, openModal, fetchCompany, handleCreate, handleUpdate, handleDelete)

	const [searchQuery, setSearchQuery] = useState('')
	const [currentPage, setCurrentPage] = useState(1)
	const [sortBy, setSortBy] = useState('created_at')
	const [sortOrder, setSortOrder] = useState('desc')
	const itemsPerPage = 5

	const filteredCompanies =
		companies?.filter((company) => {
			const query = searchQuery.toLowerCase()
			return company.title.toLowerCase().includes(query) || company.contact_email.toLowerCase().includes(query)
		}) || []

	const sortedCompanies = [...filteredCompanies].sort((a, b) => {
		if (sortBy === 'created_at') {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
		} else if (sortBy === 'title') {
			return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
		}
		return 0
	})

	const totalItems = sortedCompanies.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)
	const paginatedCompanies = sortedCompanies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
					<p className="text-secondary text-3xl font-bold leading-tight">Client Companies</p>
					<p className="text-text-secondary text-base font-normal leading-normal">Manage, monitor, and configure all client accounts on the platform.</p>
				</div>
				{['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
					<button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
						<span className="material-symbols-outlined">add</span>
						<span className="truncate">Add New Company</span>
					</button>
				)}
			</div>
			<div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
				<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
					<div className="relative min-w-72">
						<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
						<input
							className="w-full h-10 pl-10 pr-4 rounded-DEFAULT border-border-color focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
							placeholder="Search by company or admin..."
							type="text"
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
								setCurrentPage(1)
							}}
						/>
					</div>
					<div className="flex gap-2">
						<button onClick={() => handleSort('title')} className="flex items-center justify-center gap-2 h-10 px-4 text-secondary bg-white border border-border-color rounded-DEFAULT hover:bg-gray-50 transition-colors text-sm">
							<span>Sort: Name ({sortOrder === 'asc' ? 'Asc' : 'Desc'})</span>
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-border-color">
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Company Logo</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Company Name</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Description</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Contact Number</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Contact Email</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Address</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Instagram Token</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Instagram Verify Token</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">OpenAI Token</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Status</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Date Added</th>
								<th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{paginatedCompanies.map((company) => (
								<tr key={company.id} className="px-4 py-4 border-b border-border-color hover:bg-gray-50/50 cursor-pointer">
									<td className=" text-sm text-text-secondary">
										<a href={`user/${company.id}`}>
											<img className="size-10 max-size-10" src={company.logo_path} alt="Logo Path" />
										</a>
									</td>
									<td className=" text-sm font-medium text-secondary text-nowrap">
										<a href={`user/${company.id}`}>{company.title}</a>
									</td>
									<td className=" text-sm text-text-secondary">{company.description}</td>
									<td className=" text-sm text-text-secondary text-nowrap">{company.contact_number}</td>
									<td className=" text-sm text-text-secondary">{company.contact_email}</td>
									<td className=" text-sm text-text-secondary">{company.address}</td>
									<td className=" text-sm text-text-secondary">{company.instagram_token.length > 10 ? company.instagram_token.slice(0, 10) + '...' : company.instagram_token}</td>
									<td className=" text-sm text-text-secondary">{company.instagram_verify_token.length > 10 ? company.instagram_verify_token.slice(0, 10) + '...' : company.instagram_verify_token}</td>
									<td className=" text-sm text-text-secondary">{company.openai_token.length > 10 ? company.openai_token.slice(0, 10) + '...' : company.openai_token}</td>
									<td className="">
										<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${company.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{company.is_active ? 'Active' : 'Inactive'}</span>
									</td>
									<td className=" text-sm text-text-secondary">{new Date(company.created_at).toLocaleDateString()}</td>
									<td className=" text-right">
										<div className="flex items-center justify-end gap-3">
											{['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
												<>
													<Edit onClick={() => handleOpenUpdate(company.id)} className="size-5 text-text-secondary cursor-pointer" />
													<Trash onClick={() => handleOpenDelete(company.id)} className="size-5 text-text-secondary cursor-pointer" />
												</>
											)}
											{!['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && 'No Action'}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex items-center justify-between pt-4 mt-4 border-t border-border-color">
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
