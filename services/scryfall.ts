import type { Card } from "../types/Card";

export async function searchCards(query: string): Promise<Card[]> {
  const resPt = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}+lang:pt`
  );

  const dataPt = await resPt.json();

  if (dataPt.data && dataPt.data.length > 0) {
    return dataPt.data;
  }

  // fallback inglês
  const resEn = await fetch(
    `https://api.scryfall.com/cards/search?q=${query}`
  );

  const dataEn = await resEn.json();
  return dataEn.data || [];
}