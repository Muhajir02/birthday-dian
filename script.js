// --- 1. KONFIGURASI UTAMA ---
const SANDI_RAHASIA = "sayang"; 
const TANGGAL_ULTAH = new Date("June 20, 2026 00:00:00").getTime();

// --- 2. SISTEM AUDIO & GERBANG ISTANA ---
function bukaGerbang() {
    const input = document.getElementById('password').value.toLowerCase();
    
    if (input === SANDI_RAHASIA) {
        document.getElementById('errorMsg').classList.add('hidden');
        
        // Memutar Audio menggunakan Promise Handling
        const musik = document.getElementById('bgMusic');
        musik.volume = 0.6; 
        
        let playPromise = musik.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                console.log("Everything You Are berhasil diputar!");
            }).catch(error => {
                console.log("Autoplay ditahan oleh browser.");
            });
        }

        // Jalankan Animasi Membelah Gerbang
        document.getElementById('palaceGate').classList.add('open');
        
        // Transisi ke Istana Utama setelah 2 detik
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

// --- 4. ALBUM FOTO DENGAN EFEK LEDAKAN HATI ---
function bukaFoto(imgSrc, caption) {
    const modal = document.getElementById('photoModal');
    document.getElementById('modalImg').src = imgSrc;
    document.getElementById('modalCaption').innerText = caption;
    
    modal.classList.add('show');
    ledakanCinta();
}

function tutupFoto() {
    document.getElementById('photoModal').classList.remove('show');
}

function ledakanCinta() {
    const container = document.getElementById('heartExplosion');
    container.innerHTML = '';
    
    const elemen = ['💖', '✨', '💛', '🥰'];
    
    for(let i = 0; i < 25; i++) {
        const hati = document.createElement('div');
        hati.classList.add('ledakan-cinta');
        hati.innerText = elemen[Math.floor(Math.random() * elemen.length)];
        
        const angle = Math.random() * Math.PI * 2;
        const radius = 120 + Math.random() * 250; 
        const tx = Math.cos(angle) * radius + 'px';
        const ty = Math.sin(angle) * radius + 'px';
        
        hati.style.setProperty('--tx', tx);
        hati.style.setProperty('--ty', ty);
        
        container.appendChild(hati);
    }
}

// --- 5. SURAT MEGAH & TYPING EFFECT ---
const isiSurat = `
Halo Kesayanganku, Dian...<br><br>
Aku membuat istana virtual bernuansa Nailong ini khusus untuk merayakan hari kelahiranmu. Kamu adalah bidadari yang selalu membuat hari-hariku secerah warna kuning kesukaanmu.<br><br>
Di usiamu yang ke-21 ini, aku berdoa semoga semua impianmu terwujud, senyum manismu tidak pernah pudar, dan bahagia selalu menyertaimu.<br><br>
Terima kasih sudah menjadi pelengkap hidupku. Tetaplah jadi Dian yang lucu dan menggemaskan. Aku sangat menyayangimu, selamanya. 💍✨
`;

let suratTerbuka = false;
let i = 0;
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
    if (i < isiSurat.length) {
        let char = isiSurat.charAt(i);
        
        if (char === '<') isTag = true;
        if (char === '>') {
            isTag = false;
            textBuffer += char;
            i++;
            target.innerHTML = textBuffer + '<span class="cursor"></span>';
            setTimeout(ketikSurat, 50);
            return;
        }
        
        textBuffer += char;
        target.innerHTML = textBuffer + (isTag ? '' : '<span class="cursor"></span>');
        i++;
        
        setTimeout(ketikSurat, isTag ? 0 : 50);
    } else {
        target.innerHTML = textBuffer;
    }
}

// --- 6. ANIMASI CONFETTI EMAS LATAR BELAKANG ---
function buatConfetti() {
    const istana = document.getElementById('mainPalace');
    setInterval(() => {
        const conf = document.createElement('div');
        conf.innerHTML = '✨';
        conf.style.position = 'absolute';
        conf.style.color = '#FFDE4D';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-50px';
        conf.style.fontSize = Math.random() * 15 + 10 + 'px';
        conf.style.animation = `terbang ${Math.random() * 4 + 3}s linear forwards`;
        conf.style.opacity = '0.6';
        conf.style.zIndex = '0';
        conf.style.pointerEvents = 'none';
        
        istana.appendChild(conf);
        
        setTimeout(() => { conf.remove(); }, 6000);
    }, 400);
}
