# Phone Peeking — Website Interaktif Bergaya iPhone

Source website statis yang siap diunggah ke hosting. **Tidak memerlukan** Next.js, npm, PHP, API, atau database.

## Isi file

- `index.html` — struktur halaman, layar iPhone, notifikasi dan panel cerita.
- `style.css` — desain responsif, wallpaper, ikon aplikasi, dan animasi.
- `app.js` — interaksi: layar kunci, swipe, 2 halaman ikon, aplikasi simulasi, pesan, email, telepon, foto, wallpaper, dll.

## Cara upload ke Hostinger / cPanel

1. Ekstrak file ZIP ke komputer.
2. Buka **File Manager** di panel hosting Anda.
3. Masuk ke folder `public_html` (atau document root domain/subdomain).
4. Unggah **ketiga file** `index.html`, `style.css`, dan `app.js` ke **folder yang sama**, langsung di document root. Jangan mengunggah folder induknya apabila ingin website muncul di `/`.
5. Buka `https://domain-anda.com/` dan lakukan refresh jika versi lama masih tersimpan di cache.

Jika sudah ada `index.html` di `public_html`, **backup dahulu** atau tempatkan demo pada subfolder `public_html/phone-peeking/` agar tidak menimpa website yang ada. Dalam contoh subfolder, buka `https://domain-anda.com/phone-peeking/`.

## Menjalankan secara lokal

- Cara paling mudah: klik dua kali `index.html` di komputer.
- Alternatif dengan Python (opsional): dari folder project jalankan `python -m http.server 8000`, lalu buka `http://localhost:8000`.

## Fitur interaktif

- 2 halaman Home Screen berisi ikon bergaya iOS, dengan dock empat aplikasi.
- Ketuk ikon untuk membuka aplikasi; ketuk garis di bawah untuk kembali ke Home.
- Geser kiri/kanan pada Home Screen di perangkat sentuh atau gunakan titik navigasi halaman.
- Kunci layar, ketuk notifikasi, atau swipe ke atas untuk membuka.
- Pesan dengan dua opsi respons, email, panggilan telepon fiktif, foto, catatan, kalender, kamera, musik, dan pengaturan wallpaper.
- Progres eksplorasi enam petunjuk utama dan tombol mulai ulang.
- Tampilan responsif untuk desktop dan seluler; dibuat tanpa CDN atau resource eksternal.

## Kustomisasi

- **Judul / teks halaman:** ubah `index.html`.
- **Warna / ukuran tampilan:** ubah `style.css`.
- **Cerita, pesan dan catatan:** ubah objek `STORY` pada bagian awal `app.js`.
- **Nama dan ikon aplikasi:** ubah `APP_DATA` dan objek `ICON` di `app.js`.
- **Wallpaper:** tersedia tema senja, malam, dan rose melalui tombol *Ganti wallpaper*.

## Catatan

Website ini merupakan **simulasi fiktif terinspirasi antarmuka iOS**, bukan salinan aplikasi Apple atau website referensi. Semua panggilan, email, data perjalanan, dan konten aplikasi dibuat untuk keperluan demo. Musik tidak memutar audio sungguhan; aplikasi generik hanya menampilkan konten simulasi. Tidak ada pengumpulan data pengguna atau koneksi jaringan dari skrip.
