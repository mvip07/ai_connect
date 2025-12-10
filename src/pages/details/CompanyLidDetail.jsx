import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCompanyLids } from '../../hooks/useCompanyLids'
import { useModal } from '../../components/UI/Modal'
import MainLayout from '../../components/layout/MainLayout'
import { CompanyLidsModal } from '../../components/CompanyLidsModal'
import { getUserFromStorage } from '../../lib/helpers/userStore'

export default function CompanyLidDetail({ companyIdProps }) {
    const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
    const { detailId } = useParams()
    const { closeModal, openModal } = useModal()
    const [lid, setLid] = useState({})

    const { fetchCompanyLid, handleUpdate } = useCompanyLids(companyId)
    const { handleOpenUpdate } = CompanyLidsModal(closeModal, openModal, fetchCompanyLid, handleUpdate)

    useEffect(() => {
        const load = async () => {
            const res = await fetchCompanyLid(detailId)
            setLid(res)
        }
        load()
    }, [detailId, fetchCompanyLid])

    return (
        <MainLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary text-3xl font-bold leading-tight">Company Lid Detail</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">Review and manage company lid.</p>
                </div>
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Username</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Full Name</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Phone Number</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">When Call</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Interest</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Status</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Created At</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={lid?.id} className="border-b border-border-color hover:bg-gray-50/50 cursor-pointer last:border-b-0">
                                <td className="px-4 py-4 text-sm font-medium text-secondary">{lid?.username}</td>
                                <td className="px-4 py-4 text-sm text-text-secondary">{lid?.full_name}</td>
                                <td className="px-4 py-4 text-sm text-text-secondary">{lid?.phone_number}</td>
                                <td className="px-4 py-4 text-sm text-text-secondary">{lid?.when_call}</td>
                                <td className="px-4 py-4 text-sm text-text-secondary">{lid?.interset}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${lid?.status ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                        {lid?.status ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-sm text-text-secondary">{lid?.created_at ? new Date(lid.created_at).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-4 text-right flex items-center justify-end gap-3">
                                    <button onClick={() => handleOpenUpdate(lid?.id)} className="p-2 text-text-secondary hover:text-secondary">
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    )
}