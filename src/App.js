

import Menu from "./componets/menu"


export default function App() {
  return (
    <>

    <Menu />
    <button class="bg-blue-500 text-white p-3">
  Botón
</button>
s
<h1 class="text-2xl text-red-500 font-normal">
  Hola mundo
</h1>

<div class="p-20 m-9 bg-yellow-400">
  <p class="text-black text-5xl">
    Caja con espacio
  </p>
</div>


<button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Guardar
</button>

<div class="text-sm md:text-xl lg:text-3xl">
  Texto adaptable
</div>

<div class="grid grid-cols-3 gap-4 md:text-xl lg:text-3xl" >
  <div class="bg-red-200">1</div>
  <div class="bg-blue-200">2</div>
  <div class="bg-green-200">3</div>
</div>


<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Sistema de Facturación
        </h1>
        <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Iniciar
        </button>
      </div>
    </div>




    </>
   
  )
}