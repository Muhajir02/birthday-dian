// ==========================================
// URUTAN HALAMAN LENGKAP: Login -> Prank -> Countdown -> Fireworks -> Galaxy -> Quiz -> Surat -> Memories
// ==========================================
const slides = ["login-section", "prank-section", "countdown-section", "fireworks-section", "galaxy-section", "quiz-section", "typewriter-section", "memories-section"];
let currentSlide = 0;
let fireworksStarted = false; 
let galaxyStarted = false;
let quizStarted = false;
let fallingHeartsStarted = false;

const navControls = document.getElementById("nav-controls");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// ========================================================
// FITUR 1: CLICK PARTICLE (HATI TERBANG SAAT LAYAR DIKLIK)
// ========================================================
document.addEventListener('click', function(e) {
    const targetTag = e.target.tagName.toLowerCase();
    if(targetTag === 'input' || targetTag === 'textarea' || targetTag === 'button' || e.target.closest('button')) return;
    createClickHeart(e.clientX, e.clientY);
});

document.addEventListener('touchstart', function(e) {
    const targetTag = e.target.tagName.toLowerCase();
    if(targetTag === 'input' || targetTag === 'textarea' || targetTag === 'button' || e.target.closest('button')) return;
    createClickHeart(e.touches[0].clientX, e.touches[0].clientY);
}, {passive: true});

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
// LOGIKA SISTEM UTAMA & NAVIGASI
// ==========================================
function updateNav() {
    if (currentSlide === 0) {
        navControls.classList.add("hidden"); 
    } else {
        navControls.classList.remove("hidden");
        if (currentSlide <= 3) { btnPrev.style.display = "none"; } else { btnPrev.style.display = "flex"; }
        if (currentSlide <= 3 || currentSlide === 6 || currentSlide === 7) { btnNext.style.display = "none"; } else { btnNext.style.display = "flex"; }
    }
}

function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    document.getElementById("memory-modal").classList.add("hidden");
    const memVid = document.getElementById("memory-video");
    if(memVid) memVid.pause();
    
    const oldSlide = document.getElementById(slides[currentSlide]);
    if(oldSlide) oldSlide.classList.add("hidden");
    
    currentSlide = index;
    const newSlide = document.getElementById(slides[currentSlide]);
    if(newSlide) newSlide.classList.remove("hidden");
    
    // PINTU BEROPERASI SECARA NORMAL
    if (currentSlide === 0) {
        document.getElementById("door-left").classList.remove("open-left");
        document.getElementById("door-right").classList.remove("open-right");
        document.querySelector('.login-box').style.opacity = "1";
        document.getElementById("password-input").value = ""; 
    } else {
        document.getElementById("door-left").classList.add("open-left");
        document.getElementById("door-right").classList.add("open-right");
    }

    if (currentSlide === 3) document.getElementById("tap-hint").style.display = "block";
    if (currentSlide === 3 && !fireworksStarted) { startFireworks(); fireworksStarted = true; }
    if (currentSlide === 4 && !galaxyStarted) { startGalaxyAnimation(); galaxyStarted = true; }
    if (currentSlide === 5) { startQuiz(); } 
    if (currentSlide === 6) { startTypewriter(); } 
    
    // FITUR EFEK JATUH MENYALA DI PRANK(1), COUNTDOWN(2), SURAT(6), MEMORIES(7)
    if ((currentSlide === 1 || currentSlide === 2 || currentSlide === 6 || currentSlide === 7) && !fallingHeartsStarted) { 
        createFallingHearts(); fallingHeartsStarted = true; 
    }
    
    if(newSlide) newSlide.scrollTo(0, 0);
    updateNav();
}

btnPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
btnNext.addEventListener("click", () => goToSlide(currentSlide + 1));

const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");

