# Sprint 8 — MongoDB ve Mongoose ile kalıcı veri

Bu backend Sprint 7'deki Node.js + Express API'sini genişletir. Sprint 7'deki `src/data/events.js` artık kullanılmaz; `src/data/seed-events.js` örnek verinin yalnızca **seed** kaynağıdır. Etkinlikleri controller MongoDB'den getirir.

## 0. Ön koşullar

- Node.js 20.19+ (öneri: güncel LTS; 22 veya 24)
- MongoDB Atlas M0 ücretsiz cluster **ya da** yerel MongoDB
- Atlas → **Database Access**: kullanıcı oluştur; **Network Access**: bağlantı yapan IP'ye izin ver; **Connect → Drivers**: URI'yi kopyala.
- Atlas URI'nin veritabanı kısmı `/kampus` olacak. URI'deki özel karakterli şifreleri URL-encode et.
- `.env` yalnızca senin bilgisayarında tutulmalı, GitHub'a asla yüklenmemeli.

## 1. Kurulum (EndeavourOS / Linux)

```bash
cd backend
npm install
cp .env.example .env
```

`.env` dosyasını VS Code ile aç. Ornek yerel bağlantıyı **kendi** Atlas URI'nle değiştir:

```dotenv
PORT=3000
MONGODB_URI=mongodb+srv://KULLANICI:URL_KODLANMIS_SIFRE@CLUSTER_ADRESI/kampus?retryWrites=true&w=majority
```

Gerçek kullanıcı, şifre ve host adresini kod, README, Postman collection, commit veya ekran görüntüsüne koyma. Atlas Network Access'te ihtiyaç duyduğun IP'yi yetkilendir. Eğer öğretmenin yönergesi geçici `0.0.0.0/0` istiyorsa yalnızca gerektiği süre izin verip sonra kaldır.

## 2. Altı örnek etkinliği Atlas'a ekle

```bash
npm run seed
```

İlk çalışma: `MongoDB baglandi: .../kampus` ve `Seed tamamlandi: 6 etkinlik eklendi.` beklenir.

**Dikkat:** `seed.js` önce `Event.deleteMany({})` çalıştırır; mevcut **events koleksiyonu silinir** ve altı örnek yeniden eklenir. Bu komutu her sunucu açılışında çalıştırma. Bir kez daha çalıştırırsan yine toplam 6 olur, `_id` değerleri yeniden oluşturulur.

## 3. Sunucuyu başlat

```bash
npm run dev
```

Sunucu **ancak MongoDB bağlantısından sonra** port 3000'de başlar.

- `GET http://localhost:3000/health` → **200**; `status: ok`, `time`, `student: 2416501075`
- `GET http://localhost:3000/events` → **200**; seed sonrası 6 etkinlik, `_id`, `createdAt`, `updatedAt`
- `GET http://localhost:3000/events?category=At%C3%B6lye` → **200**; filtrelenmiş etkinlikler
- `GET http://localhost:3000/events/<listeden-gercek-_id>` → **200**; tek etkinlik
- `GET http://localhost:3000/events/yok` → **404** `Event not found` (geçersiz ObjectId)
- `GET http://localhost:3000/events/507f1f77bcf86cd799439011` → **404** (geçerli biçim, fakat bulunamayan ObjectId)
- `POST http://localhost:3000/events` → tam body için **201**; sadece title, enum dışı category veya çok kısa title için **400**

Tam POST gövdesi:

```json
{
  "title": "Akıllı Devre Tasarımı Atölyesi",
  "category": "Atölye",
  "date": "2026-12-10",
  "time": "17:00",
  "location": "Elektrik-Elektronik Mühendisliği Laboratuvarı",
  "description": "Katılımcılar sensörlerle çalışan basit devreler tasarlar.",
  "capacity": 30
}
```

Başarılı POST için yanıt `_id`, `createdAt` ve `updatedAt` alanlarını içerir. `id: event-2` artık yoktur: MongoDB `_id` kullanır.

### Şema / doğrulama

