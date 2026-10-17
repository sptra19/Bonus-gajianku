import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// === GANTI KODE DI BAWAH INI DENGAN KODE DARI FIREBASE CONSOLE ANDA ===
const firebaseConfig = {
  apiKey: "API_KEY_ANDA",
  authDomain: "DOMAIN_ANDA",
  projectId: "PROJECT_ID_ANDA",
  storageBucket: "BUCKET_ANDA",
  messagingSenderId: "SENDER_ID_ANDA",
  appId: "APP_ID_ANDA"
};
// ========================================================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };
