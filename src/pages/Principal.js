import { CgAdd } from "react-icons/cg";
import { HiLockClosed } from "react-icons/hi2";
import { TbReportSearch } from "react-icons/tb";
import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { BsBoxSeamFill } from "react-icons/bs";
import { BsPersonBadgeFill } from "react-icons/bs";
import { BsServer } from "react-icons/bs";
import { BiSolidCreditCardFront } from "react-icons/bi";

function Principal() {

   const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

   const newOrden = () => {
    
     window.location.href = "/newOrden";
  };

   const token = localStorage.getItem("token");
    const [user, setUser] = useState([]);


   


   const cargarDatos = useCallback(async () => {

    
    
     const decoded = jwtDecode(token);
     setUser(decoded);
  

  },[token])


     useEffect(() => {

    cargarDatos();

    
  }, [cargarDatos]);


  return (

    <div>
    
        <div className="bg-slate-700 text-center font-bold text-white p-4 text-2xl ">  .:: MENÚ PRINCIPAL ::. </div>


        

        <div className="grid sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-4 bg-slate-300 p-2 items-center sm:items-center gap-2">
            <div className="flex items-center gap-5">
                 <BsBoxSeamFill className="text-xl text-cyan-700 font-bold" />
                 <span className="font-bold">{user.usuarioNombreComercial}</span>
            </div>
            <div className="flex items-center gap-5">
                 <BsPersonBadgeFill className="text-xl text-cyan-700 font-bold" />
                 <span className="font-bold">{user.usuarioname} {user.usuarioapellido}</span>
            </div>
              <div className="flex items-center gap-5">
                 <BsServer  className="text-xl text-cyan-700 font-bold" />
                 <span className="font-bold">{user.UsuarioAmbiente}</span>
            </div>
             <div className="flex items-center gap-5">
                 <BiSolidCreditCardFront  className="text-xl text-cyan-700 font-bold" />
                 <span className="font-bold">{user.usuarioAgenciaruc}</span>
            </div>
           
        </div>



<div className="container mx-auto p-4">
        <div className="grid
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-6 bg-zinc-200 text-center font-bold text-slate-700 p-4 ">


            <div onClick={() => newOrden()} className="flex  justify-between bg-slate-600 text-slate-100 p-12 border-spacing-x-1 shadow-xl rounded-md m-2 hover:bg-slate-500 cursor-pointer ">
              <CgAdd className="text-slate-300 text-5xl "/>NUEVA ORDEN
            </div>

            
            <div className="flex  justify-between bg-slate-600 text-slate-100 p-12 border-spacing-x-1 shadow-xl rounded-md m-2 hover:bg-slate-500 cursor-pointer ">
              <TbReportSearch className="text-slate-300 text-5xl m-0"/>VER MESAS
            </div>

            
            <div className="flex  justify-between bg-slate-600 text-slate-100 p-12 border-spacing-x-1 shadow-xl rounded-md m-2 hover:bg-slate-500 cursor-pointer ">
              <CgAdd className="text-slate-300 text-5xl "/>NUEVA ORDEN
            </div>


            
            <div className="flex  justify-between bg-slate-600 text-slate-100 p-12 border-spacing-x-1 shadow-xl rounded-md m-2 hover:bg-slate-500 cursor-pointer ">
              <CgAdd className="text-slate-300 text-5xl "/>NUEVA ORDEN
            </div>


            
            <div onClick={() => cerrarSesion()} className="flex  justify-between bg-slate-600 text-slate-100 p-12 border-spacing-x-1 shadow-xl rounded-md m-2 hover:bg-slate-500 cursor-pointer ">
              <HiLockClosed className="text-slate-300 text-5xl "/>CERRAR SESIÓN
            </div>

           


           
          
         
          
        </div>

        </div>

       



    </div>

    
  );
}

export default Principal;