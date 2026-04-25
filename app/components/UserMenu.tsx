'use client'

import { useEffect, useState } from "react"
import { getSession, login, logout } from "../../services/auth"

export function UserMenu() {
  const [user, setUser] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const session = getSession()
    setUser(session)
  }, [])

  function handleLogin() {
    if (!username || !email || !password) return

    const user = login(username, email, password)
    setUser(user)
    setOpen(false)
  }

  function handleLogout() {
    logout()
    setUser(null)
  }

  return (
    <div className="relative">
      
      {/* BOTÃO */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer text-white bg-zinc-800 px-4 py-2 rounded-lg"
      >
        {user ? `👤 ${user.username}` : "Entrar"}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-zinc-900 border border-zinc-700 rounded-xl p-4 z-[9999] shadow-2xl">

          {user ? (
            <>
              <p className="text-white text-sm mb-3">
                Logado como <strong>{user.username}</strong>
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 py-2 rounded text-white text-sm"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <h2 className="text-white text-lg mb-3 text-center">
                Entrar
              </h2>

              <input
                placeholder="Username"
                className="w-full mb-2 p-2 rounded bg-zinc-800 text-white text-sm"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />

              <input
                placeholder="Email"
                className="w-full mb-2 p-2 rounded bg-zinc-800 text-white text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Senha"
                className="w-full mb-2 p-2 rounded bg-zinc-800 text-white text-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <button
                onClick={handleLogin}
                className="w-full bg-green-500 py-2 rounded text-white text-sm"
              >
                Entrar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}