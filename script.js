// ==========================================
// URUTAN HALAMAN: Login(0) -> Prank(1) -> Countdown(2) -> Fireworks(3) -> Galaxy(4) -> Quiz(5) -> Surat(6) -> Memories(7) -> Journey(8)
// ==========================================
const slides = ["login-section", "prank-section", "countdown-section", "fireworks-section", "galaxy-section", "quiz-section", "typewriter-section", "memories-section", "journey-section"];
let currentSlide = 0;
let fireworksStarted = false; 
let galaxyStarted = false;
let fallingHeartsStarted = false;

const navControls = document.getElementById("nav-controls");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// ========================================================
// FITUR HATI TERBANG SAAT DIKLIK
// ========================================================
document.addEventListener('click', function(e) {
    const targetTag = e.target.tagName.toLowerCase();
    if(targetTag === 'input' || targetTag === 'textarea' || targetTag === 'button' || e.target.closest('button')) return;
    createClickHeart(e.clientX, e.clientY);
});

function createClickHeart(x, y) {
    const symbols = ["❤️", "💖", "✨", "🌸", "⭐"];
    const particle = document.createElement("div");
    particle.className = "click-particle";
    particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = x + "px";
    particle.style.top = y + "px";
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
}

// ==========================================
// LOGIKA NAVIGASI UTAMA
// ==========================================
function updateNav() {
    if (currentSlide === 0) {
        navControls.classList.add("hidden"); 
    } else {
        navControls.classList.remove("hidden");
        // Sembunyikan Tombol Back di Halaman Prank (1)
        btnPrev.style.display = (currentSlide === 1) ? "none" : "flex";
        
        // Sembunyikan Tombol Next di Prank(1), Countdown(2), Kembang Api(3), Quiz(5), Surat(6), dan Journey(8)
        const hideNextOn = [1, 2, 3, 5, 6, 8];
        btnNext.style.display = hideNextOn.includes(currentSlide) ? "none" : "flex";
    }
}

function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    document.getElementById("memory-modal").classList.add("hidden");
    const memVid = document.getElementById("memory-video");
    if(memVid) memVid.pause();
    
    document.getElementById(slides[currentSlide]).classList.add("hidden");
    currentSlide = index;
    document.getElementById(slides[currentSlide]).classList.remove("hidden");
    
    if (currentSlide === 0) {
        document.getElementById("door-left").classList.remove("open-left");
        document.getElementById("door-right").classList.remove("open-right");
        document.querySelector('.login-box').style.opacity = "1";
        document.getElementById("password-input").value = ""; 
    } else {
        document.getElementById("door-left").classList.add("open-left");
        document.getElementById("door-right").classList.add("open-right");
    }

    if (currentSlide === 3 && !fireworksStarted) { startFireworks(); fireworksStarted = true; }
    if (currentSlide === 4 && !galaxyStarted) { startGalaxyAnimation(); galaxyStarted = true; }
    if (currentSlide === 5) { startQuiz(); } 
    if (currentSlide === 6) { startTypewriter(); } 
    
    // EFEK JATUH HANYA DI Prank(1), Countdown(2), Quiz(5), Surat(6), Memories(7), Journey(8)
    if (![0, 3, 4].includes(currentSlide) && !fallingHeartsStarted) { 
        createFallingHearts(); fallingHeartsStarted = true; 
    }
    
    updateNav();
}

btnPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
btnNext.addEventListener("click", () => goToSlide(currentSlide + 1));

const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
musicBtn.addEventListener("click", () => { 
    if (bgMusic.paused) { bgMusic.play(); musicBtn.innerHTML = '<i class="fas fa-music"></i>'; } 
    else { bgMusic.pause(); musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; } 
});

// --- 1. LOGIN ---
const correctPassword = "dianlove"; 
document.getElementById("login-btn").addEventListener("click", checkPassword);
document.getElementById("password-input").addEventListener("keypress", (e) => { if (e.key === "Enter") checkPassword(); });

