import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Login from "./Login";

function LoginPage() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
    >
      <Login />
    </GoogleReCaptchaProvider>
  );
}

export default LoginPage;