musicBtn.addEventListener("click", () => { 
    if (bgMusic.paused) { 
        bgMusic.play(); 
        musicBtn.innerHTML = '<i class="fas fa-music"></i>'; 
    } else { 
        bgMusic.pause(); 
        musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>'; 
    } 
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

function createLoginSparkles() {
    const loginSection = document.getElementById("login-section");
    const symbols = ["✨", "💛", "💕", "⭐"];
    setInterval(() => {
        if (loginSection.classList.contains("hidden")) return;
        const sp = document.createElement("div"); sp.className = "login-sparkle";
        sp.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        sp.style.left = Math.random() * 90 + "vw"; 
        sp.style.animationDuration = (Math.random() * 4 + 5) + "s";
        loginSection.appendChild(sp); setTimeout(() => sp.remove(), 9000);
    }, 400);
}
createLoginSparkles();

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
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        btnNggakPrank.style.position = 'fixed';
        btnNggakPrank.style.left = randomX + 'px';
        btnNggakPrank.style.top = randomY + 'px';
    }

    btnIyaPrank.addEventListener("click", () => {
        goToSlide(2); // Lanjut ke Countdown
    });
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

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if(document.getElementById("bday-days")) {
        document.getElementById("bday-days").innerText = String(days).padStart(2, '0');
        document.getElementById("bday-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("bday-minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("bday-seconds").innerText = String(seconds).padStart(2, '0');
    }
}
setInterval(updateUltahTimer, 1000);
updateUltahTimer();

const btnLanjutCountdown = document.getElementById("btn-lanjut-countdown");
if(btnLanjutCountdown) {
    btnLanjutCountdown.addEventListener("click", () => {
        goToSlide(3); // Menuju Kembang Api
    });
}

// --- 2. KEMBANG API ---
const fwCanvas = document.getElementById("fireworks-canvas"); const fwCtx = fwCanvas.getContext("2d", { alpha: false }); 
const fwSection = document.getElementById("fireworks-section"); let fwRockets = [], fwParticles = [], fwStars = [], fwAnimationId;
const wishes = ["HAPPY BIRTHDAY\nDIAN! 🎉", "WISH YOU ALL\nTHE BEST", "SUKACITA & CINTA", "SUKSES SELALU ✨", "SEMOGA IMPIANMU\nTERCAPAI 🌟", "I LOVE YOU! 💕"];
let wishIndex = 0, lastTapTime = 0; const rainbowColors = ['#ff4081', '#00e5ff', '#76ff03', '#ffff00', '#ea80fc', '#ff6a00', '#00ffaa'];

const toGalaxyBtn = document.createElement("button"); toGalaxyBtn.innerHTML = "Lanjut Liat Semesta ✨"; toGalaxyBtn.className = "pulse-btn"; 
toGalaxyBtn.style.position = "absolute"; toGalaxyBtn.style.bottom = "100px"; toGalaxyBtn.style.left = "50%"; toGalaxyBtn.style.transform = "translateX(-50%)"; toGalaxyBtn.style.display = "none"; toGalaxyBtn.style.zIndex = "100"; toGalaxyBtn.style.width = "80%"; toGalaxyBtn.style.maxWidth = "280px"; toGalaxyBtn.style.whiteSpace = "normal";
fwSection.appendChild(toGalaxyBtn); toGalaxyBtn.addEventListener("click", (e) => { e.stopPropagation(); goToSlide(4); }); // Lanjut Galaksi

fwSection.addEventListener("click", function(e) {
    if (Date.now() - lastTapTime < 50) return; lastTapTime = Date.now(); document.getElementById("tap-hint").style.display = "none";
    fwRockets.push(new FwRocket(e.clientX, e.clientY, wishes[wishIndex % wishes.length])); wishIndex++; if (wishIndex >= 5) toGalaxyBtn.style.display = "block";
});
for (let i=0; i<150; i++) fwStars.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, s: Math.random()*2+1.5, alpha: Math.random(), speed: Math.random()*1.5+0.5 });

