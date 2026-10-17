// Impor dari CDN agar bisa berjalan di HTML murni
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Konfigurasi asli aplikasi Anda
const firebaseConfig = {
  apiKey: "AIzaSyAL8xKxdCVvV6P6YcIkQformmp7LYd5_dQ",
  authDomain: "pemulihan-web.firebaseapp.com",
  projectId: "pemulihan-web",
  storageBucket: "pemulihan-web.firebasestorage.app",
  messagingSenderId: "99102138315",
  appId: "1:99102138315:web:cad0f7fb5890fc41eba04e",
  measurementId: "G-FV1GHE28ZT"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Mengekspor agar bisa dipakai oleh halaman publik dan admin
export { db, auth, collection, addDoc, serverTimestamp, getDocs, query, orderBy, signInWithEmailAndPassword, onAuthStateChanged, signOut };
