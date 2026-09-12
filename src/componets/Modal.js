function Modal({ open, onClose, title, children, staticModal = false}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-auto">
      
      {/* Fondo */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={!staticModal ? onClose : undefined}
      ></div>

      {/* Contenido */}
      <div className="relative bg-white rounded-xl shadow-xl p-3 w-full max-w-screen-lg">
        
        {/* Título */}
        <h2 className="text-xl font-bold mb-4">{title}</h2>

  <hr />
        

      

        {/* Contenido dinámico */}
        {children}

      </div>
    </div>
  );
}

export default Modal;