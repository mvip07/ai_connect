import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCampaigns } from '../../hooks/useCompaigns'
import { useModal } from '../../components/UI/Modal'
import MainLayout from '../../components/layout/MainLayout'
import { CompaignsModal } from '../../components/CompaignsModal'
import { getUserFromStorage } from '../../lib/helpers/userStore'
import { useLanguageContext } from '../../context/Language'

export default function CampaignDetail({ companyIdProps }) {
    const { t } = useLanguageContext()
    const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
    const { detailId } = useParams()
    const { closeModal, openModal } = useModal()
    const [campaign, setCampaign] = useState({})

    const { fetchCampaign, handleCreate, handleUpdate, handleDelete } = useCampaigns(companyId)
    const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = CompaignsModal(closeModal, openModal, fetchCampaign, handleCreate, handleUpdate, handleDelete)

    useEffect(() => {
        const load = async () => {
            const res = await fetchCampaign(detailId)
            setCampaign(res)
        }
        load()
    }, [detailId, fetchCampaign])

    return (
        <MainLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary text-3xl font-bold leading-tight">{t('CAMPAIGN_DETAIL')}</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">{t('CAMPAIGN_REVIEW')}</p>
                </div>
                {['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
                    <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
                        <span className="material-symbols-outlined">add</span>
                        <span className="truncate">{t('ADD_NEW_CAMPAIGN')}</span>
                    </button>
                )}
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">{t('CAMPAIGN_NAME')}</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">{t('STATUS')}</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">{t('CONTENT')}</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">{t('CREATED_AT')}</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">{t('ACTIONS')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={campaign?.id} className="border-b border-border-color hover:bg-gray-50/50 cursor-pointer last:border-b-0">
                                <td className="px-4 py-3 text-sm font-medium text-secondary text-nowrap">{campaign?.title}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">
                                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${campaign?.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{campaign?.is_active ? t('ACTIVE') : t('INACTIVE')}</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{campaign?.content}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{campaign?.created_at ? new Date(campaign.created_at).toLocaleDateString() : ''}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2 text-secondary/60">
                                        {['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && (
                                            <>
                                                <button onClick={() => handleOpenUpdate(campaign?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </button>
                                                <button onClick={() => handleOpenDelete(campaign?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </>
                                        )}
                                        {!['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) && t("NO_ACTION")}
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