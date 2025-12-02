'use client'
import { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
	const [modal, setModal] = useState(null)
	const openModal = (config) => setModal(config)
	const closeModal = () => setModal(null)
	return (
		<ModalContext.Provider value={{ openModal, closeModal }}>
			{children}
			{modal && <Modal {...modal} closeModal={closeModal} />}
		</ModalContext.Provider>
	)
}

export const useModal = () => useContext(ModalContext)

const Modal = ({ type, formId, title, btnTitle, content, closeModal }) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
			<div className="relative w-full max-w-md h-auto max-h-[500px] overflow-auto scroll-none  rounded-xl bg-white p-8 shadow-2xl shadow-blue-500/10">
				<button onClick={closeModal} className="absolute top-4 right-4 text-[#555b68] hover:text-[#1d1f23] transition-colors">
					<span className="material-symbols-outlined">close</span>
				</button>
				<div className="w-16 h-16 bg-[#0a85ff]/10 rounded-full mx-auto flex items-center justify-center">
					<span className="material-symbols-outlined text-4xl text-[#0a85ff]">hub</span>
				</div>
				<div className="mt-4">
					<h2 className="text-center text-[#1d1f23] text-2xl font-bold leading-tight">{title}</h2>
					{content}
				</div>
				<div className="mt-8 flex  gap-3">
					<button onClick={closeModal} className="w-full inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-bold text-[#555b68] border border-[#e0e8f4] shadow-sm shadow-blue-500/5 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2">
						Cancel
					</button>
					<button type="submit" form={formId} className={`w-full inline-flex items-center justify-center rounded-lg  px-6 py-3 text-base font-bold text-white shadow-lg shadow-[#0a85ff]/20 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0a85ff] focus:ring-offset-2 ${type === 'CREATE' || type === 'UPDATE' ? 'bg-[#0a85ff]' : 'bg-[#f25050]'}`}>
						{btnTitle}
					</button>
				</div>
			</div>
		</div>
	)
}
