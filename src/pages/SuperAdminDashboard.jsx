import MainLayout from '../components/layout/MainLayout'

export default function SuperAdminDashboard() {
	return (
		<MainLayout>
			<div className="flex flex-wrap items-center justify-between gap-4 mb-8">
				<h1 className="text-[#1D1F23] text-4xl font-bold leading-tight">SuperAdmin Dashboard</h1>
				<button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-11 px-4 bg-white text-[#1D1F23] text-sm font-medium leading-normal shadow-[0_4px_14px_rgba(0,0,0,0.05)] ring-1 ring-[#E0E7FF]/50">
					<span className="material-symbols-outlined text-base">calendar_today</span>
					<span className="truncate">Last 30 Days</span>
					<span className="material-symbols-outlined text-base">expand_more</span>
				</button>
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Total Active Clients</p>
					<p className="text-[#1D1F23] tracking-light text-4xl font-bold leading-tight">1,204</p>
					<p className="text-[#15C39A] text-sm font-medium leading-normal">+5.2%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Total AI Interactions</p>
					<p className="text-[#1D1F23] tracking-light text-4xl font-bold leading-tight">3.2M</p>
					<p className="text-[#15C39A] text-sm font-medium leading-normal">+12.8%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Overall System Uptime</p>
					<p className="text-[#1D1F23] tracking-light text-4xl font-bold leading-tight">99.98%</p>
					<p className="text-[#15C39A] text-sm font-medium leading-normal">+0.01%</p>
				</div>
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Active AI Models</p>
					<p className="text-[#1D1F23] tracking-light text-4xl font-bold leading-tight">12</p>
					<p className="text-[#15C39A] text-sm font-medium leading-normal">+1 This month</p>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] lg:col-span-2">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Interactions Over Time</p>
					<p className="text-[#1D1F23] tracking-light text-3xl font-bold leading-tight">823,120</p>
					<div className="flex items-center gap-1">
						<p className="text-[#1D1F23]/60 text-sm font-normal leading-normal">Last 30 Days</p>
						<p className="text-[#15C39A] text-sm font-medium leading-normal">+15.3%</p>
					</div>
					<div className="flex h-64 flex-1 flex-col py-4">
						<svg fill="none" height="100%" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#paint0_linear_chart)"></path>
							<path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#0A84FF" strokeLinecap="round" strokeWidth="3"></path>
							<defs>
								<lineargradient gradientUnits="userSpaceOnUse" id="paint0_linear_chart" x1="236" x2="236" y1="1" y2="149">
									<stop stopColor="#0A84FF" stopOpacity="0.2"></stop>
									<stop offset="1" stopColor="#0A84FF" stopOpacity="0"></stop>
								</lineargradient>
							</defs>
						</svg>
					</div>
				</div>
				<div className="flex flex-col gap-2 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<p className="text-[#1D1F23]/80 text-base font-medium leading-normal">Interaction Breakdown</p>
					<div className="flex h-full flex-1 flex-col items-center justify-center gap-4 py-4">
						<div className="relative flex size-40 items-center justify-center">
							<svg className="absolute inset-0 size-full" viewBox="0 0 36 36">
								<path className="stroke-[#B8D7FF]/50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3"></path>
								<path className="stroke-[#0A84FF]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeDasharray="70, 30" strokeLinecap="round" strokeWidth="3" transform="rotate(-90 18 18)"></path>
							</svg>
							<div className="text-center">
								<p className="text-[#1D1F23] text-3xl font-bold">70%</p>
								<p className="text-[#1D1F23]/60 text-sm">Comments</p>
							</div>
						</div>
						<div className="flex justify-center gap-6 text-sm">
							<div className="flex items-center gap-2">
								<span className="size-3 rounded-full bg-[#0A84FF]"></span>
								<span>Comments</span>
							</div>
							<div className="flex items-center gap-2">
								<span className="size-3 rounded-full bg-[#B8D7FF]/50"></span>
								<span>Direct Messages</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
				<div className="flex flex-col gap-4 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<h3 className="text-[#1D1F23]/80 text-base font-medium">Top Performing Clients</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Client A logo" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1ON-u5aoh37UjlwE6U4bYH3ASpwstVqHX9FI7B0n_7U9cINE9omMA_YxXqwtHMVnMtGfaMI5U27_PJ9oPpEwDHa64R8daZ7MbhO_mo-sq-H8MjeVp6sjyRM1O1ZU00scVaILNVbVNYdD-ffkwSRjxulSaxQEkec8w1zM-fSe0nFB_PPbw8rx0hQcTgoxIPYScOEV0RI5Ecu6FG6jCbcFclQRLbuPwKHEJbbJnf9UYIAYSRxzEbkz_ZkKFUNmFGxNdTOdrhehD5vcR') ` }}></div>
								<span className="font-medium text-[#1D1F23]">Client Alpha</span>
							</div>
							<span className="font-bold text-[#1D1F23]">4.8k interactions</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Client B logo" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAll5-0K47M85ROHqnhLpmxpL3qHtKzEtagWz3-FUFvvctzDJylfxhgW2UwIs1yjOnR2ZnYypRmh-fSYAa1exH8dTQfT_MLIOuvI__9qw1CCV7GjTw0jTSi_5W8nCOMFLGV6YwvJEMcdAlXpKjq1eSNL4LlLluUG--IAgYr24E0HujuLVNRPC8CXtvD6FSw9d7iNe2LcgmqWvZDLlz5fn5RctWd7kaKJWnYDqU9k29gzwj-GJT9qXgQngnOKXuR_TOHwNM5vfjIeMeH') ` }}></div>
								<span className="font-medium text-[#1D1F23]">Client Beta</span>
							</div>
							<span className="font-bold text-[#1D1F23]">3.2k interactions</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="Client C logo" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDsbaIMcLLzfws8buOtT_dWQNrk0sKGE_vsiGPG90310VHRz3n1FJlej48mAX0sHUYY9_yalSGUhrOIx61QtZ9sdKynxzxhVTwjC6-T1A5ETYKa9WCtl6h3s1QGKCQuK6zTvzQyfcDt9TRHp1CXgETMTAgxWPVOw03C7pIR38g7Cukz7KIcmE2CRH11iqUmMqoDCjM16U7n0tvpWv3pY99boELCT7NWk7kbgz15rDhmQXBYpPRM2O-qHZow3SJU1z2S2xwozYfpc29e') ` }}></div>
								<span className="font-medium text-[#1D1F23]">Client Gamma</span>
							</div>
							<span className="font-bold text-[#1D1F23]">2.1k interactions</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 rounded-xl border border-[#E0E7FF] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
					<h3 className="text-[#1D1F23]/80 text-base font-medium">System Status</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="font-medium text-[#1D1F23]">Comment Analysis Engine</span>
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-[#15C39A]"></span>
								<span className="text-sm font-medium text-[#15C39A]">Operational</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-medium text-[#1D1F23]">DM Responder Service</span>
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-[#15C39A]"></span>
								<span className="text-sm font-medium text-[#15C39A]">Operational</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-medium text-[#1D1F23]">OpenAI API Connection</span>
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-[#F9B234]"></span>
								<span className="text-sm font-medium text-[#F9B234]">Degraded Performance</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<span className="font-medium text-[#1D1F23]">Instagram API Gateway</span>
							<div className="flex items-center gap-2">
								<span className="size-2 rounded-full bg-[#F25050]"></span>
								<span className="text-sm font-medium text-[#F25050]">Outage</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	)
}
