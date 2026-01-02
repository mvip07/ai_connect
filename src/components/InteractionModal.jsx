import { useLanguageContext } from "../context/Language"

export const DeleteInteractionLogModal = ({ id, closeModal, handleDelete }) => {
	const { t } = useLanguageContext()
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
			<p className="my-5">{t('CONFIRM_DELETE')}</p>
		</form>
	)
}

export const InteractionLogsModal = (closeModal, openModal, handleDelete) => {
	const {t} = useLanguageContext()
	const handleOpenDelete = (id) => {
		openModal({
			type: 'DELETE',
			formId: 'interactionLogDelete',
			title: t('DELETE_INTERACTION_LOG'),
			btnTitle: t('DELETE'),
			content: <DeleteInteractionLogModal id={id} closeModal={closeModal} handleDelete={handleDelete} />,
		})
	}

	return { handleOpenDelete }
}