📌 Project Overview

Project ini terdiri dari frontend menggunakan Nuxt 3 dan backend menggunakan Express.js.

🚀 Installation & Setup

⚡ Prerequisites

Pastikan Anda sudah menginstal:

Node.js (disarankan versi terbaru)

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

# Contoh konfigurasi, sesuaikan dengan kebutuhan Anda
POSTGRES_DB=db_name
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_HOST=postgres_oss  # atau nama container PostgreSQL Anda
POSTGRES_PORT=5432

🐳 Jalankan Docker

docker compose up --build -d

🔄 Import Data ke PostgreSQL Docker

Jika data belum muncul, lakukan import data ke PostgreSQL Docker:

Masuk ke container PostgreSQLGanti <postgres_container_name> dengan nama container PostgreSQL Anda (misalnya postgres_oss jika mengikuti environment sebelumnya).

docker exec -it <postgres_container_name> bash

Masuk ke PostgreSQL

psql -U postgres -d oss_rba_master

Masukkan password yang sesuai dengan .env sebelumnya.

Buat tabel m_region_temp

CREATE TABLE IF NOT EXISTS m_region_temp (
    region_id TEXT,
    propinsi TEXT,
    kab_kota TEXT,
    kecamatan TEXT,
    kelurahan TEXT,
    flag_ibukota TEXT,
    keterangan TEXT,
    parent_id TEXT,
    nama TEXT,
    level TEXT,
    updated TEXT,
    created TEXT,
    flag_aktif TEXT,
    region_id_lama TEXT
);

Upload File CSV ke ContainerKeluarlah dari PostgreSQL dengan perintah \q, lalu unggah file CSV ke dalam container:

docker cp m_region.csv <postgres_container_name>:/tmp/m_region.csv

Import Data ke m_region_tempKembali ke PostgreSQL dan jalankan perintah berikut:

COPY m_region_temp FROM '/tmp/m_region.csv' DELIMITER ',' CSV HEADER;

🎨 Frontend (Nuxt 3)

📥 Install Dependencies

cd frontend
npm install  # atau yarn install

🛠 Konfigurasi Environment

Buat file .env di dalam folder frontend dan tambahkan konfigurasi berikut:

NUXT_PUBLIC_API_BASE=http://localhost:5000/api

▶ Jalankan Frontend

npm run dev  # atau yarn dev

Frontend akan berjalan di: http://localhost:3000 🎉
