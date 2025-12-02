import MainLayout from '../components/layout/MainLayout'

export default function BillingPlans() {
	return (
		<MainLayout>
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<div className="flex flex-col gap-10">
						<div className="flex flex-wrap items-end justify-between gap-4">
							<div className="flex min-w-72 flex-col gap-2">
								<p className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em]">Billing &amp; Plans</p>
								<p className="text-secondary/60 text-base font-normal leading-normal">Manage subscriptions, view invoices, and update payment details.</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium text-secondary/80">Annual Billing Discount</p>
								<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch">
									<span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-5"></span>
								</button>
							</div>
						</div>
						<div className="grid grid-cols-1 gap-6 @3xl:grid-cols-3">
							<div className="flex flex-1 flex-col gap-6 rounded-xl border border-accent/40 bg-white p-6 shadow-card transition-all hover:border-accent hover:shadow-lg">
								<div className="flex flex-col gap-2">
									<h3 className="text-secondary text-lg font-bold leading-tight">Starter</h3>
									<p className="flex items-baseline gap-1 text-secondary">
										<span className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em]">$99</span>
										<span className="text-secondary/60 text-base font-bold leading-tight">/ month</span>
									</p>
								</div>
								<button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary/10 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/20">
									<span className="truncate">Downgrade Plan</span>
								</button>
								<div className="flex flex-col gap-3 pt-2">
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> 10 Managed Accounts
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> 50,000 AI Credits/Month
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> Standard Support
									</div>
								</div>
							</div>
							<div className="relative flex flex-1 flex-col gap-6 rounded-xl border-2 border-primary bg-white p-6 shadow-card ring-4 ring-primary/10">
								<div className="flex flex-col gap-2">
									<div className="flex items-center justify-between">
										<h3 className="text-secondary text-lg font-bold leading-tight">Pro</h3>
										<p className="rounded-full bg-primary/10 px-3 py-1 text-center text-xs font-medium leading-normal tracking-[0.015em] text-primary">Recommended</p>
									</div>
									<p className="flex items-baseline gap-1 text-secondary">
										<span className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em]">$249</span>
										<span className="text-secondary/60 text-base font-bold leading-tight">/ month</span>
									</p>
								</div>
								<button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-primary/50 bg-primary/20 text-primary text-sm font-bold leading-normal tracking-[0.015em]">
									<span className="truncate">Current Plan</span>
								</button>
								<div className="flex flex-col gap-3 pt-2">
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> 50 Managed Accounts
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> 250,000 AI Credits/Month
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> Priority Support
									</div>
								</div>
							</div>
							<div className="flex flex-1 flex-col gap-6 rounded-xl border border-accent/40 bg-white p-6 shadow-card transition-all hover:border-accent hover:shadow-lg">
								<div className="flex flex-col gap-2">
									<h3 className="text-secondary text-lg font-bold leading-tight">Enterprise</h3>
									<p className="flex items-baseline gap-1 text-secondary">
										<span className="text-secondary text-4xl font-black leading-tight tracking-[-0.033em]">$499</span>
										<span className="text-secondary/60 text-base font-bold leading-tight">/ month</span>
									</p>
								</div>
								<button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-white shadow-soft text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90">
									<span className="truncate">Upgrade Plan</span>
								</button>
								<div className="flex flex-col gap-3 pt-2">
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> Unlimited Accounts
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> 1,000,000 AI Credits/Month
									</div>
									<div className="flex gap-3 text-[13px] font-normal leading-normal text-secondary/80">
										<span className="material-symbols-outlined text-lg text-success">check_circle</span> Dedicated Support
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col space-y-4">
							<h2 className="text-secondary text-[22px] font-bold leading-tight tracking-[-0.015em]">Transaction History</h2>
							<div className="w-full overflow-hidden rounded-xl border border-accent/40 bg-white shadow-card">
								<div className="overflow-x-auto">
									<table className="w-full text-left text-sm">
										<thead className="bg-gray-50/50 text-xs uppercase text-secondary/60">
											<tr>
												<th className="px-6 py-3 font-medium" scope="col">
													Invoice ID
												</th>
												<th className="px-6 py-3 font-medium" scope="col">
													Date
												</th>
												<th className="px-6 py-3 font-medium" scope="col">
													Amount
												</th>
												<th className="px-6 py-3 font-medium" scope="col">
													Status
												</th>
												<th className="px-6 py-3 font-medium text-right" scope="col">
													Action
												</th>
											</tr>
										</thead>
										<tbody className="text-secondary/90">
											<tr className="border-b border-accent/30 bg-white">
												<td className="whitespace-nowrap px-6 py-4 font-medium">#INV-00125</td>
												<td className="px-6 py-4">Oct 1, 2023</td>
												<td className="px-6 py-4">$249.00</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Paid</span>
												</td>
												<td className="px-6 py-4 text-right">
													<a className="font-medium text-primary hover:underline" href="#">
														Download
													</a>
												</td>
											</tr>
											<tr className="border-b border-accent/30 bg-gray-50/30">
												<td className="whitespace-nowrap px-6 py-4 font-medium">#INV-00124</td>
												<td className="px-6 py-4">Sep 1, 2023</td>
												<td className="px-6 py-4">$249.00</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Paid</span>
												</td>
												<td className="px-6 py-4 text-right">
													<a className="font-medium text-primary hover:underline" href="#">
														Download
													</a>
												</td>
											</tr>
											<tr className="border-b border-accent/30 bg-white">
												<td className="whitespace-nowrap px-6 py-4 font-medium">#INV-00123</td>
												<td className="px-6 py-4">Aug 1, 2023</td>
												<td className="px-6 py-4">$249.00</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">Paid</span>
												</td>
												<td className="px-6 py-4 text-right">
													<a className="font-medium text-primary hover:underline" href="#">
														Download
													</a>
												</td>
											</tr>
											<tr className="bg-gray-50/30">
												<td className="whitespace-nowrap px-6 py-4 font-medium">#INV-00122</td>
												<td className="px-6 py-4">Jul 1, 2023</td>
												<td className="px-6 py-4">$99.00</td>
												<td className="px-6 py-4">
													<span className="inline-flex items-center rounded-full bg-warning/10 px-2.5 py-0.5 text-xs font-medium text-warning">Pending</span>
												</td>
												<td className="px-6 py-4 text-right">
													<a className="font-medium text-primary hover:underline" href="#">
														Download
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<aside className="flex flex-col gap-6">
					<h2 className="text-secondary text-[22px] font-bold leading-tight tracking-[-0.015em]">Billing Overview</h2>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-3 rounded-xl border border-accent/40 bg-white p-6 shadow-card">
							<p className="text-secondary/80 text-base font-medium leading-normal">Current Monthly Revenue</p>
							<p className="text-secondary tracking-light text-3xl font-bold leading-tight">$12,450</p>
						</div>
						<div className="flex flex-col gap-3 rounded-xl border border-accent/40 bg-white p-6 shadow-card">
							<p className="text-secondary/80 text-base font-medium leading-normal">Active Subscriptions</p>
							<p className="text-secondary tracking-light text-3xl font-bold leading-tight">1,204</p>
						</div>
						<div className="flex flex-col gap-3 rounded-xl border border-accent/40 bg-white p-6 shadow-card">
							<p className="text-secondary/80 text-base font-medium leading-normal">Next Payout Date</p>
							<p className="text-secondary tracking-light text-3xl font-bold leading-tight">Nov 1, 2023</p>
						</div>
					</div>
					<div className="flex flex-col space-y-4 rounded-xl border border-accent/40 bg-white p-6 shadow-card">
						<h3 className="font-bold text-secondary">Usage &amp; Add-ons</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-secondary/80" for="ai-limit">
									AI Response Limit (per account/month)
								</label>
								<div className="flex items-center gap-4 mt-2">
									<input className="h-2 w-full flex-1 cursor-pointer appearance-none rounded-full bg-primary/20 accent-primary" id="ai-limit" max="10000" min="1000" type="range" value="5000" />
									<span className="font-semibold text-secondary">5,000</span>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium text-secondary/80">Advanced Analytics Add-on</span>
								<button aria-checked="false" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch">
									<span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"></span>
								</button>
							</div>
							<button className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary text-white shadow-soft text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90">Manage Add-ons</button>
						</div>
					</div>
				</aside>
			</div>
		</MainLayout>
	)
}
