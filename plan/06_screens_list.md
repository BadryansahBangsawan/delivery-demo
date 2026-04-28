# Pick Up - Screen List & Priority

## Phase 1 (MVP) - Core Screens

### Auth (4 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
| 1 | Splash               | P0       | Logo, loading, cek auth            |
| 2 | Onboarding           | P1       | 3 slides intro                     |
| 3 | Login                | P0       | Input nomor HP, social login       |
| 4 | OTP Verification     | P0       | Input 6 digit OTP                  |

### Home (1 screen)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
| 5 | Home                 | P0       | Service grid, promo, search, recent|

### PickRide (5 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
| 6 | Pick Location        | P0       | Input pickup & destination         |
| 7 | Choose Ride          | P0       | Map + ride options + price         |
| 8 | Searching Driver     | P0       | Loading animation                  |
| 9 | Live Tracking        | P0       | Map tracking + driver info         |
|10 | Ride Complete        | P0       | Rating, tip, receipt               |

### PickFood (5 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|11 | Food Home            | P0       | Restoran list, kategori, search    |
|12 | Restaurant Detail    | P0       | Menu, info, foto                   |
|13 | Cart                 | P0       | Items, qty, total, checkout        |
|14 | Food Order Confirm   | P0       | Alamat, payment, confirm           |
|15 | Food Tracking        | P0       | Status + map + driver              |

### PickSend (3 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|16 | Send Package         | P1       | Pickup & delivery location         |
|17 | Package Detail       | P1       | Size, weight, photo, notes         |
|18 | Send Tracking        | P1       | Status + map                       |

### Payment (3 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|19 | Wallet               | P0       | Balance, top up, history           |
|20 | Top Up               | P1       | Payment method, amount             |
|21 | Payment Method       | P0       | Manage cards, e-wallets            |

### Activity (2 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|22 | Activity List        | P0       | Ongoing + completed orders         |
|23 | Order Detail         | P0       | Full order info + receipt          |

### Chat (2 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|24 | Chat List            | P1       | Active conversations               |
|25 | Chat Room            | P0       | Messages + quick replies           |

### Profile (5 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|26 | Profile              | P0       | Info + menu list                   |
|27 | Edit Profile         | P1       | Nama, foto, email, phone           |
|28 | Saved Addresses      | P1       | Rumah, kantor, custom              |
|29 | Settings             | P2       | Bahasa, notif, dark mode           |
|30 | Help & FAQ           | P2       | FAQ, contact support               |

### Shared (3 screens)
| # | Screen               | Priority | Description                        |
|---|----------------------|----------|------------------------------------|
|31 | Notification Center  | P1       | All notifications                  |
|32 | Search               | P0       | Search location / restoran         |
|33 | Setup Profile        | P0       | Untuk user baru setelah OTP        |

---

**Total Phase 1: ~33 screens**

## Priority Legend
- **P0**: Must have untuk MVP, tanpa ini app tidak bisa digunakan
- **P1**: Important, bisa ditunda tapi harus ada sebelum launch
- **P2**: Nice to have, bisa di-phase 2

## Phase 2 (Post-MVP)
- PickMart screens
- PickService screens
- Dark mode
- Multi-language
- Driver/Merchant app
- Admin dashboard (web)

---

## Development Order (Recommended)

### Sprint 1: Foundation
- Project setup, theme, routing, core widgets
- Splash, Onboarding, Login, OTP
- Home screen (static)

### Sprint 2: PickRide
- Location search & picker
- Map integration
- Ride booking flow (mock data)
- Tracking screen
- Rating screen

### Sprint 3: PickFood
- Restaurant list & detail
- Cart system
- Order flow
- Food tracking

### Sprint 4: Payment & Activity
- Wallet screen
- Payment integration
- Order history
- Notification center

### Sprint 5: Chat & Profile
- In-app chat
- Profile management
- Settings
- Saved addresses

### Sprint 6: Polish & Launch
- PickSend flow
- Animation & transitions
- Error handling & empty states
- Performance optimization
- Testing
