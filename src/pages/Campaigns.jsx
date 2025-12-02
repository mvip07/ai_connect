import { useState } from 'react'
import { Edit, Trash } from 'lucide-react'
import { useModal } from '../components/UI/Modal'
import MainLayout from '../components/layout/MainLayout'
import { CompaignsModal } from '../components/CompaignsModal'
import { useCampaigns } from '../hooks/useCompaigns'
import { getUserFromStorage } from '../lib/helpers/userStore'

export default function Campaigns() {
	const { openModal, closeModal } = useModal()
	const { campaigns, fetchCampaign, handleCreate, handleUpdate, handleDelete } = useCampaigns()
	const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = CompaignsModal(closeModal, openModal, fetchCampaign, handleCreate, handleUpdate, handleDelete)

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedStatus, setSelectedStatus] = useState('All')
	const [sortBy, setSortBy] = useState('created_at')
	const [sortOrder, setSortOrder] = useState('desc')

	const totalCampaigns = campaigns.length
	const activeCampaigns = campaigns.filter((c) => c.is_active).length
	const inactiveCampaigns = campaigns.filter((c) => !c.is_active).length
	const lastMonthDate = new Date()
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
	const lastMonthCampaigns = campaigns.filter((c) => new Date(c.created_at) >= lastMonthDate).length

	const filteredCampaigns = campaigns.filter((campaign) => {
		const titleMatch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
		const statusMatch = selectedStatus === 'All' || (selectedStatus === 'Active' ? campaign.is_active : !campaign.is_active)
		return titleMatch && statusMatch
	})

	const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
		if (sortBy === 'created_at') {
			const dateA = new Date(a.created_at)
			const dateB = new Date(b.created_at)
			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
		} else if (sortBy === 'title') {
			return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
		}
		return 0
	})

	return (
		<MainLayout>
			<header className="flex flex-wrap items-center justify-between gap-4">
				<h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-secondary dark:text-white">Campaigns</h1>
				{['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
					<button onClick={handleOpenCreate} className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-DEFAULT bg-primary px-5 text-base font-bold text-white shadow-soft shadow-primary/30 transition-all hover:bg-primary/90">
						<span className="material-symbols-outlined text-xl">add_circle</span>
						<span className="truncate">Create Campaign</span>
					</button>
				)}
			</header>
			<section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<div className="flex flex-col gap-2 rounded-lg border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/20 dark:bg-slate-900/50">
					<p className="text-base font-medium text-slate-500 dark:text-slate-400">Total Campaigns</p>
					<p className="text-3xl font-bold tracking-tight text-secondary dark:text-white">{totalCampaigns}</p>
					<p className="text-base font-medium text-success">Total</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/20 dark:bg-slate-900/50">
					<p className="text-base font-medium text-slate-500 dark:text-slate-400">Active Campaigns</p>
					<p className="text-3xl font-bold tracking-tight text-secondary dark:text-white">{activeCampaigns}</p>
					<p className="text-base font-medium text-success">Active</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/20 dark:bg-slate-900/50">
					<p className="text-base font-medium text-slate-500 dark:text-slate-400">Inactive Campaigns</p>
					<p className="text-3xl font-bold tracking-tight text-secondary dark:text-white">{inactiveCampaigns}</p>
					<p className="text-base font-medium text-error">Inactive</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg border border-slate-200/80 bg-white p-6 shadow-soft dark:border-slate-800/20 dark:bg-slate-900/50">
					<p className="text-base font-medium text-slate-500 dark:text-slate-400">Last Month Created</p>
					<p className="text-3xl font-bold tracking-tight text-secondary dark:text-white">{lastMonthCampaigns}</p>
					<p className="text-base font-medium text-success">Last Month</p>
				</div>
			</section>
			<section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-slate-200/80 bg-white p-4 shadow-soft dark:border-slate-800/20 dark:bg-slate-900/50">
				<div className="relative w-full max-w-xs">
					<span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
					<input className="h-10 w-full rounded-DEFAULT border-slate-300 bg-slate-50 pl-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" placeholder="Search by campaign name..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
				</div>
				<div className="flex items-center gap-4">
					<div className="relative">
						<select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="h-10 w-full appearance-none rounded-DEFAULT border-slate-300 bg-slate-50 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white">
							<option value="All">All</option>
							<option value="Active">Active</option>
							<option value="Inactive">Inactive</option>
						</select>
						<span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
					</div>
					<div className="relative">
						<select
							value={`${sortBy}-${sortOrder}`}
							onChange={(e) => {
								const [field, order] = e.target.value.split('-')
								setSortBy(field)
								setSortOrder(order)
							}}
							className="h-10 w-full appearance-none rounded-DEFAULT border-slate-300 bg-slate-50 pl-4 pr-10 text-sm focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						>
							<option value="created_at-desc">Date Desc</option>
							<option value="created_at-asc">Date Asc</option>
							<option value="title-asc">Name Asc</option>
							<option value="title-desc">Name Desc</option>
						</select>
						<span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
					</div>
				</div>
			</section>
			<section className="mt-6 flow-root">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<table className="min-w-full border-separate" style={{ borderSpacing: '0 0.75rem' }}>
							<thead className="text-left">
								<tr>
									<th className="text-nowrap px-6 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400" scope="col">
										Campaign Name
									</th>
									<th className="text-nowrap px-6 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400" scope="col">
										Status
									</th>
									<th className="text-nowrap px-6 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400" scope="col">
										Content
									</th>
									<th className="text-nowrap px-6 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400" scope="col">
										Created At
									</th>
									<th className="text-nowrap px-6 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400 text-end" scope="col">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="text-secondary dark:text-white">
								{sortedCampaigns.map((campaign) => (
									<tr key={campaign.id} className="transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
										<td className="whitespace-nowrap rounded-l-lg border-y border-l border-slate-200/80 bg-white px-6 py-5 text-sm font-medium dark:border-slate-800/20 dark:bg-slate-900/50 font-semibold">{campaign.title}</td>
										<td className="whitespace-nowrap border-y border-slate-200/80 bg-white px-6 py-5 text-sm dark:border-slate-800/20 dark:bg-slate-900/50">
											<span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${campaign.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{campaign.is_active ? 'Active' : 'Inactive'}</span>
										</td>
										<td className="whitespace-nowrap border-y border-slate-200/80 bg-white px-6 py-5 text-sm dark:border-slate-800/20 dark:bg-slate-900/50">{campaign.content}</td>
										<td className="whitespace-nowrap border-y border-slate-200/80 bg-white px-6 py-5 text-sm text-slate-500 dark:text-slate-400 dark:border-slate-800/20 dark:bg-slate-900/50">{new Date(campaign.created_at).toLocaleDateString()}</td>
										<td className="flex items-center justify-end gap-4 rounded-r-lg border-y border-r border-slate-200/80 bg-white px-6 py-5 text-right text-sm font-medium dark:border-slate-800/20 dark:bg-slate-900/50">
											{['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
												<>
													<Edit onClick={() => handleOpenUpdate(campaign.id)} className="size-5 text-text-secondary cursor-pointer" />
													<Trash onClick={() => handleOpenDelete(campaign.id)} className="size-5 text-text-secondary cursor-pointer" />
												</>
											)}
											{!['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && 'No Action'}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</MainLayout>
	)
}
