import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import Spinner from "../../componets/Spinner";
import { FaSave } from "react-icons/fa";
import Swal from 'sweetalert2'
import { FaPen } from "react-icons/fa";
import { MdStorage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Bodega() {
  const navigate = useNavigate();

    const [estado, setEstado] = useState("1")  
     const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const [bodegas, setBodegas] = useState({
    id: "0",
    nombre: "",
    descripcion: "",
    activo: true
    });

     ;


    const cargarBodegas = useCallback(async () => {

    setLoading(true);  
    const decoded = jwtDecode(token);  
  
    api.get(`/bodega/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setDatos(res.data),  setLoading(false))
      .catch((err) => console.log(err));

  },[token])
    
    const menuPrincipal= () => {
    
        navigate("/dashboard");
    };

 
   const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setBodegas({
      ...bodegas,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const editar = (bodega) => {
    setBodegas({
    id: bodega.id,
    nombre: bodega.nombre,
    descripcion:bodega.descripcion,
    activo: bodega.activo
   } )
   setEstado("2")
 


    

  }

   const guardar = async () => {

      
    try{  
        
        if(bodegas.nombre === ""){
            Swal.fire({
              
                text: "Ingrese el nombre de la bodega",
                icon: 'warning',
                confirmButtonText: 'Ok'
            })
        }
        else{

        

    setLoading(true);
    const decoded = jwtDecode(token);
    const res = await api.post(`/bodega/nuevaBodega`, {
        id: bodegas.id,
        nombre: bodegas.nombre,
        descripcion: bodegas.descripcion,
        activo:bodegas.activo,
        agenciumId: decoded.usuarioAgenciaid
      })
     
       setLoading(false);
       if(res.status === 200)
       {
        
            Swal.fire({
              
                text: "Registro grabado correctamente",
                icon: 'success',
                confirmButtonText: 'Ok'
            })
             setBodegas({
                    id: "0",
                    nombre: "",
                    descripcion:"",
                    activo: true
            } )
            cargarBodegas();
            

       }
       else{
         Swal.fire({
              
                text: "Error al grabar, comuniquese con el administrador",
                icon: 'warning',
                confirmButtonText: 'Ok'
            })

       }
       setEstado("1")
       }
    }
    catch{}
  };


  useEffect(() => {

    cargarBodegas();

    
  }, [cargarBodegas])


  const nuevo = () => {

    setBodegas({
                    id: "0",
                    nombre: "",
                    descripcion:"",
                    activo: true
            } )
            setEstado("2")
    

  }




  /////////////////////////////////////////////////////////////////









  return (

    
    <div className="">
        {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}
        <nav className="p-4 bg-[#142234] text-white font-bold text-center text-lg">
            ADMINISTRACIÓN DE BODEGAS
        </nav>
        <br></br>
        <div className="flex min-h-screen  sm:flex-row justify-center items-center  gap-4   p-1">

            <div className=" flex flex-col   min-h-screen  sm:w-1/4 items-center bg-slate-200  p-2 w-[100%] border-4 shadow-lg ">
            
                <p className="p-2 text-center font-bold bg-[#142234] w-[100%] text-white mb-4">Menú</p>
                <button onClick={() => setEstado("1")} className="btn-principal w-[90%] mb-6" type="button">Ver Bodegas</button>
                <button onClick={() => nuevo()} className="btn-principal w-[90%] mb-6" type="button">Nueva Bodega</button>                
                <button onClick={() => menuPrincipal()} className="btn-principal w-[90%]" type="button">Regresar</button>
            </div>
            <div className=" sm:w-2/3 justify-center items-center  min-h-screen bg-white p-2  border-2 shadow-lg"   >
                   {  estado === "1" ? 
                   <div className="">
                        <p className="p-2 text-center font-bold bg-[#142234] w-[100%] text-white mb-4">Ver Bodegas</p>
                        <div className="grid grid-cols-3 gap-4 p-3 bg-slate-200">
                                {datos.map((b) => (

                                        <div key={b.id} className={`w-70 flex-auto   text-white m-2 p-4   font-bold rounded-lg shadow-md uppercase  ${b.activo ? "bg-green-700" : "bg-gray-400" }`} > 
                                            <p className="flex flex-row items-center justify-center bg-emerald-900 rounded text-center text-2xl "><MdStorage className="mr-2" /> {b.nombre}</p>
                                            <section className="mt-4 mb-4 text-sm font-bold text-slate-100" >{b.descripcion}</section>
                                             
                                            <div className="text-right"><button onClick={() => editar(b)} className="bg-sky-950 p-3 items-center mt-2 shadow-lg hover:bg-sky-800 hover:shadow-md"><FaPen /> </button> </div>
                                                     <span className="text-xs font-bold"> Activo:  {b.activo ? "✅" : "❌"}   </span>                              
                                        
                                        </div>
                                ))} 

                        </div>
                   </div> 
                   : 
                   <div className="">
                     <p className="p-2 text-center font-bold bg-[#142234] w-[100%] text-white mb-4">Nuevo Ingreso</p>

                     <div className="flex flex-col border p-8">
                        <label className="label_eti1 text-slate-800 ">Id: </label>
                        <input className="caja_detexto" type="text" disabled  name="id" value={bodegas.id} onChange={handleChange} />
                        <label className="label_eti1 text-slate-800 ">Nombre: </label>
                        <input className="caja_detexto uppercase" type="text"  name="nombre" value={bodegas.nombre} onChange={handleChange}/>
                        <label className="label_eti1 text-slate-800">Descripción: </label>
                        <input className="caja_detexto uppercase" type="text"  name="descripcion" value={bodegas.descripcion} onChange={handleChange} />
                        <label className="label_eti1 text-slate-800">Estado: </label>
                        <input className="caja_detexto" type="checkbox"  name="activo" checked={bodegas.activo} onChange={handleChange}/>
                        <button className="btn-sis  mt-4" type="button" onClick={guardar} >
                            <FaSave /> Grabar
                        </button>
                        
                     </div> 
                   
                   
                   </div> 
                    }
            </div>
        </div>

    

    </div>
  );
}

export default Bodega;