class FwRocket {
    constructor(tx, ty, text) { this.tx = tx; this.ty = ty; this.x = window.innerWidth/2; this.y = window.innerHeight; this.text = text; this.color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]; this.speed = 25; this.exploded = false; const angle = Math.atan2(this.ty - this.y, this.tx - this.x); this.vx = Math.cos(angle)*this.speed; this.vy = Math.sin(angle)*this.speed; this.lastX = this.x; this.lastY = this.y; }
    update() {
        this.lastX = this.x; this.lastY = this.y; this.x += this.vx; this.y += this.vy; 
        fwCtx.beginPath(); fwCtx.moveTo(this.lastX, this.lastY); fwCtx.lineTo(this.x, this.y); fwCtx.strokeStyle = this.color; fwCtx.lineWidth = 4; fwCtx.lineCap = "round"; fwCtx.globalAlpha = 1; fwCtx.stroke();
        if (this.y <= this.ty && !this.exploded) { this.exploded = true; for(let i=0; i<80; i++) { fwParticles.push(new FwParticle(this.x, this.y, rainbowColors[Math.floor(Math.random() * rainbowColors.length)])); } showWishText(this.text, this.color, this.x, this.y); }
    }
}
class FwParticle {
    constructor(x, y, color) { this.x = x; this.y = y; this.color = color; const angle = Math.random()*Math.PI*2; const speed = Math.random()*12+2; this.vx = Math.cos(angle)*speed; this.vy = Math.sin(angle)*speed; this.alpha = 1; this.friction = 0.95; this.gravity = 0.08; this.lastX = this.x; this.lastY = this.y; this.decay = Math.random() * 0.015 + 0.01; }
    update() { this.lastX = this.x; this.lastY = this.y; this.vx *= this.friction; this.vy *= this.friction; this.vy += this.gravity; this.x += this.vx; this.y += this.vy; this.alpha -= this.decay; fwCtx.beginPath(); fwCtx.moveTo(this.lastX, this.lastY); fwCtx.lineTo(this.x, this.y); fwCtx.strokeStyle = this.color; fwCtx.lineWidth = 2; fwCtx.lineCap = "round"; fwCtx.globalAlpha = this.alpha; fwCtx.stroke(); }
}
function showWishText(text, color, x, y) { const h1 = document.createElement("h1"); h1.className = "glow-text"; h1.innerHTML = text.replace(/\n/g, '<br>'); h1.style.left = (x + (Math.random()-0.5)*40)+"px"; h1.style.top = (y + (Math.random()-0.5)*40)+"px"; h1.style.textShadow = `0 0 10px ${color}, 0 0 25px ${color}`; document.getElementById("dynamic-text").appendChild(h1); setTimeout(() => h1.remove(), 2500); }
function startFireworks() {
    const dpr = window.devicePixelRatio || 1; fwCanvas.width = window.innerWidth * dpr; fwCanvas.height = window.innerHeight * dpr; fwCanvas.style.width = window.innerWidth + 'px'; fwCanvas.style.height = window.innerHeight + 'px'; fwCtx.scale(dpr, dpr);
    function animate() { fwAnimationId = requestAnimationFrame(animate); fwCtx.globalCompositeOperation = 'destination-out'; fwCtx.fillStyle = 'rgba(0, 0, 0, 0.15)'; fwCtx.fillRect(0, 0, window.innerWidth, window.innerHeight); fwCtx.globalCompositeOperation = 'source-over'; fwCtx.fillStyle = 'white'; fwStars.forEach(s => { fwCtx.globalAlpha = s.alpha; fwCtx.fillRect(s.x, s.y, s.s, s.s); s.y -= s.speed; if (s.y < 0) { s.y = window.innerHeight; s.x = Math.random() * window.innerWidth; } s.alpha += (Math.random()-0.5)*0.1; if(s.alpha < 0.1) s.alpha=0.1; if(s.alpha > 1) s.alpha=1; }); fwCtx.globalAlpha = 1; for (let i = fwRockets.length-1; i>=0; i--) { if (fwRockets[i].exploded) fwRockets.splice(i, 1); else fwRockets[i].update(); } for (let i = fwParticles.length-1; i>=0; i--) { if (fwParticles[i].alpha <= 0) fwParticles.splice(i, 1); else fwParticles[i].update(); } if (fwParticles.length > 500) fwParticles.splice(0, fwParticles.length - 500); } animate();
}

