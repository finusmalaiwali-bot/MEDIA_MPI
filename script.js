// ============================================
// DATA SLIDE
// ============================================
var totalSlides = 8;
var currentSlide = 0;
var isTransitioning = false;

var wrapper = document.getElementById('slideWrapper');
var progressBar = document.getElementById('progressBar');
var indicator = document.getElementById('slideIndicator');
var prevBtn = document.getElementById('prevBtn');
var nextBtn = document.getElementById('nextBtn');
var homeBtn = document.getElementById('homeBtn');

// Modal
var modalOverlay = document.getElementById('modalOverlay');
var modalClose = document.getElementById('modalClose');
var modalIcon = document.getElementById('modalIcon');
var modalTitle = document.getElementById('modalTitle');
var modalBody = document.getElementById('modalBody');

// ============================================
// DATA DETAIL MODAL
// ============================================
var detailData = {
    'mcu-definisi': {
        icon: 'fas fa-microchip',
        title: 'APA ITU MIKROKONTROLER?',
        body: '<h4><i class="fas fa-book"></i> DEFINISI LENGKAP</h4><p><strong>Mikrokontroler</strong> adalah sebuah <em>sirkuit terpadu (chip)</em> yang dirancang khusus untuk menjalankan tugas kontrol tertentu secara <strong>tertanam (embedded system)</strong>. Berbeda dengan komputer biasa, mikrokontroler lebih sederhana, hemat daya, dan responsif terhadap sinyal dari sensor.</p><h4><i class="fas fa-cogs"></i> BAGAIMANA CARA KERJANYA?</h4><ul><li>Menerima input dari sensor (tombol, suhu, gerak)</li><li>Memproses input sesuai program yang ditanamkan</li><li>Memberikan output ke aktuator (LED, motor, relay)</li></ul><div class="example-box"><span class="label">CONTOH DI SEKITAR KITA</span><p><em>Remote TV</em>, <em>mesin cuci otomatis</em>, <em>kalkulator</em>, dan <em>jam digital</em> — semuanya menggunakan mikrokontroler di dalamnya!</p></div>'
    },
    'mcu-ciri': {
        icon: 'fas fa-list-check',
        title: 'CIRI-CIRI MIKROKONTROLER',
        body: '<h4><i class="fas fa-star"></i> KARAKTERISTIK UTAMA</h4><ul><li><strong>Sederhana & Spesifik</strong> — Hanya untuk satu tugas tertentu</li><li><strong>Tanpa OS (Bare-metal)</strong> — Program langsung jalan di hardware</li><li><strong>Hemat Daya</strong> — Cocok untuk perangkat baterai</li><li><strong>Real-time</strong> — Respons cepat terhadap sinyal</li><li><strong>Murah</strong> — Mulai dari Rp 20.000</li><li><strong>Kecil</strong> — Seukuran kuku jari</li></ul><div class="example-box"><span class="label">PERBANDINGAN SEDERHANA</span><p>Bayangkan mikrokontroler seperti <em>sopir yang hanya bisa mengemudi</em> — fokus satu tugas. Sedangkan SBC seperti <em>pilot yang bisa menerbangkan berbagai pesawat</em>.</p></div>'
    },
    'mcu-contoh': {
        icon: 'fas fa-microchip',
        title: 'CONTOH MIKROKONTROLER',
        body: '<h4><i class="fas fa-cube"></i> JENIS POPULER</h4><ul><li><strong>Arduino UNO</strong> — Untuk pemula, mudah dipelajari</li><li><strong>ESP32</strong> — Punya WiFi & Bluetooth bawaan (untuk IoT)</li><li><strong>STM32</strong> — Performa tinggi untuk industri</li><li><strong>ESP8266</strong> — Versi murah dari ESP32</li><li><strong>ATmega328</strong> — Chip di dalam Arduino UNO</li></ul><div class="example-box"><span class="label">CONTOH PROYEK NYATA</span><p>🛜 <em>Smart lamp</em> yang menyala otomatis saat gelap — menggunakan ESP32 + sensor LDR.<br>🚿 <em>Keran otomatis</em> di mall — menggunakan Arduino + sensor infrared.</p></div>'
    },
    'sbc-definisi': {
        icon: 'fas fa-desktop',
        title: 'APA ITU SBC?',
        body: '<h4><i class="fas fa-book"></i> DEFINISI LENGKAP</h4><p><strong>Single Board Computer (SBC)</strong> adalah <em>komputer lengkap</em> yang seluruh komponen utamanya (prosesor, memori, port I/O) terintegrasi dalam <strong>satu papan sirkuit tunggal</strong>. SBC mampu menjalankan <strong>sistem operasi penuh</strong> seperti Linux, Android, atau Windows.</p><h4><i class="fas fa-cogs"></i> KEMAMPUAN SBC</h4><ul><li>Menjalankan aplikasi berat (browser, editor video)</li><li>Multitasking seperti komputer biasa</li><li>Koneksi internet & jaringan</li><li>Menyimpan data dalam jumlah besar</li></ul><div class="example-box"><span class="label">CONTOH DI SEKITAR KITA</span><p><em>Smart TV</em>, <em>mini PC</em>, <em>robot AI</em>, dan <em>server rumahan</em> — semuanya bisa menggunakan SBC!</p></div>'
    },
    'sbc-ciri': {
        icon: 'fas fa-list-check',
        title: 'CIRI-CIRI SBC',
        body: '<h4><i class="fas fa-star"></i> KARAKTERISTIK UTAMA</h4><ul><li><strong>Ukuran Ringkas</strong> — Sebesar kartu kredit</li><li><strong>OS Penuh</strong> — Linux, Windows, Android</li><li><strong>Komputasi Tinggi</strong> — Bisa multitasking</li><li><strong>Port Lengkap</strong> — HDMI, USB, Ethernet, GPIO</li><li><strong>Konektivitas</strong> — WiFi, Bluetooth, LAN</li><li><strong>Harga</strong> — Rp 500.000 - 2.000.000+</li></ul><div class="example-box"><span class="label">PERBANDINGAN SEDERHANA</span><p>Bayangkan SBC seperti <em>laptop mini</em> yang bisa dipakai untuk berbagai keperluan — dari menonton video sampai menjalankan server!</p></div>'
    },
    'sbc-contoh': {
        icon: 'fas fa-desktop',
        title: 'CONTOH SBC',
        body: '<h4><i class="fas fa-cube"></i> JENIS POPULER</h4><ul><li><strong>Raspberry Pi</strong> — Paling terkenal, komunitas besar</li><li><strong>Orange Pi</strong> — Alternatif lebih murah</li><li><strong>NVIDIA Jetson</strong> — Khusus untuk AI & Machine Learning</li><li><strong>BeagleBone</strong> — Untuk proyek industri</li><li><strong>Banana Pi</strong> — Kompatibel dengan Raspberry Pi</li></ul><div class="example-box"><span class="label">CONTOH PROYEK NYATA</span><p>🎬 <em>Media center</em> di rumah — Raspberry Pi + TV = Netflix sendiri!<br>🤖 <em>Robot AI</em> — NVIDIA Jetson untuk pengenalan wajah.<br>🖥️ <em>Server mini</em> — Raspberry Pi untuk hosting website.</p></div>'
    },
    'vs-sbc': {
        icon: 'fas fa-desktop',
        title: 'SBC (SINGLE BOARD COMPUTER)',
        body: '<h4><i class="fas fa-check"></i> KELEBIHAN SBC</h4><ul><li>Bisa multitasking (jalankan banyak program)</li><li>Sistem operasi lengkap (Linux/Windows)</li><li>Port lengkap (HDMI, USB, Ethernet)</li><li>Cocok untuk aplikasi berat & server</li><li>Bisa dipakai seperti komputer biasa</li></ul><h4><i class="fas fa-times"></i> KEKURANGAN SBC</h4><ul><li>Harga lebih mahal</li><li>Konsumsi daya lebih besar</li><li>Waktu boot lebih lama (karena OS)</li><li>Kurang responsif untuk kontrol real-time</li></ul><div class="example-box"><span class="label">COCOK UNTUK</span><p>Server web, AI, media center, robot cerdas, mini PC, dan proyek IoT kompleks.</p></div>'
    },
    'vs-mcu': {
        icon: 'fas fa-microchip',
        title: 'MIKROKONTROLER',
        body: '<h4><i class="fas fa-check"></i> KELEBIHAN MIKROKONTROLER</h4><ul><li>Harga sangat murah (mulai Rp 20.000)</li><li>Hemat daya (bisa pakai baterai)</li><li>Responsif & real-time</li><li>Ukuran sangat kecil</li><li>Boot instan (tanpa OS)</li></ul><h4><i class="fas fa-times"></i> KEKURANGAN MIKROKONTROLER</h4><ul><li>Tidak bisa multitasking</li><li>Memori terbatas</li><li>Tidak bisa menjalankan OS penuh</li><li>Terbatas pada satu tugas spesifik</li></ul><div class="example-box"><span class="label">COCOK UNTUK</span><p>Sensor, otomasi rumah, drone, wearable, mainan elektronik, dan perangkat IoT sederhana.</p></div>'
    },
    'vs-otak': {
        icon: 'fas fa-brain',
        title: 'ANALOGI: SBC = OTAK',
        body: '<h4><i class="fas fa-lightbulb"></i> MENGAPA SBC SEPERTI OTAK?</h4><p>Otak manusia mampu <strong>berpikir kompleks</strong>, memproses banyak informasi sekaligus, dan mengambil keputusan berdasarkan berbagai pertimbangan. Itulah yang dilakukan SBC!</p><ul><li>Otak bisa multitasking → SBC bisa jalankan banyak aplikasi</li><li>Otak punya memori jangka panjang → SBC punya storage besar</li><li>Otak bisa belajar → SBC bisa menjalankan AI</li><li>Otak butuh energi → SBC butuh daya lebih besar</li></ul><div class="example-box"><span class="label">CONTOH</span><p>Saat kamu main <em>game</em> sambil <em>dengar musik</em> di HP — itu kerjaan otak (SBC) yang multitasking!</p></div>'
    },
    'vs-saraf': {
        icon: 'fas fa-bolt',
        title: 'ANALOGI: MCU = SISTEM SARAF',
        body: '<h4><i class="fas fa-lightbulb"></i> MENGAPA MCU SEPERTI SARAF?</h4><p>Sistem saraf manusia memberikan <strong>respons cepat</strong> terhadap rangsangan — misalnya saat tangan menyentuh benda panas, refleks langsung menarik tangan. Itulah cara kerja mikrokontroler!</p><ul><li>Saraf responsif → MCU real-time</li><li>Saraf otomatis → MCU jalankan program tanpa OS</li><li>Saraf fokus satu tugas → MCU spesifik</li><li>Saraf hemat energi → MCU hemat daya</li></ul><div class="example-box"><span class="label">CONTOH</span><p>Sensor <em>air di dispenser</em> yang langsung menyala saat gelas didekatkan — itu refleks mikrokontroler!</p></div>'
    },
    'ars-cpu': {
        icon: 'fas fa-microchip',
        title: 'CPU / PROSESOR',
        body: '<h4><i class="fas fa-cog"></i> FUNGSI</h4><p><strong>CPU (Central Processing Unit)</strong> adalah <em>otak</em> dari perangkat yang melakukan semua perhitungan dan pemrosesan data.</p><h4><i class="fas fa-list"></i> TUGAS CPU</h4><ul><li>Membaca instruksi dari program</li><li>Melakukan perhitungan matematika & logika</li><li>Mengatur aliran data</li><li>Mengontrol komponen lain</li></ul><div class="example-box"><span class="label">CONTOH NYATA</span><p>Saat kamu tekan tombol di <em>remote AC</em>, CPU di dalam AC langsung memproses: "suhu turun 1 derajat" dan mengirim perintah ke kompresor.</p></div>'
    },
    'ars-memori': {
        icon: 'fas fa-memory',
        title: 'MEMORI (RAM, FLASH, EEPROM)',
        body: '<h4><i class="fas fa-database"></i> JENIS MEMORI</h4><ul><li><strong>RAM (Random Access Memory)</strong> — Penyimpanan sementara, hilang saat mati</li><li><strong>Flash Memory</strong> — Menyimpan program utama secara permanen</li><li><strong>EEPROM</strong> — Menyimpan data pengaturan yang bisa diubah</li></ul><h4><i class="fas fa-lightbulb"></i> ANALOGI</h4><p>RAM seperti <em>meja kerja</em> (sementara), Flash seperti <em>lemari arsip</em> (permanen), EEPROM seperti <em>buku catatan</em> (bisa diedit).</p><div class="example-box"><span class="label">CONTOH NYATA</span><p>Saat kamu matikan <em>jam digital</em> lalu nyalakan lagi — jamnya masih ingat waktu karena data disimpan di EEPROM!</p></div>'
    },
    'ars-gpio': {
        icon: 'fas fa-plug',
        title: 'GPIO (GENERAL PURPOSE INPUT OUTPUT)',
        body: '<h4><i class="fas fa-plug"></i> FUNGSI</h4><p><strong>GPIO</strong> adalah pin serbaguna yang bisa digunakan sebagai <em>input</em> (membaca sensor) atau <em>output</em> (mengontrol aktuator).</p><h4><i class="fas fa-list"></i> KEGUNAAN GPIO</h4><ul><li><strong>INPUT:</strong> Baca tombol, sensor suhu, sensor gerak</li><li><strong>OUTPUT:</strong> Nyalakan LED, gerakkan motor, kontrol relay</li><li><strong>PWM:</strong> Atur kecerahan LED, kecepatan motor</li><li><strong>ADC:</strong> Baca sinyal analog (potensiometer)</li></ul><div class="example-box"><span class="label">CONTOH NYATA</span><p><em>Lampu tidur otomatis</em> — sensor LDR baca cahaya (INPUT), lalu nyalakan LED (OUTPUT) via GPIO.</p></div>'
    },
    'ars-komunikasi': {
        icon: 'fas fa-wifi',
        title: 'KOMUNIKASI (UART, I2C, SPI)',
        body: '<h4><i class="fas fa-exchange-alt"></i> PROTOKOL KOMUNIKASI</h4><ul><li><strong>UART</strong> — Komunikasi serial 2 kabel (TX/RX) untuk GPS, Bluetooth</li><li><strong>I2C</strong> — 2 kabel, banyak perangkat (LCD, sensor suhu, RTC)</li><li><strong>SPI</strong> — 4 kabel, kecepatan tinggi (SD card, display)</li></ul><h4><i class="fas fa-lightbulb"></i> ANALOGI</h4><p>UART seperti <em>telepon</em> (2 orang), I2C seperti <em>rapat</em> (banyak orang 2 kabel), SPI seperti <em>jalan tol</em> (cepat tapi banyak jalur).</p><div class="example-box"><span class="label">CONTOH NYATA</span><p><em>Sensor suhu DHT11</em> di proyek IoT pakai protokol <em>I2C</em> untuk kirim data ke Arduino.</p></div>'
    },
    'ars-fitur': {
        icon: 'fas fa-bluetooth-b',
        title: 'FITUR TAMBAHAN',
        body: '<h4><i class="fas fa-star"></i> FITUR MODERN</h4><ul><li><strong>WiFi</strong> — Koneksi internet nirkabel (ESP32, Raspberry Pi)</li><li><strong>Bluetooth</strong> — Komunikasi jarak pendek (HC-05, ESP32)</li><li><strong>ADC</strong> — Konversi analog ke digital (baca sensor analog)</li><li><strong>PWM</strong> — Pulse Width Modulation (atur kecepatan motor)</li><li><strong>DAC</strong> — Konversi digital ke analog (output suara)</li></ul><div class="example-box"><span class="label">CONTOH NYATA</span><p><em>Smart speaker</em> pakai WiFi + DAC untuk streaming musik. <em>Smartwatch</em> pakai Bluetooth + ADC untuk baca detak jantung.</p></div>'
    },
    'prog-bahasa': {
        icon: 'fas fa-code',
        title: 'BAHASA PEMROGRAMAN',
        body: '<h4><i class="fas fa-terminal"></i> BAHASA POPULER</h4><ul><li><strong>C / C++</strong> — Bahasa utama Arduino & STM32 (cepat, efisien)</li><li><strong>Python</strong> — Bahasa SBC seperti Raspberry Pi (mudah dibaca)</li><li><strong>MicroPython</strong> — Versi ringan Python untuk ESP32/ESP8266</li><li><strong>JavaScript</strong> — Untuk Node.js di SBC</li></ul><div class="example-box"><span class="label">CONTOH KODE LED BLINK (ARDUINO)</span><p><code>void setup() { pinMode(13, OUTPUT); }</code><br><code>void loop() { digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000); }</code></p><p style="margin-top:6px;">Kode ini bikin LED di pin 13 berkedip setiap 1 detik!</p></div>'
    },
    'prog-ide': {
        icon: 'fas fa-laptop-code',
        title: 'IDE (INTEGRATED DEVELOPMENT ENVIRONMENT)',
        body: '<h4><i class="fas fa-tools"></i> IDE POPULER</h4><ul><li><strong>Arduino IDE</strong> — Untuk pemula, drag & drop library</li><li><strong>Thonny</strong> — Khusus MicroPython, ringan</li><li><strong>VS Code + PlatformIO</strong> — Profesional, banyak fitur</li><li><strong>Python IDLE</strong> — Bawaan Python untuk SBC</li></ul><h4><i class="fas fa-lightbulb"></i> APA ITU IDE?</h4><p>IDE adalah <em>aplikasi untuk menulis, menguji, dan mengunggah program</em> ke board mikrokontroler/SBC. Seperti "Microsoft Word" untuk menulis kode.</p><div class="example-box"><span class="label">CONTOH PENGGUNAAN</span><p>Buka Arduino IDE → Tulis kode → Klik "Upload" → LED di board langsung berkedip! Semudah itu.</p></div>'
    },
    'prog-simulasi': {
        icon: 'fas fa-play',
        title: 'SIMULASI ONLINE',
        body: '<h4><i class="fas fa-globe"></i> PLATFORM SIMULASI</h4><ul><li><strong>Wokwi</strong> — Simulasi Arduino & ESP32 online (gratis)</li><li><strong>Tinkercad</strong> — Simulasi 3D + Arduino, ramah pemula</li><li><strong>Proteus</strong> — Simulasi profesional (berbayar)</li><li><strong>CircuitPython</strong> — Online REPL untuk SBC</li></ul><h4><i class="fas fa-lightbulb"></i> KENAPA PAKAI SIMULASI?</h4><ul><li>Tidak perlu beli hardware dulu</li><li>Bisa dicoba berulang tanpa takut rusak</li><li>Belajar konsep dasar dengan cepat</li></ul><div class="example-box"><span class="label">CONTOH NYATA</span><p>Buka <em>wokwi.com</em> → Pilih Arduino → Tambah LED → Tulis kode → Lihat LED berkedip di layar. Gratis!</p></div>'
    },
    'proyek-led': {
        icon: 'fas fa-lightbulb',
        title: 'PROYEK LED BLINK',
        body: '<h4><i class="fas fa-bullseye"></i> TUJUAN PROYEK</h4><p>Proyek pertama untuk memahami dasar <strong>input/output digital</strong> pada mikrokontroler.</p><h4><i class="fas fa-tools"></i> ALAT & BAHAN</h4><ul><li>Arduino UNO / ESP32</li><li>LED 1 buah</li><li>Resistor 220Ω</li><li>Kabel jumper</li><li>Breadboard</li></ul><h4><i class="fas fa-list-ol"></i> LANGKAH-LANGKAH</h4><ul><li>Hubungkan LED ke pin 13 Arduino</li><li>Tambahkan resistor 220Ω untuk keamanan</li><li>Tulis kode program LED Blink</li><li>Upload program ke Arduino</li></ul><div class="example-box"><span class="label">CONTOH PENERAPAN NYATA</span><p>🎄 <em>Lampu hias Natal</em> yang berkedip warna-warni<br>🚨 <em>Lampu darurat</em> di kendaraan<br>📢 <em>Indikator notifikasi</em> di HP</p></div>'
    },
    'proyek-sensor': {
        icon: 'fas fa-temperature-high',
        title: 'PROYEK SENSOR + LCD',
        body: '<h4><i class="fas fa-bullseye"></i> TUJUAN PROYEK</h4><p>Membaca data sensor dan menampilkannya pada layar LCD 16x2.</p><h4><i class="fas fa-tools"></i> ALAT & BAHAN</h4><ul><li>Arduino UNO</li><li>Sensor suhu LM35 / DHT11</li><li>LCD 16x2 + modul I2C</li><li>Kabel jumper & breadboard</li></ul><h4><i class="fas fa-list-ol"></i> LANGKAH-LANGKAH</h4><ul><li>Hubungkan sensor ke pin analog Arduino</li><li>Hubungkan LCD ke pin I2C</li><li>Program membaca sensor tiap 1 detik</li><li>Tampilkan hasil di LCD</li></ul><div class="example-box"><span class="label">CONTOH PENERAPAN NYATA</span><p>🌡️ <em>Termometer digital</em> di rumah sakit<br>🏠 <em>Monitor suhu ruangan</em> di smart home<br>🌱 <em>Alat ukur kelembaban tanah</em> di pertanian</p></div>'
    },
    'proyek-relay': {
        icon: 'fas fa-plug',
        title: 'PROYEK KONTROL RELAY',
        body: '<h4><i class="fas fa-bullseye"></i> TUJUAN PROYEK</h4><p>Otomatisasi perangkat listrik (lampu, kipas) menggunakan relay yang dikontrol mikrokontroler.</p><h4><i class="fas fa-tools"></i> ALAT & BAHAN</h4><ul><li>Arduino UNO / ESP32</li><li>Modul relay 1 channel</li><li>Lampu / kipas AC</li><li>Kabel jumper & breadboard</li></ul><h4><i class="fas fa-list-ol"></i> LANGKAH-LANGKAH</h4><ul><li>Hubungkan relay ke pin digital Arduino</li><li>Hubungkan lampu ke kontak relay</li><li>Program kontrol ON/OFF relay</li><li>Tambahkan sensor (LDR/PIR) untuk otomasi</li></ul><div class="example-box"><span class="label">CONTOH PENERAPAN NYATA</span><p>🏠 <em>Lampu otomatis</em> nyala saat gelap<br>❄️ <em>AC otomatis</em> nyala saat suhu panas<br>💧 <em>Pompa air otomatis</em> berdasarkan ketinggian air</p></div>'
    },
    'proyek-iot': {
        icon: 'fas fa-cloud-upload-alt',
        title: 'PROYEK IoT SEDERHANA',
        body: '<h4><i class="fas fa-bullseye"></i> TUJUAN PROYEK</h4><p>Mengirim data sensor dari ESP32 ke platform cloud (ThingSpeak) untuk monitoring jarak jauh.</p><h4><i class="fas fa-tools"></i> ALAT & BAHAN</h4><ul><li>ESP32 (WiFi bawaan)</li><li>Sensor DHT11 (suhu & kelembaban)</li><li>Akun ThingSpeak (gratis)</li><li>Kabel jumper & breadboard</li></ul><h4><i class="fas fa-list-ol"></i> LANGKAH-LANGKAH</h4><ul><li>Daftar akun di ThingSpeak.com</li><li>Buat channel baru, catat API Key</li><li>Program ESP32 untuk koneksi WiFi</li><li>Kirim data sensor ke ThingSpeak</li><li>Lihat grafik real-time di web</li></ul><div class="example-box"><span class="label">CONTOH PENERAPAN NYATA</span><p>🌾 <em>Monitoring pertanian</em> — pantau kelembaban tanah dari HP<br>🏭 <em>Monitoring pabrik</em> — cek suhu mesin jarak jauh<br>🏠 <em>Smart home</em> — kontrol lampu dari mana saja</p></div>'
    }
};

