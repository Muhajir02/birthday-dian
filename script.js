// --- 1. KONFIGURASI UTAMA ---
const SANDI_RAHASIA = "sayang"; 
const TANGGAL_ULTAH = new Date("June 20, 2026 00:00:00").getTime();

// --- 2. SISTEM AUDIO & GERBANG ISTANA ---
function bukaGerbang() {
    const input = document.getElementById('password').value.toLowerCase();
    
    if (input === SANDI_RAHASIA) {
        document.getElementById('errorMsg').classList.add('hidden');
        
        const musik = document.getElementById('bgMusic');
        musik.load(); // Memaksa refresh buffer audio lokal
        musik.volume = 0.6; 
        
        let playPromise = musik.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Audio berhasil berputar.");
            }).catch(error => {
                console.log("Autoplay ditahan oleh browser, mengaktifkan pemicu darurat.");
                // Fallback darurat: Jika diblokir, mainkan saat layar pertama kali disentuh
                document.body.addEventListener('click', () => { musik.play(); }, { once: true });
            });
        }

        // Jalankan Animasi Membelah Gerbang
        document.getElementById('palaceGate').classList.add('open');
        
        setTimeout(() => {
            document.getElementById('palaceGate').style.display = 'none';
            const istana = document.getElementById('mainPalace');
            istana.classList.remove('hidden');
            
            void istana.offsetWidth; 
            istana.classList.add('visible');
            
            mulaiCountdown();
            buatConfetti();
        }, 2000);
        
    } else {
        const errorText = document.getElementById('errorMsg');
        errorText.classList.remove('hidden');
        const inputSandi = document.getElementById('password');
        inputSandi.style.transform = "translateX(-10px)";
        setTimeout(() => inputSandi.style.transform = "translateX(10px)", 100);
        setTimeout(() => inputSandi.style.transform = "translateX(0)", 200);
    }
}

function putarMusikManual() {
    const musik = document.getElementById('bgMusic');
    const btn = document.getElementById('manualMusicBtn');
    if (musik.paused) {
        musik.play();
        btn.innerText = "⏸️";
    } else {
        musik.pause();
        btn.innerText = "🎵";
    }
}

