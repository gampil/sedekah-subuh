# Sedekah Firebase Direct + ImgBB Architecture

## Struktur Final

Frontend:
- Firebase SDK langsung ke Realtime Database
- Tidak menggunakan AppScript sebagai API utama
- Tidak menggunakan Firebase Storage
- Gambar menggunakan ImgBB URL

Apps Script:
- Upload gambar ke ImgBB
- Telegram notification
- Email notification
- Approval donasi

## Alur Gambar

Admin / Donatur
-> Apps Script Image Upload
-> ImgBB
-> URL gambar
-> Firebase RTDB

## Struktur RTDB

programs/{id}
- title
- description
- imageUrl
- status

donations/{id}
- nama
- nominal
- buktiTransferUrl
- status (pending/approved/rejected)

admins/{uid}
- role

## Instalasi

1. Buat Firebase project.
2. Aktifkan Realtime Database.
3. Aktifkan Firebase Authentication Email Password.
4. Tambahkan UID admin ke node admins.
5. Deploy Apps Script.
6. Isi Config.gs:
   - Firebase URL
   - ImgBB API Key
   - Telegram Token
   - Email Admin

## Trigger Apps Script

Buat trigger:
checkNewDonation()

Interval:
1-5 menit.

## Catatan Keamanan

Jangan simpan ImgBB API Key di file javascript frontend.
Gunakan Apps Script sebagai gateway upload.