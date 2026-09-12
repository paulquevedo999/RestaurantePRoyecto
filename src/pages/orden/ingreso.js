import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import api from "../../api/axios";

import Spinner from "../../componets/Spinner";
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Swal from 'sweetalert2'
  import { FaSave } from "react-icons/fa";
  import { IoMdArrowBack } from "react-icons/io";
  import { IoCaretBack } from "react-icons/io5";
  import { IoCaretForward } from "react-icons/io5";
  import { useNavigate } from "react-router-dom";

function Ingreso() {

  const navigate = useNavigate();
  const [ingreso, SetIngreso] = useState(true);
  const [textTipo, settextTipo] = useState("Ingreso");
  const [datos, setDatos] = useState([]);
  const [idBodega, setidBodega] = useState(0); 
  const [idArticulo, setidArticulo] = useState(0);

  const token = localStorage.getItem("token");
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pantalla, setpantalla] = useState(1)

  const [unidaddemedida, setunidaddemedida] = useState("")
  const [seleccionadoB, setSeleccionadoB] = useState(null);
   const [seleccionadoA, setSeleccionadoA] = useState(null);
 const [texto_v, settexto_v] = useState({
        ingreso: '',
        bodega: '',
        articulo: '',
        cant: ''
      });
   

   const [cant, setcant] = useState(0);


  const selecionador = (valor) => {



    SetIngreso(valor)
    if(valor)
      {
         settextTipo("Ingreso");
          settexto_v(
      {
        ingreso: 'INGRESO ►',
        bodega: texto_v.bodega,
        articulo: texto_v.articulo,
        cant: texto_v.cant
      })
      }
      else
      {
          settextTipo("Egreso");
          settexto_v(
      {
        ingreso: "egreso ►",
        bodega: texto_v.bodega,
        articulo: texto_v.articulo,
        cant:  texto_v.cant
      })}
    
  }

  const handleArticulo = (e) => {

    try {
      setSeleccionadoA(e)

  const id = Number(e);

  setidArticulo(id);

  const articuloSeleccionado = articulos.find(
    (art) => art.id === id
  );

  if (articuloSeleccionado) {
    setunidaddemedida(articuloSeleccionado.medida.nombre);

    settexto_v(
      {
        ingreso: texto_v.ingreso,
        bodega: texto_v.bodega,
        articulo: articuloSeleccionado.nombre + ' ►',
        cant: texto_v.bodega
      }
    )
    
   // settexto_v(texto_v + " / " + articuloSeleccionado.nombre)
  }

} catch (error) {
  console.log("Error:", error);
}  
  }

  const handleBodega = (e) => {

    const bodegaSelec = datos.find(
    (bo) => bo.id === e
  ); 
  if(bodegaSelec){
    settexto_v(
      {
        ingreso: texto_v.ingreso,
        bodega: bodegaSelec.nombre + ' ►',
        articulo: texto_v.articulo,
        cant: texto_v.bodega
      })

  }
  setidBodega(e)
  setSeleccionadoB(e)
};

   const handleChange = (e) => {

    setcant(e.target.value)   
  };
  



    const cargarBodegas = useCallback(async () => {

    setLoading(true);  
    const decoded = jwtDecode(token);  
  
    api.get(`/bodega/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setDatos(res.data),  setLoading(false))
      .catch((err) => console.log(err));

    api.get(`/articulos/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setArticulos(res.data),  setLoading(false))
      .catch((err) => console.log(err));

  },[token])


  const grabar = async () => {

    let axu = 0;
    if(idArticulo === 0){
      axu = 1;
       Swal.fire({
                    
                      text: "Seleccione un Articulo",
                      icon: 'warning',
                      confirmButtonText: 'Ok'
        })
    } 
    if(idBodega === 0) 
    {
      axu = 1;
       Swal.fire({
                    
                      text: "Seleccione una Bodega",
                      icon: 'warning',
                      confirmButtonText: 'Ok'
        })
    }
    if(cant <= 0) 
    {
      axu = 1;
       Swal.fire({
                    
                      text: "No es posible ingresar un valor menor o igual a 0",
                      icon: 'warning',
                      confirmButtonText: 'Ok'
        })
    }
    


    if(axu === 0){

       setLoading(true);
       let Cantidadenviar = Number(cant);
       
       if(!ingreso){
       Cantidadenviar = -Math.abs(Cantidadenviar);}
      const decoded = jwtDecode(token);
      let id_user = decoded.usuarioId;
      const res = await api.post(`/bodega/ing`, {
        idArticulo,
        idBodega,
        cant: Cantidadenviar,
        iduser: id_user,
        bodegadesc: texto_v.bodega
      });
      setLoading(false);
      if(res.status === 200){
setidArticulo(0)
setidBodega(0)
        setcant(0)
        SetIngreso(true)
        setpantalla(1)
        settexto_v(
      {
       ingreso: '',
        bodega: '',
        articulo: '',
        cant: ''
      })
       setSeleccionadoA(null)
      setSeleccionadoB(null)
      if(textTipo){}
        Swal.fire({
                    
                      text: "Registro grabado correctamente",
                      icon: 'success',
                      confirmButtonText: 'Ok'
        })

      }
      

     
    }



  }


  const menu = () => {
    navigate("/dashboard");
  }
  const pantallaset = (value) => 
  {
    let sp = pantalla + Number(value)
    if(sp <= 0){sp = 1}
    
    if(sp >= 4){sp = 4}

    setpantalla(sp)

  }

    useEffect(() => {
 setLoading(true);  
    cargarBodegas();
     setLoading(false);  
  

    
  }, [cargarBodegas])


  

  return (
    <div className="min-h-screen bg-slate-150 font-bold ">
     
       {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}
       <nav className="p-6 items-center  uppercase bg-[#142234]  text-slate-100 font-bol "> Ingreso  / Egreso de Bodega  <span className="bg-red-700 text-xl p-3 ml-8 rounded font-extrabold"> {texto_v.ingreso}   {texto_v.bodega}  {texto_v.articulo} </span>  </nav>

       <div className="p-t2 pl-10 pr-10 mt-3 items-center">
          <div className="p-4 bg-slate-200 text-white shadow-lg border">
             
                 {pantalla === 1 ? 

                <div>
                   <div>
                   <p className="bg-blue-950 p-2  items-center text-white">Tipo de Movimiento: {ingreso ? <span className="bg-lime-900 text-slate-50 p-2 text-md rounded-xl">INGRESO</span>: <span className="bg-red-950 text-slate-50 p-2 text-md rounded-xl">EGRESO</span>}</p>
                   </div>

                
                 
                 
                 <div className="flex flex-col gap-1 items-center justify-center m-8">
                   
                  

                      <div onClick={() => selecionador(true)} className="flex p-4 border-2 m-4 bg-lime-800 text-white hover:bg-lime-950 hover:cursor-pointer">
                          
                          <div className="text-7xl "><FaArrowCircleUp /></div>
                          <div>  
                            <p className="p-2 ">Ingreso: </p>
                            <span className="p-2  font-normal flex gap-4"> Entrada de articulos  a bodega  { ingreso ? <FaCheck/>   : <></>} </span>
                          

                          </div>

                      </div>
                      <div onClick={() => selecionador(false)} className="flex p-4 border-2 m-4 bg-red-900 text-white hover:bg-red-950 hover:cursor-pointer">
                          <div className="text-7xl "><FaArrowCircleDown /></div>
                          <div>  
                            <p className="p-2 ">Egreso: </p>
                            <span className="p-2  font-normal  flex gap-4"> Salida de articulos  a bodega { !ingreso ? <FaCheck/>   : <></>} </span>  

                          </div>

                      </div>
                      
                  </div>  </div> : <></> }


                  {pantalla === 2 ?
                  <div>
                   <div>
                   <p className="bg-blue-950 p-2  items-center text-white">Seleccione una Bodega</p>
                      <div className="grid grid-cols-1 gap-4 p-2 uppercase">
                           {datos.map((b) => 
                            (<div key={b.id} onClick={() => handleBodega(b.id)} 
                            className={`p-9 rounded m-2 border text-center font-bold text-2xl shadow bg-zinc-800 hover:cursor-pointer hover:bg-zinc-600 ${
      seleccionadoB === b.id
        ? "bg-yellow-900 border-2 border-red-900"
        : "bg-slate-100"
    }`}> 
                            
                            {b.nombre}
                                             </div>
                           ))}
                      </div>



                   </div>
                    </div>
                   

                  : <></>  }       



                  {pantalla === 3 ?
                  <div>
                   <div>
                   <p className="bg-blue-950 p-2  items-center text-white">Seleccione un Articulo</p>
                      <div className="grid grid-cols-6 gap-4 p-2 uppercase">
                           {articulos.map((b) => (<div  key={b.id}
                           onClick={() => handleArticulo(b.id)} 
                           className={` p-2 rounded border-2  text-center font-bold  shadow bg-zinc-800 hover:cursor-pointer hover:bg-zinc-600" ${
      seleccionadoA === b.id
        ? "bg-yellow-900 border-2 border-red-900"
        : "bg-slate-100"
    }`}>  {b.nombre}
                                             </div>
                           ))}
                      </div>



                   </div>
                    </div>
                   

                  : <></>  }        



                  {pantalla === 4 ?
                  <div>
                   <div>
                   <p className="bg-blue-950 p-2  items-center text-white">Ingrese una cantidad</p>

                   <div className="flex flex-col text-center">

                 
                     <label className="label_eti1 text-slate-600 text-2xl uppercase mt-8">Ingrese una Cantidad en <span className="bg-slate-950 p-2 text-white rounded">{unidaddemedida}</span>:</label>
                  <input className="text-8xl border border-slate-950 text-slate-900 text-center" type="text"   name="cant"  value={cant}  onChange={handleChange}  />

                  </div>
                   </div>
                      <div className="flex flex-row justify-between  items-center  p-5">
                
                  


                        
          
                </div>
                    </div>
                   

                  : <></>  }     
              














              
             
             



                <div className="flex flex-row justify-between  items-center  p-5">

                  {pantalla === 1 ?  <button onClick={()=> menu()} className="flex flex-row items-center justify-center  bg-blue-950 m-3 border p-4 rounded hover:bg-blue-900"><IoMdArrowBack className="mr-3"/> Cancelar / Menú Principal</button>
                    
                :
                
                   <button onClick={()=> pantallaset(-1)} className="flex flex-row items-center justify-center  bg-blue-950 m-3 border p-4 rounded hover:bg-blue-900"><IoCaretBack className="mr-3"/> Anterio</button> }
                     
                     {pantalla === 4 ?  <button onClick={() => grabar()} className=" flex flex-row items-center justify-center p-4 bg-green-700  m-3 border rounded  hover:bg-lime-800"><FaSave className="mr-3" /> Grabar</button>
                 :
                     <button onClick={() => pantallaset(1)} className=" flex flex-row items-center justify-center p-4 bg-green-700  m-3 border rounded  hover:bg-lime-800">Siguiente<IoCaretForward className="ml-3" /> </button> }
                 
                


                        
          
                </div>
          </div>
        
         
       </div>

    </div>
  );
}

export default Ingreso;