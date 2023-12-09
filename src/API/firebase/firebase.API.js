import { getAuth, GoogleAuthProvider, signInWithPopup } from '@firebase/auth'
import { getStorage } from '@firebase/storage'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// db안에 storage에 등록한 이미지 저장 주소와 text 등을 string으로 담고있는 Cloud firebase 입니다.

class AuthService {
  constructor() {
    this.auth = getAuth()
    this.provider = {
      Google: new GoogleAuthProvider(),
    }
  }
  login(providerName) {
    try {
      const authProvider = this.provider[providerName]
      return signInWithPopup(this.auth, authProvider)
    } catch (error) {
      console.log(error)
    }
  }
}
