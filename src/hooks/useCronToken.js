import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useCronToken(exp) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = Date.now();

      if (!exp || isNaN(exp) || exp * 1000 <= currentTime) {
        // Token ha caducado, limpiar datos y redirigir a la página de inicio de sesión
        localStorage.removeItem('userData');
        localStorage.removeItem('access_token');
        localStorage.removeItem('autogestion_activo');
        navigate("/login");
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 60000);

    checkTokenExpiration();

    return () => {
      clearInterval(intervalId);
    };
  }, [exp, navigate]);
}

export default useCronToken;
