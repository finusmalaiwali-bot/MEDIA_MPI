// ============================================
// DATA SLIDE
// ============================================
const totalSlides = 10;
let currentSlide = 0;
let isTransitioning = false;

const wrapper = document.getElementById('slideWrapper');
const progressBar = document.getElementById('progressBar');
const indicator = document.getElementById('slideIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const homeBtn = document.getElementById('homeBtn');

// ============================================
// BUAT INDICATOR DOTS
// ============================================
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', () => goToSlide(i));
    indicator.appendChild(dot);
}

// ============================================
// FUNGSI NAVIGASI
// ============================================
function goToSlide(index) {
    if (isTransitioning) return;
    if (index < 0 || index >= totalSlides) return;

    isTransitioning = true;
    currentSlide = index;

    wrapper.style.transform = 'translateX(-' + (index * 100) + '%)';

    const progress = ((index + 1) / totalSlides) * 100;
    progressBar.style.width = progress + '%';

    document.querySelectorAll('.dot').forEach(function(dot, i) {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === totalSlides - 1);

    document.querySelectorAll('.slide').forEach(function(slide, i) {
        if (i === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    setTimeout(function() {
        isTransitioning = false;
    }, 500);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

function goHome() {
    goToSlide(0);
}

// ============================================
// EVENT LISTENER
// ============================================
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
homeBtn.addEventListener('click', goHome);

// Keyboard
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault();
        goHome();
    }
});

// Touch swipe
var touchStartX = 0;
var touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
});

// ============================================
// MINI KUIS
// ============================================
var miniKuisData = [
    { soal: 'Kepanjangan GPIO?', pilihan: ['General Purpose I/O', 'Global Program I/O', 'General Pin I/O'],
        jawaban: 0 },
    { soal: 'Yang termasuk SBC?', pilihan: ['Arduino UNO', 'Raspberry Pi', 'ESP32'], jawaban: 1 },
    { soal: 'Perbedaan utama SBC & MCU?', pilihan: ['SBC lebih kecil', 'SBC punya OS', 'MCU lebih mahal'],
        jawaban: 1 }
];

var miniIndex = 0;
var miniSkor = 0;
var miniTerjawab = false;

function startMiniQuiz() {
    var area = document.getElementById('miniKuisArea');
    area.style.display = 'block';
    document.getElementById('miniSoalContainer').style.display = 'block';
    document.getElementById('miniHasilContainer').style.display = 'none';
    miniIndex = 0;
    miniSkor = 0;
    miniTerjawab = false;
    tampilMiniSoal();
}

function tampilMiniSoal() {
    if (miniIndex >= miniKuisData.length) {
        tampilMiniHasil();
        return;
    }
    var data = miniKuisData[miniIndex];
    document.getElementById('miniSoalText').textContent =
        'Soal ' + (miniIndex + 1) + '/' + miniKuisData.length + ': ' + data.soal;

    var container = document.getElementById('miniPilihanContainer');
    container.innerHTML = '';
    data.pilihan.forEach(function(p, idx) {
        var btn = document.createElement('button');
        btn.textContent = p;
        btn.dataset.idx = idx;
        btn.addEventListener('click', function() {
            jawabMiniSoal(idx, btn);
        });
        container.appendChild(btn);
    });
    miniTerjawab = false;
    var nextBtn = document.querySelector('#miniSoalContainer .btn-small');
    if (nextBtn) nextBtn.style.display = 'none';
}

function jawabMiniSoal(idx, btn) {
    if (miniTerjawab) return;
    miniTerjawab = true;
    var data = miniKuisData[miniIndex];
    var semuaBtn = document.querySelectorAll('#miniPilihanContainer button');
    semuaBtn.forEach(function(b) {
        b.style.pointerEvents = 'none';
        if (parseInt(b.dataset.idx) === data.jawaban) {
            b.classList.add('benar');
        }
    });
    if (idx === data.jawaban) {
        miniSkor++;
        btn.classList.add('benar');
    } else {
        btn.classList.add('salah');
    }
    var nextBtn = document.querySelector('#miniSoalContainer .btn-small');
    if (nextBtn) nextBtn.style.display = 'inline-block';
}

function miniNextSoal() {
    miniIndex++;
    tampilMiniSoal();
}

function tampilMiniHasil() {
    document.getElementById('miniSoalContainer').style.display = 'none';
    var hasil = document.getElementById('miniHasilContainer');
    hasil.style.display = 'block';
    var total = miniKuisData.length;
    var persen = Math.round((miniSkor / total) * 100);
    var pesan = '';
    if (persen === 100) {
        pesan = '⭐ Sempurna!';
    } else if (persen >= 67) {
        pesan = '🌟 Hebat!';
    } else if (persen >= 33) {
        pesan = '💪 Lumayan!';
    } else {
        pesan = '📚 Baca ulang!';
    }
    document.getElementById('miniHasilText').textContent =
        'Skor: ' + miniSkor + '/' + total + ' (' + persen + '%) - ' + pesan;
}

function miniResetQuiz() {
    document.getElementById('miniKuisArea').style.display = 'none';
    document.getElementById('miniHasilContainer').style.display = 'none';
    document.getElementById('miniSoalContainer').style.display = 'block';
    miniIndex = 0;
    miniSkor = 0;
}

// ============================================
// INIT
// ============================================
document.querySelectorAll('.slide')[0].classList.add('active');
progressBar.style.width = (1 / totalSlides * 100) + '%';

console.log('📚 Slide SBC & Mikrokontroler - Finus Mena 🐷');
console.log('⬅️➡️ Gunakan panah di sisi kiri/kanan');
console.log('🏠 Home di tengah bawah');