import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogout } from '@/store/auth/authSlice';
import { useDispatch } from "react-redux";

function useCronToken(exp) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(handleLogout())
    navigate('/login')
  }

  useEffect(() => {
    const checkTokenExpiration = () => {
      const currentTime = Date.now();

      if (!exp || isNaN(exp) || exp * 1000 <= currentTime) {
        // Token ha caducado, limpiar datos y redirigir a la página de inicio de sesión

        handleLogout()
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
