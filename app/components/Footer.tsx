export default function Footer() {
  return (
    <footer
      className="
        mt-10
        bg-white 
        text-black 
        rounded-t-xl
        border-t border-zinc-200
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 py-6
          flex flex-col gap-4
          md:flex-row md:items-center md:justify-between
        "
      >
        {/* MARCA */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold text-base md:text-lg">
            Coffee Store
          </h2>
          <p className="text-xs md:text-sm text-zinc-600">
            Seu marketplace de cartas MTG
          </p>
        </div>

        {/* LINKS */}
        <div className="flex justify-center gap-4 text-xs md:text-sm">
          <a href="#" className="hover:underline">
            Sobre
          </a>
          <a href="#" className="hover:underline">
            Contato
          </a>
          <a href="#" className="hover:underline">
            Termos
          </a>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center md:text-right text-xs md:text-sm text-zinc-600">
          © 2026 Pedro Dias Mendes Vianna
        </div>
      </div>
    </footer>
  )
}