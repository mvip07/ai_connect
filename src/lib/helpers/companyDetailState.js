export const getOpenedSection = () => {
	return localStorage.getItem('openedSection') || null
}

export const setOpenedSection = (section) => {
	localStorage.setItem('openedSection', section)
}

export const resetOpenedSection = () => {
	localStorage.removeItem('openedSection')
}
