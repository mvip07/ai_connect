import { useRef, useState } from 'react'
import { FileText, ImagePlus, Loader2, Video } from 'lucide-react'
import { uploadFileToFirebase } from '../../lib/helpers/uploadImage'
import { notify } from '../../lib/toastify'

export const FileUploader = ({ fileUrl, folder, type = 'any', onChange }) => {
	const fileInputRef = useRef(null)
	const [uploading, setUploading] = useState(false)
	const [progress, setProgress] = useState(0)

	const handleFileUpload = async (file) => {
		try {
			setUploading(true)
			const url = await uploadFileToFirebase(file, folder, setProgress)
			console.log(url)
			onChange(url)
			notify('success', 'File uploaded successfully!')
		} catch {
			notify('error', 'Upload failed!')
		} finally {
			setUploading(false)
		}
	}

	const getFileAcceptType = () => {
		switch (type) {
			case 'image':
				return 'image/*'
			case 'pdf':
				return 'application/pdf'
			case 'video':
				return 'video/*'
			default:
				return '*/*'
		}
	}

	return (
		<div className="w-full flex flex-col items-center gap-3">
			{type === 'image' && fileUrl ? (
				<div className="relative w-full h-60 rounded-2xl overflow-hidden border border-gray-200 shadow">
					<img src={fileUrl} alt="Preview" width={100} height={100} className="w-full h-full object-cover" />
					<button onClick={() => fileInputRef.current?.click()} type="button" className="absolute inset-0 bg-black/40 text-white opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
						Change Image
					</button>
				</div>
			) : type === 'pdf' && fileUrl ? (
				<div className="w-full flex items-center justify-between border p-3 rounded-xl bg-gray-50">
					<div className="flex items-center gap-2">
						<FileText className="text-blue-600" />
						<a href={fileUrl} target="_blank" className="text-blue-600 underline text-sm" rel="noopener noreferrer">
							View PDF
						</a>
					</div>
					<button onClick={() => fileInputRef.current?.click()} type="button" className="text-sm text-gray-600 hover:text-blue-600">
						Change
					</button>
				</div>
			) : type === 'video' && fileUrl ? (
				<div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-200 shadow">
					<video src={fileUrl} controls className="w-full h-full object-cover" />
					<button onClick={() => fileInputRef.current?.click()} type="button" className="absolute inset-0 bg-black/40 text-white opacity-0 hover:opacity-100 flex items-center justify-center transition-all">
						Change Video
					</button>
				</div>
			) : (
				<div onClick={() => fileInputRef.current?.click()} className="w-full border-2 border-dashed border-gray-300 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
					{uploading ? (
						<div className="flex flex-col items-center">
							<Loader2 className="animate-spin w-6 h-6 text-blue-500 mb-2" />
							<span className="text-sm text-gray-600">{progress}%</span>
						</div>
					) : (
						<>
							{type === 'image' ? <ImagePlus className="w-10 h-10 text-gray-400 mb-2" /> : type === 'pdf' ? <FileText className="w-10 h-10 text-gray-400 mb-2" /> : type === 'video' ? <Video className="w-10 h-10 text-gray-400 mb-2" /> : <FileText className="w-10 h-10 text-gray-400 mb-2" />}
							<p className="text-gray-500 text-sm">Click to upload {type === 'image' ? 'image' : type === 'pdf' ? 'PDF' : type === 'video' ? 'video' : 'file'}</p>
						</>
					)}
				</div>
			)}

			<input
				type="file"
				ref={fileInputRef}
				accept={getFileAcceptType()}
				className="hidden"
				onChange={(e) => {
					const file = e.target.files?.[0]
					if (file) handleFileUpload(file)
				}}
			/>

			<input type="url" defaultValue={fileUrl} onChange={(e) => onChange(e.target.value)} placeholder={`Or paste ${type === 'image' ? 'image' : type === 'pdf' ? 'PDF' : type === 'video' ? 'video' : 'file'} URL`} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
		</div>
	)
}
