import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'

export const CreateCompaignModal = ({ closeModal, handleCreate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState({
		title: '',
		content: '',
		company_id: '',
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
			id="compaignCreate"
		>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Title *</p>
				<input name="title" required type="text" value={formData['title']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter title" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Content *</p>
				<input name="content" required type="text" value={formData['content']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter content" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Company Id *</p>
				<select onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--Select Company</option>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.title}
						</option>
					))}
				</select>
			</label>
		</form>
	)
}

export const EditCompaignModal = ({ id, closeModal, fetchCompaign, handleUpdate }) => {
	const { companies } = useCompanies()
	const [formData, setFormData] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const load = async () => {
			setLoading(true)
			const data = await fetchCompaign(id)
			if (data) {
				setFormData(data)
			}
			setLoading(false)
		}
		load()
	}, [id, fetchCompaign])

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
			id="compaignEdit"
			className="space-y-6"
		>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Title *</p>
				<input name="title" required type="text" value={formData?.title} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter title" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Content *</p>
				<input name="content" required type="text" value={formData?.content} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter content" />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Status *</p>
				<select onChange={handleChange} defaultValue={formData?.is_active} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="is_active" id="is_active">
					<option value="">--Select Status</option>
					<option value={true}>Active</option>
					<option value={false}>InActive</option>
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">Company Id *</p>
				<select onChange={handleChange} defaultValue={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--Select Company</option>
					{companies.map((company) => (
						<option key={company.id} value={company.id}>
							{company.title}
						</option>
					))}
				</select>
			</label>
		</form>
	)
}

export const DeleteCompaignModal = ({ id, closeModal, handleDelete }) => {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-center space-y-4"
			id="compaignDelete"
		>
			<p className="my-5">Are you sure? This action cannot be undone.</p>
		</form>
	)
}

export const CompaignsModal = (closeModal, openModal, fetchCompaign, handleCreate, handleUpdate, handleDelete) => {
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'compaignCreate',
			title: 'Create Compaign',
			btnTitle: 'Create',
			content: <CreateCompaignModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'compaignEdit',
			title: 'Update Compaign',
			btnTitle: 'Update',
			content: <EditCompaignModal id={id} closeModal={closeModal} fetchCompaign={fetchCompaign} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'compaignDelete',
			title: 'Delete Compaign',
			btnTitle: 'Delete',
			content: <DeleteCompaignModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}