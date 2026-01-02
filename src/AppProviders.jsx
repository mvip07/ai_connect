import { LanguageProvider } from './context/Language'
import { ModalProvider } from './components/UI/Modal'
import { ToastContainer } from 'react-toastify'

const AppProviders = ({ children }) => {
    return (
        <LanguageProvider>
            <ToastContainer />
            <ModalProvider>
                {children}
            </ModalProvider>
        </LanguageProvider>
    )
}

export default AppProviders