`src/models/event-model.js` içinde `title` zorunlu + trim + min 3 / max 100, `category` zorunlu + enum, `date` zorunlu, `capacity` min 0 + default 0, `description` max 500 ve `timestamps:true` bulunur. Kategori değerleri: `Seminer`, `Atölye`, `Söyleşi`, `Yarışma`.

## 4. Postman

Postman → Import → `requests/kampus-api.json`. Koleksiyon sırasıyla:

1. GET `/health` → 200
2. GET `/events` → seed sonrası 6 + `_id` + timestamps. **İlk etkinliğin `_id` bilgisi `eventId` değişkenine otomatik kaydedilir.**
3. GET `/events/{{eventId}}` → 200 (2. istekten sonra çalıştır)
4. GET `/events/yok` → 404
5. POST `/events` (tam body) → 201
6. POST `/events` (yalnızca title) → 400

2. istekteki `6 kayıt` testi, POST'tan **önce** ve seed sonrası yapılmalıdır. POST'tan sonra kayıt sayısı 7 olur; bu beklenen davranıştır.

## 5. Gerçek kalıcılık testi (puan için önemli)

1. `npm run seed` → GET `/events` **6**.
2. POST `/events` ile bir etkinlik ekle → GET `/events` **7**.
3. Terminalde `Ctrl+C` → `npm run dev` (tekrar seed **çalıştırma**).
4. GET `/events` → yine **7** (sunucu yeniden başladı ama veri MongoDB'de kaldı).
5. Atlas → Browse Collections → `kampus` → `events`; kayıtları gör.

## 6. Otomatik testler

```bash
npm test
```

Testler node:test ve Mongoose mock'ları kullanır. Böylece gerçek Atlas bağlantısı olmadan controller davranışlarını, 200/201/400/404 durumlarını, şema kurallarını kontrol eder. **Bunlar gerçek kalıcılık testi değildir**; 5. bölümdeki elle kontrolü de yapmalısın.

## 7. Repo düzeni

```text
backend/
  src/
    app.js
    server.js
    config/database.js
    models/event-model.js
    data/seed-events.js
    controllers/event-controller.js
    routes/event-routes.js
    seed.js
  requests/kampus-api.json
  tests/api.test.js
  .env.example
  .gitignore
  package.json
  README.md
```

`package-lock.json` kaynak Sprint 7'deki eski sürüm olduğundan bu teslim arşivine alınmamıştır. `npm install` yeni bağımlılık kilit dosyasını üretir; **oluşan** güncel `package-lock.json`'ı GitHub'a ekleyebilirsin. `node_modules` ve `.env` eklenmez.

Frontend Sprint 7 ile aynıdır; bağımsız yerel state kullanır. Ders yönergesine uygun olarak bu sprintte frontend'in API ile eşitlenmesi **yapılmamıştır**.

## 8. Hata rehberi

| Mesaj / durum | Kontrol et |
| --- | --- |
| `MONGODB_URI tanimli degil` | `backend/.env` var mı, satır doğru mu? |
| `bad auth` | Atlas kullanıcı adı, URL-encoded şifre, Database Access |
| `timeout / could not connect` | Network Access, okul ağı, DNS; gerekirse telefon hotspot |
| `GET /events` boş dizi | `npm run seed` çalıştır, Atlas'ta doğru `/kampus` veritabanını seç |
| `/events/yok` 500 | Eski controller mı çalışıyor? `isValidObjectId` kontrolü olmalı |
| Eksik POST 500 | `ValidationError` doğru biçimde 400'e çevriliyor mu? |
| POST sonrası her start'ta 6 | `npm run seed` her start'ta çalıştırılmamalı |

## 9. GitHub'a güvenli teslim

```bash
git status
git add .
git status
git commit -m "Complete sprint 8 MongoDB persistence"
git push
```

`git status` içinde `.env`, `node_modules`, gerçek kimlik bilgileri **görünmemeli**. Sprint 7 git geçmişini koru; proje kökünde `backend` ve `frontend` yan yana durmalı. Hocan adım başına ayrı commit istiyorsa gerçek geliştirme/test aşamalarında ayrı commit yap.
