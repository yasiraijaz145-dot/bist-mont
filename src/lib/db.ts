import mysql from 'mysql2/promise'
 
let pool: mysql.Pool | null = null
 
export function getDB(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT || '3306'),
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME     || 'restaurant_db',
      waitForConnections: true,
      connectionLimit: 10,
    })
  }
  return pool
}
 
export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image_url: string
  tags: string
  is_available: number
  is_featured: number
  sort_order: number
}
 
export type Order = {
  id: number
  order_number: string
  customer_name: string
  email: string
  phone: string
  order_type: 'delivery' | 'pickup'
  delivery_address: string | null
  items_json: string
  subtotal: number
  discount_amount: number
  taxes: number
  delivery_fee: number
  total: number
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed'
  stripe_payment_intent: string | null
  special_instructions: string
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  created_at: string
  updated_at: string
}
 
export type User = {
  id: number
  username: string
  email: string
  password_hash: string
  role: 'admin' | 'staff'
  login_attempts: number
  locked_until: string | null
  created_at: string
}
 