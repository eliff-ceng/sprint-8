# Sprint 8 — Teslim öncesi kontrol

Kaynak kodu, Sprint 7 klasör yapısı ve ders slaytlarındaki puan tablosu esas alınarak hazırlandı.

## Ön koşullar

- [ ] Node.js, `npm install` ve `npm run dev` çalışıyor.
- [ ] Atlas'ta `kampus` veritabanı kullanılabiliyor.
- [ ] `backend/.env` dosyasında gerçek `MONGODB_URI` var, Git'te yok.
- [ ] `npm run seed` sonrası altı kayıt görünüyor; tekrar seed yapınca yine altı.

## Otomatik değerlendirmedeki yedi başlık (toplam 12 puan)

- [ ] **2 puan** — Temiz klasörde `npm install` ve `npm run dev` çalışıyor.
- [ ] **1 puan** — `src/config/database.js` var; URI `backend/.env` dosyasından okunuyor.
- [ ] **2 puan** — `src/models/event-model.js`: `required`, `trim`, en az bir uzunluk sınırlaması, `timestamps`; eksik POST 400.
- [ ] **2 puan** — `npm run seed` her çalışmada MongoDB'de altı kayıt bırakıyor.
- [ ] **2 puan** — GET `/events`: gerçek MongoDB dizisi; gerçek `_id` ile detay 200; `/events/yok` 404.
- [ ] **2 puan** — POST tam body 201, eksik body 400, ardından `/health` 200.
- [ ] **1 puan** — Tekrar başlatınca POST ile eklenen kayıt korunuyor.

## Teslim/güvenlik

- [ ] `backend/requests/kampus-api.json` Postman'a import edildi, altı test çalıştı.
- [ ] Postman test ekran görüntüleri alındı (gerçek URI/şifre görünmüyor).
- [ ] Git geçmişinde gerçek Atlas URI/şifre bulunmuyor.
- [ ] `node_modules` ve `.env` GitHub'a eklenmedi; `.env.example` eklendi.
- [ ] GitHub'daki kökte `frontend/`, `backend/`, `README.md` var.
- [ ] Hocanın istediği repo adresi ders sitesine eklendi.

**Not:** Bu maddeler gerçekleşti varsayımıyla işaretlenmedi; kendi bilgisayarındaki canlı çalıştırma ile doğrulayıp işaretlemelisin. `npm run seed` mevcut koleksiyondaki kayıtları siler. Kalıcılığı test ederken POST sonrası yeniden seed çalıştırma.