// --- 3. GALAKSI 3D ---
const gxCanvas = document.getElementById("galaxy-canvas"); const gxCtx = gxCanvas.getContext("2d", { alpha: false }); let gxAnimationId, gxParticles = [], bgStars = [], orbitElements = [], gxTime = 0; let galaxyStartTime = 0; let introPhase = true;
const orbitData = [ { emoji: "🧸", label: "Tempat Nyaman", title: "Tempat Nyaman", text: "Kamu adalah tempat nyaman yang selalu ingin aku pulang. Di dekatmu, semua rasa lelah hilang, dan hatiku selalu menemukan kedamaian yang tak tergantikan." }, { emoji: "💖", label: "Dua Jiwa", title: "Dua Jiwa Satu Hati", text: "Kita adalah dua jiwa satu hati, dipertemukan oleh takdir untuk saling melengkapi. Dalam setiap langkah, aku ingin terus berjalan bersamamu tanpa ragu." }, { emoji: "✨", label: "Senyum Manismu", title: "Senyum Manismu", text: "Senyum manismu adalah cahaya yang menerangi hariku. Bahkan di saat gelap, hanya dengan mengingatmu, semuanya terasa lebih hangat dan penuh harapan." }, { emoji: "💌", label: "Pesan Rahasia", title: "Pesan Rahasia", text: "Mungkin aku tidak bilang setiap detik, tapi ingatlah I LOVE YOU." }, { emoji: "🌹", label: "Cintaku Padamu", title: "Cintaku Padamu", text: "Cintaku padamu tak pernah berkurang, justru semakin tumbuh setiap hari. Di setiap detik yang kita lewati, aku semakin yakin bahwa kamu adalah alasan terindah dalam hidupku." }, { emoji: "🎀", label: "Selamanya", title: "Selamanya", text: "Selamanya untukmu, aku berjanji akan menjaga, mencintai, dan menemanimu dalam setiap suka dan duka. Kamu bukan hanya hari ini, tapi masa depanku." } ];
function initGalaxy() { const dpr = window.devicePixelRatio || 1; const w = window.innerWidth; const h = window.innerHeight; gxCanvas.width = w * dpr; gxCanvas.height = h * dpr; gxCanvas.style.width = w + "px"; gxCanvas.style.height = h + "px"; gxCtx.scale(dpr, dpr); gxParticles = []; bgStars = []; for(let i=0; i<300; i++) bgStars.push({ x: (Math.random()-0.5)*w*2, y: (Math.random()-0.5)*h*2, z: Math.random()*2000 }); for(let i=0; i<1500; i++) { let targetR = Math.random()*(Math.min(w, h)*0.7); gxParticles.push({ angle: Math.random()*Math.PI*20, targetRadius: targetR, radius: targetR + 1000 + Math.random()*1000, speed: Math.random()*0.003+0.001, size: Math.random()*2+0.5, color: `hsl(${Math.random()*60+260}, 100%, 70%)` }); } if(orbitElements.length === 0) createOrbitingElements(); }
function createOrbitingElements() { const container = document.getElementById("orbit-container"); orbitData.forEach((data, i) => { const item = document.createElement("div"); item.className = "orbit-item"; item.innerHTML = `<div class="orbit-icon-sphere">${data.emoji}</div><div class="orbit-label">${data.label}</div>`; item.addEventListener("click", () => { document.getElementById("popup-emoji").innerText = data.emoji; document.getElementById("popup-title").innerText = data.title; document.getElementById("popup-text").innerText = data.text; document.getElementById("popup-modal").classList.remove("hidden"); }); container.appendChild(item); orbitElements.push({ el: item, offset: i * (Math.PI * 2 / orbitData.length) }); }); }
function startGalaxyAnimation() { if(gxAnimationId) cancelAnimationFrame(gxAnimationId); initGalaxy(); galaxyStartTime = Date.now(); introPhase = true; document.querySelector('.center-heart').classList.remove('show'); document.getElementById('orbit-container').classList.remove('show'); animateGalaxy(); window.addEventListener('resize', initGalaxy); }
function animateGalaxy() { const w = window.innerWidth; const h = window.innerHeight; gxAnimationId = requestAnimationFrame(animateGalaxy); gxTime += 0.05; const cx = w/2, cy = h/2; let elapsed = Date.now() - galaxyStartTime; let introProgress = Math.min(1, elapsed / 4000); gxCtx.globalAlpha = 1; gxCtx.fillStyle = 'rgba(5, 2, 10, 0.4)'; gxCtx.fillRect(0, 0, w, h); gxCtx.fillStyle = 'white'; bgStars.forEach(s => { let starSpeed = 2 + (1 - introProgress) * 15; s.z -= starSpeed; if(s.z <= 0) { s.z = 2000; s.x = (Math.random()-0.5)*w*2; s.y = (Math.random()-0.5)*h*2; } const scale = 500 / s.z; gxCtx.globalAlpha = Math.min(1, scale * 0.5); gxCtx.fillRect(cx + s.x*scale, cy + s.y*scale, scale*1.5, scale*1.5); }); if (introProgress > 0.4) { gxCtx.globalAlpha = (introProgress - 0.4) * 1.6; const grd = gxCtx.createRadialGradient(cx, cy, 0, cx, cy, 180); grd.addColorStop(0, 'rgba(255,255,255,0.9)'); grd.addColorStop(0.08, 'rgba(0,0,0,1)'); grd.addColorStop(0.2, 'rgba(148,0,211,0.6)'); grd.addColorStop(0.5, 'rgba(255,20,147,0.2)'); grd.addColorStop(1, 'transparent'); gxCtx.fillStyle = grd; gxCtx.fillRect(cx-180, cy-180, 360, 360); } gxParticles.forEach(p => { let swirlSpeed = p.speed + (1 - introProgress) * 0.1; p.angle += swirlSpeed; p.radius += (p.targetRadius - p.radius) * 0.05; const px = cx + Math.cos(p.angle) * p.radius; const py = cy + Math.sin(p.angle) * p.radius * 0.25; gxCtx.globalAlpha = 0.8; gxCtx.fillStyle = p.color; gxCtx.fillRect(px, py, p.size, p.size); }); if (introProgress >= 1 && introPhase) { introPhase = false; document.querySelector('.center-heart').classList.add('show'); document.getElementById('orbit-container').classList.add('show'); } if (!introPhase) { const orbitSpeed = gxTime * 0.05; const radiusX = Math.min(w * 0.4, 400); const radiusY = Math.min(h * 0.15, 150); orbitElements.forEach(item => { const angle = orbitSpeed + item.offset; const x = Math.cos(angle) * radiusX; const y = Math.sin(angle) * radiusY; const scale = (Math.sin(angle) + 2.5) / 3.5; const zIndex = Math.round(scale * 100); item.el.style.transform = `translate(-50%, -50%) translate(${cx + x}px, ${cy + y}px) scale(${scale})`; item.el.style.zIndex = zIndex; }); } }
document.getElementById("close-popup").addEventListener("click", () => document.getElementById("popup-modal").classList.add("hidden"));

