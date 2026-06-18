# Bistro Montréal — Next.js 14

Exact 1:1 conversion of the PHP/MySQL site to Next.js 14 + TypeScript + MySQL.

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.local.example .env.local
# Edit .env.local with your MySQL credentials
```

### 3. Import database
```sql
-- In MySQL / phpMyAdmin, run:
SOURCE setup.sql;
```

### 4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Pages
| Route | Description |
|-------|-------------|
| `/` | Home — hero slider + menu by category |
| `/menu` | Full menu with category navigation |
| `/about` | About page + team |
| `/reservations` | Table reservation form |
| `/contact` | Contact form |
| `/cart` | Shopping cart + promo codes |
| `/checkout` | Checkout with multiple payment methods |
| `/confirmation` | Order confirmation |
| `/track` | Track order by number or email |

## API Routes
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/menu` | GET | Fetch menu items |
| `/api/newsletter` | POST | Newsletter signup |
| `/api/reservations` | POST | Create reservation |
| `/api/contact` | POST | Submit contact form |
| `/api/track` | GET | Look up order status |
| `/api/promo` | POST | Apply promo code |
| `/api/checkout` | POST | Place order |
