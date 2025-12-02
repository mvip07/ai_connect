import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { useAuthRedirect } from '../hooks/useAuthRedirect'

export default function Login() {
	useAuthRedirect()
	const { handleLogin, loading } = useLogin()

	const [form, setForm] = useState({
		username: '',
		password: '',
	})

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		await handleLogin(form)
	}

	return (
		<div className="font-display">
			<div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 group/design-root overflow-x-hidden">
				<div className="layout-container flex h-full grow flex-col items-center justify-center w-full">
					<div className="layout-content-container flex w-full flex-col items-center max-w-[450px]">
						<div className="flex flex-col items-center text-center mb-8">
							<h1 className="text-secondary tracking-light text-[32px] font-bold leading-tight">AiConnect</h1>
							<p className="text-secondary/60 text-base font-normal leading-normal pt-1">Always on.</p>
						</div>

						<form className="w-full bg-white dark:bg-background-dark dark:border dark:border-white/10 p-8 rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]" onSubmit={onSubmit}>
							<h2 className="text-secondary text-[22px] font-bold leading-tight text-center pb-6">Welcome back</h2>
							<div className="flex flex-col gap-4">
								<label className="flex flex-col min-w-40 flex-1">
									<p className="text-secondary text-sm font-medium pb-2">Email or Username</p>
									<input name="username" value={form.username} onChange={onChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter your email or username" />
								</label>

								<label className="flex flex-col min-w-40 flex-1">
									<p className="text-secondary text-sm font-medium pb-2">Password</p>
									<input name="password" type="password" value={form.password} onChange={onChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary px-[15px]" placeholder="Enter your password" />
								</label>
							</div>

							<div className="w-full pt-6">
								<button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center rounded-lg bg-primary text-white font-medium shadow-sm transition-all hover:brightness-110">
									{loading ? 'Loading...' : 'Login'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
