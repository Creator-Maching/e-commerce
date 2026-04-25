'use client'

import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
};

export function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  function handleSearch() {
    if (!query.trim()) return;
    onSearch(query);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      
      {/* INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Digite o nome da carta..."
        className="
          flex-1
          bg-zinc-800
          text-white
          px-4 
          py-3
          rounded-md
          outline-none
          text-sm md:text-base
          focus:ring-2 focus:ring-indigo-500
        "
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      {/* BOTÃO */}
      <button
        onClick={handleSearch}
        className="
          w-full sm:w-auto
          bg-indigo-600
          hover:bg-indigo-500 
          transition 
          px-6
          py-3
          rounded-md
          font-semibold
          text-sm md:text-base
        "
      >
        Buscar
      </button>
    </div>
  );
}