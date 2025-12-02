import MainLayout from '../components/layout/MainLayout'

export default function OPerator() {
	return (
		<MainLayout>
			<div class="flex flex-wrap justify-between gap-3 items-center mb-6">
				<div class="flex flex-col gap-1">
					<p class="text-secondary text-3xl font-bold leading-tight tracking-tight">Dashboard</p>
					<p class="text-secondary/60 text-base font-normal leading-normal">Review and manage AI-powered conversations.</p>
				</div>
				<button class="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-wide min-w-0 px-5 shadow-soft-button hover:bg-primary/90 transition-all">
					<span class="material-symbols-outlined fill text-xl">fact_check</span>
					<span class="truncate">Client</span>
				</button>
			</div>
			<div class="bg-white rounded-xl shadow-soft border border-border-light overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead class="bg-secondary/5">
							<tr>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider w-1/4">User</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider w-1/4">Message Preview</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider w-1/4">AI Response</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider">Status</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-center">Confidence</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider">Date</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-border-light">
							<tr class="hover:bg-accent/20 transition-colors">
								<td class="p-5 align-top">
									<div class="flex items-center gap-3">
										<img class="size-10 rounded-full" data-alt="User avatar for Jane Doe" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-u78B77H_pIme5RlKh8NthyPvcq7jZImMyJeg8_xLwBjN2qpCD959MbzKqltQkk7zRyPrDC2k9KGjxUkh4oSkILbHBmsIxd9m2Vgt7u-OiNVNfVuSgeuzg6Z5aVEEoxilgLDNim1xzWovgvKxQgYIeVjiO8dmftv0fk82Bqp6BYA5dccWV6kP7RuL8pIcxfQYIFYcehX2jODStxPS7LiONHrNNuPx7dqoZHwPaPpCDPos6Y8SQK08-MICkN7rrs39-ZRADxICqHQu" />
										<div class="flex flex-col">
											<p class="font-semibold text-secondary">Jane Doe</p>
											<p class="text-sm text-secondary/60">@janedoe_designs</p>
										</div>
									</div>
								</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"Hey! I love your new product. Can I get a discount?"</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"Thanks, Jane! We're so glad you like it. We've just sent you a DM with a special 15% off code."</td>
								<td class="p-5 align-top">
									<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">Handled</span>
								</td>
								<td class="p-5 text-sm font-medium text-secondary/80 text-center align-top">98%</td>
								<td class="p-5 text-sm text-secondary/60 align-top">Mar 12, 2024</td>
								<td class="p-5 align-top">
									<div class="flex items-center gap-2 text-secondary/60">
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">edit</span>
										</button>
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">visibility</span>
										</button>
									</div>
								</td>
							</tr>
							<tr class="hover:bg-accent/20 transition-colors">
								<td class="p-5 align-top">
									<div class="flex items-center gap-3">
										<img class="size-10 rounded-full" data-alt="User avatar for John Smith" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD00BPc0Jcb8_yEAwCS1SrMfzH4SQ-UMcQkjjKA_IQMK9PSbBpOJx72yFt8I52JGbJG3u8vYpnT8w9EK2xeXWVYanMj4GWFEf63E7x-d83FAWoYYgE3Ind_Z9ebsQyhdqdN4qW-pMf-rN-tTAGTkujxurjIVXph1RRePQi7OutSsVa_-K_05GnfZQV5-_0_aIMiBgGfMQ1cUNOVvq1wIbLjqE9a7-ILnF-5_7ZVx02t_CQPJVu8N2TLkE6wYucUfZjpcc3KgK9-aQT9" />
										<div class="flex flex-col">
											<p class="font-semibold text-secondary">John Smith</p>
											<p class="text-sm text-secondary/60">@johnsmith</p>
										</div>
									</div>
								</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"My order #12345 hasn't arrived yet. What's the status?"</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"Hi John, I've checked order #12345 and it seems there's a delay. I've escalated this to our support team for you."</td>
								<td class="p-5 align-top">
									<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">Needs Review</span>
								</td>
								<td class="p-5 text-sm font-medium text-secondary/80 text-center align-top">76%</td>
								<td class="p-5 text-sm text-secondary/60 align-top">Mar 11, 2024</td>
								<td class="p-5 align-top">
									<div class="flex items-center gap-2 text-secondary/60">
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">edit</span>
										</button>
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">visibility</span>
										</button>
									</div>
								</td>
							</tr>
							<tr class="hover:bg-accent/20 transition-colors">
								<td class="p-5 align-top">
									<div class="flex items-center gap-3">
										<img class="size-10 rounded-full" data-alt="User avatar for Emily White" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJ6Yd9HLT6lyPo0PeHRhCHcOp8CLf541PKIqrUclkEOcASJ6VZ7bFijV-tQEvpLJyg03ts5z3kFobLEhRVWP07HuvwwwGj6YLf6nsVdg8ywWTzq9ODU-01NoNLJVsev84mTNsy9peSfHKQmWt8uWT0IHIYmpIXdN7oOWIJbp6AKvo8GDKk8Rhx8Gv6PX9K_OzCAlP6yMrv60SRdes-Gz1AlLidewLKavcdJzUfeONfuzWUwokRtRPktcUNBD2_VPxhukDP-g8jQcCV" />
										<div class="flex flex-col">
											<p class="font-semibold text-secondary">Emily White</p>
											<p class="text-sm text-secondary/60">@emilyw</p>
										</div>
									</div>
								</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"This is amazing! 🔥"</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"Thank you so much, Emily! 🙌"</td>
								<td class="p-5 align-top">
									<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">Handled</span>
								</td>
								<td class="p-5 text-sm font-medium text-secondary/80 text-center align-top">99%</td>
								<td class="p-5 text-sm text-secondary/60 align-top">Mar 10, 2024</td>
								<td class="p-5 align-top">
									<div class="flex items-center gap-2 text-secondary/60">
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">edit</span>
										</button>
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">visibility</span>
										</button>
									</div>
								</td>
							</tr>
							<tr class="hover:bg-accent/20 transition-colors">
								<td class="p-5 align-top">
									<div class="flex items-center gap-3">
										<img class="size-10 rounded-full" data-alt="User avatar for Sarah Brown" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVKmR-ESNz8gej2V6dW02IZ7lVCsHTLwhzU2qaZcviYUMyvvXoAh_Jjkf_zN1wVvtdOgsblPK20_x32Jyz4kTCB-HBgKixKklGr6zbrRGTyInlTuTE_YzG3xnZ3HxJe6WeZrau6gpLqRygnWNk-c-ZZ5EYy0SEJ3MfDijrqeXOqWREXW4APw4VSegp2Kx1_dpELpwRIs7wePzmCJssxHc3QYZLAvh5kCVQmt3LBH7fFSxYGltsoLBO6aJYd65VzRNRT2OV2YY50sKx" />
										<div class="flex flex-col">
											<p class="font-semibold text-secondary">Sarah Brown</p>
											<p class="text-sm text-secondary/60">@sarahb_creative</p>
										</div>
									</div>
								</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"When is the new feature launching?"</td>
								<td class="p-5 text-sm text-secondary/80 align-top">"Soon! Keep an eye on our page for the official announcement next week."</td>
								<td class="p-5 align-top">
									<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">Handled</span>
								</td>
								<td class="p-5 text-sm font-medium text-secondary/80 text-center align-top">95%</td>
								<td class="p-5 text-sm text-secondary/60 align-top">Mar 9, 2024</td>
								<td class="p-5 align-top">
									<div class="flex items-center gap-2 text-secondary/60">
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">edit</span>
										</button>
										<button class="p-1.5 rounded-md hover:bg-secondary/10 hover:text-secondary">
											<span class="material-symbols-outlined text-xl">visibility</span>
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</MainLayout>
	)
}
