import type { Card } from "@/types/Card";

export function getCardImage(card: Card) {
  if (card.image_uris?.normal) {
    return card.image_uris.normal;
  }

  if (card.card_faces) {
    for (const face of card.card_faces) {
      if (face.image_uris?.normal) {
        return face.image_uris.normal;
      }
    }
  }

  return "/placeholder.png";
}

export function getCardName(card: Card) {
  if (card.printed_name) return card.printed_name;

  if (card.card_faces?.length) {
    return card.card_faces
      .map(f => f.printed_name || f.name)
      .join(" // ");
  }

  return card.name;
}

export function getCardPrice(card: Card): number {
  const usd = card.prices?.usd;

  if (usd && usd !== "0") {
    return Number(usd);
  }

  // fallback consistente baseado no id
  const seed = card.id.charCodeAt(0);
  return (seed % 5) + 1;
}

export function isInStock(card: Card): boolean {
  const usd = card.prices?.usd
  return !!usd && usd !== "0"
}

export function convertToBRL(usd: number, rate: number | null) {
  if (!rate) return 0;
  return usd * rate;
}