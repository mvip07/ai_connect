import { useEffect, useState } from 'react'
import { useCompanies } from '../hooks/useCompanies'
import { FileUploader } from './UI/UploadImageFirebase'
import { getUserFromStorage } from '../lib/helpers/userStore'
import { useLanguageContext } from '../context/Language'

export const CreateUserModal = ({ closeModal, handleCreate }) => {
	const { t } = useLanguageContext()
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
				<p className="text-secondary text-sm font-medium pb-2">{t("FULL_NAME")} *</p>
				<input name="full_name" required type="text" value={formData.full_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('FULL_NAME')} ${t('ENTER')}`} />
			</label>
			<label key="username" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t("USERNAME")} *</p>
				<input name="username" required type="text" value={formData.username} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('USERNAME')} ${t('ENTER')}`} />
			</label>
			<label key="phone_number" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PHONE_NUMBER')} *</p>
				<input name="phone_number" required type="phone_number" value={formData.phone_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('PHONE_NUMBER')} ${t('ENTER')}`} />
			</label>
			<label key="password" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PASSWORD')} *</p>
				<input name="password" required type="password" value={formData.password} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('PASSWORD')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('ROLE')} *</p>
				<select onChange={handleChange} value={formData?.role} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="role" id="role">
					<option value="">--{t('SELECT_ROLE')}--</option>
					{getUserFromStorage()?.user?.role === 'SUPERADMIN'
						? ['SUPERADMIN', 'ADMIN', 'MANAGER', 'OPERATOR'].map((role) => (
							<option key={Math.random()} value={role}>
								{role}
							</option>
						))
						: ['MANAGER', 'OPERATOR'].map((role) => (
							<option key={Math.random()} value={role}>
								{role}
							</option>
						))}
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
			<div className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PROFILE_PICTURE')} *</p>
				<FileUploader folder="users" type="image" fileUrl={formData.pic_path} onChange={(url) => setFormData({ ...formData, pic_path: url })} />
			</div>
		</form>
	)
}

export const EditUserModal = ({ id, closeModal, fetchUser, handleUpdate }) => {
	const { t } = useLanguageContext()
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

	if (loading) return <div className="text-center">{t('LOADING')}...</div>

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
				<p className="text-secondary text-sm font-medium pb-2">{t('FULL_NAME')} *</p>
				<input name="full_name" type="text" value={formData.full_name} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('FULL_NAME')} ${t('ENTER')}`} />
			</label>
			<label key="username" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('USERNAME')} *</p>
				<input name="username" type="text" value={formData.username} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('USERNAME')} ${t('ENTER')}`} />
			</label>
			<label key="phone_number" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PHONE_NUMBER')} *</p>
				<input name="phone_number" type="phone_number" value={formData.phone_number} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('PHONE_NUMBER')} ${t('ENTER')}`} />
			</label>
			<label key="password" className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PASSWORD')} *</p>
				<input name="password" type="password" value={formData.password} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('PASSWORD')} ${t('ENTER')}`} />
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('ROLE')} *</p>
				<select onChange={handleChange} value={formData?.role} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="role" id="role">
					<option value="">--{t('SELECT_ROLE')}--</option>
					{getUserFromStorage()?.user?.role === 'SUPERADMIN'
						? ['SUPERADMIN', 'ADMIN', 'MANAGER', 'OPERATOR'].map((role) => (
							<option key={Math.random()} value={role}>
								{role}
							</option>
						))
						: ['MANAGER', 'OPERATOR'].map((role) => (
							<option key={Math.random()} value={role}>
								{role}
							</option>
						))}
				</select>
			</label>
			<label className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('STATUS')} *</p>
				<select onChange={handleChange} value={formData?.is_active} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="is_active" id="is_active">
					<option value="">--{t('SELECT_STATUS')}--</option>
					<option value={true}>{t('ACTIVE')}</option>
					<option value={false}>{t('INACTIVE')}</option>
				</select>
			</label>
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
			<div className="flex flex-col min-w-40 flex-1">
				<p className="text-secondary text-sm font-medium pb-2">{t('PROFILE_PICTURE')} *</p>
				<FileUploader folder="users" type="image" fileUrl={formData.pic_path} onChange={(url) => setFormData({ ...formData, pic_path: url })} />
			</div>
		</form>
	)
}

export const DeleteUserModal = ({ id, closeModal, handleDelete }) => {
	const { t } = useLanguageContext()
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-ct('ENTER') space-y-4"
			id="userDelete"
		>
			<p className="my-5">{t('CONFIRM_DELETE')}</p>
		</form>
	)
}

export const UsersModal = (closeModal, openModal, fetchUser, handleCreate, handleUpdate, handleDelete) => {
	const { t } = useLanguageContext()
	const handleOpenCreate = () => {
		openModal({
			type: 'CREATE',
			formId: 'userCreate',
			title: t('CREATE_USER'),
			btnTitle: t('CREATE'),
			content: <CreateUserModal closeModal={closeModal} handleCreate={handleCreate} />,
		})
	}

	const handleOpenUpdate = (id) => {
		openModal({
			type: 'UPDATE',
			formId: 'userEdit',
			title: t('UPDATE_USER'),
			btnTitle: t('UPDATE'),
			content: <EditUserModal id={id} closeModal={closeModal} fetchUser={fetchUser} handleUpdate={handleUpdate} />,
		})
	}

	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'userDelete',
			title: t('DELETE_USER'),
			btnTitle: t('DELETE'),
			content: <DeleteUserModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
