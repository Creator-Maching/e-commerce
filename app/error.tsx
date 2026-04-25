'use client'

import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4 py-8 text-center">
      
      {/* TÍTULO */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Algo deu errado
      </h1>

      {/* TEXTO */}
      <p className="text-gray-400 text-sm md:text-lg mb-6 max-w-md">
        Ocorreu um erro inesperado. Tente novamente ou volte mais tarde.
      </p>

      {/* IMAGEM */}
      <div className="w-40 md:w-56 mb-6">
        <Image 
          src="/imgs/Coffe_sleep.png" 
          alt="Erro"
          width={300}
          height={300}
          className="w-full h-auto object-contain"
        />
      </div>

      {/* BOTÃO */}
      <button
        onClick={() => reset()}
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition w-full max-w-xs"
      >
        Tentar novamente
      </button>
    </div>
  )
}