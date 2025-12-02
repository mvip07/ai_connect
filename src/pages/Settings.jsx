import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { FileUploader } from '../components/UI/UploadImageFirebase'
import { userService } from '../services/user.serive'
import { notify } from '../lib/toastify'

export default function Settings() {
	const [form, setForm] = useState({ full_name: '', phone_number: '', pic_path: '', username: '' })

	useEffect(() => {
		const load = async () => {
			const data = await userService.getProfile()
			setForm({
				full_name: data.full_name || '',
				phone_number: data.phone_number || '',
				pic_path: data.pic_path || '',
				username: data.username || '',
			})
		}
		load()
	}, [])

	const handleSubmit = () => {
		userService
			.postProfile(form)
			.then((res) => {
				notify('success', 'Profile updated successfully!')
			})
			.catch((err) => {
				notify('error', 'Profile update failed!')
			})
	}

	return (
		<MainLayout>
			<div className="mx-auto max-w-6xl">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
					<div className="lg:col-span-1">
						<div className="rounded-xl border border-border-color bg-white p-6 shadow-soft">
							<h2 className="text-secondary text-lg font-semibold">Personal Information</h2>
							<div className="mt-6 flex flex-col items-center">
								{/* <label className="group relative">
									<div className="size-24 rounded-full bg-cover bg-center ring-4 ring-white" data-alt="User avatar image">
										<img className="w-full h-full" src={form.pic_path} alt="Image" />
									</div>
									<button className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
										<span className="material-symbols-outlined">edit</span>
									</button>
								</label> */}
								<FileUploader folder="users" type="image" fileUrl={form.pic_path} onChange={(url) => setForm({ ...form, pic_path: url })} />

								<div className="mt-6 w-full space-y-4">
									<div>
										<label className="mb-1 block text-sm font-medium text-secondary/80" for="full_name">
											Full Name
										</label>
										<input className="w-full rounded-lg border-border-color text-secondary placeholder-secondary/40 shadow-sm focus:border-primary focus:ring-primary" id="full_name" type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
									</div>
									<div>
										<label className="mb-1 block text-sm font-medium text-secondary/80" for="email">
											Phone Number
										</label>
										<div className="relative">
											<input className="w-full rounded-lg border-border-color bg-gray-50 text-secondary/60 shadow-sm" id="tel" type="tel" value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
											<a className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-primary hover:underline" href="#">
												Change
											</a>
										</div>
									</div>
									<div>
										<label className="mb-1 block text-sm font-medium text-secondary/80" for="username">
											Username
										</label>
										<input className="w-full rounded-lg border-border-color text-secondary placeholder-secondary/40 shadow-sm focus:border-primary focus:ring-primary" id="username" type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="space-y-8 lg:col-span-2">
						<div className="rounded-xl border border-border-color bg-white p-6 shadow-soft">
							<h2 className="text-secondary text-lg font-semibold">Security</h2>
							<div className="mt-4 space-y-4 divide-y divide-border-color">
								<div className="flex items-center justify-between pt-4 first:pt-0">
									<div>
										<h3 className="font-medium text-secondary">Change Password</h3>
										<p className="text-sm text-secondary/60">Update your password for enhanced security.</p>
									</div>
									<button className="h-10 rounded-lg border border-border-color bg-white px-4 text-sm font-semibold text-secondary shadow-sm hover:bg-gray-50">Change Password</button>
								</div>
								<div className="flex items-center justify-between pt-4">
									<div>
										<h3 className="font-medium text-secondary">Two-Factor Authentication</h3>
										<p className="text-sm text-secondary/60">Add an extra layer of security to your account.</p>
									</div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-medium text-success">Enabled</span>
										<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch" type="button">
											<span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="rounded-xl border border-border-color bg-white p-6 shadow-soft">
							<h2 className="text-secondary text-lg font-semibold">Preferences</h2>
							<div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-sm font-medium text-secondary/80" for="language">
										Language
									</label>
									<select className="w-full rounded-lg border-border-color text-secondary shadow-sm focus:border-primary focus:ring-primary" id="language" name="language">
										<option>English</option>
										<option>Spanish</option>
										<option>French</option>
									</select>
								</div>
								<div>
									<label className="mb-1 block text-sm font-medium text-secondary/80" for="timezone">
										Timezone
									</label>
									<select className="w-full rounded-lg border-border-color text-secondary shadow-sm focus:border-primary focus:ring-primary" id="timezone" name="timezone">
										<option>Pacific Standard Time (PST)</option>
										<option>Eastern Standard Time (EST)</option>
										<option>Greenwich Mean Time (GMT)</option>
									</select>
								</div>
							</div>
						</div>
						<div className="rounded-xl border border-border-color bg-white p-6 shadow-soft">
							<h2 className="text-secondary text-lg font-semibold">Notifications</h2>
							<div className="mt-4 space-y-4 divide-y divide-border-color">
								<div className="flex items-center justify-between pt-4 first:pt-0">
									<div>
										<h3 className="font-medium text-secondary">Weekly Reports</h3>
										<p className="text-sm text-secondary/60">Get a summary of your account activity.</p>
									</div>
									<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch" type="button">
										<span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
									</button>
								</div>
								<div className="flex items-center justify-between pt-4">
									<div>
										<h3 className="font-medium text-secondary">AI Activity Alerts</h3>
										<p className="text-sm text-secondary/60">Notify me when the AI takes an important action.</p>
									</div>
									<button aria-checked="false" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch" type="button">
										<span className="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
									</button>
								</div>
								<div className="flex items-center justify-between pt-4">
									<div>
										<h3 className="font-medium text-secondary">Billing Updates</h3>
										<p className="text-sm text-secondary/60">Receive invoices and payment confirmations.</p>
									</div>
									<button aria-checked="true" className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" role="switch" type="button">
										<span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
									</button>
								</div>
							</div>
						</div>
						<div className="rounded-xl border border-red-200 bg-white p-6 shadow-soft">
							<h2 className="text-secondary text-lg font-semibold">Account Management</h2>
							<div className="mt-4 flex items-center justify-between rounded-lg border border-error/50 bg-error/5 p-4">
								<div>
									<h3 className="font-medium text-error">Delete Account</h3>
									<p className="text-sm text-error/80">Permanently delete your account and all data.</p>
								</div>
								<button className="h-10 rounded-lg bg-error px-4 text-sm font-semibold text-white shadow-sm shadow-error/30 hover:bg-error/90">Delete Account</button>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-8 flex justify-end gap-3 border-t border-border-color pt-6">
					<button className="h-11 rounded-lg border border-border-color bg-white px-6 text-sm font-semibold text-secondary shadow-sm hover:bg-gray-50">Cancel</button>
					<button onClick={handleSubmit} className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-soft shadow-primary/30 hover:bg-primary/90">
						Save Changes
					</button>
				</div>
			</div>
		</MainLayout>
	)
}
