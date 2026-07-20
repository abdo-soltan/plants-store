import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()
const USERS_KEY = 'plants_store_users'
const SESSION_KEY = 'plants_store_session'

const adminAccount = {
  id: 'admin-account',
  name: 'Store Administrator',
  username: 'admin',
  password: 'Plants@2026!',
  role: 'admin',
  createdAt: '2026-07-20T00:00:00.000Z',
}

function loadUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY))
    if (Array.isArray(saved) && saved.some((user) => user.role === 'admin')) return saved
  } catch {
    // Start fresh if browser storage is malformed.
  }
  localStorage.setItem(USERS_KEY, JSON.stringify([adminAccount]))
  return [adminAccount]
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers)
  const [user, setUser] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(SESSION_KEY))
      return saved?.id ? saved : null
    } catch {
      return null
    }
  })

  useEffect(() => localStorage.setItem(USERS_KEY, JSON.stringify(users)), [users])
  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  }, [user])

  const register = ({ name, username, password }) => {
    const normalizedUsername = username.trim().toLowerCase()
    if (users.some((account) => account.username.toLowerCase() === normalizedUsername)) {
      return { ok: false, message: 'This username is already in use.' }
    }
    const account = {
      id: crypto.randomUUID(),
      name: name.trim(),
      username: normalizedUsername,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    setUsers((current) => [...current, account])
    setUser(account)
    return { ok: true, user: account }
  }

  const login = ({ username, password }) => {
    const account = users.find(
      (candidate) => candidate.username.toLowerCase() === username.trim().toLowerCase() && candidate.password === password,
    )
    if (!account) return { ok: false, message: 'Incorrect username or password.' }
    setUser(account)
    return { ok: true, user: account }
  }

  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, users, login, logout, register }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
