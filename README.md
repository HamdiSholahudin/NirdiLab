# ✨ Hanir Lab - Ultimate Productivity Space

**Hanir Lab** adalah aplikasi produktivitas berbasis web yang menggabungkan teknik Pomodoro, Manajemen Tugas (To-Do List), dan *Soundscape* yang menenangkan dalam antarmuka *Glassmorphism* yang estetis.

Dibuat khusus sebagai ruang digital untuk fokus, belajar, dan beribadah dengan integrasi Murottal Al-Qur'an.

![Hanir Lab Preview](public/images/logo.png)
*(Pastikan Anda mengupload screenshot aplikasi di folder public/images dan ganti nama filenya di sini agar muncul preview)*

## 🌟 Fitur Utama (Key Features)

### ⏱️ Smart Focus Timer
- **Mode Fleksibel:** Preset untuk Study (25/5), Work (50/10), Health (45/15), dan mode Custom.
- **Visual Indikator:** Background dan aset karakter berubah dinamis antara mode *Fokus* dan *Istirahat*.
- **Daily Stats:** Penghitung sesi fokus dan istirahat harian.

### 🎧 Audio & Spiritual Soundscape
- **MP3 Player Native:** Putar audio Lofi dan Murottal tanpa iklan.
- **Qur'an Playlist:** Koleksi surat pilihan (Al-Kahf, Ar-Rahman, Yasin, Al-Mulk, Juz 30) dari Qori ternama (Mishary Rashid, Saad Al Ghamdi).
- **Spotify Integration:** Embed playlist Spotify favorit.

### 🎨 Personalization & Theming
- **Tema Warna:** Pilihan tema Nebula (Ungu), Nature (Hijau), Ocean (Biru), Sunset (Orange), dan Midnight (Dark).
- **Custom Background:** Upload gambar/wallpaper sendiri dari galeri lokal.
- **Editable Profile:** Ubah nama pengguna sapaan ("Hi, [Nama]").

### 📝 Task Management
- **To-Do List:** Tambah, edit, hapus, dan tandai tugas selesai.
- **Simpel & Bersih:** Tampilan *overlay* kaca yang tidak mengganggu fokus.

### 🌍 Localization
- **Dual Language:** Dukungan penuh Bahasa Indonesia (ID) dan English (EN).

## 🛠️ Teknologi (Tech Stack)

Aplikasi ini dibangun menggunakan teknologi web modern:

- **[React.js](https://reactjs.org/)** - Library UI utama.
- **[Vite](https://vitejs.dev/)** - Build tool yang super cepat.
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling framework untuk desain responsif.
- **[Lucide React](https://lucide.dev/)** - Ikon set yang rapi dan ringan.

## 🚀 Cara Menjalankan (Installation)

Jika Anda ingin menjalankan proyek ini di komputer Anda:

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/USERNAME-ANDA/hanir-lab.git](https://github.com/USERNAME-ANDA/hanir-lab.git)
    cd hanir-lab
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Server Lokal**
    ```bash
    npm run dev
    ```

4.  Buka browser dan akses `http://localhost:5173`.

## 📂 Struktur Aset

Pastikan Anda memiliki folder `public/images` untuk menyimpan aset gambar karakter dan logo agar aplikasi berjalan sempurna.

```text
public/
├── images/
│   ├── logo.png
│   ├── muslimah-focus.png
│   ├── muslimah-break.png
│   ├── engineer-focus.png
│   └── engineer-break.png
