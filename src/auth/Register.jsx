import { useAuthRedirect } from '../hooks/useAuthRedirect'

export default function Register() {
	useAuthRedirect()
	return (
		<div className="font-display">
			<div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light p-4 md:p-6" style={{ backgroundColor: '#F5F9FF;' }}>
				<div className="w-full max-w-6xl">
					<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
						<div className="hidden flex-col items-start justify-center p-8 lg:flex">
							<div className="flex flex-col gap-4">
								<h1 className="text-[#1D1F23] text-5xl font-bold leading-tight tracking-tighter">AiConnect</h1>
								<p className="text-[#1D1F23]/80 text-xl font-normal leading-normal">Always on.</p>
							</div>
							<div className="absolute bottom-0 left-0 h-full w-1/2" style={{ background: 'radial-gradient(circle at 10% 90%, rgba(184, 215, 255, 0.3) 0%, rgba(245, 249, 255, 0) 40%)' }}></div>
						</div>
						<div className="flex w-full items-center justify-center">
							<div className="w-full max-w-md rounded-xl bg-white p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
								<div className="flex flex-col gap-8">
									<div className="flex flex-col gap-2">
										<p className="text-[#1D1F23] text-3xl font-bold leading-tight tracking-tight">Create Your Account</p>
										<p className="text-[#1D1F23]/60 text-base font-normal leading-normal">Unlock AI-powered Instagram engagement.</p>
									</div>
									<form className="flex flex-col gap-5">
										<div className="flex flex-col">
											<label className="text-[#1D1F23] text-sm font-medium leading-normal pb-2" htmlFor="full-name">
												Full Name
											</label>
											<input className="form-input w-full rounded-lg border border-gray-200 bg-gray-50/50 p-3 text-base font-normal text-[#1D1F23] placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20" id="full-name" placeholder="Enter your full name" type="text" />
										</div>
										<div className="flex flex-col">
											<label className="text-[#1D1F23] text-sm font-medium leading-normal pb-2" htmlFor="work-email">
												Work Email
											</label>
											<input className="form-input w-full rounded-lg border border-gray-200 bg-gray-50/50 p-3 text-base font-normal text-[#1D1F23] placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20" id="work-email" placeholder="Enter your work email" type="email" />
										</div>
										<div className="relative flex flex-col">
											<label className="text-[#1D1F23] text-sm font-medium leading-normal pb-2" htmlFor="password">
												Password
											</label>
											<input className="form-input w-full rounded-lg border border-gray-200 bg-gray-50/50 p-3 text-base font-normal text-[#1D1F23] placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20" id="password" placeholder="Enter your password" type="password" />
											<button className="absolute right-3 top-[42px] text-gray-500 hover:text-primary" type="button">
												<span className="material-symbols-outlined text-xl" data-icon="visibility_off">
													visibility_off
												</span>
											</button>
										</div>
										<div className="relative flex flex-col">
											<label className="text-[#1D1F23] text-sm font-medium leading-normal pb-2" htmlFor="confirm-password">
												Confirm Password
											</label>
											<input className="form-input w-full rounded-lg border border-gray-200 bg-gray-50/50 p-3 text-base font-normal text-[#1D1F23] placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/20" id="confirm-password" placeholder="Confirm your password" type="password" />
										</div>
										<div className="flex items-center gap-3 pt-2">
											<input className="form-checkbox h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary/30" id="terms-checkbox" type="checkbox" />
											<label className="text-sm text-[#1D1F23]/80" htmlFor="terms-checkbox">
												I agree to the{' '}
												<a className="font-medium text-primary hover:underline" href="#">
													Terms and Conditions
												</a>{' '}
												and{' '}
												<a className="font-medium text-primary hover:underline" href="#">
													Privacy Policy
												</a>
												.
											</label>
										</div>
										<button className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-semibold text-white shadow-sm shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/20" type="submit">
											Create Account
										</button>
									</form>
									<div className="text-center">
										<p className="text-sm text-[#1D1F23]/60">
											Already have an account?{' '}
											<a className="font-medium text-primary hover:underline" href="#" style={{ color: '#B8D7FF' }}>
												Log In
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
