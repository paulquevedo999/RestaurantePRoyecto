
import { useEffect, useState, useCallback, useRef} from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../api/axios";
import Spinner from "../../componets/Spinner";
import Modal from "../../componets/Modal";
import { BiSolidRightArrow } from "react-icons/bi";
import { BsCalendarDateFill } from "react-icons/bs";
import { CgFormatJustify } from "react-icons/cg";
import { TiDelete } from "react-icons/ti";
import { MdTableRestaurant } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { IoPersonSharp } from "react-icons/io5";
import { IoSave } from "react-icons/io5";
import { RiFileAddFill } from "react-icons/ri";
import { BiSolidCreditCardFront } from "react-icons/bi";

function NewOrden() {
    const fecha = new Date().toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});
        const [datos, setDatos] = useState([]);
        const [user, setUser] = useState([]);
        const token = localStorage.getItem("token");
        const [dataToken, setDataToken] = useState([]);
        const [loading, setLoading] = useState(true);
        const [productos, setProductos] = useState([]);
        const [mesas, setMesas] = useState([]);
        const [open, setOpen] = useState(false);
        const canvasRef = useRef(null);


         const dibujarPlano = () => {
    
    const canvas = canvasRef.current;
    canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    mesas.forEach((mesa) => {
      if (!mesa.activo) return;

      const x = Number(mesa.x);
      const y = Number(mesa.y);

      // Color según estado
      ctx.fillStyle = mesa.estado ? "#ef4444" : "#22c55e";

      // Mesa
      ctx.fillRect(x, y, mesa.w, mesa.h);

      // Borde
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, mesa.w, mesa.h);

      // Nombre
      ctx.fillStyle = "#FFF";
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        mesa.nombre,
        x + mesa.w / 2,
        y + mesa.h / 2
      );
    });
  };

  /*useEffect(() => {
    dibujarPlano();
  }, []);*/

    
    const cargarDatos = useCallback(async () => {

    setLoading(true);
    
     const decoded = jwtDecode(token);
     setUser(decoded);
     setDataToken(decoded);
    
    api.get(`/categorias/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setDatos(res.data),  setLoading(false))
      .catch((err) => console.log(err));

  },[token])


  const cancelarOrden= () => {
  
    window.location.href = "/dashboard";
  };



  const cargarProductos = useCallback(async (id_categoria) => {

    try {

        setLoading(true);

        const res = await api.get(`productos/listaProductos/${id_categoria}`,
            token
        );

        setProductos(res.data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

}, [token]);





  const cargarMesa = useCallback(async (id_agencia) => {

    setMesas([])

    try {        
       setLoading(true);
        setOpen(true)
        

        const res = await api.get(`procesos/1`,
            token
        );

        setMesas(res.data);
        dibujarPlano();

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }

}, [token]);




   useEffect(() => {

    cargarDatos();

    
  }, [cargarDatos]);



  return (

  

<div className="h-screen">

     
      <div className="flex bg-gray-700 text-zinc-50 p-2 font-bold uppercase gap-1 items-center "><CgFormatJustify /> ORDEN DE SERVICIO  <BsCalendarDateFill className="ml-8" /> {fecha} </div>
    {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}
   

    <div className="
        grid
        grid-cols-2
        lg:grid-cols-[500px_300px_1fr]
        h-full">

        <aside className="overflow-y-auto border-r">
            
<div className="flex flex-row m-0 bg-slate-100">
  <div onClick={() => cargarMesa(1)} className="flex basis-64 bg-slate-400 h-32 text-center items-center justify-center font-bold rounded cursor-pointer hover:bg-slate-500 p-4 size-7 m-1"><MdTableRestaurant className="font-bold text-slate-700 size-14"/> MESA</div>
  <div className="flex basis-64 bg-green-600 h-32 text-center items-center justify-center font-bold rounded cursor-pointer text-gray-50 hover:bg-green-800 p-4 size-7 m-1"><IoSave className="font-bold text-gray-50 size-14"/> GRABAR</div>
 <div className="flex basis-64 bg-fuchsia-500 h-32 text-center items-center justify-center font-bold rounded cursor-pointer text-gray-50 hover:bg-fuchsia-800 p-4 size-7 m-1"><IoPersonSharp className="font-bold text-gray-50 size-14"/> CLIENTE</div>

 <div onClick={() => cancelarOrden() } className="flex basis-64 bg-red-600 h-32 text-center items-center justify-center font-bold rounded cursor-pointer text-gray-100 hover:bg-red-700 p-4 size-7 m-1"><IoArrowBack className="font-bold text-slate-100 size-14"/> SALIR</div>
 
</div>
        <table className="w-full text-sm bg-white text-left text-gray-500 uppercase">
        <thead className=" border-2 border-black bg-slate-900 text-slate-200 uppercase text-md">
            <tr >
            <th className="border-2 border-b-slate-500  py-2 px-2">DESCRIPCIÓN</th>
            <th className="border-2 border-b-slate-500 py-2 text-center">CATIDAD</th>
            <th className="border-2 border-b-slate-500  py-2 text-center">PRECIO</th>
            <th className="border-2 border-b-slate-500  py-2 text-center">TOTAL</th>
            <th className="border-2 border-b-slate-500 items-center justify-center  text-center"><CgFormatJustify className="text-center" /></th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="border border-gray-300   p-2 font-bold">plato de camarones.</td>
            <td className="border border-gray-300  px-2 font-bold text-center">2</td>
            <td className="border border-gray-300   font-bold text-center">$3.20</td>
            <td className="border border-gray-300   font-bold text-center">$6.40</td>
            <td className="border border-gray-300   font-bold text-center"><button className="border-t-neutral-400 p-2 bg-red-600 rounded text-gray-50"><TiDelete /></button></td>
            </tr>
            
        </tbody>
        </table>
        </aside>

        <section className="overflow-y-auto border-r">
            <div className="grid grid-cols-2">
             {datos.map((item) => (
       <div onClick={() => cargarProductos(item.id)} className="flex justify-center items-center bg-slate-600 p-1  rounded text-center text-sky-200 m-1 h-32 font-bold hover:bg-slate-500 cursor-pointer text-sm uppercase">{item.nombre}  <BiSolidRightArrow /></div>
       ))}
       </div>
        </section>
        

        <main className="overflow-y-auto bg-gray-50">
            <div className="grid grid-cols-4">
             {productos.map((item) => (
       <div onClick={() => cargarProductos(item.id)} className="flex justify-center items-center bg-neutral-700 p-1  rounded text-center text-sky-200 m-1 h-32 font-bold hover:bg-slate-500 cursor-pointer text-md uppercase">   {item.nombre} 
</div>
       ))}
       </div>
        </main>

        </div>

         <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="SELECCIONE UNA MESA"
         staticModal={true}
      >
         <div className="flex justify-center p-5">
      <canvas 
        ref={canvasRef}
        width={1000}
        height={550}
       
        className="border-s-cyan-800  border-gray-400 rounded shadow"
      />
    </div>
        
             <button onClick={() => setOpen(false)} className="bg-black p-3 rounded font-bold uppercase text-red-50">Cerrar ventana</button>

      </Modal>

</div>
  );
}

export default NewOrden;