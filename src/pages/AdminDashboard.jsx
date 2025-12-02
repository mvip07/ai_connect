import MainLayout from '../components/layout/MainLayout'

export default function AdminDashboard() {
	return (
		<MainLayout>
			<div className="flex flex-wrap items-center justify-between gap-3 mb-8">
				<p className="text-secondary text-4xl font-bold leading-tight tracking-tight">Dashboard Overview</p>
				<button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-4 bg-white border border-card-border text-secondary text-sm font-bold">
					<span className="material-symbols-outlined !text-xl">calendar_month</span>
					<span className="truncate">Last 30 Days</span>
				</button>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Total Comments Managed</p>
					<p className="text-secondary text-3xl font-bold leading-tight">12,834</p>
					<p className="text-success text-base font-bold">+5.2%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Total DMs Handled</p>
					<p className="text-secondary text-3xl font-bold leading-tight">4,210</p>
					<p className="text-success text-base font-bold">+8.1%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Average Response Time</p>
					<p className="text-secondary text-3xl font-bold leading-tight">3.2 sec</p>
					<p className="text-error text-base font-bold">-1.5%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-lg bg-white p-6 border border-card-border">
					<p className="text-text-body text-base font-medium">Overall Sentiment Score</p>
					<p className="text-secondary text-3xl font-bold leading-tight">92%</p>
					<p className="text-success text-base font-bold">+0.8%</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
				<div className="lg:col-span-2 flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6">
					<p className="text-secondary text-lg font-bold">Engagement Trend</p>
					<div className="flex h-[280px] flex-col">
						<svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 500 150" width="100%" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 109C19.2308 109 19.2308 21 38.4615 21C57.6923 21 57.6923 41 76.9231 41C96.1538 41 96.1538 93 115.385 93C134.615 93 134.615 33 153.846 33C173.077 33 173.077 101 192.308 101C211.538 101 211.538 61 230.769 61C250 61 250 45 269.231 45C288.462 45 288.462 121 307.692 121C326.923 121 326.923 149 346.154 149C365.385 149 365.385 1 384.615 1C403.846 1 403.846 81 423.077 81C442.308 81 442.308 129 461.538 129C480.769 129 480.769 25 500 25V150H0V109Z" fill="url(#paint0_linear_chart)"></path>
							<path d="M0 109C19.2308 109 19.2308 21 38.4615 21C57.6923 21 57.6923 41 76.9231 41C96.1538 41 96.1538 93 115.385 93C134.615 93 134.615 33 153.846 33C173.077 33 173.077 101 192.308 101C211.538 101 211.538 61 230.769 61C250 61 250 45 269.231 45C288.462 45 288.462 121 307.692 121C326.923 121 326.923 149 346.154 149C365.385 149 365.385 1 384.615 1C403.846 1 403.846 81 423.077 81C442.308 81 442.308 129 461.538 129C480.769 129 480.769 25 500 25" stroke="#0A84FF" strokeLinecap="round" strokeWidth="3"></path>
							<defs>
								<lineargradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="250" x2="250" y1="1" y2="150">
									<stop stopColor="#0A84FF" stopOpacity="0.2"></stop>
									<stop offset="1" stopColor="#F5F9FF" stopOpacity="0"></stop>
								</lineargradient>
							</defs>
						</svg>
					</div>
				</div>
				<div className="flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6">
					<p className="text-secondary text-lg font-bold">Sentiment Breakdown</p>
					<div className="relative flex flex-1 items-center justify-center">
						<svg className="absolute size-full" viewBox="0 0 36 36">
							<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F25050" strokeDasharray="10, 90" strokeWidth="3"></path>
							<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F9B234" strokeDasharray="25, 75" strokeDashoffset="-10" strokeWidth="3"></path>
							<path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#15C39A" strokeDasharray="65, 35" strokeDashoffset="-35" strokeWidth="3"></path>
						</svg>
						<div className="text-center">
							<p className="text-text-body">Total</p>
							<p className="text-4xl font-bold text-secondary">1.2k</p>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-2 text-center">
						<div>
							<p className="flex items-center justify-center gap-1.5 text-sm font-medium text-text-body">
								<span className="block size-2.5 rounded-full bg-success"></span>Positive
							</p>
							<p className="font-bold text-secondary">65%</p>
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
							<p className="font-bold text-secondary">10%</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4 rounded-lg border border-card-border bg-white p-6 mb-8">
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
							<tr className="border-b border-card-border">
								<td className="py-4 pr-4">
									<p className="max-w-xs truncate font-medium text-secondary">"When is the next feature drop?"</p>
								</td>
								<td className="py-4 px-4">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-warning/10 px-2 py-0.5 text-sm font-medium text-warning">
										<span className="block size-2 rounded-full bg-warning"></span>Neutral
									</span>
								</td>
								<td className="py-4 px-4">
									<p className="font-medium text-text-body">Flagged for Review</p>
								</td>
								<td className="py-4 px-4">
									<p className="text-text-body">15m ago</p>
								</td>
								<td className="py-4 pl-4">
									<span className="flex size-3 rounded-full bg-warning" data-alt="Warning status indicator"></span>
								</td>
							</tr>
							<tr className="border-b border-card-border">
								<td className="py-4 pr-4">
									<p className="max-w-xs truncate font-medium text-secondary">"Can't seem to find the settings page."</p>
								</td>
								<td className="py-4 px-4">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-error/10 px-2 py-0.5 text-sm font-medium text-error">
										<span className="block size-2 rounded-full bg-error"></span>Negative
									</span>
								</td>
								<td className="py-4 px-4">
									<p className="font-medium text-text-body">Escalated to Support</p>
								</td>
								<td className="py-4 px-4">
									<p className="text-text-body">32m ago</p>
								</td>
								<td className="py-4 pl-4">
									<span className="flex size-3 rounded-full bg-error" data-alt="Error status indicator"></span>
								</td>
							</tr>
							<tr>
								<td className="py-4 pr-4">
									<p className="max-w-xs truncate font-medium text-secondary">"This is awesome! 🚀"</p>
								</td>
								<td className="py-4 px-4">
									<span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2 py-0.5 text-sm font-medium text-success">
										<span className="block size-2 rounded-full bg-success"></span>Positive
									</span>
								</td>
								<td className="py-4 px-4">
									<p className="font-medium text-text-body">Auto-Liked</p>
								</td>
								<td className="py-4 px-4">
									<p className="text-text-body">1h ago</p>
								</td>
								<td className="py-4 pl-4">
									<span className="flex size-3 rounded-full bg-success" data-alt="Success status indicator"></span>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</MainLayout>
	)
}
