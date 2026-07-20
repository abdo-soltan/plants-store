import { createContext, useContext, useEffect, useState } from 'react'

const RequestContext = createContext()
const REQUESTS_KEY = 'plants_store_requests'

function loadRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(REQUESTS_KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function RequestProvider({ children }) {
  const [requests, setRequests] = useState(loadRequests)
  useEffect(() => localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests)), [requests])

  const sendRequest = ({ subject, message, user }) => {
    const request = {
      id: crypto.randomUUID(),
      subject: subject.trim(),
      message: message.trim(),
      userId: user.id,
      username: user.username,
      name: user.name,
      status: 'New',
      createdAt: new Date().toISOString(),
    }
    setRequests((current) => [request, ...current])
  }

  const setRequestStatus = (id, status) => setRequests((current) => current.map((request) => request.id === id ? { ...request, status } : request))
  const deleteRequest = (id) => setRequests((current) => current.filter((request) => request.id !== id))

  return <RequestContext.Provider value={{ requests, sendRequest, setRequestStatus, deleteRequest }}>{children}</RequestContext.Provider>
}

export const useRequests = () => useContext(RequestContext)
