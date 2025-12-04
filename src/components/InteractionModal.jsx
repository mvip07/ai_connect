export const DeleteInteractionLogModal = ({ id, closeModal, handleDelete }) => {
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault()
				await handleDelete(id)
				closeModal()
			}}
			className="text-center space-y-4"
			id="interactionLogDelete"
		>
			<p className="my-5">Are you sure? This action cannot be undone.</p>
		</form>
	)
}

export const InteractionLogsModal = (closeModal, openModal, handleDelete) => {
	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'interactionLogDelete',
			title: 'Delete Interaction Log',
			btnTitle: 'Delete',
			content: <DeleteInteractionLogModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenDelete }
}