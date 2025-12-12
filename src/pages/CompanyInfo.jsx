import { useEffect, useState } from 'react'
import MainLayout from '../components/layout/MainLayout'
import { useCompanies } from '../hooks/useCompanies'

export default function CompanyInfo({ companyIdProps }) {
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
        return <div>Loading...</div>
    }

    if (!company) {
        return <div>Company not found</div>
    }

    return (
        <MainLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-2">
                    <p className="text-secondary text-3xl font-bold leading-tight">Company Details</p>
                    <p className="text-text-secondary text-base font-normal leading-normal">View company information.</p>
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
                            <p className="font-semibold">Contact Number:</p>
                            <p>{company.contact_number}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Contact Email:</p>
                            <p>{company.contact_email}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Address:</p>
                            <p>{company.address}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Instagram Token:</p>
                            <p className="overflow-auto">{company.instagram_token}</p>
                        </div>
                        <div>
                            <p className="font-semibold">OpenAI Token:</p>
                            <p className="overflow-auto">{company.openai_token}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Status:</p>
                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${company.is_active ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                                {company.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div>
                            <p className="font-semibold">Created At:</p>
                            <p>{new Date(company.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}