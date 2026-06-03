// Fungsi untuk Membuka Surat Cinta
function openLetter() {
    const letter = document.getElementById('loveLetter');
    letter.classList.toggle('hidden');
    
    // Mengubah teks tombol setelah dibuka
    const btn = document.querySelector('.open-letter-btn');
    if (!letter.classList.contains('hidden')) {
        btn.innerHTML = "Tutup Surat Cinta ✉️";
    } else {
        btn.innerHTML = "Buka Surat Cinta ✉️";
    }
}

// Fungsi Mengontrol Musik
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️ Jeda Musik";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Putar Musik";
    }
}

// Efek Hati Berjatuhan secara otomatis
function createHeart() {
    const container = document.getElementById('heartContainer');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Karakter jatuh acak antara Hati (❤️) dan Bintang Kuning (💛) biar masuk tema Nailong
    const elements = ['❤️', '💛', '✨', '🥰'];
    heart.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // Antara 2-5 detik
    heart.style.fontSize = Math.random() * 15 + 15 + 'px'; // Ukuran acak
    
    container.appendChild(heart);
    
    // Hapus elemen setelah animasi selesai agar tidak membebani memori browser
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Jalankan efek hati berjatuhan setiap 400ms
setInterval(createHeart, 400);
