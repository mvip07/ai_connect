import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInteractionLogs } from '../../hooks/useInteractionLogs'
import { useModal } from '../../components/UI/Modal'
import MainLayout from '../../components/layout/MainLayout'
import { InteractionLogsModal } from '../../components/InteractionModal'
import { getUserFromStorage } from '../../lib/helpers/userStore'

export default function InteractionLogDetail({ companyIdProps }) {
    const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
    const { detailId } = useParams()
    const { closeModal, openModal } = useModal()
    const [log, setLog] = useState({})

    const { fetchInteractionLog, handleDelete } = useInteractionLogs(companyId) // Assuming you add fetchInteractionLog to the hook
    const { handleOpenDelete } = InteractionLogsModal(closeModal, openModal, handleDelete)

    useEffect(() => {
        const load = async () => {
            const res = await fetchInteractionLog(detailId) // Assume this method is added to fetch single log
            setLog(res)
        }
        load()
    }, [detailId])

    return (
        <MainLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary text-3xl font-bold leading-tight">Interaction Log Detail</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">Review interaction log.</p>
                </div>
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">User Instagram ID</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Username</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Interaction Type</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Message</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">AI Response</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Created At</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={log?.id} className="px-4 py-4 border-b last:border-b-0 border-border-color hover:bg-gray-50/50 cursor-pointer ">
                                <td className="px-4 py-3 text-sm text-text-secondary">{log?.user_instagram_id}</td>
                                <td className="px-4 py-3 text-sm font-medium text-secondary text-nowrap">{log?.username}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{log?.interaction_type}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{log?.message}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{log?.ai_response}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{log?.created_at ? new Date(log.created_at).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        {getUserFromStorage()?.user?.role === 'SUPERADMIN' && (
                                            <button onClick={() => handleOpenDelete(log?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        )}
                                        {getUserFromStorage()?.user?.role !== 'SUPERADMIN' && 'No Action'}
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