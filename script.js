// PASSWORD
function enterSite(){
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("lock").classList.remove("hidden");
}

function checkPass(){
  let p = document.getElementById("pass").value;

  if(p === "200620"){ // ganti sesuai keinginan
    document.getElementById("lock").classList.add("hidden");
    document.getElementById("main").classList.remove("hidden");
    startCountdown();
    startSlider();
  } else {
    alert("Password salah 😜");
  }
}

// COUNTDOWN
function startCountdown(){
  let nowYear = new Date().getFullYear();
  let target = new Date("June 20, " + nowYear + " 00:00:00").getTime();

  setInterval(()=>{
    let now = new Date().getTime();
    let diff = target - now;

    let d = Math.floor(diff/(1000*60*60*24));
    document.getElementById("countdown").innerHTML =
    "⏳ " + d + " hari lagi menuju ulang tahun kamu 💖";
  },1000);
}

// SLIDER
let images = [
"https://i.pinimg.com/736x/3c/0a/5d/3c0a5d.jpg",
"https://i.pinimg.com/736x/9a/7d/8f/9a7d8f.jpg",
"https://i.pinimg.com/736x/1b/2f/3c/1b2f3c.jpg"
];

let index = 0;

function startSlider(){
  document.getElementById("slide").src = images[0];

  setInterval(()=>{
    index = (index + 1) % images.length;
    document.getElementById("slide").src = images[index];
  },2000);
}

// TYPING EFFECT
const message = `Hai Dian... 💖

Selamat ulang tahun ya sayangku 🎂

Aku bersyukur banget punya kamu...
Kamu adalah alasan aku bahagia 💕

Aku akan selalu ada buat kamu...

I LOVE YOU ❤️`;

let i = 0;

function startLove(){
  document.getElementById("music").play();

  document.getElementById("text").innerHTML="";
  i = 0;
  typeWriter();
  startConfetti();
}

function typeWriter(){
  if(i < message.length){
    document.getElementById("text").innerHTML += message.charAt(i);
    i++;
    setTimeout(typeWriter,40);
  }
}

// CONFETTI
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

for(let i=0;i<100;i++){
  pieces.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*5+2,
    speed:Math.random()*3+1
  });
}

function startConfetti(){
  function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    pieces.forEach(p=>{
      p.y += p.speed;
      if(p.y > canvas.height) p.y = 0;

      ctx.fillStyle = "pink";
      ctx.fillRect(p.x,p.y,p.size,p.size);
    });

    requestAnimationFrame(update);
  }
  update();
}