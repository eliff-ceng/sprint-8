# Kampüs Etkinlikleri — Sprint 8

Süleyman Demirel Üniversitesi • Öğrenci no: **2416501075**

Sprint 7'deki Express API artık **MongoDB + Mongoose** kullanır. `GET /health`, `GET /events`, `GET /events/:id` ve `POST /events` adresleri korunmuştur. Etkinlikler artık RAM dizisinde tutulmaz; sunucu kapatılıp açıldığında veritabanında saklanır.

## Klasörler

- `frontend/`: Sprint 7'den **aynen korunmuş** React + Vite arayüzü. Bu sprintte API ile entegre edilmez; frontend kendi yerel veri yönetimini kullanmaya devam eder.
- `backend/`: Express, MongoDB bağlantısı, Mongoose Event modeli, altı kayıtlık seed, testler ve Postman koleksiyonu.

## Hızlı başlangıç

1. MongoDB Atlas'ta ücretsiz cluster oluştur; database user tanımla ve Network Access'te **yalnızca ihtiyaç duyduğun IP'ye** izin ver (ders için gerekirse geçici olarak tüm IP'ler kullanılabilir; sonra erişimi daralt).
2. `backend` klasöründe `cp .env.example .env` komutunu kullan. `MONGODB_URI` değerini Atlas'ın **kendi** `mongodb+srv://.../kampus?...` bağlantısıyla değiştir. Gerçek şifre yalnızca `.env` dosyasında kalmalı; hiçbir yerde paylaşılmamalı.
3. `cd backend && npm install && npm run seed && npm run dev` komutlarını sırayla çalıştır.
4. `GET http://localhost:3000/health` ve `GET http://localhost:3000/events` isteklerini dene.
5. `backend/requests/kampus-api.json` dosyasını Postman'a import ederek 6 isteği **sırayla** gönder.
6. POST ile eklenen kayıtları korumak için **yeniden seed çalıştırmadan** sunucuyu durdur/aç; `GET /events` artık 7 etkinlik döndürmeli.

> `npm run seed` mevcut **events koleksiyonundaki tüm kayıtları siler**, sonra altı örnek kaydı yeniden ekler. Sadece örnek veriyi sıfırlamak istediğinde çalıştır.

Backend ayrıntıları: [backend/README.md](backend/README.md)

## GitHub teslimi

- Kaynak dosyaları Sprint 7'de kullandığın deponun **köküne** ekle; mevcut git geçmişini koru.
- Gerçek `.env`, `node_modules`, şifre, bağlantı bilgisi ya da ekran görüntüsüne yazılmış özel URI **yükleme**.
- `.env.example`, README, `requests/kampus-api.json` ve kaynak dosyalar GitHub'da bulunmalı.
- `git status`, `git add .`, `git commit -m "Complete sprint 8 MongoDB persistence"`, `git push`.

⚠️ Bu arşivde kişisel Atlas kullanıcı adı/şifresi bulunmaz. O bilgiler senin tarafında girilmeden canlı Atlas testi yapılamaz.