function checkPassword() {
    if (document.getElementById("password-input").value === correctPassword) {
        document.querySelector('.login-box').style.opacity = "0"; 
        bgMusic.play().catch(e => console.log("Autoplay ditahan browser"));
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        document.getElementById("door-left").classList.add("open-left");
        document.getElementById("door-right").classList.add("open-right");
        setTimeout(() => { goToSlide(1); }, 1000); 
    } else { document.getElementById("error-msg").classList.remove("hidden"); }
}

// --- LOGIKA PRANK LARI-LARI ---
const btnNggakPrank = document.getElementById("btn-nggak-prank");
const btnIyaPrank = document.getElementById("btn-iya-prank");
if(btnNggakPrank && btnIyaPrank) {
    btnNggakPrank.addEventListener('mouseover', kaburPrank);
    btnNggakPrank.addEventListener('touchstart', kaburPrank, {passive: false});

    function kaburPrank(e) {
        if(e.cancelable) e.preventDefault();
        const maxX = window.innerWidth - btnNggakPrank.offsetWidth - 20;
        const maxY = window.innerHeight - btnNggakPrank.offsetHeight - 20;
        btnNggakPrank.style.position = 'fixed';
        btnNggakPrank.style.left = Math.max(10, Math.floor(Math.random() * maxX)) + 'px';
        btnNggakPrank.style.top = Math.max(10, Math.floor(Math.random() * maxY)) + 'px';
    }

    btnIyaPrank.addEventListener("click", () => goToSlide(2));
}

// --- LOGIKA COUNTDOWN ULTAH ---
const ultahTarget = new Date("2026-06-20T00:00:00"); 
function updateUltahTimer() {
    const now = new Date();
    const difference = ultahTarget - now; 
    if (difference <= 0) {
        if(document.getElementById("bday-days")) {
            document.getElementById("bday-days").innerText = "00";
            document.getElementById("bday-hours").innerText = "00";
            document.getElementById("bday-minutes").innerText = "00";
            document.getElementById("bday-seconds").innerText = "00";
            document.getElementById("btn-lanjut-countdown").innerText = "Waktunya Tiba! Buka Kembang Api 🎉";
        }
        return;
    }
    document.getElementById("bday-days").innerText = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("bday-hours").innerText = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("bday-minutes").innerText = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("bday-seconds").innerText = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
}
setInterval(updateUltahTimer, 1000);
updateUltahTimer();
document.getElementById("btn-lanjut-countdown").addEventListener("click", () => goToSlide(3));

// --- 2. KEMBANG API (ANTI LAG & WARNA BEDA-BEDA) ---
const fwCanvas = document.getElementById("fireworks-canvas"); const fwCtx = fwCanvas.getContext("2d", { alpha: false }); 
const fwSection = document.getElementById("fireworks-section"); let fwRockets = [], fwParticles = [], fwStars = [];
const wishes = ["HAPPY BIRTHDAY\nDIAN! 🎉", "WISH YOU ALL\nTHE BEST", "SUKACITA & CINTA", "SUKSES SELALU ✨", "SEMOGA IMPIANMU\nTERCAPAI 🌟", "I LOVE YOU! 💕"];
let wishIndex = 0, lastTapTime = 0; 
// 6 Warna Berbeda yang pasti di-assign 1 per 1 untuk setiap kata
const rainbowColors = ['#ff4081', '#00e5ff', '#76ff03', '#ffff00', '#ea80fc', '#ff6a00'];

const toGalaxyBtn = document.createElement("button"); toGalaxyBtn.innerHTML = "Lanjut Liat Semesta ✨"; toGalaxyBtn.className = "pulse-btn"; 
toGalaxyBtn.style.position = "absolute"; toGalaxyBtn.style.bottom = "80px"; toGalaxyBtn.style.left = "50%"; toGalaxyBtn.style.transform = "translateX(-50%)"; toGalaxyBtn.style.display = "none"; toGalaxyBtn.style.zIndex = "100";
fwSection.appendChild(toGalaxyBtn); toGalaxyBtn.addEventListener("click", (e) => { e.stopPropagation(); goToSlide(4); }); 