// ==========================================
// FITUR 2: MINI LOVE QUIZ 
// ==========================================
let quizPhase = 1; 
const correctAns1 = "mall mari"; 
const correctAns2 = "100";  
const correctAns3 = "2026-04-26"; 

document.getElementById("submit-quiz").addEventListener("click", checkQuizAnswer);
document.getElementById("ans1").addEventListener("keypress", (e) => { if (e.key === "Enter") checkQuizAnswer(); });
document.getElementById("ans2").addEventListener("keypress", (e) => { if (e.key === "Enter") checkQuizAnswer(); });
document.getElementById("ans3").addEventListener("keypress", (e) => { if (e.key === "Enter") checkQuizAnswer(); });

function startQuiz() {
    quizPhase = 1;
    document.querySelector('.quiz-container').style.opacity = "1"; 
    document.getElementById("q1").classList.remove("hidden");
    document.getElementById("q2").classList.add("hidden");
    document.getElementById("q3").classList.add("hidden");
    document.getElementById("quiz-error").classList.add("hidden");
    document.getElementById("submit-quiz").innerText = "Kirim Jawaban 💌";
    document.getElementById("ans1").value = "";
    document.getElementById("ans2").value = "";
    document.getElementById("ans3").value = ""; 
    document.getElementById("ans1").focus();
}

function checkQuizAnswer() {
    const errorMsg = document.getElementById("quiz-error");
    if (quizPhase === 1) {
        const userAns1 = document.getElementById("ans1").value.toLowerCase().trim();
        if (userAns1 === correctAns1) {
            quizPhase = 2;
            document.getElementById("q1").classList.add("hidden");
            errorMsg.classList.add("hidden");
            document.getElementById("q2").classList.remove("hidden");
            document.getElementById("ans2").focus();
        } else {
            errorMsg.innerText = "Hmm, yakin nama tempatnya itu? Coba inget-inget lagi sayang! 🤔";
            showQuizError();
        }
    } 
    else if (quizPhase === 2) {
        const userAns2 = document.getElementById("ans2").value.trim();
        if (userAns2 === correctAns2) {
            quizPhase = 3;
            document.getElementById("q2").classList.add("hidden");
            errorMsg.classList.add("hidden");
            document.getElementById("q3").classList.remove("hidden");
            document.getElementById("submit-quiz").innerText = "Buka Kado Utama 🎁";
            document.getElementById("ans3").focus();
        } else {
            errorMsg.innerText = "Masa cuma segitu? Yakin? Coba tambah lagi dong nilainya! 😜";
            showQuizError();
        }
    } 
    else if (quizPhase === 3) {
        const userAns3 = document.getElementById("ans3").value; 
        if (userAns3 === correctAns3) {
            errorMsg.classList.add("hidden");
            document.querySelector('.quiz-container').style.opacity = "0"; 
            for(let i=0; i<30; i++) {
                fwParticles.push(new FwParticle(window.innerWidth/2, window.innerHeight/2 + 100, rainbowColors[Math.floor(Math.random() * rainbowColors.length)]));
            }
            setTimeout(() => { goToSlide(6); }, 800); // Ke Typewriter
        } else {
            errorMsg.innerText = "Aduh parah banget, masa tanggal jadian kita sendiri lupa? Kebangetan! 🥺 Coba inget lagi!";
            showQuizError();
        }
    }
}

