import { db, collection, addDoc, serverTimestamp } from './firebase.js';

const btnLokasi  = document.getElementById('btn-lokasi');
const statusTeks = document.getElementById('status');

// Guard: kalau elemen tidak ada, jangan crash seluruh module
if (!btnLokasi || !statusTeks) {
  console.warn('Elemen #btn-lokasi atau #status tidak ditemukan di HTML.');
} else {
  btnLokasi.addEventListener('click', bagikanLokasi);
}

async function bagikanLokasi() {
  if (!navigator.geolocation) {
    setStatus('Browser Anda tidak mendukung fitur lokasi.', 'error');
    return;
  }

  if (!db) {
    setStatus('Database belum dikonfigurasi.', 'error');
    return;
  }

  setStatus('Meminta izin lokasi...', 'info');
  btnLokasi.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setStatus('Lokasi didapatkan. Sedang mengirim data...', 'info');

      try {
        await addDoc(collection(db, 'laporan_lokasi'), {
          latitude,
          longitude,
          waktu: serverTimestamp(),
          browser: navigator.userAgent,
        });

        setStatus('Terima kasih! Lokasi berhasil dibagikan.', 'success');
        btnLokasi.textContent = 'Lokasi Telah Dibagikan';
        // sengaja tetap disabled agar tidak dobel kirim
      } catch (error) {
        console.error('Error mengirim data:', error);
        setStatus('Gagal mengirim data. Pastikan Firestore sudah aktif.', 'error');
        btnLokasi.disabled = false;
      }
    },
    (error) => {
      btnLokasi.disabled = false;
      const pesan = {
        [error.PERMISSION_DENIED]:    'Anda menolak permintaan lokasi.',
        [error.POSITION_UNAVAILABLE]: 'Informasi lokasi tidak tersedia.',
        [error.TIMEOUT]:              'Waktu permintaan lokasi habis.',
      }[error.code] ?? 'Terjadi kesalahan tidak dikenal.';
      setStatus(pesan, 'error');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function setStatus(text, type = 'info') {
  statusTeks.textContent = text;
  statusTeks.style.color =
    type === 'error'   ? '#d9534f' :
    type === 'success' ? 'green'   :
                         '#007bff';
}
