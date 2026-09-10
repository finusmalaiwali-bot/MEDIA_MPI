// ============================================
// DATA SLIDE
// ============================================
var totalSlides = 9;
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
        body: `
            <h4><i class="fas fa-book"></i> DEFINISI LENGKAP</h4>
            <p><strong>Mikrokontroler</strong> adalah sebuah <em>sirkuit terpadu (chip)</em> yang dirancang khusus untuk menjalankan tugas kontrol tertentu secara <strong>tertanam (embedded system)</strong>. Berbeda dengan komputer biasa, mikrokontroler lebih sederhana, hemat daya, dan responsif terhadap sinyal dari sensor.</p>
            <h4><i class="fas fa-cogs"></i> BAGAIMANA CARA KERJANYA?</h4>
            <ul>
                <li>Menerima input dari sensor (tombol, suhu, gerak)</li>
                <li>Memproses input sesuai program yang ditanamkan</li>
                <li>Memberikan output ke aktuator (LED, motor, relay)</li>
            </ul>
            <div class="example-box">
                <span class="label">CONTOH DI SEKITAR KITA</span>
                <p><em>Remote TV</em>, <em>mesin cuci otomatis</em>, <em>kalkulator</em>, dan <em>jam digital</em> — semuanya menggunakan mikrokontroler di
