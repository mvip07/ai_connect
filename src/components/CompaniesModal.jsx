import { useEffect, useState } from 'react'
import { FileUploader } from './UI/UploadImageFirebase'

export const CreateCompanyModal = ({ closeModal, handleCreate }) => {
	const [formData, setFormData] = useState({
		address: '',
		contact_email: '',
		contact_number: '',
		description: '',
		instagram_id: '',
		instagram_token: '',
		instagram_verify_token: '',
		openai_token: '',
		title: '',
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
			id="companyCreate"
		>
			{Object.keys(formData).map((key) => (
				<label key={key} className="flex flex-col min-w-40 flex-1">
					<p className="text-secondary text-sm font-medium pb-2">{key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} *</p>
					<input name={key} required type={key.includes('email') ? 'email' : 'text'} value={formData[key]} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`Enter ${key.replace(/_/g, ' ')}`} />
				</label>
			))}
			<div className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Logo Path</p>
				<FileUploader folder="companies" type="image" fileUrl={formData.logo_path} onChange={(url) => setFormData({ ...formData, logo_path: url })} />
			</div>
		</form>
	)
}

export const EditCompanyModal = ({ id, closeModal, fetchCompany, handleUpdate }) => {
	const [formData, setFormData] = useState(null)

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const data = await fetchCompany(id)

			if (data) {
				setFormData(data)
			}

			setLoading(false)
		}
		load()
	}, [id, fetchCompany])

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
			id="companyEdit"
			className="space-y-6"
		>
			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Title *</p>
				<input name="title" required value={formData.title} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200  dark:border-white/20 bg-background-light dark:bg-background-dark   text-secondary p-[15px]" placeholder="Enter title" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Description *</p>
				<input name="description" required value={formData.description} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark  text-secondary p-[15px]" placeholder="Enter description" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Contact Email *</p>
				<input type="email" name="contact_email" required value={formData.contact_email} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200   dark:border-white/20 bg-background-light dark:bg-background-dark   text-secondary p-[15px]" placeholder="Enter contact email" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Contact Number *</p>
				<input name="contact_number" required value={formData.contact_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200  dark:border-white/20 bg-background-light dark:bg-background-dark  text-secondary p-[15px]" placeholder="Enter contact number" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Address *</p>
				<input name="address" required value={formData.address} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200   dark:border-white/20 bg-background-light dark:bg-background-dark   text-secondary p-[15px]" placeholder="Enter address" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Instagram Token</p>
				<input name="instagram_token" value={formData.instagram_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder="Enter Instagram token" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Instagram Verify Token</p>
				<input name="instagram_verify_token" value={formData.instagram_verify_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder="Enter verify token" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Instagram Id</p>
				<input name="instagram_verify_token" value={formData.instagram_id} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder="Enter instagram id" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">OpenAI Token</p>
				<input name="openai_token" value={formData.openai_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder="Enter OpenAI token" />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Status *</p>
				<select name="is_active" value={formData.is_active ? 'true' : 'false'} onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark">
					<option value="true">Active</option>
					<option value="false">Inactive</option>
				</select>
			</label>

			<div className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">Logo Path</p>
				<FileUploader folder="companies" type="image" fileUrl={formData.logo_path} onChange={(url) => setFormData({ ...formData, logo_path: url })} />
			</div>
		</form>
	)
}

export const DeleteCompanyModal = ({ id, closeModal, handleDelete }) => {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-center space-y-4"
			id="companyDelete"
		>
			<p className="my-5">Are you sure? This action cannot be undone.</p>
		</form>
	)
}

export const CompaniesModal = (closeModal, openModal, fetchCompany, handleCreate, handleUpdate, handleDelete) => {
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'companyCreate',
			title: 'Create Company',
			btnTitle: 'Create',
			content: <CreateCompanyModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'companyEdit',
			title: 'Update Company',
			btnTitle: 'Update',
			content: <EditCompanyModal id={id} closeModal={closeModal} fetchCompany={fetchCompany} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'companyDelete',
			title: 'Delete Company',
			btnTitle: 'Delete',
			content: <DeleteCompanyModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
