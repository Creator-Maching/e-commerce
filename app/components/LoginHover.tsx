'use client'

import { useState, useRef, useEffect } from "react"
import { Login } from "./Login"

export function LoginHover() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // CLICK FORA
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="
          bg-zinc-800 
          hover:bg-zinc-700
          text-white 
          px-4 py-2 
          md:px-5 md:py-2.5
          rounded-lg
          text-sm md:text-base
          transition
        "
      >
        Login
      </button>

      {/* DROPDOWN / MODAL */}
      {open && (
        <>
          {/* OVERLAY (mobile) */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setOpen(false)}
          />

          {/* CONTEÚDO */}
          <div
            className="
              absolute right-0 mt-2 z-50
              
              w-[90vw] max-w-sm
              md:w-80

              bg-zinc-900 
              border border-zinc-700
              rounded-xl 
              shadow-2xl

              animate-fadeIn
            "
          >
            <Login />
          </div>
        </>
      )}
    </div>
  )
}