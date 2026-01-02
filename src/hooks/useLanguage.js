import { useState, useCallback, useEffect } from 'react'
import { notify } from '../lib/toastify'
import { languageService } from '../services/languages.service'
import { handleApiError } from '../lib/helpers/handleApiError'
import { getUserFromStorage } from '../lib/helpers/userStore'

export const useLanguages = () => {
    const [loading, setLoading] = useState(false)
    const [lang, setLang] = useState([])
    const fetchLangs = useCallback(async () => {
        setLoading(true)
        try {
            const data = await languageService.getAll()
            setLang(data)
        } catch (err) {
            handleApiError(err, 'Languages yuklashda xatolik!')
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchLang = useCallback(async (id) => {
        setLoading(true)
        try {
            return await languageService.getById(id)
        } catch (err) {
            handleApiError(err, "Language ma'lumotini yuklashda xatolik!")
        } finally {
            setLoading(false)
        }
    }, [])

    const handleCreate = useCallback(async (config) => {
        setLoading(true)
        try {
            console.log("config", config)
            await languageService.create(config)
            fetchLangs()
            notify('success', 'Language yaratildi!')
        } catch (err) {
            handleApiError(err, 'Language yaratishda xatolik!')
        } finally {
            setLoading(false)
        }
    }, [fetchLangs])

    const handleUpdate = useCallback(async (id, config) => {
        if (!id || !config) return
        setLoading(true)
        try {
            await languageService.update(id, config)
            fetchLangs()
            notify('success', 'Language yangilandi!')
        } catch (err) {
            handleApiError(err, 'Language yangilashda xatolik!')
        } finally {
            setLoading(false)
        }
    }, [fetchLangs])

    const handleDelete = useCallback(async (id) => {
        setLoading(true)
        try {
            await languageService.delete(id)
            fetchLangs()
            notify('success', "Language o'chirildi!")
        } catch (err) {
            handleApiError(err, "Language o'chirishda xatolik!")
        } finally {
            setLoading(false)
        }
    }, [fetchLangs])

    useEffect(() => {
        fetchLangs()
    }, [fetchLangs])

    return {
        loading,
        lang,
        fetchLang,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchLangs,
    }
}
