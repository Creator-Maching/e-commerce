'use client'

import { useState, useEffect } from "react"

import HeroSlider from './HeroSlider'
import Image from 'next/image'
import Footer from './Footer'
import Cart from "./Cart"

import { useCart } from "../context/CartContext"
import { useScryfall } from "@/hooks/useScryfall"
import { CardList } from "./CardList"
import { UserMenu } from "./UserMenu"

export default function HomeClient() {
  const { cards, loading, error, search } = useScryfall()
  const { addToCart } = useCart()

  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    let query = "game:paper"

    if (searchTerm.trim() === "") {
      query += " year>=2026 order=released"
    } else {
      query += ` ${searchTerm}`
    }

    search(query)
  }, [searchTerm])

  return (
    <div>

      {/* HEADER */}
      <header className="bg-white border-b border-zinc-800 rounded-xl">
        <div
          className="
            w-full mx-auto px-4 py-3 
            flex flex-col gap-3
            
            md:flex-row md:items-center md:justify-between
          "
        >

          {/* LOGO */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image 
              src="/imgs/coffeicon.png" 
              alt="Coffee" 
              width={80} 
              height={80} 
              className="w-12 sm:w-16 md:w-20 h-auto"
            />
            <h1 className="text-lg sm:text-2xl md:text-4xl text-black font-bold">
              Coffee Store
            </h1>
          </div>

          {/* BUSCA */}
          <div className="w-full md:flex-1 md:max-w-md">
            <input
              type="text"
              placeholder="Buscar carta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                p-2.5
                rounded 
                bg-zinc-800 
                text-white
                text-sm md:text-base
                outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>

          {/* AÇÕES */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <Cart />
            <UserMenu />
          </div>

        </div>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-4 mt-4">
        <HeroSlider />
      </main>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center mt-8 gap-4 px-4 text-center">
          <p className="text-zinc-400 text-sm md:text-base">
            Carregando cartas...
          </p>
          <Image 
            src="/imgs/Coffe_relax.png" 
            alt="Loading" 
            width={200} 
            height={200}
            className="w-32 md:w-48 h-auto"
          />
        </div>
      )}

      {/* ERRO */}
      {error && (
        <div className="flex flex-col items-center mt-8 gap-4 px-4 text-center">
          <p className="text-red-500 text-sm md:text-base">
            {error}
          </p>
          <Image 
            src="/imgs/Coffe_sleep.png" 
            alt="Error" 
            width={200} 
            height={200}
            className="w-32 md:w-48 h-auto"
          />
        </div>
      )}

      {/* LISTA */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <CardList 
          cards={cards} 
          onAdd={addToCart} 
        />
      </div>

      <Footer />
    </div>
  )
}