fwSection.addEventListener("click", function(e) {
    if (Date.now() - lastTapTime < 100) return; lastTapTime = Date.now(); document.getElementById("tap-hint").style.display = "none";
    fwRockets.push(new FwRocket(e.clientX, e.clientY, wishes[wishIndex % wishes.length], rainbowColors[wishIndex % rainbowColors.length])); 
    wishIndex++; if (wishIndex >= 5) toGalaxyBtn.style.display = "block";
});

// Mengurangi jumlah bintang belakang agar tidak lag di HP
for (let i=0; i<60; i++) fwStars.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, s: Math.random()*2+1.5, alpha: Math.random(), speed: Math.random()*1.5+0.5 });

class FwRocket {
    constructor(tx, ty, text, color) { 
        this.tx = tx; this.ty = ty; this.x = window.innerWidth/2; this.y = window.innerHeight; 
        this.text = text; this.color = color; this.speed = 25; this.exploded = false; 
        const angle = Math.atan2(this.ty - this.y, this.tx - this.x); 
        this.vx = Math.cos(angle)*this.speed; this.vy = Math.sin(angle)*this.speed; 
        this.lastX = this.x; this.lastY = this.y; 
    }
    update() {
        this.lastX = this.x; this.lastY = this.y; this.x += this.vx; this.y += this.vy; 
        fwCtx.beginPath(); fwCtx.moveTo(this.lastX, this.lastY); fwCtx.lineTo(this.x, this.y); fwCtx.strokeStyle = this.color; fwCtx.lineWidth = 4; fwCtx.lineCap = "round"; fwCtx.stroke();
        if (this.y <= this.ty && !this.exploded) { 
            this.exploded = true; 
            // Mengurangi ledakan partikel agar lancar (dari 80 ke 40)
            for(let i=0; i<40; i++) { fwParticles.push(new FwParticle(this.x, this.y, this.color)); } 
            showWishText(this.text, this.color, this.x, this.y); 
        }
    }
}

class FwParticle {
    constructor(x, y, color) { this.x = x; this.y = y; this.color = color; const angle = Math.random()*Math.PI*2; const speed = Math.random()*10+2; this.vx = Math.cos(angle)*speed; this.vy = Math.sin(angle)*speed; this.alpha = 1; this.friction = 0.95; this.gravity = 0.08; this.lastX = this.x; this.lastY = this.y; this.decay = Math.random() * 0.02 + 0.015; }
    update() { this.lastX = this.x; this.lastY = this.y; this.vx *= this.friction; this.vy *= this.friction; this.vy += this.gravity; this.x += this.vx; this.y += this.vy; this.alpha -= this.decay; fwCtx.beginPath(); fwCtx.moveTo(this.lastX, this.lastY); fwCtx.lineTo(this.x, this.y); fwCtx.strokeStyle = this.color; fwCtx.lineWidth = 2; fwCtx.lineCap = "round"; fwCtx.globalAlpha = this.alpha; fwCtx.stroke(); }
}

function showWishText(text, color, x, y) { const h1 = document.createElement("h1"); h1.className = "glow-text"; h1.innerHTML = text.replace(/\n/g, '<br>'); h1.style.left = (x + (Math.random()-0.5)*40)+"px"; h1.style.top = (y + (Math.random()-0.5)*40)+"px"; h1.style.textShadow = `0 0 10px ${color}, 0 0 25px ${color}`; document.getElementById("dynamic-text").appendChild(h1); setTimeout(() => h1.remove(), 2500); }

