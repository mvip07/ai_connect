import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAOg88pkpbcKpAQOiAqcsXBF3z7xMH5nxwY',
	authDomain: 'kamronlessonbot.firebaseapp.com',
	projectId: 'kamronlessonbot',
	storageBucket: 'kamronlessonbot.appspot.com',
	messagingSenderId: '859780348303',
	appId: '1:859780348303:web:516f395416989e55aff3fa',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