// --- 3. JAM HITUNG MUNDUR ---
function mulaiCountdown() {
    setInterval(() => {
        const sekarang = new Date().getTime();
        const selisih = TANGGAL_ULTAH - sekarang;

        if (selisih > 0) {
            document.getElementById("days").innerText = Math.floor(selisih / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            document.getElementById("hours").innerText = Math.floor((selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            document.getElementById("mins").innerText = Math.floor((selisih % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            document.getElementById("secs").innerText = Math.floor((selisih % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }
    }, 1000);
}

// --- 4. DATA ALBUM FOTO DENGAN KALIMAT ROMANTIS ---
const daftarFoto = [
    { src: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800', caption: 'Senyummu itu seperti semesta yang berkonspirasi untuk membuatku bahagia. 💛' },
    { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800', caption: 'Setiap sudut di istana memori ini penuh dengan cerita indah yang kita ukir bersama. ✨' },
    { src: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800', caption: 'Bukan hanya untuk hari ini, aku ingin menemanimu di setiap babak kehidupan selanjutnya. 💍' },
    { src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800', caption: 'Di antara miliaran keindahan di dunia, kamulah satu-satunya mahakarya favoritku. 👑' },
    { src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800', caption: 'Terima kasih telah menjadi alasan paling manis di balik setiap rasa syukurku, Sayang. 🥰' },
    { src: 'https://images.unsplash.com/photo-1501901604252-bb42f2b8834a?w=800', caption: 'Genggaman tanganmu adalah tempat paling tenang yang selalu ingin aku tuju. 🌹' },
    { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800', caption: 'Dunia bisa saja berubah, tapi kekagumanku pada binar matamu akan selalu menetap. 🌟' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', caption: 'Selamat ulang tahun yang ke-21, Permaisuriku. Bahagiamu adalah seluruh duniaku. 🌸' }
];

let indeksFotoSekarang = 0;

function bukaFoto(index) {
    indeksFotoSekarang = index;
    tampilkanFotoModal();
}

function tampilkanFotoModal() {
    const modal = document.getElementById('photoModal');
    const data = daftarFoto[indeksFotoSekarang];
    
    document.getElementById('modalImg').src = data.src;
    document.getElementById('modalCaption').innerText = data.caption;
    
    modal.classList.add('show');
    ledakanCinta();
}

// Navigasi Geser Mundur (Ke Foto Sebelumnya)
function fotoSebelumnya() {
    if (indeksFotoSekarang > 0) {
        indeksFotoSekarang--;
    } else {
        indeksFotoSekarang = daftarFoto.length - 1; // Putar kembali ke foto paling akhir
    }
    tampilkanFotoModal();
}

// Navigasi Geser Maju (Ke Foto Selanjutnya)
function fotoSelanjutnya() {
    if (indeksFotoSekarang < daftarFoto.length - 1) {
        indeksFotoSekarang++;
    } else {
        indeksFotoSekarang = 0; // Putar kembali ke foto pertama
    }
    tampilkanFotoModal();
}

function tutupFoto() {
    document.getElementById('photoModal').classList.remove('show');
}

function ledakanCinta() {
    const container = document.getElementById('heartExplosion');
    container.innerHTML = '';
    const elemen = ['💖', '✨', '💛', '🥰'];
    
    for(let i = 0; i < 20; i++) {
        const hati = document.createElement('div');
        hati.classList.add('ledakan-cinta');
        hati.innerText = elemen[Math.floor(Math.random() * elemen.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 200; 
        const tx = Math.cos(angle) * radius + 'px';
        const ty = Math.sin(angle) * radius + 'px';
        
        hati.style.setProperty('--tx', tx);
        hati.style.setProperty('--ty', ty);
        container.appendChild(hati);
    }
}

// --- 5. SURAT KERAJAAN METODE KETIK ---
const isiSurat = `
Halo Kesayanganku, Dian...<br><br>
Aku membuat istana virtual bernuansa Nailong ini khusus untuk merayakan hari kelahiranmu. Kamu adalah bidadari yang selalu membuat hari-hariku secerah warna kuning kesukaanmu.<br><br>
Di usiamu yang ke-21 ini, aku berdoa semoga semua impianmu terwujud, senyum manismu tidak pernah pudar, dan bahagia selalu menyertaimu.<br><br>
Terima kasih sudah menjadi pelengkap hidupku. Tetaplah jadi Dian yang lucu dan menggemaskan. Aku sangat menyayangimu, selamanya. 💍✨
`;

let suratTerbuka = false;
let idxKetik = 0;
let textBuffer = "";
let isTag = false;

function bacaTitah() {
    if(suratTerbuka) return;
    
    document.getElementById('btnBacaSurat').style.display = 'none';
    const scrollContainer = document.getElementById('royalScroll');
    scrollContainer.classList.remove('hidden');
    
    setTimeout(() => {
        scrollContainer.classList.add('open');
        scrollContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(ketikSurat, 1500);
    }, 100);
    
    suratTerbuka = true;
}

function ketikSurat() {
    const target = document.getElementById('typedText');
    if (idxKetik < isiSurat.length) {
        let char = isiSurat.charAt(idxKetik);
        if (char === '<') isTag = true;
        if (char === '>') {
            isTag = false;
            textBuffer += char;
            idxKetik++;
            target.innerHTML = textBuffer + '<span class="cursor"></span>';
            setTimeout(ketikSurat, 50);
            return;
        }
        textBuffer += char;
        target.innerHTML = textBuffer + (isTag ? '' : '<span class="cursor"></span>');
        idxKetik++;
        setTimeout(ketikSurat, isTag ? 0 : 50);
    } else {
        target.innerHTML = textBuffer;
    }
}

// --- 6. CONFETTI LATAR BELAKANG ---
function buatConfetti() {
    const istana = document.getElementById('mainPalace');
    setInterval(() => {
        const conf = document.createElement('div');
        conf.classList.add('confetti-item');
        conf.innerHTML = '✨';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-50px';
        conf.style.fontSize = Math.random() * 15 + 10 + 'px';
        conf.style.animationDuration = Math.random() * 4 + 3 + 's';
        
        istana.appendChild(conf);
        setTimeout(() => { conf.remove(); }, 6000);
    }, 400);
}