function showQuizError() {
    const errorMsg = document.getElementById("quiz-error");
    errorMsg.classList.remove("hidden");
    document.getElementById("quiz-box").style.animation = "shakeError 0.5s";
    setTimeout(() => document.getElementById("quiz-box").style.animation = "", 500);
}

// --- 4. SURAT TERKETIK ---
let typingActive = false;
let typingTimeout;

function startTypewriter() {
  const textElement = document.getElementById("typewriter-text");
  const btnToMemories = document.getElementById("btn-to-memories");

  textElement.innerHTML = "";
  btnToMemories.classList.add("hidden");

  const pesanSurat = "Happy Birthday, Dian! 🎉💖\n\nDi hari ulang tahunmu yang begitu spesial ini, aku ingin kamu tahu betapa berharganya dirimu di hidupku. Terima kasih sudah hadir, bukan hanya sekadar datang, tapi juga bertahan dan menemani setiap langkahku dengan penuh cinta.\n\nCintaku padamu tak pernah berkurang, justru semakin tumbuh setiap hari. Kamu adalah alasan di balik senyumku, bahkan di saat dunia terasa berat.\n\nKamu adalah tempat nyaman yang selalu ingin aku tuju. Bersamamu, aku merasa lengkap, seolah kita adalah dua jiwa satu hati yang dipertemukan untuk saling melengkapi.\n\nSenyum manismu adalah hal sederhana yang selalu berhasil membuat hariku lebih indah. Dan di hari ini, aku hanya ingin melihat kamu tersenyum lebih bahagia dari sebelumnya.\n\nSemoga semua impianmu bisa segera tercapai. Aku akan selalu ada untukmu, hari ini, esok, dan selamanya.\n\nI love you to the moon and back… and more than that, always. 💕✨";

  let indexHuruf = 0;
  typingActive = true;

  function ngetik() {
    if (!typingActive || currentSlide !== 6) return;

    if (indexHuruf < pesanSurat.length) {
      if (pesanSurat.charAt(indexHuruf) === '\n') {
        textElement.innerHTML += "<br>";
      } else {
        textElement.innerHTML += pesanSurat.charAt(indexHuruf);
      }
      indexHuruf++;
      typingTimeout = setTimeout(ngetik, 40);
    } else {
      btnToMemories.classList.remove("hidden");
    }
  }

  clearTimeout(typingTimeout);
  ngetik();
}

document.getElementById("btn-to-memories").addEventListener("click", () => {
  goToSlide(7);
});
document.getElementById("btn-to-memories").addEventListener("click", () => { goToSlide(7); }); // Ke Memories

// --- 5. LOGIKA ALBUM SLIDER MEMORIES ---
const memoryData = [
    { src: "img/video1.mp4", type: "video", title: "Momen Lucu", text: "Tingkah gemesmu yang satu ini selalu sukses bikin aku ketawa dan makin sayang." },
    { src: "img/foto2.jpeg", type: "image", title: "Bersamamu", text: "Setiap detik yang aku habiskan bersamamu adalah kenangan manis yang selalu aku simpan." },
    { src: "img/foto3.jpeg", type: "image", title: "Tawa & Canda", text: "Terima kasih ya sayang udah selalu mau berbagi cerita, tawa, dan hal-hal random sama aku." },
    { src: "img/foto4.jpeg", type: "image", title: "Tempat Nyaman", text: "Di dekatmu, aku selalu menemukan tempat paling aman dan nyaman untuk pulang." },
    { src: "img/foto5.jpeg", type: "image", title: "Cinta Kamu", text: "Semoga kita terus sama-sama mengukir lebih banyak kenangan indah lainnya. I love you!" },
    { src: "img/foto6.jpeg", type: "image", title: "Paling Gemes!", text: "Suka banget kalau liat kamu lagi pose lucu kayak gini, bener-bener gak pernah gagal bikin gemes!" },
    { src: "img/foto7.jpeg", type: "image", title: "Bahagia Terus Ya", text: "Harapan aku di umurmu yang baru ini simpel: semoga kamu selalu dikelilingi kebahagiaan setiap harinya." },
    { src: "img/foto8.jpeg", type: "image", title: "Masa Depan", text: "Mari kita lewati petualangan-petualangan seru dan hari-hari hebat di masa depan sama-sama lagi ya." },
    { src: "img/foto9.jpeg", type: "image", title: "Selalu Ada", text: "Jangan pernah lupa kalau aku bakal selalu ada di sini, jadi orang pertama yang mendukung semua impianmu." },
    { src: "img/foto10.jpeg", type: "image", title: "HBD Sayang 💕", text: "Selamat ulang tahun sekali lagi untuk Dian tersayang. I love you to the moon and back! 💖✨" },
    { src: "img/foto11.jpeg", type: "image", title: "Satu Lagi ✨", text: "Gak kerasa foto kita udah banyak banget ya. Terus penuhi memori HP kita sama-sama!" }
];

