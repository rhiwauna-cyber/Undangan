// --- 1. INISIALISASI AOS ANIMATION ---
AOS.init({
  once: false,
  duration: 800,
  offset: 40,
  easing: "ease-out",
});

// --- 2. LOGIKA KONTROL COVER & ELEMEN AUDIO ---
const welcomeModal = document.getElementById("welcome-modal");
const openBtn = document.getElementById("open-invitation");
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = document.getElementById("music-icon");
let isPlaying = false;

// Buka Undangan saat diklik
openBtn.addEventListener("click", () => {
  welcomeModal.classList.add("modal-open");

  // Putar Musik
  bgMusic.play();
  isPlaying = true;

  // Re-calculate AOS posisi elemen
  setTimeout(() => {
    AOS.refresh();
  }, 400);
});

// Tombol Play/Pause Musik
musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.classList.remove("fa-music");
    musicIcon.classList.add("fa-volume-mute");
  } else {
    bgMusic.play();
    musicIcon.classList.remove("fa-volume-mute");
    musicIcon.classList.add("fa-music");
  }
  isPlaying = !isPlaying;
});

// --- 3. AMBIL PARAMETER NAMA TAMU DARI URL (?to=NamaTamu) ---
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get("to");
if (guestName) {
  document.getElementById("guest-name").innerText = guestName;
}

// --- 4. COUNTDOWN TIMER REALTIME ---
const targetDate = new Date("October 24, 2026 09:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0" + d : d;
    document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// --- 5. PARTICLES BACKGROUND ANIMATION (CANVAS JS) ---
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 0.8 + 0.2;
    this.speedX = Math.random() * 0.4 - 0.2;
    this.opacity = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    if (this.y < 0) {
      this.y = canvas.height;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(217, 119, 6, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 35; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 6. FUNCTION COPY REKENING ---
function copyRekening() {
  const rek = document.getElementById("rekening").innerText;
  navigator.clipboard.writeText(rek);
  alert("Nomor Rekening Berhasil Disalin: " + rek);
}

// --- 7. RSVP FORM HANDLER ---
document.getElementById("rsvp-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Terima kasih! Pesan dan konfirmasi Anda telah terkirim.");
  e.target.reset();
});
