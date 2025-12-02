import MainLayout from '../components/layout/MainLayout'
import { useModal } from '../components/UI/Modal'
import { UsersModal } from '../components/UsersModal'
import { useUsers } from '../hooks/useUsers'

export default function Users() {
	const { closeModal, openModal } = useModal()
	const { users, fetchUser, handleCreate, handleUpdate, handleDelete } = useUsers()
	const { handleOpenCreate, handleOpenUpdate, handleOpenDelete } = UsersModal(closeModal, openModal, fetchUser, handleCreate, handleUpdate, handleDelete)
	return (
		<MainLayout>
			<div class="flex flex-wrap justify-between gap-3 items-center mb-6">
				<div class="flex flex-col gap-1">
					<p class="text-secondary text-3xl font-bold leading-tight tracking-tight">User List</p>
					<p class="text-secondary/60 text-base font-normal leading-normal">Review and manage AI-powered conversations.</p>
				</div>
				<button onClick={handleOpenCreate} class="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-wide min-w-0 px-5 shadow-soft-button hover:bg-primary/90 transition-all">
					<span class="truncate">Add User</span>
				</button>
			</div>
			<div class="bg-white rounded-xl shadow-soft border border-border-light overflow-hidden">
				<div class="overflow-x-auto">
					<table class="w-full text-left">
						<thead class="bg-secondary/5">
							<tr>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap w-1/4">User</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap w-1/4">Phone Number</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap w-1/4">Company Id</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap">Status</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap">Is Super Admin</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap text-center">Role</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap">Date</th>
								<th class="p-4 text-xs font-semibold text-secondary/60 uppercase tracking-wider text-nowrap">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-border-light">
							{users &&
								users.map((user) => (
									<tr key={user.id} class="hover:bg-accent/20 transition-colors">
										<td class="p-5 align-top">
											<div class="flex items-center gap-3">
												<img class="size-10 rounded-full" src={user?.pic_path} />
												<div class="flex flex-col">
													<p class="font-semibold text-secondary">{user.full_name}</p>
													<p class="text-sm text-secondary/60">@{user.username}</p>
												</div>
											</div>
										</td>
										<td class="p-5 text-sm text-secondary/80 align-top">{user.phone_number}</td>
										<td class="p-5 text-sm text-secondary/80 align-top">{user.company_id}</td>
										<td class="p-5 align-top">
											<span class={`"inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_active ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user.is_active ? 'Active' : 'InActive'}</span>
										</td>
										<td class="p-5 align-top">
											<span class={`"inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${user.is_superadmin ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>{user.is_superadmin ? 'SuperAdmin' : 'Not SuperAdmin'}</span>
										</td>
										<td class="p-5 text-sm font-medium text-secondary/80 text-center align-top">{user.role}</td>
										<td class="p-5 text-sm text-secondary/60 align-top text-nowrap">{user.created_at}</td>
										<td class="p-5 align-top">
											<div class="flex items-center gap-2 text-secondary/60">
												<button onClick={() => handleOpenUpdate(user.id)} class="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
													<span class="material-symbols-outlined text-xl">edit</span>
												</button>
												<button onClick={() => handleOpenDelete(user.id)} class="p-1.5 size-10 rounded-md hover:bg-secondary/10 hover:text-secondary">
													<span class="material-symbols-outlined text-xl">delete</span>
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</MainLayout>
	)
}
