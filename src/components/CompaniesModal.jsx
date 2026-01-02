import { useEffect, useState } from 'react'
import { FileUploader } from './UI/UploadImageFirebase'
import { useLanguageContext } from '../context/Language'

export const CreateCompanyModal = ({ closeModal, handleCreate }) => {
	const { t } = useLanguageContext()
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		contact_email: '',
		contact_number: '',
		address: '',
		instagram_token: '',
		instagram_id: '',
		openai_token: '',
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
			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('TITLE')} *</p>
				<input name="title" required value={formData.title} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200  dark:border-white/20 bg-background-light dark:bg-background-dark ext-secondary p-[15px]" placeholder={`${t('TITLE')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('DESCRIPTION')} *</p>
				<input name="description" required value={formData.description} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('DESCRIPTION')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTACT_EMAIL')} *</p>
				<input type="email" name="contact_email" required value={formData.contact_email} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTACT_EMAIL')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTACT_NUMBER')} *</p>
				<input name="contact_number" required value={formData.contact_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTACT_NUMBER')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('ADDRESS')} *</p>
				<input name="address" required value={formData.address} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('ADDRESS')} ${t('ENTER')}`}/>
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('INSTAGRAM_TOKEN')} *</p>
				<input name="instagram_token" required value={formData.instagram_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('INSTAGRAM_TOKEN')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('INSTAGRAM_ID')} *</p>
				<input name="instagram_verify_token" required value={formData.instagram_id} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('INSTAGRAM_ID')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('OPENAI_TOKEN')} *</p>
				<input name="openai_token" required value={formData.openai_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('OPENAI_TOKEN')} ${t('ENTER')}`} />
			</label>

			<div className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('LOGO_PATH')}</p>
				<FileUploader folder="companies" type="image" fileUrl={formData.logo_path} onChange={(url) => setFormData({ ...formData, logo_path: url })} />
			</div>
		</form>
	)
}

export const EditCompanyModal = ({ id, closeModal, fetchCompany, handleUpdate }) => {
	const { t } = useLanguageContext()
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

	if (loading) return <div className="text-center">{t('LOADING')}...</div>

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
				<p className="text-secondary text-sm font-medium pb-2">{t('TITLE')} *</p>
				<input name="title" required value={formData.title} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200  dark:border-white/20 bg-background-light dark:bg-background-dark ext-secondary p-[15px]" placeholder={`${t('TITLE')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('DESCRIPTION')} *</p>
				<input name="description" required value={formData.description} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('DESCRIPTION')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTACT_EMAIL')} *</p>
				<input type="email" name="contact_email" required value={formData.contact_email} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTACT_EMAIL')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('CONTACT_NUMBER')} *</p>
				<input name="contact_number" required value={formData.contact_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CONTACT_NUMBER')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('ADDRESS')} *</p>
				<input name="address" required value={formData.address} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('ADDRESS')} ${t('ENTER')}`}/>
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('INSTAGRAM_TOKEN')} *</p>
				<input name="instagram_token" required value={formData.instagram_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('INSTAGRAM_TOKEN')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('INSTAGRAM_ID')} *</p>
				<input name="instagram_verify_token" required value={formData.instagram_id} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('INSTAGRAM_ID')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('OPENAI_TOKEN')} *</p>
				<input name="openai_token" required value={formData.openai_token} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200" placeholder={`${t('OPENAI_TOKEN')} ${t('ENTER')}`} />
			</label>

			<label className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('STATUS')} *</p>
				<select name="is_active" required value={formData.is_active ? 'true' : 'false'} onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark">
					<option value="">{t('SELECT_STATUS')}</option>
					<option value="true">{t('ACTIVE')}</option>
					<option value="false">{t('INACTIVE')}</option>
				</select>
			</label>

			<div className="flex flex-col">
				<p className="text-secondary text-sm font-medium pb-2">{t('LOGO_PATH')} *</p>
				<FileUploader folder="companies" type="image" fileUrl={formData.logo_path} onChange={(url) => setFormData({ ...formData, logo_path: url })} />
			</div>
		</form>
	)
}

export const DeleteCompanyModal = ({ id, closeModal, handleDelete }) => {
	const {t} = useLanguageContext()
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
			<p className="my-5">{t('CONFIRM_DELETE')}</p>
		</form>
	)
}

export const CompaniesModal = (closeModal, openModal, fetchCompany, handleCreate, handleUpdate, handleDelete) => {
	const {t} = useLanguageContext()
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'companyCreate',
			title: t('CREATE_COMPANY'),
			btnTitle: t('CREATE'),
			content: <CreateCompanyModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'companyEdit',
			title: t('UPDATE_COMPANY'),
			btnTitle: t('UPDATE'),
			content: <EditCompanyModal id={id} closeModal={closeModal} fetchCompany={fetchCompany} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'companyDelete',
			title: t('DELETE_COMPANY'),
			btnTitle: t('DELETE'),
			content: <DeleteCompanyModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
