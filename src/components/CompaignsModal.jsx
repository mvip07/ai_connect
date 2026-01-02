import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'
import { useLanguageContext } from '../context/Language'

export const CreateCompaignModal = ({ closeModal, handleCreate }) => {
	const { t } = useLanguageContext()
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
				<p className="text-secondary text-sm font-medium pb-2">{t('TITLE')} *</p>
				<input name="title" required type="text" value={formData['title']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TITLE')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTENT')} *</p>
				<input name="content" required type="text" value={formData['content']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTENT')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('COMPANY_ID')} *</p>
				<select onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--{t('SELECT_COMPANY')}--</option>
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
	const { t } = useLanguageContext()
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

	if (loading) return <div className="text-center">{t('LOADING')}...</div>

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
				<p className="text-secondary text-sm font-medium pb-2">{t('TITLE')} *</p>
				<input name="title" required type="text" value={formData['title']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TITLE')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTENT')} *</p>
				<input name="content" required type="text" value={formData['content']} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTENT')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('STATUS')} *</p>
				<select onChange={handleChange} defaultValue={formData?.is_active} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="is_active" id="is_active">
					<option value="">{t('SELECT_STATUS')}</option>
					<option value="true">{t('ACTIVE')}</option>
					<option value="false">{t('INACTIVE')}</option>
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('COMPANY_ID')} *</p>
				<select onChange={handleChange} defaultValue={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
					<option value="">--{t('SELECT_COMPANY')}--</option>
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
	const { t } = useLanguageContext()
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
			<p className="my-5">{t('CONFIRM_DELETE')}</p>
		</form>
	)
}

export const CompaignsModal = (closeModal, openModal, fetchCompaign, handleCreate, handleUpdate, handleDelete) => {
	const { t } = useLanguageContext()
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'compaignCreate',
			title: t('CREATE_CAMPAIGN'),
			btnTitle: t('CREATE'),
			content: <CreateCompaignModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'compaignEdit',
			title: t('UPDATE_CAMPAIGN'),
			btnTitle: t('UPDATE'),
			content: <EditCompaignModal id={id} closeModal={closeModal} fetchCompaign={fetchCompaign} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'compaignDelete',
			title: t('DELETE_CAMPAIGN'),
			btnTitle: t('DELETE'),
			content: <DeleteCompaignModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}