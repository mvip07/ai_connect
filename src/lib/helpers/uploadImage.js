import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'

export const uploadFileToFirebase = (file, folder, onProgress) => {
	return new Promise((resolve, reject) => {
		const fileExt = file.name.split('.').pop()
		const filePath = `/ai_connect/${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
		const fileRef = ref(storage, filePath)

		const uploadTask = uploadBytesResumable(fileRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				onProgress?.(Math.round(progress))
			},
			(error) => reject(error),
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
				resolve(downloadURL)
			}
		)
	})
}
