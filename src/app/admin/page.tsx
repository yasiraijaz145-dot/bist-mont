'use client'
import { useState, useEffect, useCallback } from 'react'

type Submission = {
  id: number; name: string; email: string; phone: string | null
  message: string; is_read: number; created_at: string
}
type Stats = { total: number; unread: number; today: number }

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    setLoading(false)
    if (res.ok) { onLogin() }
    else { const j = await res.json().catch(() => ({})); setError(j.error ?? 'Login failed') }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f9f5f0',fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:'#fff',borderRadius:16,padding:'48px 40px',boxShadow:'0 8px 40px rgba(0,0,0,0.10)',width:'100%',maxWidth:400}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <div style={{fontSize:36}}>🍽️</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:'#1a1a1a',margin:'8px 0 0'}}>Bistro Montréal</h1>
          <p style={{color:'#888',marginTop:6,fontSize:14}}>Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={{display:'block',fontSize:13,fontWeight:600,color:'#555',marginBottom:6}}>Username</label>
          <input style={{width:'100%',padding:'10px 14px',borderRadius:8,border:'1px solid #e8e0d5',fontSize:15,boxSizing:'border-box' as const}} type="text" value={username} onChange={e => setUsername(e.target.value)} required />
          <label style={{display:'block',fontSize:13,fontWeight:600,color:'#555',margin:'16px 0 6px'}}>Password</label>
          <input style={{width:'100%',padding:'10px 14px',borderRadius:8,border:'1px solid #e8e0d5',fontSize:15,boxSizing:'border-box' as const}} type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          {error && <p style={{color:'#c0392b',fontSize:13,marginTop:12}}>{error}</p>}
          <button type="submit" disabled={loading} style={{width:'100%',marginTop:24,padding:'12px',background:'#e85d04',color:'#fff',border:'none',borderRadius:8,fontSize:16,fontWeight:600,cursor:'pointer'}}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [stats, setStats]             = useState<Stats | null>(null)
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [selected, setSelected]       = useState<Submission | null>(null)
  const [loading, setLoading]         = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/root')
    if (res.status === 401) { onLogout(); return }
    const data = await res.json()
    setStats(data.stats); setSubmissions(data.submissions ?? []); setLoading(false)
  }, [onLogout])

  useEffect(() => { load() }, [load])

  async function markRead(id: number, is_read: boolean) {
    await fetch('/api/admin/root', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, is_read }) })
    setSubmissions(s => s.map(x => x.id === id ? { ...x, is_read: is_read ? 1 : 0 } : x))
    if (selected?.id === id) setSelected(s => s ? { ...s, is_read: is_read ? 1 : 0 } : s)
    load()
  }

  async function deleteMsg(id: number) {
    if (!confirm('Delete this message?')) return
    await fetch('/api/admin/root', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id }) })
    setSubmissions(s => s.filter(x => x.id !== id))
    if (selected?.id === id) setSelected(null)
    load()
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    onLogout()
  }

  return (
    <div style={{minHeight:'100vh',background:'#f9f5f0',fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{background:'#fff',borderBottom:'1px solid #e8e0d5',padding:'0 32px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64,boxShadow:'0 2px 12px rgba(0,0,0,0.05)'}}>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700}}>🍽️ Bistro Montréal <span style={{color:'#e85d04',fontSize:14,fontWeight:500}}>Admin</span></span>
        <button onClick={logout} style={{background:'none',border:'1px solid #e8e0d5',borderRadius:8,padding:'6px 16px',cursor:'pointer',fontSize:13,color:'#555'}}>Sign out</button>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        {stats && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:28}}>
            {([{label:'Total',value:stats.total,icon:'📬'},{label:'Unread',value:stats.unread,icon:'🔴',hi:stats.unread>0},{label:'Today',value:stats.today,icon:'📅'}] as any[]).map(s => (
              <div key={s.label} style={{background:'#fff',borderRadius:12,padding:'20px 24px',boxShadow:'0 2px 12px rgba(0,0,0,0.05)',borderLeft:`4px solid ${s.hi?'#e85d04':'transparent'}`}}>
                <div style={{fontSize:24}}>{s.icon}</div>
                <div style={{fontSize:32,fontWeight:700,color:s.hi?'#e85d04':'#1a1a1a'}}>{s.value}</div>
                <div style={{fontSize:13,color:'#888'}}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
          <h2 style={{fontSize:18,fontWeight:600,margin:0}}>Contact Submissions</h2>
          <button onClick={load} style={{padding:'6px 14px',background:'none',border:'1px solid #e8e0d5',borderRadius:8,cursor:'pointer',fontSize:13,color:'#555'}}>↻ Refresh</button>
        </div>
        {loading ? <p style={{color:'#888',textAlign:'center',padding:48}}>Loading…</p> : submissions.length === 0 ? <p style={{color:'#888',textAlign:'center',padding:48}}>No messages yet.</p> : (
          <div style={{display:'grid',gridTemplateColumns:selected?'1fr 1fr':'1fr',gap:16}}>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {submissions.map(s => (
                <div key={s.id} onClick={() => { setSelected(s); if (!s.is_read) markRead(s.id, true) }}
                  style={{background:'#fff',borderRadius:10,padding:'14px 18px',cursor:'pointer',borderLeft:`4px solid ${s.is_read?'transparent':'#e85d04'}`,boxShadow:selected?.id===s.id?'0 0 0 2px #e85d04':'0 2px 8px rgba(0,0,0,0.05)'}}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <strong style={{fontSize:14,color:s.is_read?'#555':'#1a1a1a'}}>{!s.is_read&&'● '}{s.name}</strong>
                    <span style={{fontSize:11,color:'#aaa'}}>{new Date(s.created_at).toLocaleDateString()}</span>
                  </div>
                  <div style={{fontSize:12,color:'#888',marginTop:2}}>{s.email}</div>
                  <div style={{fontSize:13,color:'#666',marginTop:4,overflow:'hidden',whiteSpace:'nowrap',textOverflow:'ellipsis'}}>{s.message}</div>
                </div>
              ))}
            </div>
            {selected && (
              <div style={{background:'#fff',borderRadius:12,padding:24,boxShadow:'0 2px 16px rgba(0,0,0,0.07)',height:'fit-content',position:'sticky',top:24}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:20}}>
                  <h3 style={{margin:0}}>{selected.name}</h3>
                  <button onClick={() => setSelected(null)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'#888'}}>✕</button>
                </div>
                <p style={{fontSize:14,marginBottom:8}}><strong style={{color:'#888',fontSize:12,marginRight:12}}>Email</strong><a href={`mailto:${selected.email}`} style={{color:'#e85d04'}}>{selected.email}</a></p>
                {selected.phone && <p style={{fontSize:14,marginBottom:8}}><strong style={{color:'#888',fontSize:12,marginRight:12}}>Phone</strong>{selected.phone}</p>}
                <p style={{fontSize:14,marginBottom:8}}><strong style={{color:'#888',fontSize:12,marginRight:12}}>Date</strong>{new Date(selected.created_at).toLocaleString()}</p>
                <div style={{background:'#f9f5f0',borderRadius:8,padding:16,marginTop:16,fontSize:14,lineHeight:1.6,whiteSpace:'pre-wrap'}}>{selected.message}</div>
                <div style={{display:'flex',gap:10,marginTop:20}}>
                  <button onClick={() => markRead(selected.id,!selected.is_read)} style={{padding:'6px 14px',background:'none',border:'1px solid #e8e0d5',borderRadius:8,cursor:'pointer',fontSize:13,color:'#555'}}>
                    {selected.is_read?'◯ Mark unread':'✓ Mark read'}
                  </button>
                  <button onClick={() => deleteMsg(selected.id)} style={{padding:'6px 14px',background:'none',border:'1px solid #c0392b',borderRadius:8,cursor:'pointer',fontSize:13,color:'#c0392b'}}>
                    🗑 Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  useEffect(() => { fetch('/api/admin/root').then(r => setAuthed(r.status !== 401)) }, [])
  if (authed === null) return <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#888'}}>Checking session…</div>
  return authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <LoginForm onLogin={() => setAuthed(true)} />
}