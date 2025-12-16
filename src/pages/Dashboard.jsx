import MainLayout from '../components/layout/MainLayout'
import LineChart from '../components/LineChart'
import SentimentPieChart from '../components/PieChart'
import { useDashboard } from '../hooks/useDashboard'

export default function Dashboard() {
	const { data, data2, loading } = useDashboard()

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<MainLayout>
			<div className="flex flex-wrap items-center justify-between gap-3 mb-8">
				<p className="text-secondary text-4xl font-bold leading-tight tracking-tight">Dashboard Overview</p>
				{/* <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-4 bg-white border border-card-border text-secondary text-sm font-bold">
					<span className="material-symbols-outlined !text-xl">calendar_month</span>
					<span className="truncate">Last 30 Days</span>
				</button> */}
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">User Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.user_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Company Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.company_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Company Lid Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.company_lid_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Interaction Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.interaction_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">DM Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.interaction_dm_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Comment Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.interaction_comment_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Active Now Count</p>
					<p className="text-secondary text-3xl font-bold leading-tight">{data?.interaction_now_count}</p>
					<p className="text-success text-base font-bold">+0%</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div className="lg:col-span-2 flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6">
					<p className="text-secondary text-lg font-bold">Interaction Today Count</p>
					<div className="flex flex-col">
						<LineChart chartData={data2?.data} />
					</div>
				</div>
				<div className="flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6 relative">
					<p className="text-secondary text-lg font-bold">Internation DM Count</p>
					<div className="relative flex items-center justify-center max-h-80 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2">
						<SentimentPieChart totals={[data?.interaction_dm_count, data?.interaction_comment_count]} />

						<div className="absolute text-center">
							<p className="text-text-body">Total</p>
							<p className="text-4xl font-bold text-secondary">
								{data?.interaction_dm_count}
							</p>
						</div>
					</div>
					{/* <div className="grid grid-cols-3 gap-2 text-center">
						<div>
							<p className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-body">
								<span className="block size-2.5 rounded-full bg-success"></span>Positive
							</p>
							<p className="font-bold text-secondary">50%</p>
						</div>
						<div>
							<p className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-body">
								<span className="block size-2.5 rounded-full bg-warning"></span>Neutral
							</p>
							<p className="font-bold text-secondary">25%</p>
						</div>
						<div>
							<p className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-body">
								<span className="block size-2.5 rounded-full bg-error"></span>Negative
							</p>
							<p className="font-bold text-secondary">25%</p>
						</div>
					</div> */}
				</div>
			</div>
			{/* <div className="flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6 mb-8">
				<p className="text-secondary text-lg font-bold">Recent Activity</p>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-card-border">
								<th className="py-3 pr-4 text-sm font-bold text-text-body/60">Message</th>
								<th className="py-3 px-4 text-sm font-bold text-text-body/60">Sentiment</th>
								<th className="py-3 px-4 text-sm font-bold text-text-body/60">Action</th>
								<th className="py-3 px-4 text-sm font-bold text-text-body/60">Time</th>
								<th className="py-3 pl-4 text-sm font-bold text-text-body/60">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr className="border-b border-card-border">
								<td className="py-4 pr-4">
									<p className="max-w-xs truncate font-medium text-secondary">"Love the new update! So much faster now."</p>
								</td>
								<td className="py-4 px-4">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-sm font-medium text-success">
										<span className="block size-2 rounded-full bg-success"></span>Positive
									</span>
								</td>
								<td className="py-4 px-4">
									<p className="font-medium text-text-body">Auto-Replied</p>
								</td>
								<td className="py-4 px-4">
									<p className="text-text-body">2m ago</p>
								</td>
								<td className="py-4 pl-4">
									<span className="flex size-3 rounded-full bg-success" data-alt="Success status indicator"></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div> */}
		</MainLayout>
	)
}