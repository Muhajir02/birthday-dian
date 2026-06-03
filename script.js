function openLetter() {
    const letter = document.getElementById('loveLetter');
    const btn = document.querySelector('.open-letter-btn');
    
    if (letter.classList.contains('hidden')) {
        letter.classList.remove('hidden');
        btn.innerHTML = "Tutup Surat Cinta 💌";
        // Auto scroll ke surat
        letter.scrollIntoView({ behavior: 'smooth' });
    } else {
        letter.classList.add('hidden');
        btn.innerHTML = "Buka Surat Cinta 💌";
    }
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    
    if (music.paused) {
        music.play();
        btn.innerHTML = "⏸️ Jeda Lagu";
    } else {
        music.pause();
        btn.innerHTML = "🎵 Putar Lagu Kita";
    }
}

function createHeart() {
    const container = document.getElementById('heartContainer');
    if (!container) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Kombinasi emotikon untuk tema Nailong + Romantis
    const elements = ['💛', '💖', '✨', '🌼', '🥰'];
    heart.innerText = elements[Math.floor(Math.random() * elements.length)];
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // 3-6 detik
    heart.style.fontSize = Math.random() * 15 + 15 + 'px'; // Ukuran acak
    
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Munculkan hati/bintang setiap 500ms
setInterval(createHeart, 500);
