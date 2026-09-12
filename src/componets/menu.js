import { IoIosCube } from "react-icons/io";
import  Modal  from "./Modal";
import { useState } from "react";



function Menu() {
    const [open, setOpen] = useState(false);

    const coloresMenu = {
    bg: "font-sans bg-slate-600",
    hover: "font-sans text-white hover:text-slate-600 hover:bg-white ",
   
  };

  
  


  return (

    

    <div className="min-h-screen bg-gray-300">
      <nav className={coloresMenu.bg + " shadow-md border-l-0"}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between place-items-center h-16">

            
            
            <div className="flex items-center text-2xl font-bold text-zinc-50">
                <span className="mr-3 text-blue-950" ><IoIosCube /> </span>Qsoft
                
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white hover:text-slate-600 hover:bg-zinc-50 p-5 font-medium">
                Inicio
              </a>

             <div className="relative group">
  <button className="flex items-center  gap-1 text-white hover:text-white font-medium">
    Servicios
    <span className="text-sm">▼</span>
  </button>

  <div className={`absolute top-full pt-5 left-0 w-56 ${coloresMenu.bg} shadow-xl 
                  opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible 
                  transition duration-200`}>
    
    <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Facturación</a>
     <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Clientes</a>
      <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Reportes</a>
       <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Configuraciones</a>
         <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Clientes</a>
      <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Reportes</a>
       <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Configuraciones</a>
         <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Clientes</a>
      <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Reportes</a>
       <a href="#" className={` block px-5 py-3 ${coloresMenu.hover} `}>Configuraciones</a>




    
  </div>
</div>

                      <a href="#" className="text-white hover:text-slate-600 hover:bg-zinc-50 p-5 font-medium">
              Referencia
              </a>

                      <a href="#" className="text-white hover:text-slate-600 hover:bg-zinc-50 p-5 font-medium">
              Contacto
              </a>
            </div>

            <button className="hidden md:block bg-zinc-50 text-slate-600 px-5 py-2 rounded-lg hover:bg-slate-400 transition hover:text-white">
              Iniciar sesión
            </button>

            <button className="md:hidden text-2xl">
              ☰
            </button>
          </div>
        </div>
      </nav>

      <section className="p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Menú profesional con React + Tailwind
        </h1>
        <p className="mt-4 text-gray-600">
          Diseño moderno para sistema web.
        </p>
      </section>

      

 <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Abrir Modal
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Crear cliente4444444444"
         staticModal={true}
      >

       <p className="text-gray-600 mb-4">
          <div class="grid grid-cols-7 gap-2 ">
  <div class="bg-gray-200 rounded-lg">01</div>
  <div class="bg-gray-200 ...">02</div>
  <div class="bg-gray-200 ...">03</div>
  <div class="bg-gray-200 col-span-2 ...">04</div>
  <div class="bg-gray-200 ...">05</div>
  <div class="bg-gray-200 ...">06</div>
  <div class="bg-gray-200 col-span-2 ...">07</div>
</div>

        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancelar
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar
          </button>

            </div>
            </Modal>


    </div>
  );
}

export default Menu