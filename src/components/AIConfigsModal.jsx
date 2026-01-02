import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { useLanguageContext } from '../context/Language'

export const CreateAiConfigModal = ({ closeModal, handleCreate }) => {
	const { t } = useLanguageContext()
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
					<p className="text-secondary text-sm font-medium pb-2">{t('COMPANY_ID')} *</p>
					<select onChange={handleChange} value={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
						<option value="">--{t('SELECT_COMPANY')}--</option>
						{companies.map((company) => (
							<option key={company.id} value={company.id}>
								{company.title}
							</option>
						))}
					</select>
				</label>
			)}
			<label key="template_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('TEMPLATE_NAME')} *</p>
				<input name="template_name" required type="text" value={formData.template_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TEMPLATE_NAME')} ${t('ENTER')}`} />
			</label>
			<label key="template_text" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('TEMPLATE_TEXT')} *</p>
				<textarea name="template_text" required value={formData.template_text} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TEMPLATE_TEXT')} ${t('ENTER')}`} />
			</label>
			<label key="use_openai" className="flex items-center gap-2">
				<input name="use_openai" type="checkbox" checked={formData.use_openai} onChange={handleChange} className="form-checkbox" />
				<p className="text-secondary text-sm font-medium">{t('USE_OPENAI')}</p>
			</label>
		</form>
	)
}

export const EditAiConfigModal = ({ id, closeModal, fetchAiConfig, handleUpdate }) => {
	const { t } = useLanguageContext()
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

	if (loading) return <div className="text-center">{t('LOADING')}...</div>

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
					<p className="text-secondary text-sm font-medium pb-2">{t('COMPANY_ID')} *</p>
					<select onChange={handleChange} value={formData?.company_id} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="company_id" id="company_id">
						<option value="">--{t('SELECT_COMPANY')}--</option>
						{companies.map((company) => (
							<option key={company.id} value={company.id}>
								{company.title}
							</option>
						))}
					</select>
				</label>
			)}
			<label key="template_name" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('TEMPLATE_NAME')} *</p>
				<input name="template_name" required type="text" value={formData.template_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TEMPLATE_NAME')} ${t('ENTER')}`} />
			</label>
			<label key="template_text" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('TEMPLATE_TEXT')} *</p>
				<textarea name="template_text" required value={formData.template_text} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('TEMPLATE_TEXT')} ${t('ENTER')}`} />
			</label>
			<label key="use_openai" className="flex items-center gap-2">
				<input name="use_openai" type="checkbox" checked={formData.use_openai} onChange={handleChange} className="form-checkbox" />
				<p className="text-secondary text-sm font-medium">{t('USE_OPENAI')}</p>
			</label>
		</form>
	)
}

export const DeleteAiConfigModal = ({ id, closeModal, handleDelete }) => {
	const { t } = useLanguageContext()
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
			<p className="my-5">{t('CONFIRM_DELETE')}</p>
		</form>
	)
}

export const AiConfigsModal = (closeModal, openModal, fetchAiConfig, handleCreate, handleUpdate, handleDelete) => {
	const { t } = useLanguageContext()
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'aiConfigCreate',
			title: t('CREATE_AI_CONFIG'),
			btnTitle: t('CREATE'),
			content: <CreateAiConfigModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'aiConfigEdit',
			title: t('UPDATE_AI_CONFIG'),
			btnTitle: t('UPDATE'),
			content: <EditAiConfigModal id={id} closeModal={closeModal} fetchAiConfig={fetchAiConfig} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'aiConfigDelete',
			title: t('DELETE_AI_CONFIG'),
			btnTitle: t("DELETE"),
			content: <DeleteAiConfigModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
