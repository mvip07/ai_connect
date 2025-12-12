import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const CreateAiConfigModal = ({ closeModal, handleCreate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState({
		company_id: '',
		template_name: '',
		template_text: '',
		use_openai: false,
	})

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
	}

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleCreate(formData)
				closeModal()
			}}
			className="space-y-6"
			id="aiConfigCreate"
		>
			{getUserFromStorage()?.user?.role === 'SUPERADMIN' && (
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
			)}
			<label key="template_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Template Name *</p>
				<input name="template_name" required type="text" value={formData.template_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Template Name" />
			</label>
			<label key="template_text" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Template Text *</p>
				<textarea name="template_text" required value={formData.template_text} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Template Text" />
			</label>
			<label key="use_openai" className="flex items-center gap-2">
				<input name="use_openai" type="checkbox" checked={formData.use_openai} onChange={handleChange} className="form-checkbox" />
				<p className="text-secondary text-sm font-medium">Use OpenAI</p>
			</label>
		</form>
	)
}

export const EditAiConfigModal = ({ id, closeModal, fetchAiConfig, handleUpdate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const data = await fetchAiConfig(id)

			if (data) {
				setFormData({
					company_id: data.company_id || '',
					template_name: data.template_name || '',
					template_text: data.template_text || '',
					use_openai: data.use_openai || false,
				})
			}

			setLoading(false)
		}
		load()
	}, [id, fetchAiConfig])

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
	}

	if (loading) return <div className="text-center">Loading...</div>

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleUpdate(id, formData)
				closeModal()
			}}
			id="aiConfigEdit"
			className="space-y-6"
		>
			{getUserFromStorage()?.user?.role === 'SUPERADMIN' && (
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
			)}
			<label key="template_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Template Name *</p>
				<input name="template_name" type="text" value={formData.template_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Template Name" />
			</label>
			<label key="template_text" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Template Text *</p>
				<textarea name="template_text" value={formData.template_text} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter Template Text" />
			</label>
			<label key="use_openai" className="flex items-center gap-2">
				<input name="use_openai" type="checkbox" checked={formData.use_openai} onChange={handleChange} className="form-checkbox" />
				<p className="text-secondary text-sm font-medium">Use OpenAI</p>
			</label>
		</form>
	)
}

export const DeleteAiConfigModal = ({ id, closeModal, handleDelete }) => {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-center space-y-4"
			id="aiConfigDelete"
		>
			<p className="my-5">Are you sure? This action cannot be undone.</p>
		</form>
	)
}

export const AiConfigsModal = (closeModal, openModal, fetchAiConfig, handleCreate, handleUpdate, handleDelete) => {
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'aiConfigCreate',
			title: 'Create AI Config',
			btnTitle: 'Create',
			content: <CreateAiConfigModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'aiConfigEdit',
			title: 'Update AI Config',
			btnTitle: 'Update',
			content: <EditAiConfigModal id={id} closeModal={closeModal} fetchAiConfig={fetchAiConfig} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'aiConfigDelete',
			title: 'Delete AI Config',
			btnTitle: 'Delete',
			content: <DeleteAiConfigModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
