import { createContext, useContext } from 'react'
import { useGetLanguages } from '../hooks/useGetLanguage'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const languageValues = useGetLanguages()

  return (
    <LanguageContext.Provider value={languageValues}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguageContext = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within LanguageProvider')
  }
  return context
}
