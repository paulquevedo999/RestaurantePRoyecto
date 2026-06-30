import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import api from "../api/axios";
import Spinner from "../componets/Spinner";
import Swal from 'sweetalert2'


function Login() {
    
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);

  const [cedula, setCedula] = useState("");
  const [clave ,setClave] = useState("");


  const password= btoa(unescape(encodeURIComponent(clave)));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("Captcha no listo");
      return;
    }

    try {
      // 🔥 GENERAR TOKEN CORRECTAMENTE
      const token = await executeRecaptcha("login");

      // 🔥 ENVIAR TOKEN POR URL (como pide tu backend)
      setLoading(true);
      const res = await api.post(`/login/${token}`, {
        cedula,
        password,
      });
      setLoading(false);

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";

    } catch (error) {
     
      
      Swal.fire({
      
        text: "Información incorrecta",
        icon: 'error',
        confirmButtonText: 'Ok'
      })

       setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-2 h-screen bg-gray-100">
        <div className="flex"   >
            <img src="https://sbptybwhjnosfidplkyp.supabase.co/storage/v1/object/public/qsoft/1c58307f36be045cbf5ff99a917339a1.png" alt="Logo" className="mb-6 w-80 mx-auto rounded-2xl shadow-xl" />
        </div>
        <div className="flex flex-col justify-center items-center "   >
    <form onSubmit={handleLogin}>
      <input className=" mb-3 font-bold text-gray-700 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="text"
        placeholder="CÉDULA"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <br />
      {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}

      <input className="mb-3 font-bold text-gray-700 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        type="password"
        placeholder="CONTRASEÑA"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <br />

      <button className="w-full bg-blue-950 text-white py-2 rounded hover:bg-blue-900" type="submit" >
        Iniciar sesión
      </button>
    </form>
    </div>
    </div>
  );
}

export default Login;