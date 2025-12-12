import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import useCronToken from "@src/hooks/useCronToken";
import useCustomAlert from "@src/hooks/useCustomAlert";
import { jwtDecode } from "jwt-decode";

const ALERT_INTERVAL = 60 * 60 * 1000;
const STORAGE_KEY = "advertencia_empleado";

// Ruta donde SÍ queremos mostrar la alerta
const RUTA_UNICA_ALERTA = "/inicio";

const SessionControl = ({ children, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.auth.user);
  const { timedAlert } = useCustomAlert();

  const warnedRef = useRef(false);
  const intervalRef = useRef(null);

  // Decodificar token para obtener exp
  const token = useSelector((state) => state.auth.token);
  let tokenExp = null;
  
  try {
      if (token) {
          const decoded = jwtDecode(token);
          tokenExp = decoded.exp;
      }
  } catch (error) {
      console.error("Error decoding token:", error);
  }

  useCronToken(tokenExp);

  const debeMostrarAdvertencia = React.useCallback(() => {
    if (!userData) return false;
    if (userData?.isSuperAdmin == 1) return false;
    if (!userData?.persona) return true;
    if (
      userData?.persona?.es_empleado != 1 ||
      userData?.persona?.empleado_activo != 1
    )
      return true;
    return false;
  }, [userData]);

  const mostrarAlertaConContador = React.useCallback(async (motivo = "normal") => {
    if (warnedRef.current) return;
    warnedRef.current = true;

    console.log(`[SessionControl] Mostrando alerta (${motivo})...`);

    await timedAlert({
      title: "Restricción de acceso",
      icon: "warning",
      seconds: 8,
      html: `
        <div style="text-align:left">
          <p>En breve se estará agregando una restricción de acceso al sistema, y solo aquellos 
          que estén registrados como <strong>empleados con su email institucional personal</strong> podrán acceder.</p>
          <p>Para poder registrarse como empleado y generar su email institucional personal, debe completar este formulario:</p>
          <p>
            <a href="https://forms.gle/ZoTawP5jEMorpBSD7" 
               target="_blank" 
               rel="noopener noreferrer"
               class="text-primary fw-bold">
               https://forms.gle/ZoTawP5jEMorpBSD7
            </a>
          </p>
        </div>
      `,
    });

    warnedRef.current = false;
  }, [timedAlert]);

  // Si no hay usuario → redirigir
  useEffect(() => {
    if (!userData) {
      // Nota: Esto podría causar redirecciones infinitas si SessionControl envuelve rutas públicas como Login.
      // Asegurarse de que SessionControl solo envuelva rutas protegidas o tenga lógica para excluir login.
      // En el snippet original: const t = setTimeout(() => navigate("/login"), 0);
      // Pero si estamos en /login, no deberíamos redirigir.
      if (location.pathname !== '/login' && location.pathname !== '/auth/login') {
          const t = setTimeout(() => navigate("/auth/login"), 0);
          return () => clearTimeout(t);
      }
    }
  }, [userData, navigate, location.pathname]);

  // Control principal
  useEffect(() => {
    if (!userData) return;

    // Solo mostrar alerta en /inicio
    if (location.pathname !== RUTA_UNICA_ALERTA) {
      // console.log("[SessionControl] No estamos en /inicio → no mostrar alerta.");
      return;
    }

    if (!debeMostrarAdvertencia()) return;

    const now = Date.now();
    const stored = sessionStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : { lastShown: 0 };
    const diff = now - parsed.lastShown;
    const intervalTime = ALERT_INTERVAL;

    // Mostrar alerta si ya pasó el tiempo
    if (diff >= intervalTime) {
      console.log("[SessionControl] Mostrando alerta inicial");
      mostrarAlertaConContador("montaje inicial");
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ lastShown: now }));
    } else {
      const restante = Math.round((intervalTime - diff) / 1000);
      console.log(
        `[SessionControl] Falta ${restante}s para la próxima alerta`
      );
    }

    // Revisar cada 10 minutos
    intervalRef.current = setInterval(() => {
      if (location.pathname !== RUTA_UNICA_ALERTA) return;

      const current = Date.now();
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
      const diff = current - (saved.lastShown || 0);

      if (diff >= intervalTime && debeMostrarAdvertencia()) {
        console.log("[SessionControl] Intervalo cumplido → mostrando alerta");
        mostrarAlertaConContador("intervalo cumplido");
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ lastShown: current }));
      }
    }, 10 * 60 * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [userData, location.pathname, debeMostrarAdvertencia, mostrarAlertaConContador]);

  return (
    <div className={`session-control ${className || ""}`}>
      {children}
    </div>
  );
};

export default SessionControl;
