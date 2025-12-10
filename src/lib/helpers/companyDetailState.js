import { useNavigate, useParams } from "react-router-dom"

export const getOpenedSection = () => {
	return localStorage.getItem('openedSection') || null
}

export const setOpenedSection = (section) => {
	localStorage.setItem('openedSection', section)
}

