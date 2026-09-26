# Sedekah Subuh Haramain - Firebase Direct Migration

Migrasi backend:
Frontend -> Firebase Realtime Database
Admin -> Firebase Authentication + Realtime Database
Upload -> Apps Script -> ImgBB

## Deploy Frontend
Upload seluruh folder ke hosting statis.

## Firebase
Aktifkan:
- Realtime Database
- Authentication Email/Password

Struktur:
programs/{programId}
donations/{donationId}
admins/{uid}

## ImgBB
Masukkan API key pada apps_script/Config.gs.

## Apps Script
Deploy Web App untuk gateway:
- upload ImgBB
- Telegram notification
- Email notification
- Approval automation

## Telegram
Isi token bot dan chat ID.

## Email
Isi email admin pada Config.gs.