function startFireworks() {
    fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight;
    function animate() { 
        requestAnimationFrame(animate); 
        fwCtx.globalCompositeOperation = 'destination-out'; fwCtx.fillStyle = 'rgba(0, 0, 0, 0.2)'; fwCtx.fillRect(0, 0, window.innerWidth, window.innerHeight); 
        fwCtx.globalCompositeOperation = 'source-over'; fwCtx.fillStyle = 'white'; 
        fwStars.forEach(s => { fwCtx.globalAlpha = s.alpha; fwCtx.fillRect(s.x, s.y, s.s, s.s); s.y -= s.speed; if (s.y < 0) { s.y = window.innerHeight; s.x = Math.random() * window.innerWidth; } s.alpha += (Math.random()-0.5)*0.1; if(s.alpha < 0.1) s.alpha=0.1; if(s.alpha > 1) s.alpha=1; }); 
        fwCtx.globalAlpha = 1; 
        for (let i = fwRockets.length-1; i>=0; i--) { if (fwRockets[i].exploded) fwRockets.splice(i, 1); else fwRockets[i].update(); } 
        for (let i = fwParticles.length-1; i>=0; i--) { if (fwParticles[i].alpha <= 0) fwParticles.splice(i, 1); else fwParticles[i].update(); } 
        // Batasi maksimal partikel agar HP tidak panas/lag
        if (fwParticles.length > 200) fwParticles.splice(0, fwParticles.length - 200); 
    } 
    animate();
}

