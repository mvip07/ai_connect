import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'
import { FileUploader } from './UI/UploadImageFirebase'

export const CreateUserModal = ({ closeModal, handleCreate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState({
		full_name: '',
		username: '',
		phone_number: '',
		password: '',
	})

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleCreate(formData)
				closeModal()
			}}
			className="space-y-6"
			id="userCreate"
		>
			<label key="full_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Full Name *</p>
				<input name="full_name" required type="text" value={formData.full_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Full Name" />
			</label>
			<label key="username" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Username*</p>
				<input name="username" required type="text" value={formData.username} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Username" />
			</label>
			<label key="phone_number" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Phone Number *</p>
				<input name="phone_number" required type="phone_number" value={formData.phone_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Phone Number" />
			</label>
			<label key="password" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Password *</p>
				<input name="password" required type="password" value={formData.password} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Password" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Role *</p>
				<select onChange={handleChange} value={formData?.role} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="role" id="role">
					<option value="">--Select Role--</option>
					{['SUPERADMIN', 'ADMIN', 'MANAGER', 'OPERATOR'].map((role) => (
						<option key={Math.random()} value={role}>
							{role}
						</option>
					))}
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Company Id *</p>
				<select onChange={handleChange} defaultValue={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--Select Company--</option>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.title}
						</option>
					))}
				</select>
			</label>
			<div className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Profile Picture *</p>
				<FileUploader folder="users" type="image" fileUrl={formData.pic_path} onChange={(url) => setFormData({ ...formData, pic_path: url })} />
			</div>
		</form>
	)
}

export const EditUserModal = ({ id, closeModal, fetchUser, handleUpdate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const data = await fetchUser(id)

			if (data) {
				setFormData({
					company_id: data.company_id || '',
					full_name: data.full_name || '',
					password: data.password || '',
					is_active: data.is_active || '',
					phone_number: data.phone_number || '',
					pic_path: data.pic_path || '',
					role: data.role || '',
					username: data.username || '',
				})
			}

			setLoading(false)
		}
		load()
	}, [id, fetchUser])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	if (loading) return <div className="text-center">Loading...</div>

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleUpdate(id, formData)
				closeModal()
			}}
			id="userEdit"
			className="space-y-6"
		>
			<label key="full_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Full Name *</p>
				<input name="full_name" type="text" value={formData.full_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Full Name" />
			</label>
			<label key="username" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Username*</p>
				<input name="username" type="text" value={formData.username} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Username" />
			</label>
			<label key="phone_number" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Phone Number *</p>
				<input name="phone_number" type="phone_number" value={formData.phone_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Phone Number" />
			</label>
			<label key="password" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Password *</p>
				<input name="password" type="password" value={formData.password} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Password" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Role *</p>
				<select onChange={handleChange} value={formData?.role} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="role" id="role">
					<option value="">--Select Role--</option>
					{['SUPERADMIN', 'ADMIN', 'MANAGER', 'OPERATOR'].map((role) => (
						<option key={Math.random()} value={role}>
							{role}
						</option>
					))}
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Status *</p>
				<select onChange={handleChange} value={formData?.is_active} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="is_active" id="is_active">
					<option value="">--Select Status--</option>
					<option value={true}>Active</option>
					<option value={false}>InActive</option>
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Company Id *</p>
				<select onChange={handleChange} value={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--Select Company--</option>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.title}
						</option>
					))}
				</select>
			</label>
			<div className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Profile Picture *</p>
				<FileUploader folder="users" type="image" fileUrl={formData.pic_path} onChange={(url) => setFormData({ ...formData, pic_path: url })} />
			</div>
		</form>
	)
}

export const DeleteUserModal = ({ id, closeModal, handleDelete }) => {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-center space-y-4"
			id="userDelete"
		>
			<p className="my-5">Are you sure? This action cannot be undone.</p>
		</form>
	)
}

export const UsersModal = (closeModal, openModal, fetchUser, handleCreate, handleUpdate, handleDelete) => {
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'userCreate',
			title: 'Create User',
			btnTitle: 'Create',
			content: <CreateUserModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'userEdit',
			title: 'Update User',
			btnTitle: 'Update',
			content: <EditUserModal id={id} closeModal={closeModal} fetchUser={fetchUser} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'userDelete',
			title: 'Delete User',
			btnTitle: 'Delete',
			content: <DeleteUserModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}