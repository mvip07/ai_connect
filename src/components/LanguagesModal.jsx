import { useEffect, useState } from 'react'
import { useLanguageContext } from '../context/Language'

export const CreateLangModal = ({ closeModal, handleCreate }) => {
    const { t } = useLanguageContext()
    const [formData, setFormData] = useState({
        lang: '',
        code: '',
        message: '',
    })

    const handleChange = (e) => {
        const { name, value, } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await handleCreate(formData)
                closeModal()
            }}
            className="space-y-6"
            id="langCreate"
        >
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t("LANGUAGE")} *</p>
                <select onChange={handleChange} value={formData?.lang} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="lang" id="lang">
                    <option value="">--{t('SELECT_LANG')}--</option>
                    {["UZ", "EN", "RU"].map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </label>
            <label key="code" className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t("CODE")} *</p>
                <input name="code" required type="text" value={formData.code} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CODE')} ${t('ENTER')}`} />
            </label>
            <label key="message" className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t('MESSAGE')} *</p>
                <textarea name="message" required value={formData.message} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('MESSAGE')} ${t('ENTER')}`} />
            </label>
        </form>
    )
}

export const EditLangModal = ({ id, closeModal, fetchLang, handleUpdate }) => {
    const { t } = useLanguageContext()
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            const data = await fetchLang(id)

            if (data) {
                setFormData({
                    lang: data.lang || '',
                    code: data.code || '',
                    message: data.message || '',
                })
            }

            setLoading(false)
        }
        load()
    }, [id, fetchLang])

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
            id="langEdit"
            className="space-y-6"
        >
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t("LANGUAGE")} *</p>
                <select onChange={handleChange} value={formData?.lang} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="lang" id="lang">
                    <option value="">--{t('SELECT_LANG')}--</option>
                    {["UZ", "EN", "RU"].map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </label>
            <label key="code" className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t("CODE")} *</p>
                <input name="code" required type="text" value={formData.code} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('CODE')} ${t('ENTER')}`} />
            </label>
            <label key="message" className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">{t('MESSAGE')} *</p>
                <textarea name="message" required value={formData.message} onChange={handleChange} className="form-input h-24 rounded-lg border border-gray-200 dark:border-white/20  bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder={`${t('MESSAGE')} ${t('ENTER')}`} />
            </label>
        </form>
    )
}

export const DeleteLangModal = ({ id, closeModal, handleDelete }) => {
    const { t } = useLanguageContext()
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await handleDelete(id)
                closeModal()
            }}
            className="text-center space-y-4"
            id="langDelete"
        >
            <p className="my-5">{t('CONFIRM_DELETE')}</p>
        </form>
    )
}

export const LangsModal = (closeModal, openModal, fetchLang, handleCreate, handleUpdate, handleDelete) => {
    const { t } = useLanguageContext()
    const handleOpenCreate = () => {
        openModal({
            type: 'CREATE',
            formId: 'langCreate',
            title: t('CREATE_LANGUAGE'),
            btnTitle: t('CREATE'),
            content: <CreateLangModal closeModal={closeModal} handleCreate={handleCreate} />,
        })
    }

    const handleOpenUpdate = (id) => {
        openModal({
            type: 'UPDATE',
            formId: 'langEdit',
            title: t('UPDATE_LANGUAGE'),
            btnTitle: t('UPDATE'),
            content: <EditLangModal id={id} closeModal={closeModal} fetchLang={fetchLang} handleUpdate={handleUpdate} />,
        })
    }

    const handleOpenDelete = (id) => {
        openModal({
            type: 'DELETE',
            formId: 'langDelete',
            title: t('DELETE_LANGUAGE'),
            btnTitle: t('DELETE'),
            content: <DeleteLangModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
        })
    }

    return { handleOpenCreate, handleOpenUpdate, handleOpenDelete }
}
