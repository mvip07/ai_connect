import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAiConfigs } from '../../hooks/useAiConfig'
import { useModal } from '../../components/UI/Modal'
import MainLayout from '../../components/layout/MainLayout'
import { AiConfigsModal } from '../../components/AIConfigsModal'
import { getUserFromStorage } from '../../lib/helpers/userStore'

export default function AiConfigDetail({ companyIdProps }) {
    const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
    const { detailId } = useParams()
    const { closeModal, openModal } = useModal()
    const [config, setConfig] = useState({})

    const { fetchAiConfig, handleCreate, handleUpdate, handleDelete } = useAiConfigs(companyId)
    const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = AiConfigsModal(closeModal, openModal, fetchAiConfig, handleCreate, handleUpdate, handleDelete)

    useEffect(() => {
        const load = async () => {
            const res = await fetchAiConfig(detailId)
            setConfig(res)
        }
        load()
    }, [detailId, fetchAiConfig])

    return (
        <MainLayout>
            <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
                <div className="flex flex-col gap-1">
                    <p className="text-secondary text-3xl font-bold leading-tight tracking-tight">AI Config Detail</p>
                    <p className="text-secondary/60 text-base font-normal leading-normal">Review and manage company AI configurations.</p>
                </div>
                <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
                    <span className="material-symbols-outlined">add</span>
                    <span className="truncate">Add AI Config</span>
                </button>
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Template Name</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Use OpenAI</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Template Text</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Language</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border-color last:border-b-0 hover:bg-gray-50/50 cursor-pointer">
                                <td className="px-4 py-3 text-sm text-text-secondary">{config?.template_name}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config?.use_openai ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{config?.use_openai ? 'Yes' : 'No'}</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary max-w-xs">{config?.template_text}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{config?.created_at}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-3 text-secondary/60">
                                        <button onClick={() => handleOpenUpdate(config?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                            <span className="material-symbols-outlined text-xl">edit</span>
                                        </button>
                                        <button onClick={() => handleOpenDelete(config?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                            <span className="material-symbols-outlined text-xl">delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}