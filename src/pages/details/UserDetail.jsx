import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUsers } from '../../hooks/useUsers'
import { useModal } from '../../components/UI/Modal'
import MainLayout from '../../components/layout/MainLayout'
import { UsersModal } from '../../components/UsersModal'
import { getUserFromStorage } from '../../lib/helpers/userStore'

export default function UserDetail({ companyIdProps }) {
    const companyId = companyIdProps || getUserFromStorage()?.user?.company_id
    const { detailId } = useParams()
    const { closeModal, openModal } = useModal()
    const [user, setUser] = useState({})

    const { fetchUser, handleCreate, handleUpdate, handleDelete } = useUsers(companyId)
    const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = UsersModal(closeModal, openModal, fetchUser, handleCreate, handleUpdate, handleDelete)

    useEffect(() => {
        const load = async () => {
            const res = await fetchUser(detailId)
            setUser(res)
        }
        load()
    }, [detailId, fetchUser])

    return (
        <MainLayout>
            <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
                <div className="flex flex-col gap-1">
                    <p className="text-secondary text-3xl font-bold leading-tight tracking-tight">User Detail</p>
                    <p className="text-secondary/60 text-base font-normal leading-normal">Review and manage user.</p>
                </div>
                <button onClick={handleOpenCreate} className="flex items-center justify-center gap-2 overflow-hidden rounded-DEFAULT h-11 px-5 bg-primary text-white text-sm font-medium leading-normal shadow-soft hover:shadow-md transition-shadow">
                    <span className="material-symbols-outlined">add</span>
                    <span className="truncate">Add New User</span>
                </button>
            </div>
            <div className="w-full rounded-lg bg-card p-6 shadow-soft-lg border border-border-color">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border-color">
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">User</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Phone Number</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Status</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Is Super Admin</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Role</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap">Date</th>
                                <th className="px-4 py-3 text-sm font-medium text-text-secondary text-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-border-color hover:bg-gray-50/50 cursor-pointer last:border-b-0">
                                <td className="px-4 py-3 text-sm text-text-secondary">
                                    <div className="flex items-center gap-3">
                                        <img className="size-10 rounded-full" src={user?.pic_path} />
                                        <div className="flex flex-col">
                                            <p className="font-semibold text-secondary">{user?.full_name}</p>
                                            <p className="text-sm text-secondary/60">@{user?.username}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">{user?.phone_number}</td>
                                <td className="px-4 py-3 text-sm text-text-secondary">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user?.is_active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user?.is_active ? 'Active' : 'InActive'}</span>
                                </td>
                                <td className="px-4 py-3 text-sm text-text-secondary">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user?.is_superadmin ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user?.is_superadmin ? 'SuperAdmin' : 'Not SuperAdmin'}</span>
                                </td>
                                <td className="px-4 py-3 text-sm font-medium text-secondary/80">{user?.role}</td>
                                <td className="px-4 py-3 text-sm text-secondary/60 text-nowrap">{user?.created_at}</td>
                                <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-3 text-secondary/60">
                                        {['SUPERADMIN', 'ADMIN'].includes(getUserFromStorage()?.user?.role) &&
                                            (getUserFromStorage()?.user?.id !== user?.id && (
                                                <>
                                                    <button onClick={() => handleOpenUpdate(user?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                                        <span className="material-symbols-outlined text-xl">edit</span>
                                                    </button>
                                                    <button onClick={() => handleOpenDelete(user?.id)} className="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
                                                        <span className="material-symbols-outlined text-xl">delete</span>
                                                    </button>
                                                </>
                                            ))}
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