// --- 3. GALAKSI 3D ---
const gxCanvas = document.getElementById("galaxy-canvas"); const gxCtx = gxCanvas.getContext("2d", { alpha: false }); let gxAnimationId, gxParticles = [], bgStars = [], orbitElements = [], gxTime = 0; let galaxyStartTime = 0; let introPhase = true;
const orbitData = [ { emoji: "🧸", label: "Tempat Nyaman", title: "Tempat Nyaman", text: "Kamu adalah tempat nyaman yang selalu ingin aku pulang. Di dekatmu, semua rasa lelah hilang, dan hatiku selalu menemukan kedamaian yang tak tergantikan." }, { emoji: "💖", label: "Dua Jiwa", title: "Dua Jiwa Satu Hati", text: "Kita adalah dua jiwa satu hati, dipertemukan oleh takdir untuk saling melengkapi. Dalam setiap langkah, aku ingin terus berjalan bersamamu tanpa ragu." }, { emoji: "✨", label: "Senyum Manismu", title: "Senyum Manismu", text: "Senyum manismu adalah cahaya yang menerangi hariku. Bahkan di saat gelap, hanya dengan mengingatmu, semuanya terasa lebih hangat dan penuh harapan." }, { emoji: "💌", label: "Pesan Rahasia", title: "Pesan Rahasia", text: "Mungkin aku tidak bilang setiap detik, tapi ingatlah I LOVE YOU." }, { emoji: "🌹", label: "Cintaku Padamu", title: "Cintaku Padamu", text: "Cintaku padamu tak pernah berkurang, justru semakin tumbuh setiap hari. Di setiap detik yang kita lewati, aku semakin yakin bahwa kamu adalah alasan terindah dalam hidupku." }, { emoji: "🎀", label: "Selamanya", title: "Selamanya", text: "Selamanya untukmu, aku berjanji akan menjaga, mencintai, dan menemanimu dalam setiap suka dan duka. Kamu bukan hanya hari ini, tapi masa depanku." } ];
function initGalaxy() { gxCanvas.width = window.innerWidth; gxCanvas.height = window.innerHeight; gxParticles = []; bgStars = []; for(let i=0; i<150; i++) bgStars.push({ x: (Math.random()-0.5)*window.innerWidth*2, y: (Math.random()-0.5)*window.innerHeight*2, z: Math.random()*2000 }); for(let i=0; i<800; i++) { let targetR = Math.random()*(Math.min(window.innerWidth, window.innerHeight)*0.7); gxParticles.push({ angle: Math.random()*Math.PI*20, targetRadius: targetR, radius: targetR + 1000 + Math.random()*1000, speed: Math.random()*0.003+0.001, size: Math.random()*2+0.5, color: `hsl(${Math.random()*60+260}, 100%, 70%)` }); } if(orbitElements.length === 0) createOrbitingElements(); }
function createOrbitingElements() { const container = document.getElementById("orbit-container"); orbitData.forEach((data, i) => { const item = document.createElement("div"); item.className = "orbit-item"; item.innerHTML = `<div class="orbit-icon-sphere">${data.emoji}</div><div class="orbit-label">${data.label}</div>`; item.addEventListener("click", () => { document.getElementById("popup-emoji").innerText = data.emoji; document.getElementById("popup-title").innerText = data.title; document.getElementById("popup-text").innerText = data.text; document.getElementById("popup-modal").classList.remove("hidden"); }); container.appendChild(item); orbitElements.push({ el: item, offset: i * (Math.PI * 2 / orbitData.length) }); }); }
function startGalaxyAnimation() { if(gxAnimationId) cancelAnimationFrame(gxAnimationId); initGalaxy(); galaxyStartTime = Date.now(); introPhase = true; document.querySelector('.center-heart').classList.remove('show'); document.getElementById('orbit-container').classList.remove('show'); animateGalaxy(); window.addEventListener('resize', initGalaxy); }
function animateGalaxy() { const w = window.innerWidth; const h = window.innerHeight; gxAnimationId = requestAnimationFrame(animateGalaxy); gxTime += 0.05; const cx = w/2, cy = h/2; let elapsed = Date.now() - galaxyStartTime; let introProgress = Math.min(1, elapsed / 4000); gxCtx.globalAlpha = 1; gxCtx.fillStyle = 'rgba(5, 2, 10, 0.4)'; gxCtx.fillRect(0, 0, w, h); gxCtx.fillStyle = 'white'; bgStars.forEach(s => { let starSpeed = 2 + (1 - introProgress) * 15; s.z -= starSpeed; if(s.z <= 0) { s.z = 2000; s.x = (Math.random()-0.5)*w*2; s.y = (Math.random()-0.5)*h*2; } const scale = 500 / s.z; gxCtx.globalAlpha = Math.min(1, scale * 0.5); gxCtx.fillRect(cx + s.x*scale, cy + s.y*scale, scale*1.5, scale*1.5); }); if (introProgress > 0.4) { gxCtx.globalAlpha = (introProgress - 0.4) * 1.6; const grd = gxCtx.createRadialGradient(cx, cy, 0, cx, cy, 180); grd.addColorStop(0, 'rgba(255,255,255,0.9)'); grd.addColorStop(0.08, 'rgba(0,0,0,1)'); grd.addColorStop(0.2, 'rgba(148,0,211,0.6)'); grd.addColorStop(0.5, 'rgba(255,20,147,0.2)'); grd.addColorStop(1, 'transparent'); gxCtx.fillStyle = grd; gxCtx.fillRect(cx-180, cy-180, 360, 360); } gxParticles.forEach(p => { let swirlSpeed = p.speed + (1 - introProgress) * 0.1; p.angle += swirlSpeed; p.radius += (p.targetRadius - p.radius) * 0.05; const px = cx + Math.cos(p.angle) * p.radius; const py = cy + Math.sin(p.angle) * p.radius * 0.25; gxCtx.globalAlpha = 0.8; gxCtx.fillStyle = p.color; gxCtx.fillRect(px, py, p.size, p.size); }); if (introProgress >= 1 && introPhase) { introPhase = false; document.querySelector('.center-heart').classList.add('show'); document.getElementById('orbit-container').classList.add('show'); } if (!introPhase) { const orbitSpeed = gxTime * 0.05; const radiusX = Math.min(w * 0.4, 400); const radiusY = Math.min(h * 0.15, 150); orbitElements.forEach(item => { const angle = orbitSpeed + item.offset; const x = Math.cos(angle) * radiusX; const y = Math.sin(angle) * radiusY; const scale = (Math.sin(angle) + 2.5) / 3.5; const zIndex = Math.round(scale * 100); item.el.style.transform = `translate(-50%, -50%) translate(${cx + x}px, ${cy + y}px) scale(${scale})`; item.el.style.zIndex = zIndex; }); } }
document.getElementById("close-popup").addEventListener("click", () => document.getElementById("popup-modal").classList.add("hidden"));

// --- 5. MINI LOVE QUIZ ---
let quizPhase = 1; 
const correctAns1 = "mall mari"; const correctAns2 = "100"; const correctAns3 = "2026-04-26"; 
document.getElementById("submit-quiz").addEventListener("click", checkQuizAnswer);

