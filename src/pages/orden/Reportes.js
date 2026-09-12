import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import api from "../../api/axios";

import Spinner from "../../componets/Spinner";


import { MdForward } from "react-icons/md";

  import { SiReadthedocs } from "react-icons/si";
  import { BiSolidSearch } from "react-icons/bi";
  import { useNavigate } from "react-router-dom";

function Reportes() {
const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
    const [datosb, setDatosb] = useState([]);


  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);



  
  const [seleccionadoB, setSeleccionadoB] = useState(null);






 

  

  const handleBodega = async (e) => {
    try{
    setLoading(true)
    const r = await api.get(`/bodega/reportexBodega/${e}`, token)
    if(r.status === 200){
        setDatosb(r.data)
       // console.log(r)
        setLoading(false)
    }
}catch{}
     
 
  }

  

 
 



    const cargarBodegas = (useCallback)(async () => {

    setLoading(true);  
    const decoded = jwtDecode(token);  
  
    api.get(`/bodega/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setDatos(res.data), setLoading(false))
      .catch((err) => console.log(err));


  },[token])


  const menu = () => {

    navigate("/dashboard");
     
  }

  const datePipe = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};


    useEffect(() => {

        setSeleccionadoB(null)
 setLoading(true);  
    cargarBodegas();
     setLoading(false);  
  

    
  }, [cargarBodegas])


  

  return (

     <div className="min-h-screen bg-slate-150 font-bold ">
       {loading && <Spinner fullScreen size="lg" text="Consultando en la Base de datos......"  />}
       <nav className="p-6 items-center  uppercase bg-[#142234]  text-slate-100 font-bol "> <SiReadthedocs  className="text-slate-300 text-xl "/> Módulo de Reportes   </nav>


    <div className="grid grid-flow-row-dense grid-cols-8 grid-rows-3">

  {/* FILA 1 - COLUMNA 1 */}
  <div className="col-span-1">
    <p className="bg-red-900 p-1 text-center text-white">BODEGAS: </p>
         <div className="grid grid-cols-1 gap-1 uppercase">
                           {datos.map((b) => 
                            (<div key={b.id} onClick={() => handleBodega(b.id)}  
                            className={`flex  flex-row justify-between p-2 rounded mt-1 border text-center font-bold text-md shadow bg-slate-500 hover:cursor-pointer text-slate-50 hover:bg-zinc-600 ${
      seleccionadoB === b.id
        ? "bg-yellow-900 border-2 border-red-900"
        : "bg-slate-100"
    }`}> 
                            
                            {b.nombre} <MdForward />
                                             </div>
                           ))}
                      </div>

    <p className="bg-red-900 p-1 text-center text-white mt-2">IR MENÚ PRINCIPAL </p>

   <div onClick={menu} className="flex  flex-row justify-between p-2 rounded mt-2 border text-center font-bold text-md shadow bg-slate-500 hover:cursor-pointer text-slate-50 hover:bg-zinc-600">

   </div>
                     
  </div>

  {/* FILA 1 - COLUMNA 2 */}
  <div className="col-span-7 border-2 border-gray-600 shadow-sm bg-gray-50">
    <table className="table-fixed border-collapse border border-gray-400 w-full text-xs text-left resposive"> 
        <caption className="text-left  caption-top uppercase items-center bg-slate-500 p-2 text-white font-bold">
    Reporte de la Bodega: 
  </caption>
    <thead className="bg-[#142234] text-white uppercase">
      <tr>
        <th className="px-3 py-2">FECHA</th>
        <th className="px-3 py-2">BODEGA</th>
        <th className="px-3 py-2">ARTICULO</th>
        <th className="px-3 py-2 text-right">STOCK</th>
        <th className="px-3 py-2 text-center">Acción</th>
      </tr>
    </thead>

    <tbody>

      {datosb.map((art) => (

        <tr
          key={art.id}
          className="border-b hover:bg-gray-100"
        >

          <td className="px-3 py-1.5">
            {datePipe(art.updatedAt)}
          </td>

          <td className="px-3 py-1.5 font-semibold">
            {art.bodega.nombre}
          </td>

          <td className="px-3 py-1.5">
            {art.articulo.nombre}
          </td>

          <td className=" px-3 py-1.5 text-right font-bold">
            {art.Stock >= 0 ?
            <span className="bg-lime-700 text-white text-center p-2 rounded-lg m-r2">{art.Stock} - {art.articulo.medida.nombre}</span>  :
           <span className="bg-red-900 text-white text-center p-2 rounded-lg m-r2">{art.Stock} -  {art.articulo.medida.nombre}</span>  }
          </td>

          <td className="px-3 py-1.5 text-center items-center">

            <button
              
              className="items-center flex flex-row p-4 bg-blue-600 text-white  py-1 rounded  hover:bg-blue-700"
            >
             <BiSolidSearch className="mr-3" /> Ver historial
            </button>
          </td>

        </tr>

      ))}

    </tbody>

  </table>

  </div>



</div>
</div>






  );
}

export default Reportes;