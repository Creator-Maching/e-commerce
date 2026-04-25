'use client'

import { useEffect, useState } from "react";

export function useExchangeRate() {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await res.json();
        setRate(data.rates.BRL);
      } catch (err) {
        console.error("Erro ao buscar cotação", err);
      }
    }

    fetchRate();
  }, []);

  return rate;
}