import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// === GANTI KODE DI BAWAH INI DENGAN KODE FIREBASE ANDA ===
const firebaseConfig = {
  apiKey: "API_KEY_ANDA",
  authDomain: "DOMAIN_ANDA",
  projectId: "PROJECT_ID_ANDA",
  storageBucket: "BUCKET_ANDA",
  messagingSenderId: "SENDER_ID_ANDA",
  appId: "APP_ID_ANDA"
};
// =========================================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, serverTimestamp, getDocs, query, orderBy, signInWithEmailAndPassword, onAuthStateChanged, signOut };