function startQuiz() {
    quizPhase = 1; document.getElementById("q1").classList.remove("hidden"); document.getElementById("q2").classList.add("hidden"); document.getElementById("q3").classList.add("hidden"); document.getElementById("quiz-error").classList.add("hidden"); document.getElementById("submit-quiz").innerText = "Kirim Jawaban 💌"; document.getElementById("ans1").value = ""; document.getElementById("ans2").value = ""; document.getElementById("ans3").value = ""; 
}

function checkQuizAnswer() {
    const errorMsg = document.getElementById("quiz-error");
    if (quizPhase === 1) {
        if (document.getElementById("ans1").value.toLowerCase().trim() === correctAns1) {
            quizPhase = 2; document.getElementById("q1").classList.add("hidden"); errorMsg.classList.add("hidden"); document.getElementById("q2").classList.remove("hidden");
        } else { errorMsg.innerText = "Hmm, yakin nama tempatnya itu? Coba inget-inget lagi sayang! 🤔"; showQuizError(); }
    } else if (quizPhase === 2) {
        if (document.getElementById("ans2").value.trim() === correctAns2) {
            quizPhase = 3; document.getElementById("q2").classList.add("hidden"); errorMsg.classList.add("hidden"); document.getElementById("q3").classList.remove("hidden"); document.getElementById("submit-quiz").innerText = "Buka Kado Utama 🎁";
        } else { errorMsg.innerText = "Masa cuma segitu? Yakin? Coba tambah lagi dong nilainya! 😜"; showQuizError(); }
    } else if (quizPhase === 3) {
        if (document.getElementById("ans3").value === correctAns3) {
            errorMsg.classList.add("hidden"); setTimeout(() => { goToSlide(6); }, 500); 
        } else { errorMsg.innerText = "Aduh parah banget, masa tanggal jadian kita sendiri lupa? 🥺 Coba inget lagi!"; showQuizError(); }
    }
}
function showQuizError() { const errorMsg = document.getElementById("quiz-error"); errorMsg.classList.remove("hidden"); document.getElementById("quiz-box").style.animation = "shakeError 0.5s"; setTimeout(() => document.getElementById("quiz-box").style.animation = "", 500); }

// --- 6. SURAT TERKETIK ---
let typingActive = false; let typingTimeout;
function startTypewriter() {
  const textElement = document.getElementById("typewriter-text"); const btnToMemories = document.getElementById("btn-to-memories"); textElement.innerHTML = ""; btnToMemories.classList.add("hidden");
  const pesanSurat = "Happy Birthday, Dian! 🎉💖\n\nDi hari ulang tahunmu yang begitu spesial ini, aku ingin kamu tahu betapa berharganya dirimu di hidupku. Terima kasih sudah hadir, bukan hanya sekadar datang, tapi juga bertahan dan menemani setiap langkahku dengan penuh cinta.\n\nCintaku padamu tak pernah berkurang, justru semakin tumbuh setiap hari. Kamu adalah alasan di balik senyumku, bahkan di saat dunia terasa berat.\n\nKamu adalah tempat nyaman yang selalu ingin aku tuju. Bersamamu, aku merasa lengkap, seolah kita adalah dua jiwa satu hati yang dipertemukan untuk saling melengkapi.\n\nSenyum manismu adalah hal sederhana yang selalu berhasil membuat hariku lebih indah. Dan di hari ini, aku hanya ingin melihat kamu tersenyum lebih bahagia dari sebelumnya.\n\nSemoga semua impianmu bisa segera tercapai. Aku akan selalu ada untukmu, hari ini, esok, dan selamanya.\n\nI love you to the moon and back… and more than that, always. 💕✨";
  let indexHuruf = 0; typingActive = true;
  function ngetik() {
    if (!typingActive || currentSlide !== 6) return;
    if (indexHuruf < pesanSurat.length) { textElement.innerHTML += (pesanSurat.charAt(indexHuruf) === '\n') ? "<br>" : pesanSurat.charAt(indexHuruf); indexHuruf++; typingTimeout = setTimeout(ngetik, 40); } else { btnToMemories.classList.remove("hidden"); }
  }
  clearTimeout(typingTimeout); ngetik();
}
document.getElementById("btn-to-memories").addEventListener("click", () => goToSlide(7));

