📌 Description

Project ini terdiri dari frontend menggunakan Nuxt 3 dan backend menggunakan Express.js.

🚀 Installation & Setup

⚡ Prerequisites

Pastikan kamu sudah menginstal:

Node.js (versi terbaru disarankan)

npm atau yarn

📂 Folder Structure
/project-root
  ├── backend  (Express.js backend)
  ├── frontend (Nuxt 3 frontend)
  ├── README.md
  ├── .gitignore
  └── package.json

  🔧 Backend (Express.js)

📥 Install Dependencies
cd backend
npm install  # atau yarn install

🛠 Konfigurasi Environment

Buat file .env di dalam folder backend dan tambahkan konfigurasi berikut:
PORT=5000
DB_URI=mongodb://localhost:27017/nama_database
JWT_SECRET=your_secret_key

Jalankan Backend

npm run dev  # atau yarn dev

Backend akan berjalan di http://localhost:5000

 Frontend (Nuxt 3)

📥 Install Dependencies

cd frontend
npm install  # atau yarn install

🛠 Konfigurasi Environment

Buat file .env di dalam folder frontend dan tambahkan konfigurasi berikut:

NUXT_PUBLIC_API_BASE=http://localhost:5000/api

▶ Jalankan Frontend

npm run dev  # atau yarn dev

Frontend akan berjalan di http://localhost:3000
