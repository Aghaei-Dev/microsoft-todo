import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBDN5zNPiPghKbulIX5qlkwLYHKBgkFMhU',
  authDomain: 'todo-ddc58.firebaseapp.com',
  projectId: 'todo-ddc58',
  storageBucket: 'todo-ddc58.appspot.com',
  messagingSenderId: '686995742005',
  appId: '1:686995742005:web:4db34821b14881e271007c',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