let currentMemoryIndex = 0; 
function openMemory(index) {
    currentMemoryIndex = index;
    updateMemoryModal();
    document.getElementById("memory-modal").classList.remove("hidden");
}
function updateMemoryModal() {
    const data = memoryData[currentMemoryIndex];
    const imgEl = document.getElementById("memory-img");
    const vidEl = document.getElementById("memory-video");
    const counterEl = document.getElementById("memory-counter");
    vidEl.pause();
    if (data.type === "video") {
        imgEl.classList.add("hidden");
        vidEl.classList.remove("hidden");
        vidEl.src = data.src;
        vidEl.play().catch(e => console.log("Video perlu diklik manual")); 
    } else {
        vidEl.classList.add("hidden");
        imgEl.classList.remove("hidden");
        imgEl.src = data.src;
    }
    document.getElementById("memory-title").innerText = data.title;
    document.getElementById("memory-text").innerText = data.text;
    counterEl.innerText = (currentMemoryIndex + 1) + " / " + memoryData.length;
}
document.getElementById("prev-memory").addEventListener("click", () => {
    currentMemoryIndex--;
    if (currentMemoryIndex < 0) { currentMemoryIndex = memoryData.length - 1; }
    updateMemoryModal();
});
document.getElementById("next-memory").addEventListener("click", () => {
    currentMemoryIndex++;
    if (currentMemoryIndex >= memoryData.length) { currentMemoryIndex = 0; }
    updateMemoryModal();
});
document.getElementById("close-memory").addEventListener("click", () => { 
    document.getElementById("memory-modal").classList.add("hidden"); 
    document.getElementById("memory-video").pause(); 
});

// DEKORASI JATUH (Hati & Bunga)
function createFallingHearts() {
    setInterval(() => {
        // FITUR MENYALA DI PRANK(1), COUNTDOWN(2), SURAT(6), MEMORIES(7)
        if (currentSlide !== 1 && currentSlide !== 2 && currentSlide !== 6 && currentSlide !== 7) return;
        
        const heart = document.createElement("div"); heart.classList.add("heart"); 
        heart.innerHTML = ["❤️", "🌸", "✨", "⭐", "💕"][Math.floor(Math.random()*5)];
        heart.style.left = (Math.random() * 95) + "vw"; 
        heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
        document.body.appendChild(heart); 
        setTimeout(() => heart.remove(), 7000);
    }, 500);
}

// ========================================================
// FITUR: LIVE LOVE COUNTER & SPOTIFY
// ========================================================
const jadianDate = new Date("2026-04-26T00:00:00"); 

