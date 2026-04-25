'use client'

import { useState } from "react"
import { login } from "../../services/auth"

type Props = {
  onLoginSuccess?: () => void
}

export function Login({ onLoginSuccess }: Props) {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!username || !email || !password) {
      setError("Preencha todos os campos")
      return
    }

    try {
      setLoading(true)
      setError("")

      await login(username, email, password)

      // limpa campos
      setUsername("")
      setEmail("")
      setPassword("")

      // avisa o componente pai
      onLoginSuccess?.()

    } catch (err) {
      setError("Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="
        bg-zinc-900 
        p-5 
        rounded-xl 
        w-full max-w-sm
        shadow-lg 
        border border-zinc-700
      "
    >
      <h2 className="text-white text-lg mb-4 text-center">
        Entrar
      </h2>

      <div className="flex flex-col gap-2">

        <input
          type="text"
          placeholder="Username"
          className="
            w-full p-2.5 rounded 
            bg-zinc-800 text-white text-sm
            outline-none
            focus:ring-2 focus:ring-indigo-500
          "
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="
            w-full p-2.5 rounded 
            bg-zinc-800 text-white text-sm
            outline-none
            focus:ring-2 focus:ring-indigo-500
          "
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="
            w-full p-2.5 rounded 
            bg-zinc-800 text-white text-sm
            outline-none
            focus:ring-2 focus:ring-indigo-500
          "
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-400 text-xs text-center mt-1">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="
            w-full 
            bg-green-500 hover:bg-green-400 
            disabled:bg-zinc-600
            py-2.5 rounded 
            text-white text-sm
            transition
          "
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

      </div>
    </div>
  )
}