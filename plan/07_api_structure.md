# Pick Up - API & Backend Structure

## Backend Stack (Recommended)
- **API**: Node.js (Express/Fastify) atau Go
- **Database**: PostgreSQL (utama) + Redis (cache/session)
- **Realtime**: WebSocket / Firebase Realtime DB (tracking, chat)
- **Storage**: Firebase Storage / Cloudflare R2 (foto profile, menu)
- **Auth**: Firebase Auth (OTP, Google, Apple)
- **Maps**: Google Maps Platform (Directions, Places, Geocoding)
- **Payment**: Midtrans / Xendit
- **Push Notif**: Firebase Cloud Messaging (FCM)

---

## API Endpoints

### Auth
```
POST   /api/v1/auth/send-otp          { phone }
POST   /api/v1/auth/verify-otp        { phone, otp }
POST   /api/v1/auth/google            { idToken }
POST   /api/v1/auth/apple             { identityToken }
POST   /api/v1/auth/refresh-token     { refreshToken }
DELETE /api/v1/auth/logout
```

### User
```
GET    /api/v1/user/me
PUT    /api/v1/user/me                 { name, email, photo }
POST   /api/v1/user/me/photo          (multipart)
GET    /api/v1/user/addresses
POST   /api/v1/user/addresses          { label, address, lat, lng }
PUT    /api/v1/user/addresses/:id
DELETE /api/v1/user/addresses/:id
```

### Ride
```
POST   /api/v1/ride/estimate           { pickupLat, pickupLng, destLat, destLng }
        -> { options: [{ type, price, eta }] }
POST   /api/v1/ride/book               { pickupLat, pickupLng, destLat, destLng, type, paymentMethod }
        -> { rideId, status }
GET    /api/v1/ride/:id
POST   /api/v1/ride/:id/cancel
POST   /api/v1/ride/:id/rate           { rating, tip, comment }
```

### Food
```
GET    /api/v1/food/restaurants         ?lat=&lng=&category=&q=&page=
GET    /api/v1/food/restaurants/:id
GET    /api/v1/food/restaurants/:id/menu
POST   /api/v1/food/orders              { restaurantId, items, addressId, paymentMethod, notes }
GET    /api/v1/food/orders/:id
POST   /api/v1/food/orders/:id/cancel
POST   /api/v1/food/orders/:id/rate     { restaurantRating, driverRating, comment }
```

### Send (Package)
```
POST   /api/v1/send/estimate            { pickupLat, pickupLng, destLat, destLng, size }
POST   /api/v1/send/book                { pickup, destination, size, notes, photo, paymentMethod }
GET    /api/v1/send/:id
POST   /api/v1/send/:id/cancel
```

### Payment / Wallet
```
GET    /api/v1/wallet/balance
GET    /api/v1/wallet/transactions       ?page=&limit=
POST   /api/v1/wallet/topup              { amount, method }
POST   /api/v1/wallet/transfer           { toUserId, amount }
GET    /api/v1/payment/methods
POST   /api/v1/payment/methods           { type, token }
DELETE /api/v1/payment/methods/:id
```

### Location / Search
```
GET    /api/v1/location/search           ?q=&lat=&lng=
GET    /api/v1/location/reverse          ?lat=&lng=
GET    /api/v1/location/autocomplete     ?q=&lat=&lng=
```

### Chat
```
GET    /api/v1/chat/rooms
GET    /api/v1/chat/rooms/:id/messages   ?before=&limit=
POST   /api/v1/chat/rooms/:id/messages   { text }
```
*Chat real-time via WebSocket*

### Notifications
```
GET    /api/v1/notifications              ?page=&limit=
PUT    /api/v1/notifications/:id/read
PUT    /api/v1/notifications/read-all
POST   /api/v1/user/fcm-token            { token, platform }
```

### Promo
```
GET    /api/v1/promos/banners
GET    /api/v1/promos/vouchers
POST   /api/v1/promos/apply               { code, orderId }
```

---

## Realtime Events (WebSocket)

### Ride Tracking
```
Channel: ride:{rideId}

Events:
- driver_found      { driver, vehicle, eta }
- driver_location   { lat, lng, heading }
- driver_arrived    {}
- ride_started      {}
- ride_completed    { fare, receipt }
- ride_cancelled    { reason }
```

### Food Order Tracking
```
Channel: food_order:{orderId}

Events:
- order_confirmed    { estimatedTime }
- preparing          {}
- driver_assigned    { driver }
- driver_pickup      {}
- driver_location    { lat, lng }
- delivered          {}
- cancelled          { reason }
```

### Chat
```
Channel: chat:{roomId}

Events:
- new_message       { id, text, senderId, timestamp }
- typing            { userId }
```

---

## Response Format

### Success
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "RIDE_NOT_FOUND",
    "message": "Ride not found",
    "details": null
  }
}
```

## Auth Header
```
Authorization: Bearer <jwt_token>
```
