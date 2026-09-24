//import { CgAdd } from "react-icons/cg";
import { HiLockClosed } from "react-icons/hi2";


import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


import { MdStorage } from "react-icons/md";
import { SiReadthedocs } from "react-icons/si";
import { RiStockFill } from "react-icons/ri";
import { GiCube } from "react-icons/gi";
import Footer from "../componets/Footer"
import { useNavigate } from "react-router-dom";

import { FaFileInvoiceDollar } from "react-icons/fa6";

function Principal() {
   const navigate = useNavigate();

   const cerrarSesion = () => {
    localStorage.removeItem("token");
      navigate("/");
    
  };

  
     const xautorizar = () => {
      navigate("/facturasxautorizar");
    
     
  };


  /* const newOrden = () => {
    
     window.location.href = "/newOrden";
  };
*/
  const bodega = () => {
    navigate("/bodega");
    
     
  };

  const reportes = () => {
      navigate("/reportes");
    
    
  };
   const ingreso = () => {

    navigate("/ingreso");
    
     
  };

   const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);


   


   const cargarDatos = () => {

    
    
     const decoded = jwtDecode(token);
     if(decoded?.expiredAt){
      
      localStorage.removeItem("token");
      navigate("/login");
     
      
     }
     else{
     setUser(decoded);
     }
  

  }


     useEffect(() => {

    cargarDatos();

    
  });


  return (

    <div>
    
        <div className="  flex  flex-row items-center   bg-slate-700 text-center font-bold text-white p-8 text-2xl "> <GiCube className="mr-6 ml-4  text-zinc-400 text-6xl" />  MENÚ PRINCIPAL </div>


        

      



<div className=" container mx-auto p-9 uppercase ">
        <div className="grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-3
                xl:grid-cols-3
                uppercase
                shadow-lg border
                gap-6 bg-gray-100 text-center font-bold text-slate-700 p-6 ">


          { /*div onClick={() => newOrden()} className="menuP">
              <CgAdd className="text-slate-300 text-5xl "/>NUEVA ORDEN
            </div>

 */}  
            <div onClick={() => ingreso()} className="menuP">
              <RiStockFill  className="text-slate-300 text-7xl  "/>ajuste por ingresos  
            </div>

            
            <div onClick={() => bodega()} className="menuP">
              <MdStorage className="text-slate-300 text-7xl "/>ADMINISTRACIÓN DE BODEGAS  
            </div>


            
            <div onClick={() => reportes()} className="menuP">
              <SiReadthedocs  className="text-slate-300 text-7xl "/>REPORTES
            </div>


            
            <div onClick={() => xautorizar()} className="menuP">
              <FaFileInvoiceDollar className="text-slate-300 text-7xl "/>FACTURAS ELECTRÓNICA POR AUTORIZAR
            </div>


            <div onClick={() => cerrarSesion()} className="menuP">
              <HiLockClosed className="text-slate-300 text-7xl "/>CERRAR SESIÓN
            </div>

           


           
          
         
          
        </div>


        </div>

         <Footer className="fixed bottom-0 left-0 z-50 w-full bg-[#142234] text-white"
        empresa= {'   - ' + user.usuarioNombreComercial + '  / RUC: ' + user.usuarioAgenciaruc}
        sistema="PRODUCCIÓN" 
        version="1.0.0.0"
        usuario={user.usuarioname + ' ' + user.usuarioapellido}
      />



    </div>
    

    
  );
}

export default Principal;