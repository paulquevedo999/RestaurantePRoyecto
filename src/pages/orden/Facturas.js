import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import api from "../../api/axios";
import { IoHome } from "react-icons/io5";
import Spinner from "../../componets/Spinner";
import Swal from 'sweetalert2'
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FiRefreshCcw } from "react-icons/fi";
import { SiFluentd } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function Facturas() {

 const navigate = useNavigate();
  const [datos, setDatos] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

    const cargarFacturas = (useCallback)(async () => {

    setLoading(true);  
    const decoded = jwtDecode(token);  
  
    let f = await api.get(`/facturacion/facturasxautorizar/${decoded.usuarioAgenciaid}`, token)
    if(f.status === 200)
    {
       
        setLoading(false);  
        setDatos(f.data)

    }


  },[token])


  const menu =  () => {
    navigate("/dashboard");
     
  }
  const sri = async (claveAcceso,ambiente,idf) => {

     try{
 
    let r = await api.get(`/facturacion/consultaAutorizacion/${claveAcceso}/${ambiente}`, token)


    if(r.status === 200){
     
       
        setLoading(false)
       
        if(r.data.r.estado === 'AUTORIZADO')
        {
             Swal.fire({
                          
                            text: "FACTURA: "+ r.data.r.estado ,
                            icon: 'info',
                            confirmButtonText: 'Ok'
                        })
        

       
        const aa = await api.post(`/facturacion/cambioEstadoAutorizado`, {
        idf
      })
        if(aa.status === 200){
             Swal.fire({
                          
                            text: "Registro Actualizado",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        cargarFacturas()
            
        }
        }
    }
    if(r.status === 426){
     
        setLoading(false)
    }
    if(r.status === 425){
       
        setLoading(false)
    }
}catch{ 
    setLoading(false); Swal.fire({
                  
                    text: "Factura no autorizada",
                    icon: 'info',
                    confirmButtonText: 'Ok'
                }) }

  }

  const datePipe = (fecha) => {
  return new Date(fecha).toLocaleDateString("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};


    useEffect(() => {
    cargarFacturas();
  }, [cargarFacturas])


  

  return (

     <div className="min-h-screen bg-slate-150 font-bold ">
       {loading && <Spinner fullScreen size="lg" text="Consultando facturas por autorizar...."  />}
      
       <nav className="flex flex-row p-6 items-center  uppercase bg-[#142234]  text-slate-100 font-bold  "> <FaFileInvoiceDollar   className="text-slate-300 text-xl mr-4"/> facturas por autorizar    </nav>
       <div className="flex flex-row">
       <button onClick={menu} className="buttton_1"><IoHome /> </button>
<button onClick={() => cargarFacturas()} className="buttton_1 text-green-800"><FiRefreshCcw /></button>
</div>


    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm p-1">



 
    <table className="min-w-full text-sm text-left text-gray-700"> 
        
    <thead className="bg-[#142234] text-white uppercase tracking-wide">
      <tr>
        <th className="px-3 py-1 whitespace-nowrap">FECHA</th>
        <th className="px-3 py-1 whitespace-nowrap">SECUENCIA</th>
        <th className="px-3 py-1 whitespace-nowrap">AMBIENTE</th>
         <th className="px-3 py-1 whitespace-nowrap">CLAVE DE ACCESO</th>
         <th className="px-3 py-1 whitespace-nowrap">CLIENTE</th>
          <th className="px-3 py-1 whitespace-nowrap">TOTAL</th>
            <th className="px-3 py-1 whitespace-nowrap">ACCIONES</th>
       
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-200 bg-white">

      {datos.map((f) => (

        <tr
          key={f.id}
          className="px-3 py-1 whitespace-nowrap font-medium"
        >

          <td className="px-3 py-1">
            {datePipe(f.fecha)}
          </td>

          <td className="px-3 py-1 font-semibold">
            {f.secuencia}
          </td>

          <td className="px-3 py-1">
            {f.ambiente}
          </td>

          <td className=" px-3 py-1  font-bold">
            {f.claveAcceso}
        </td>

        <td className=" px-3 py-1 min-w-[220px]">
            {f.facturacliente.cedula} / {f.facturacliente.nombre} {f.facturacliente.apellido}
        </td>
        <td className=" px-3 py-1  font-bold">
            $ {f.facturatotalfinal}
        </td>
         <td className=" px-3  font-bold m-2 p-1 text-center items-center">

            <button onClick={() => sri(f.claveAcceso, f.ambiente,f.id)} className="buttton_1 bg-zinc-900 text-white text-xs"><SiFluentd className="mr-2" />SRI  </button>
            
        </td>

         

        </tr>

      ))}

    </tbody>

  </table>

  </div>



</div>







  );
}

export default Facturas;