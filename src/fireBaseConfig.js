import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// 1. Importa getFirestore
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhgPHKdiGcVq_WMy75Q_bdImtG8U2Czsk",
  authDomain: "adweb-online-f48b9.firebaseapp.com",
  projectId: "adweb-online-f48b9",
  storageBucket: "adweb-online-f48b9.firebasestorage.app",
  messagingSenderId: "862745980771",
  appId: "1:862745980771:web:bd5f6bc28db7fc2de82d56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// 2. Inicializa Firestore
const db = getFirestore(app);

// 3. Exporta 'db' junto con 'auth'
export { auth, db };
