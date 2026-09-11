function Footer({
  empresa = "Mi Empresa",
  sistema = "Sistema de Gestión",
  version = "1.0.0",
  usuario = "",
  className = "",
}) {
  return (
    <footer
      className={`
        w-full
        border-t
        border-gray-200
        bg-[#142234]
        text-white
        py-4
        ${className}
      `}
    >
      <div
        className="
          w-full
          px-4
          py-2
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-2
          text-[11px]
        "
      >
        <div className="flex items-center gap-2 text-[12px] uppercase" >
          <span className="font-semibold">
            {sistema}
          </span>

          <span className="text-gray-400">|</span>

          <span className="text-gray-300 text-[12px] uppercase">
            v{version}
          </span>
        </div>

        {usuario && (
          <div className="text-gray-300 font-extrabold text-[12px] uppercase">
            Usuario:
            <span className="ml-1 font-semibold text-white">
              {usuario}
            </span>
          </div>
        )}

        <div className="text-gray-300 font-extrabold text-[12px] uppercase">
          © {new Date().getFullYear()} {empresa}
        </div>
      </div>
    </footer>
  );
}

export default Footer;