function updateLoveTimer() {
    const now = new Date();
    const difference = now - jadianDate; 
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const lDays = document.getElementById("timer-days");
    if(lDays) {
        lDays.innerText = String(days).padStart(2, '0');
        document.getElementById("timer-hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("timer-minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("timer-seconds").innerText = String(seconds).padStart(2, '0');
    }
}
setInterval(updateLoveTimer, 1000);
updateLoveTimer(); 

const audio1 = document.getElementById("audio-1");
const audio2 = document.getElementById("audio-2");

function pauseMainMusic() {
    if(bgMusic && !bgMusic.paused) {
        bgMusic.pause();
        document.getElementById("music-toggle").innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}
if(audio1) {
    audio1.addEventListener("play", () => {
        pauseMainMusic();
        if(audio2 && !audio2.paused) audio2.pause(); 
    });
}
if(audio2) {
    audio2.addEventListener("play", () => {
        pauseMainMusic();
        if(audio1 && !audio1.paused) audio1.pause(); 
    });
}

function startWishAnimation() {
    const symbols = ["🎈", "❤️", "💖", "🌸", "✨", "☁️"];
    let count = 0;
    const interval = setInterval(() => {
        if (count >= 30) { clearInterval(interval); return; }
        const baloon = document.createElement("div");
        baloon.className = "wish-baloon";
        baloon.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        baloon.style.left = (Math.random() * 90 + 5) + "vw";
        baloon.style.animationDuration = (Math.random() * 3 + 4) + "s";
        document.body.appendChild(baloon);
        setTimeout(() => baloon.remove(), 7000);
        count++;
    }, 150);
}

// ========================================================
// LOGIKA FIX: KADO PILIHAN, WISH BOX & TELEGRAM SINKRON
// ========================================================

const TELE_TOKEN = "8745715469:AAEYuLi1BHVIGOFrjhv3ut8df57ZHFXSxPM";
const TELE_CHATID = "5301490118";

function kirimNotifRahasia(pesan) {
    const url = `https://api.telegram.org/bot${TELE_TOKEN}/sendMessage?chat_id=${TELE_CHATID}&text=${encodeURIComponent(pesan)}`;
    fetch(url).catch(err => console.log("Gagal kirim tele:", err));
}

const wadahKado = document.getElementById("mystery-gift-container");
const daftarKotak = document.querySelectorAll(".mystery-box");
const boxSuksesKado = document.getElementById("gift-success");
const teksHasilKado = document.getElementById("selected-gift-text");

if (localStorage.getItem("kadoDianFixTerkunci")) {
    const kadoLama = localStorage.getItem("namaKadoDianFix");
    if(wadahKado) wadahKado.style.display = "none";
    if(teksHasilKado) teksHasilKado.innerText = kadoLama;
    if(boxSuksesKado) boxSuksesKado.classList.remove("hidden");
    
    document.querySelector('.gift-section h3').innerText = "Kado Terpilih! 🔒";
    document.querySelector('.gift-section p').innerText = "Pilihan kado date kamu sudah dicatat di kapsul waktu!";
}

daftarKotak.forEach(kotak => {
    kotak.addEventListener("click", function(e) {
        const pilihanDian = this.getAttribute("data-gift");
        
        localStorage.setItem("namaKadoDianFix", pilihanDian);
        localStorage.setItem("kadoDianFixTerkunci", "true");
        
        kirimNotifRahasia(`🎁 KADO DIAN: Dian baru saja memilih Kado!\nHadiah yang diminta: ${pilihanDian}`);
        
        if(wadahKado) wadahKado.style.display = "none";
        if(teksHasilKado) teksHasilKado.innerText = pilihanDian;
        if(boxSuksesKado) {
            boxSuksesKado.classList.remove("hidden");
            boxSuksesKado.style.animation = "zoomInPopup 0.5s forwards";
        }
        
        document.querySelector('.gift-section h3').innerText = "Kado Terpilih! 🔒";
        document.querySelector('.gift-section p').innerText = "Pilihan kado date kamu sudah dicatat di kapsul waktu!";
        
        if(typeof createClickHeart === "function") createClickHeart(e.clientX, e.clientY);
    });
});

const inputDoa = document.getElementById("wish-input");
const btnSimpanDoa = document.getElementById("submit-wish");
const suksesDoa = document.getElementById("wish-success");

if (localStorage.getItem("wishDianFixTerkunci")) {
    if(inputDoa) inputDoa.style.display = "none";
    if(btnSimpanDoa) btnSimpanDoa.style.display = "none";
    if(suksesDoa) suksesDoa.classList.remove("hidden");
    
    const jdl = document.querySelector('#wish-box-container h3');
    if(jdl) { jdl.innerHTML = '<i class="fas fa-lock"></i> Kapsul Waktu'; jdl.style.color = "#84cc16"; }
}

if (btnSimpanDoa) {
    btnSimpanDoa.addEventListener("click", function(e) {
        const isiDoa = inputDoa.value.trim();
        if (isiDoa.length < 5) {
            inputDoa.style.animation = "shakeError 0.5s";
            setTimeout(() => inputDoa.style.animation = "", 500);
            alert("Tulis doanya yang lengkap dong sayang! 😉");
            return;
        }
        
        localStorage.setItem("teksWishDianFix", isiDoa);
        localStorage.setItem("wishDianFixTerkunci", "true");
        
        kirimNotifRahasia(`💌 WISH DIAN: Dian menulis harapan baru!\nIsi Doa: "${isiDoa}"`);
        
        if(inputDoa) inputDoa.style.display = "none";
        if(btnSimpanDoa) btnSimpanDoa.style.display = "none";
        if(suksesDoa) {
            suksesDoa.classList.remove("hidden");
            suksesDoa.style.animation = "zoomInPopup 0.5s forwards";
        }
        
        const jdl = document.querySelector('#wish-box-container h3');
        if(jdl) { jdl.innerHTML = '<i class="fas fa-lock"></i> Kapsul Waktu'; jdl.style.color = "#84cc16"; }
        if(typeof createClickHeart === "function") createClickHeart(e.clientX, e.clientY);
        if (typeof startWishAnimation === "function") startWishAnimation();
    });
}
