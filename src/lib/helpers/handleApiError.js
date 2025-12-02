import { toast } from 'react-toastify'
export const handleApiError = (err, message) => {
	if (err) {
		toast.error(err?.response?.data?.message || message || 'Xatolik yuz berdi!')
	} else {
		toast.error(message || 'Xatolik yuz berdi!')
	}
}
