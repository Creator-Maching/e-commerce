'use client'

import { useState } from "react"
import { useCart } from "../context/CartContext"
import type { Card } from "@/types/Card"
import { getCardName, getCardPrice } from "@/utils/getCardData"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { useRouter } from "next/navigation"

function getCardImage(card: Card) {
  if (card.image_uris?.normal) return card.image_uris.normal;

  if (card.card_faces) {
    for (const face of card.card_faces) {
      if (face.image_uris?.normal) {
        return face.image_uris.normal;
      }
    }
  }

  return "/placeholder.png";
}

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart()
  const [open, setOpen] = useState(false)

  const rate = useExchangeRate() // cotação USD → BRL


  // total em REAL
  const totalBRL = cart.reduce((sum, item) => {
    const usd = getCardPrice(item.card)
    const brl = rate ? usd * rate : 0
    return sum + brl * item.quantity
  }, 0)

  const router = useRouter()

  return (
    <>
      {/* BOTÃO */}
      <button
        onClick={() => setOpen(true)}
        className="relative bg-indigo-600 px-4 py-2 rounded"
      >
        Carrinho

        {cart.length > 0 && (
          <span className="
            absolute -top-2 -right-2
            bg-red-500 text-xs px-2 py-1 rounded-full
          ">
            {cart.length}
          </span>
        )}
      </button>


      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* DRAWER */}
     <div className={`
        fixed top-0 right-0 h-full w-80
        bg-zinc-900 shadow-2xl z-50
        transform transition-transform duration-300
        flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}
      `}>
        {/* HEADER */}
        <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
          
          <h2 className="text-lg font-bold">Carrinho</h2>

          <button onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {/* LISTA */}
        <div className="p-4 flex flex-col gap-3 overflow-y-auto h-[70%]">
          {cart.length === 0 && (
            <p className="text-zinc-400">Carrinho vazio</p>
          )}

          {cart.map(item => {
            const usd = getCardPrice(item.card)
            const brl = rate ? usd * rate : 0

            return (
              <div 
                key={item.card.id}
                className="flex items-center gap-3 bg-zinc-800 p-2 rounded"
              >
                <img
                  src={getCardImage(item.card)}
                  className="w-12 h-16 object-cover rounded"
                  alt={item.card.name}
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {getCardName(item.card)}
                  </p>

                  <p className="text-xs text-zinc-400">
                    x{item.quantity}
                  </p>

                  {/* PREÇO EM REAL */}
                  <p className="text-xs text-green-400">
                    {rate
                      ? `R$ ${(brl).toFixed(2)}`
                      : "Carregando..."}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.card.id)}
                  className="text-red-500 text-sm"
                >
                  X
                </button>
              </div>
            )
          })}
        </div>
        

        {/* FOOTER */}
        {cart.length > 0 && (
            <div className="p-4 border-t border-zinc-700 flex flex-col gap-2">
              <p className="text-lg font-bold">
                {rate
                  ? `Total: R$ ${totalBRL.toFixed(2)}`
                  : "Carregando total..."}
              </p>
              
              <button
                onClick={clearCart}
                className="w-full bg-red-600 hover:bg-red-500 py-2 rounded"
              >
                Limpar carrinho
              </button>

              <button
                onClick={() => {
                  setOpen(false)
                  router.push("/checkout")
                }}
                className="w-full bg-green-600 hover:bg-green-500 py-2 rounded"
              >
                Finalizar Compra
              </button>
            </div>
          )}
      </div>
    </>
  )
}