import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { FaPenFancy } from "react-icons/fa6";
  import Swal from 'sweetalert2'
  import Spinner from "../componets/Spinner";
  import { FaLayerGroup } from "react-icons/fa";


function Dashboard() {
  const [datos, setDatos] = useState([]);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const [dataToken, setDataToken] = useState([]);
  const [loading, setLoading] = useState(true);


  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const cargarDatos = useCallback(async () => {

    setLoading(true);
    
     const decoded = jwtDecode(token);
     setUser(decoded);
     setDataToken(decoded);
     //console.log(decoded); //=> { foo: 'bar' }
   
    
    api.get(`/facturacion/facturasxautorizar/${decoded.usuarioAgenciaid}`, token)
      .then((res) => setDatos(res.data),  setLoading(false))
      .catch((err) => console.log(err));

  },[token])



   const handleFirmarElectronica = async (idfactura) => {
   try {
    setLoading(true);
  const res = await api.post(
    `/singer/facturaReload/${idfactura}/${dataToken.usuarioAgenciaid}`,
    {}, // body vacío si no envías datos
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
//  console.log(res);

  Swal.fire({
  title: 'Mensaje:',
  text: res.data,
  icon: 'success',
  confirmButtonText: 'Aceptar'
  
})
setLoading(false);
cargarDatos();

} catch (err) {
  console.log(err);
  setLoading(false);
}
  }

  useEffect(() => {

    cargarDatos();

    
  }, [cargarDatos]);

 const opciones = [
  { id: 1, nombre: "Quito" },
  { id: 2, nombre: "Cuenca" },
];

const [selected, setSelected] = useState(null);

  return (
  
  
  
  
  <div className="">
<p className="text-2xl font-bold text-gray-800 mb-4">Seleccion: {selected?.id} - {selected?.nombre}</p>
     <select
  className="
    w-full
    bg-white
    border border-gray-300
    text-gray-700
    py-2 px-3
    rounded-lg
    focus:outline-none
    focus:ring-2 focus:ring-indigo-500
    transition
  "
   onChange={(e) => {
    const obj = opciones.find(o => o.id === parseInt(e.target.value));
    setSelected(obj);
  }}
>

    <option value="">Seleccione</option>
  {opciones.map((item) => (
    <option key={item.id} value={item.id}>
      {item.nombre}
    </option>
  ))}
</select>
    
        <nav className="mb-6 flex justify-between items-center bg-slate-800 text-white p-4 font-bold"> <span><FaLayerGroup />
 EMPRESA: {user.usuarioRazonSocial}</span> <span className="ml-2">AMBIENTE: {user.UsuarioAmbiente}</span> <button
      onClick={cerrarSesion}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Cerrar sesión
    </button></nav>
      <div className="flex items-center justify-center  bg-slate-100 shadow-md rounded-xl">
     
      
        <table className="min-w-min text-sm bg-white text-left text-gray-500">
          
          {/* HEADER */}





          <thead className="bborder-collapse border border-gray-400 bg-slate-400 text-gray-700 uppercase text-xs">
            <tr>
              <th className="border border-gray-300 px-2 py-2">FECHA</th>
              <th className="border border-gray-300  px-2 py-2">CLAVE DE ACCESO</th>
              <th className="border border-gray-300  px-2 py-2">SECUENCIA</th>
              <th className="border border-gray-300  px-2 py-2">ESTADO AUTORIZACIÓN</th>
              <th className="border border-gray-300  px-2 py-2 text-center">CLIENTE</th>
              <th className="border border-gray-300  px-2 py-2 text-center">VALOR</th>
              <th className="border border-gray-300  px-2 py-2 text-center">ACCIONES</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-700">
            {datos.map((item) => (
              <tr
                key={item.id}
                className="border-b font-xs hover:bg-gray-50 transition"
              >
                <td className="border border-gray-300  px-6 py-2">{new Date(item.fecha).toLocaleDateString("es-EC")} </td>
                <td className="border border-gray-300  px-6 py-2">{item.claveAcceso}</td>
                <td className="border border-gray-300  px-6 py-2">{item.secuencia}</td>
                <td className="border border-gray-300  px-6 py-2">{item.estadoAutorizacion}</td>
                <td className="border border-gray-300  px-6 py-2">{item.facturacliente.nombre} {item.facturacliente.apellido}</td>
                <td className="border border-gray-300  px-6 py-2 text-center font-bold text-red-900">$ {item.facturatotalfinal}</td>
                <td className="order border-gray-300  px-6 py-2">
                  

                  <button className="flex items-center bg-red-500  text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleFirmarElectronica(item.id)}>
                    <FaPenFancy className="mr-2" />
                    <span>ENVIAR AL SRI</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}
      </div>
    </div>
  );
}

export default Dashboard;