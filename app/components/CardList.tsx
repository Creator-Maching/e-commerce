import { CardItem } from "./CardItem"
import type { Card } from "../../types/Card"

type Props = {
  cards: Card[]
  onAdd: (card: Card, quantity: number) => void
}

export function CardList({ cards, onAdd }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center text-zinc-400 mt-10">
        Nenhuma carta encontrada
      </div>
    )
  }

  return (
    <div
      className="
        grid
        gap-4 sm:gap-6
        grid-cols-[repeat(auto-fit,minmax(160px,1fr))]
      "
    >
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onAdd={onAdd}
        />
      ))}
    </div>
  )
}