// ============================================
// FUNGSI BUKA MODAL
// ============================================
function openModal(key) {
    var data = detailData[key];
    if (!data) return;
    modalIcon.innerHTML = '<i class="' + data.icon + '"></i>';
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.body;
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

// ============================================
// EVENT MODAL
// ============================================
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// KLIK PADA CARD
// ============================================
document.addEventListener('click', function(e) {
    var card = e.target.closest('.clickable-card');
    if (card && card.dataset.detail) {
        openModal(card.dataset.detail);
    }
});

// ============================================
// BUAT INDICATOR DOTS
// ============================================
for (var i = 0; i < totalSlides; i++) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('data-index', i);
    (function(index) {
        dot.addEventListener('click', function() { goToSlide(index); });
    })(i);
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

    var progress = ((index + 1) / totalSlides) * 100;
    progressBar.style.width = progress + '%';

    var dots = document.querySelectorAll('.dot');
    for (var i = 0; i < dots.length; i++) {
        if (i === index) dots[i].classList.add('active');
        else dots[i].classList.remove('active');
    }

    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === totalSlides - 1);

    var slides = document.querySelectorAll('.slide');
    for (var j = 0; j < slides.length; j++) {
        if (j === index) slides[j].classList.add('active');
        else slides[j].classList.remove('active');
    }

    setTimeout(function() { isTransitioning = false; }, 500);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
}

function prevSlide() {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
}

function goHome() { goToSlide(0); }

// ============================================
// EVENT NAVIGASI
// ============================================
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
homeBtn.addEventListener('click', goHome);

document.addEventListener('keydown', function(e) {
    if (modalOverlay.classList.contains('active')) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault(); nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault(); prevSlide();
    } else if (e.key === 'Home') {
        e.preventDefault(); goHome();
    }
});

// Touch swipe
var touchStartX = 0, touchEndX = 0;
document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});
document.addEventListener('touchend', function(e) {
    if (modalOverlay.classList.contains('active')) return;
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
        if (diff > 0) nextSlide(); else prevSlide();
    }
});

// ============================================
// INIT
// ============================================
document.querySelectorAll('.slide')[0].classList.add('active');
progressBar.style.width = (1 / totalSlides * 100) + '%';

console.log('📚 Slide SBC & Mikrokontroler - Pak Finus Mena 🐷');
console.log('👆 KLIK kartu untuk melihat detail & contoh nyata');
console.log('⬅️➡️ Gunakan panah kiri/kanan untuk navigasi');
console.log('🏠 Home di tengah bawah');