// --- 7. LOGIKA ALBUM SLIDER MEMORIES ---
const memoryData = [
    { src: "img/video1.mp4", type: "video", title: "Momen Lucu", text: "Tingkah gemesmu yang satu ini selalu sukses bikin aku ketawa dan makin sayang." },
    { src: "img/foto2.jpeg", type: "image", title: "Bersamamu", text: "Setiap detik yang aku habiskan bersamamu adalah kenangan manis yang selalu aku simpan." },
    { src: "img/foto3.jpeg", type: "image", title: "Tawa & Canda", text: "Terima kasih ya sayang udah selalu mau berbagi cerita, tawa, dan hal-hal random sama aku." },
    { src: "img/foto4.jpeg", type: "image", title: "Tempat Nyaman", text: "Di dekatmu, aku selalu menemukan tempat paling aman dan nyaman untuk pulang." },
    { src: "img/foto5.jpeg", type: "image", title: "Cinta Kamu", text: "Semoga kita terus sama-sama mengukir lebih banyak kenangan indah lainnya. I love you!" }
];
let currentMemoryIndex = 0; 
function openMemory(index) { currentMemoryIndex = index; updateMemoryModal(); document.getElementById("memory-modal").classList.remove("hidden"); }
function updateMemoryModal() {
    const data = memoryData[currentMemoryIndex]; const imgEl = document.getElementById("memory-img"); const vidEl = document.getElementById("memory-video"); const counterEl = document.getElementById("memory-counter");
    vidEl.pause();
    if (data.type === "video") { imgEl.classList.add("hidden"); vidEl.classList.remove("hidden"); vidEl.src = data.src; vidEl.play().catch(e => console.log("Manual play needed")); } 
    else { vidEl.classList.add("hidden"); imgEl.classList.remove("hidden"); imgEl.src = data.src; }
    document.getElementById("memory-title").innerText = data.title; document.getElementById("memory-text").innerText = data.text; counterEl.innerText = (currentMemoryIndex + 1) + " / " + memoryData.length;
}
document.getElementById("prev-memory").addEventListener("click", () => { currentMemoryIndex--; if (currentMemoryIndex < 0) currentMemoryIndex = memoryData.length - 1; updateMemoryModal(); });
document.getElementById("next-memory").addEventListener("click", () => { currentMemoryIndex++; if (currentMemoryIndex >= memoryData.length) currentMemoryIndex = 0; updateMemoryModal(); });
document.getElementById("close-memory").addEventListener("click", () => { document.getElementById("memory-modal").classList.add("hidden"); document.getElementById("memory-video").pause(); });

document.getElementById("btn-to-journey").addEventListener("click", () => goToSlide(8)); // Lanjut Ke Halaman Terakhir

