import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import api from "../api/axios";
import Spinner from "../componets/Spinner";
import Swal from 'sweetalert2'
import { FaFacebookSquare } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";


function Login() {
    
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loading, setLoading] = useState(false);

  const [cedula, setCedula] = useState("");
  const [clave ,setClave] = useState("");
   const navigate = useNavigate();



  const password= btoa(unescape(encodeURIComponent(clave)));

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      alert("Captcha no listo");
      return;
    }

    if(cedula === "" || password === "")
      {
         Swal.fire({
      
        text: "Ingrese correctamente los datos",
        icon: 'info',
        confirmButtonText: 'Ok'
      })

      }
      else{

    try {
      // 🔥 GENERAR TOKEN CORRECTAMENTE
      const token = await executeRecaptcha("login");

      // 🔥 ENVIAR TOKEN POR URL (como pide tu backend)
      setLoading(true);
      
      const res = await api.post(`/login/appqsoft1/${token}`, {
        cedula,
        password,
      });
      setLoading(false);

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      //window.location.href = "/dashboard";

    } catch (error) {
     
      
      Swal.fire({
      
        text: "Información incorrecta",
        icon: 'error',
        confirmButtonText: 'Acaptar'
      })

       setLoading(false);
    }
  }
  
  
  };

  return (

    <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-7 min-h-screen bg-[#142234] p-8">
        <div className="w-full sm:w-2/3 items-center 
      "   >
            <img src="https://sbptybwhjnosfidplkyp.supabase.co/storage/v1/object/public/qsoft/ChatGPT%20Image%201%20may%202026,%2009_51_02.png" alt="Logo" className="rounded-3xl mb-6 w-auto mx-auto " />
        </div>
        <div className=" sm:w-1/4 justify-center items-center w-full "   >
        <p className="text-center   font-extrabold text-4xl  p-1 rounded-xl text-gray-50 font-montserrat">Inicio de Sesión</p>
    <form onSubmit={handleLogin} className="flex flex-col  p-8 ">
      <label className="label_eti1">Cédula: </label>
      <input className="caja_detexto"
        type="text"
   
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
    
      {loading && <Spinner fullScreen size="lg" text="Procesando..."  />}

      <label className="label_eti1">Contraseña: </label>
      <input className="caja_detexto"
        type="password"
       
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      
      <br></br>

     

      <button className="btn-login mt-4" type="submit" >
        Iniciar sesión
      </button>
    </form>
     <div className="flex flex-row gap-4 items-center justify-center " >
        <div className="social bg-blue-800 " ><FaFacebookSquare /></div>
        <div className="social bg-rose-600" ><SlSocialInstagram /></div>
        <div className="social bg-stone-500 " ><MdMail /></div>
      
     </div>
     <p className="text-slate-400 text-center pt-4 font-bold font text-xs" >Versión: 1.0.0</p>
    </div>
    
    
    </div>
    
  );
}

export default Login;