import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { useCompanies } from '../hooks/useCompanies'
import { useLanguageContext } from '../context/Language'

export default function CompanyInfo({ companyIdProps }) {
    const {t} = useLanguageContext()
    const { fetchCompany } = useCompanies()
    const [company, setCompany] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadCompany = async () => {
            setLoading(true)
            const data = await fetchCompany(companyIdProps)
            if (data) {
                setCompany(data)
            }
            setLoading(false)
        }
        loadCompany()
    }, [companyIdProps, fetchCompany])

    if (loading) {
        return <div>{t('LOADING')}...</div>
    }

    if (!company) {
        return <div>Company not found</div>
    }

    return (
        <MainLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary text-3xl font-bold leading-tight">{t('COMPANY_DETAILS')}</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">{t('VIEW_COMPANY_INFO')}</p>
                </div>
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img className="w-20 h-20 rounded-full object-cover" src={company.logo_path} alt="Company Logo" />
                        <div>
                            <h2 className="text-2xl font-bold text-secondary">{company.title}</h2>
                            <p className="text-text-secondary">{company.description}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                            <p className="font-semibold">{t('CONTACT_NUMBER')}:</p>
                            <p>{company.contact_number}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('CONTACT_EMAIL')}:</p>
                            <p>{company.contact_email}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('ADDRESS')}:</p>
                            <p>{company.address}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('INSTAGRAM_TOKEN')}:</p>
                            <p className="overflow-auto">{company.instagram_token}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('OPENAI_TOKEN')}:</p>
                            <p className="overflow-auto">{company.openai_token}</p>
                        </div>
                        <div>
                            <p className="font-semibold">{t('STATUS')}:</p>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${company.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                {company.is_active ? t('ACTIVE') : t('INACTIVE')}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold">{t('CREATED_AT')}:</p>
                            <p>{new Date(company.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}