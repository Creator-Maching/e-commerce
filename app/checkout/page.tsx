'use client'

import Image from 'next/image'
import Footer from '../components/Footer'

import { useState } from "react"
import { useRouter } from "next/navigation"

import { useCart } from "../context/CartContext"
import { getCardName, getCardPrice } from "@/utils/getCardData"
import { useExchangeRate } from "@/hooks/useExchangeRate"

export default function CheckoutPage() {
  const router = useRouter()

  const { cart, clearCart, removeFromCart } = useCart()
  const rate = useExchangeRate()

  const [payment, setPayment] = useState("")
  const [shipping, setShipping] = useState(0)

  // 🔥 HOVER STATE (NOVO)
  const [hoveredCard, setHoveredCard] = useState<any | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  function getCardImageSmall(card: any) {
    if (card.image_uris?.small) return card.image_uris.small

    if (card.card_faces) {
      for (const face of card.card_faces) {
        if (face.image_uris?.small) return face.image_uris.small
      }
    }

    return "/placeholder.png"
  }

  function getCardImageLarge(card: any) {
    if (card.image_uris?.normal) return card.image_uris.normal

    if (card.card_faces) {
      for (const face of card.card_faces) {
        if (face.image_uris?.normal) return face.image_uris.normal
      }
    }

    return "/placeholder.png"
  }

  const subtotal = cart.reduce((acc, item) => {
    const usd = getCardPrice(item.card)
    const brl = rate ? usd * rate : 0
    return acc + brl * item.quantity
  }, 0)

  const total = subtotal + shipping

  function handleFinish() {
    if (!payment) return alert("Escolha um método de pagamento")
    if (!shipping) return alert("Escolha um tipo de envio")

    alert(`Compra realizada com sucesso! 🚀
    Pagamento: ${payment}
    Total: R$ ${total.toFixed(2)}`)

        clearCart()
        router.push("/")
      }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 flex-1">

      <header className="bg-white border-b border-zinc-800 rounded-xl">
        <div className="w-full mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="bg-zinc-700 text-white px-3 py-1 rounded"
          >
            ← Retornar
          </button>

          <Image src="/imgs/coffeicon.png" alt="Coffee" width={130} height={130} />

          <h1 className="text-2xl md:text-4xl text-black font-bold">
            Coffee Store
          </h1>
        </div>
      </header>

      <main className="p-6 max-w-3xl mx-auto w-full">

        <h2 className="text-lg mb-3">Seu Carrinho</h2>

        {cart.length === 0 ? (
          <p className="text-zinc-400">Carrinho vazio</p>
        ) : (
          <div className="space-y-2 mb-6">
            {cart.map((item) => {
              const usd = getCardPrice(item.card)
              const brl = rate ? usd * rate : 0

              return (
                <div
                  key={item.card.id}
                  className="flex justify-between items-center bg-zinc-900 p-3 rounded"
                >

                  {/* ESQUERDA */}
                  <div className="flex items-center gap-3">

                    <img
                      src={getCardImageSmall(item.card)}
                      alt={getCardName(item.card)}
                      className="w-10 h-14 object-cover rounded cursor-pointer"
                      onMouseEnter={() => setHoveredCard(item.card)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onMouseMove={(e) =>
                        setMousePos({ x: e.clientX + 20, y: e.clientY - 120 })
                      }
                    />

                    <span>
                      {getCardName(item.card)} x{item.quantity}
                    </span>

                    {/* ❌ REMOVER */}
                    <button
                      onClick={() => removeFromCart(item.card.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      ✕
                    </button>

                  </div>

                  {/* DIREITA */}
                  <span>
                    {rate
                      ? `R$ ${(brl * item.quantity).toFixed(2)}`
                      : "Carregando..."}
                  </span>

                </div>
              )
            })}
          </div>
        )}

        <h2 className="text-lg mb-2">Pagamento</h2>

        <div className="flex flex-col gap-2 mb-6">
          {["Crédito", "Débito", "Pix", "Boleto"].map((p) => (
            <button
              key={p}
              onClick={() => setPayment(p)}
              className={`p-2 rounded ${payment === p ? "bg-green-500" : "bg-zinc-800"}`}
            >
              {p}
            </button>
          ))}
        </div>

        <h2 className="text-lg mb-2">Envio</h2>

        <div className="flex flex-col gap-2 mb-6">
          {[22, 34, 15].map((price, i) => {
            const names = ["PAC", "Sedex", "MiniPAC"]

            return (
              <button
                key={price}
                onClick={() => setShipping(price)}
                className={`p-2 rounded ${shipping === price ? "bg-green-500" : "bg-zinc-800"}`}
              >
                {names[i]} (R$ {price.toFixed(2)})
              </button>
            )
          })}
        </div>

        <div className="bg-zinc-900 p-4 rounded mb-6">
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Frete: R$ {shipping.toFixed(2)}</p>
          <p className="font-bold text-lg">
            Total: R$ {total.toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleFinish}
          className="w-full bg-green-600 hover:bg-green-500 py-3 rounded text-lg"
        >
          Finalizar Compra
        </button>

      </main>

      {/* 🔥 PREVIEW GLOBAL */}
      {hoveredCard && (
        <div
          style={{
            position: "fixed",
            top: mousePos.y,
            left: mousePos.x,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <img
            src={getCardImageLarge(hoveredCard)}
            alt="preview"
            className="w-64 rounded-xl shadow-2xl border border-zinc-700"
          />
        </div>
      )}

      <Footer />
    </div>
  )
}