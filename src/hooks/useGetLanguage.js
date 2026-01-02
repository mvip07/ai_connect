import { useEffect, useMemo, useState } from 'react'
import { LANG_STORAGE_KEY, AVAILABLE_LANGS } from '../constants/lang'

export const useGetLanguages = () => {
    const [lang, setLangState] = useState('UZ')
    const [languages, setLanguages] = useState([])

    useEffect(() => {
        const storedLang = localStorage.getItem(LANG_STORAGE_KEY)

        if (AVAILABLE_LANGS.includes(storedLang)) {
            setLangState(storedLang)
        } else {
            localStorage.setItem(LANG_STORAGE_KEY, 'UZ')
            setLangState('UZ')
        }
    }, [])

    const setLang = (newLang) => {
        if (!AVAILABLE_LANGS.includes(newLang)) return
        localStorage.setItem(LANG_STORAGE_KEY, newLang)
        setLangState(newLang)
    }

    const dictionary = useMemo(() => {
        const map = {}
        languages.forEach(item => {
            if (item.lang === lang) {
                map[item.code] = item.message
            }
        })
        return map
    }, [languages, lang])

    const t = (code) => {
        return dictionary[code] || code
    }

    return {
        lang,
        setLang,
        setLanguages,
        t,
    }
}
