import { useEffect, useState } from 'react'

export const EditCompanyLidModal = ({ id, closeModal, fetchCompanyLid, handleUpdate }) => {
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            setLoading(true)
            const data = await fetchCompanyLid(id)
            if (data) {
                setFormData(data)
            }
            setLoading(false)
        }
        load()
    }, [id, fetchCompanyLid])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (loading) return <div className="text-center">Loading...</div>

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault()
                await handleUpdate(id, { status: formData.status })
                closeModal()
            }}
            id="companyLidEdit"
            className="space-y-6"
        >
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">Status *</p>
                <select onChange={handleChange} value={formData?.status} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary " name="status" id="status">
                    <option value="">--Select Status</option>
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="INTERESTED">INTERESTED</option>
                    <option value="CONVERTED">CONVERTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="NO_ANSWER">NO_ANSWER</option>
                    <option value="CALL_BACK">CALL_BACK</option>
                    <option value="INVALID">INVALID</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                </select>
            </label>
            <label className="flex flex-col min-w-40 flex-1">
                <p className="text-secondary text-sm font-medium pb-2">Message </p>
                <input name="message" value={formData.message} onChange={handleChange} className="form-input h-12 rounded-lg border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark text-secondary p-[15px]" placeholder="Enter message" />
            </label>
        </form>
    )
}

export const CompanyLidsModal = (closeModal, openModal, fetchCompanyLid, handleUpdate) => {
    const handleOpenUpdate = (id) => {
        openModal({
            type: 'UPDATE',
            formId: 'companyLidEdit',
            title: 'Update Company Lid',
            btnTitle: 'Update',
            content: <EditCompanyLidModal id={id} closeModal={closeModal} fetchCompanyLid={fetchCompanyLid} handleUpdate={handleUpdate} />,
        })
    }

    return { handleOpenUpdate }
}