import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCronToken from "@src/hooks/useCronToken";
import { jwtDecode } from "jwt-decode";
import { selectCurrentToken, selectCurrentUser } from "@src/store/auth/authSlice";

const SessionControl = ({ children, className }) => {
  const navigate = useNavigate();
  const userData = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  // Decodificar token para obtener exp
  let tokenExp = null;

  try {
    if (token) {
      const decoded = jwtDecode(token);
      tokenExp = decoded.exp;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }

  // Control de expiración de token
  useCronToken(tokenExp);

  // Si no hay usuario → redirigir a login
  useEffect(() => {
    if (!userData) {
      const t = setTimeout(() => navigate("/login"), 0);
      return () => clearTimeout(t);
    }
  }, [userData, navigate]);

  return (
    <div className={`session-control ${className || ""}`}>
      {children}
    </div>
  );
};

export default SessionControl;
