import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white px-4 py-8 text-center">
      
      {/* TÍTULO */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4">
        404
      </h1>

      {/* TEXTO */}
      <p className="text-gray-400 text-sm md:text-lg mb-6 max-w-md">
        Página não encontrada.
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
      <Link
        href="/"
        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition w-full max-w-xs"
      >
        Voltar para home
      </Link>
    </div>
  )
}