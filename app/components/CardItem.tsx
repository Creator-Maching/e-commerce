'use client'

import { useState } from "react"
import type { Card } from "../../types/Card"
import { 
  getCardImage, 
  getCardPrice, 
  getCardName, 
  convertToBRL
} from "../../utils/getCardData"

import { useExchangeRate } from "@/hooks/useExchangeRate"

type Props = {
  card: Card
  onAdd: (card: Card, quantity: number) => void
}

export function CardItem({ card, onAdd }: Props) {
  const [quantity, setQuantity] = useState(1)

  const rate = useExchangeRate()
  const usd = getCardPrice(card)

  const hasRealPrice = !!card.prices?.usd
  const inStock = hasRealPrice || usd > 0

  const brl = convertToBRL(usd, rate)

  return (
    <div
      className="
        bg-zinc-900 
        rounded-xl 
        overflow-hidden
        flex flex-col
        transition
        hover:scale-[1.02] hover:shadow-lg
      "
    >
      {/* IMAGEM */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src={getCardImage(card)}
          alt={getCardName(card)}
          className="object-cover w-full h-full"
        />
      </div>

      {/* CONTEÚDO */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        
        {/* NOME */}
        <p className="text-white text-sm font-semibold line-clamp-2">
          {getCardName(card)}
        </p>

        {/* PREÇO */}
        {inStock ? (
          <p className="text-green-400 font-bold text-base">
            {rate
              ? brl.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              : `R$ ${(usd * 5).toFixed(2)}`}
          </p>
        ) : (
          <p className="text-red-400 text-sm font-semibold">
            Fora de estoque
          </p>
        )}

        {/* CONTROLES */}
        <div className="mt-auto flex items-center gap-2">
          
          {/* QUANTIDADE COM BOTÕES */}
          <div className="flex items-center bg-zinc-800 rounded">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="px-2 text-white"
              disabled={!inStock}
            >
              -
            </button>

            <span className="px-2 text-sm">{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              className="px-2 text-white"
              disabled={!inStock}
            >
              +
            </button>
          </div>

          {/* BOTÃO */}
          <button
            disabled={!inStock}
            onClick={() => onAdd(card, quantity)}
            className={`
              flex-1
              py-1.5
              rounded
              text-sm font-semibold
              transition
              ${inStock 
                ? "bg-green-600 hover:bg-green-500" 
                : "bg-zinc-700 cursor-not-allowed"}
            `}
          >
            {inStock ? "Adicionar" : "Indisponível"}
          </button>
        </div>
      </div>
    </div>
  )
}