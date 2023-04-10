import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtjyWotPOCHWNQE7zXuctq5S581rt_PQQ",
  authDomain: "mini-blog-5a7b4.firebaseapp.com",
  projectId: "mini-blog-5a7b4",
  storageBucket: "mini-blog-5a7b4.appspot.com",
  messagingSenderId: "570896151923",
  appId: "1:570896151923:web:524da92b67547af4c44106"
};

// inicializando nossa APP
const app = initializeApp(firebaseConfig);

// inicializando o banco de dados do Firebase
const db = getFirestore(app);

export { db };
