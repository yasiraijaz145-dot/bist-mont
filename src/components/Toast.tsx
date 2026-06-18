'use client'
import { useEffect, useState } from 'react'

let addToastGlobal: ((msg: string) => void) | null = null

export function showToast(msg: string) {
  addToastGlobal?.(msg)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([])

  useEffect(() => {
    addToastGlobal = (msg: string) => {
      const id = Date.now()
      setToasts(prev => [...prev, { id, msg }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
    }
    return () => { addToastGlobal = null }
  }, [])

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">{t.msg}</div>
      ))}
    </div>
  )
}