// --- DEKORASI JATUH (Di Halaman Tertentu) ---
function createFallingHearts() {
    setInterval(() => {
        // HANYA MUNCUL DI Prank(1), Countdown(2), Quiz(5), Surat(6), Memories(7), Journey(8)
        // Kembang Api(3) dan Galaxy(4) DIJAMIN BERSIH
        if (![1, 2, 5, 6, 7, 8].includes(currentSlide)) return;
        const heart = document.createElement("div"); heart.classList.add("heart"); 
        heart.innerHTML = ["❤️", "🌸", "✨", "⭐", "💕"][Math.floor(Math.random()*5)];
        heart.style.left = (Math.random() * 95) + "vw"; 
        heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
        document.body.appendChild(heart); 
        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

// --- 8. LIVE LOVE COUNTER & SPOTIFY ---
const anniversaryDate = new Date("2026-04-26T00:00:00"); 
function updateLoveTimer() {
    const now = new Date(); const difference = now - anniversaryDate; 
    document.getElementById("timer-days").innerText = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    document.getElementById("timer-hours").innerText = String(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    document.getElementById("timer-minutes").innerText = String(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    document.getElementById("timer-seconds").innerText = String(Math.floor((difference % (1000 * 60)) / 1000)).padStart(2, '0');
}
setInterval(updateLoveTimer, 1000); updateLoveTimer(); 

const audio1 = document.getElementById("audio-1"); const audio2 = document.getElementById("audio-2");
function pauseMainMusic() { if(bgMusic && !bgMusic.paused) { bgMusic.pause(); document.getElementById("music-toggle").innerHTML = '<i class="fas fa-volume-mute"></i>'; } }
if(audio1) { audio1.addEventListener("play", () => { pauseMainMusic(); if(audio2 && !audio2.paused) audio2.pause(); }); }
if(audio2) { audio2.addEventListener("play", () => { pauseMainMusic(); if(audio1 && !audio1.paused) audio1.pause(); }); }

// --- LOGIKA KADO PILIHAN, WISH BOX & TELEGRAM ---
const TELE_TOKEN = "8745715469:AAEYuLi1BHVIGOFrjhv3ut8df57ZHFXSxPM";
const TELE_CHATID = "5301490118";
function kirimNotifRahasia(pesan) { const url = `https://api.telegram.org/bot${TELE_TOKEN}/sendMessage?chat_id=${TELE_CHATID}&text=${encodeURIComponent(pesan)}`; fetch(url).catch(err => console.log("Gagal kirim tele:", err)); }

const wadahKado = document.getElementById("mystery-gift-container"); const daftarKotak = document.querySelectorAll(".mystery-box"); const boxSuksesKado = document.getElementById("gift-success"); const teksHasilKado = document.getElementById("selected-gift-text");
if (localStorage.getItem("kadoDianFixTerkunci")) { const kadoLama = localStorage.getItem("namaKadoDianFix"); if(wadahKado) wadahKado.style.display = "none"; if(teksHasilKado) teksHasilKado.innerText = kadoLama; if(boxSuksesKado) boxSuksesKado.classList.remove("hidden"); }

daftarKotak.forEach(kotak => {
    kotak.addEventListener("click", function(e) {
        const pilihanDian = this.getAttribute("data-gift");
        localStorage.setItem("namaKadoDianFix", pilihanDian); localStorage.setItem("kadoDianFixTerkunci", "true");
        kirimNotifRahasia(`🎁 KADO DIAN: Dian baru saja memilih Kado!\nHadiah yang diminta: ${pilihanDian}`);
        if(wadahKado) wadahKado.style.display = "none"; if(teksHasilKado) teksHasilKado.innerText = pilihanDian; if(boxSuksesKado) { boxSuksesKado.classList.remove("hidden"); boxSuksesKado.style.animation = "zoomInPopup 0.5s forwards"; }
        createClickHeart(e.clientX, e.clientY);
    });
});

const inputDoa = document.getElementById("wish-input"); const btnSimpanDoa = document.getElementById("submit-wish"); const suksesDoa = document.getElementById("wish-success");
if (localStorage.getItem("wishDianFixTerkunci")) { if(inputDoa) inputDoa.style.display = "none"; if(btnSimpanDoa) btnSimpanDoa.style.display = "none"; if(suksesDoa) suksesDoa.classList.remove("hidden"); }

if (btnSimpanDoa) {
    btnSimpanDoa.addEventListener("click", function(e) {
        const isiDoa = inputDoa.value.trim();
        if (isiDoa.length < 5) { alert("Tulis doanya yang lengkap dong sayang! 😉"); return; }
        localStorage.setItem("teksWishDianFix", isiDoa); localStorage.setItem("wishDianFixTerkunci", "true");
        kirimNotifRahasia(`💌 WISH DIAN: Dian menulis harapan baru!\nIsi Doa: "${isiDoa}"`);
        if(inputDoa) inputDoa.style.display = "none"; if(btnSimpanDoa) btnSimpanDoa.style.display = "none"; if(suksesDoa) { suksesDoa.classList.remove("hidden"); suksesDoa.style.animation = "zoomInPopup 0.5s forwards"; }
        createClickHeart(e.clientX, e.clientY);
    });
}
