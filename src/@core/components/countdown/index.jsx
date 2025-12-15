// src/@core/components/countdown/index.jsx
import React, { memo, useState, useEffect, useRef } from "react";
import { Badge, Tooltip, Flex, Text } from '@radix-ui/themes';
import { Calendar, Clock } from 'lucide-react';
import { 
  calcularCuentaRegresiva, 
  determinarColorEvento, 
  determinarPrefijoEvento, 
  generarIdUnico 
} from "./utils";
import clsx from "clsx";

/**
 * Componente para el tooltip con información detallada del evento
 */
const TooltipContenido = ({ fechaInicio, horaInicio, fechaFin, horaFin, estado }) => (
  <Flex direction="column" gap="1">
    {fechaInicio && horaInicio && (
      <Flex align="center" gap="2">
        <Calendar size={14} className="opacity-70" />
        <Text size="1" weight="bold">Inicio:</Text>
        <Text size="1">{fechaInicio} {horaInicio}</Text>
      </Flex>
    )}
    {fechaFin && horaFin && (
      <Flex align="center" gap="2">
        <Calendar size={14} className="opacity-70" />
        <Text size="1" weight="bold">Fin:</Text>
        <Text size="1">{fechaFin} {horaFin}</Text>
      </Flex>
    )}
    <Flex align="center" gap="2">
      <Clock size={14} className="opacity-70" />
      <Text size="1" weight="bold">Estado:</Text>
      <Text size="1">{estado}</Text>
    </Flex>
  </Flex>
);

/**
 * Componente principal de cuenta regresiva
 * 
 * Muestra una cuenta regresiva para eventos, con soporte para fechas de inicio y fin,
 * cambio de modo de visualización, y personalización de estilos y textos.
 */
const CuentaRegresiva = memo(({ 
  // Fecha de inicio
  fechaInicio,
  horaInicio,
  // Fecha de fin
  fechaFin, 
  horaFin,
  // Una sola fecha (legacy)
  fecha,
  hora,
  tipo,
  // Opciones de visualización
  modoInicial = 'contador',
  permitirCambioModo = false,
  // Textos personalizables
  textoComienza = "Comienza en",
  textoFinaliza = "Finaliza en",
  textoFinalizado = "Finalizó hace",
  // Colores (strings personalizados o mapeados a Radix Colors)
  colorInicio = 'primary',
  colorEnCurso = 'warning',
  colorFin = 'danger',
  // ID único para el tooltip
  id = null,
  className
}) => {
  // Estados internos
  const [estadoEvento, setEstadoEvento] = useState('no_iniciado'); // 'no_iniciado', 'en_curso', 'finalizado'
  const [countdown, setCountdown] = useState(null);
  
  // Generar ID único para el componente si no se proporciona
  const componentId = useRef(id || generarIdUnico()).current;
  
  // Definir constantes para los modos de visualización
  const MODO_COMPACTO_CONTADOR = 0; // Formato con contador (00:00:00)
  const MODO_COMPACTO_DIAS = 1;     // Formato con días/horas (texto descriptivo)
  
  // Inicializar el modo de visualización
  const [modoVisualizacion, setModoVisualizacion] = useState(() => {
    return modoInicial === 'dias' ? MODO_COMPACTO_DIAS : MODO_COMPACTO_CONTADOR;
  });
  
  // Compatibilidad con versión anterior
  let safeFechaInicio = fechaInicio;
  let safeHoraInicio = horaInicio;
  let safeFechaFin = fechaFin;
  let safeHoraFin = horaFin;

  if (!fechaInicio && !fechaFin && fecha) {
    if (tipo === 'iniciar') {
      safeFechaInicio = fecha;
      safeHoraInicio = hora;
    } else {
      safeFechaFin = fecha;
      safeHoraFin = hora;
    }
  }

  // Actualizar la cuenta regresiva cada segundo
  useEffect(() => {
    const actualizarCuentaRegresiva = () => {
      let nuevoEstado = estadoEvento;
      let resultado = null;
      
      // Si tenemos fechaInicio y fechaFin, determinamos el estado actual
      if (safeFechaInicio && safeFechaFin) {
        const countdownInicio = calcularCuentaRegresiva(safeFechaInicio, safeHoraInicio, false, false, 'iniciar');
        const countdownFin = calcularCuentaRegresiva(safeFechaFin, safeHoraFin, false, false, 'finalizar');
        
        if (!countdownInicio || !countdownFin) return;

        // Determinamos el estado según las fechas
        if (!countdownInicio.iniciado) {
          nuevoEstado = 'no_iniciado';
          resultado = calcularCuentaRegresiva(
            safeFechaInicio, 
            safeHoraInicio, 
            true,  // Incluir texto descriptivo
            true,  // Incluir formato HH:MM:SS
            'iniciar',
            textoComienza
          );
        } else if (!countdownFin.finalizado) {
          nuevoEstado = 'en_curso';
          resultado = calcularCuentaRegresiva(
            safeFechaFin, 
            safeHoraFin, 
            true, 
            true, 
            'finalizar',
            textoComienza,
            textoFinaliza
          );
        } else {
          nuevoEstado = 'finalizado';
          resultado = calcularCuentaRegresiva(
            safeFechaFin, 
            safeHoraFin, 
            true, 
            true, 
            'finalizar',
            textoComienza,
            textoFinaliza,
            textoFinalizado
          );
          
          // Si está finalizado, forzar el modo de visualización a 'dias'
          setModoVisualizacion(MODO_COMPACTO_DIAS);
        }
      } 
      // Si solo tenemos fechaInicio
      else if (safeFechaInicio) {
        resultado = calcularCuentaRegresiva(
          safeFechaInicio, 
          safeHoraInicio, 
          true, 
          true, 
          'iniciar',
          textoComienza
        );
        nuevoEstado = resultado.iniciado ? 'en_curso' : 'no_iniciado';
      } 
      // Si solo tenemos fechaFin
      else if (safeFechaFin) {
        resultado = calcularCuentaRegresiva(
          safeFechaFin, 
          safeHoraFin, 
          true, 
          true, 
          'finalizar',
          textoComienza,
          textoFinaliza,
          textoFinalizado
        );
        nuevoEstado = resultado.finalizado ? 'finalizado' : 'en_curso';
        
        // Si está finalizado, forzar el modo de visualización a 'dias'
        if (resultado.finalizado) {
          setModoVisualizacion(MODO_COMPACTO_DIAS);
        }
      }
      
      setEstadoEvento(nuevoEstado);
      setCountdown(resultado);
    };

    // Actualizar inicialmente
    actualizarCuentaRegresiva();

    // Configurar el intervalo para actualizar cada segundo
    const intervalId = setInterval(actualizarCuentaRegresiva, 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [
    safeFechaInicio, 
    safeHoraInicio, 
    safeFechaFin, 
    safeHoraFin, 
    textoComienza, 
    textoFinaliza, 
    textoFinalizado
  ]);

  // Manejar el cambio de modo de visualización al hacer clic
  const cambiarModoVisualizacion = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Si no se permite cambiar el modo o el evento está finalizado, no hacer nada
    if (!permitirCambioModo || estadoEvento === 'finalizado') {
      return;
    }
    
    // Alternar entre los diferentes modos
    setModoVisualizacion((modo) => (modo + 1) % 2);
  };

  // No renderizar si no hay datos
  if (!countdown) return null;

  // Determinar el estilo de cursor
  const estiloCursor = permitirCambioModo && estadoEvento !== 'finalizado' ? 'cursor-pointer' : 'cursor-default';

  // Mapeo de colores personalizados a colores de Radix Themes
  const getRadixColor = (estado) => {
    const tipoColor = determinarColorEvento(estado, colorInicio, colorEnCurso, colorFin);
    
    const colorMap = {
      'primary': 'indigo',
      'warning': 'amber',
      'danger': 'ruby',
      'success': 'jade',
      'info': 'cyan',
    };

    // Si el color pasado ya es un color válido de Radix (o string arbitrary), intentar usarlo, 
    // pero primero chequear el mapa
    return colorMap[tipoColor] || colorMap['primary'];
  };

  const radixColor = getRadixColor(estadoEvento);

  return (
    <Tooltip 
      content={
        <TooltipContenido 
          fechaInicio={safeFechaInicio}
          horaInicio={safeHoraInicio} 
          fechaFin={safeFechaFin} 
          horaFin={safeHoraFin}
          estado={countdown.texto}
        />
      }
    >
      <Badge 
        id={componentId}
        color={radixColor}
        variant="soft"
        className={clsx(
          "inline-flex flex-col items-center justify-center gap-0 px-3 py-1 select-none",
          estiloCursor,
          className
        )}
        onClick={cambiarModoVisualizacion}
      >
        <span className="text-sm font-bold leading-none">
            {determinarPrefijoEvento(estadoEvento, textoComienza, textoFinaliza, textoFinalizado)}
        </span>
        
        <span className="text-sm font-bold leading-3">
            {modoVisualizacion === MODO_COMPACTO_DIAS 
            ? (countdown.tiempoTexto || "") 
            : countdown.textoFormato}
        </span>
      </Badge>
    </Tooltip>
  );
});

/**
 * Componente especializado para mostrar cuenta regresiva con ambas fechas (inicio y fin)
 */
export const CuentaRegresivaEvento = memo((props) => (
  <CuentaRegresiva {...props} />
));

/**
 * Componente especializado para mostrar solo cuenta regresiva de inicio
 */
export const CuentaRegresivaInicio = memo((props) => (
  <CuentaRegresiva 
    {...props} 
    fechaInicio={props.fecha || props.fechaInicio} 
    horaInicio={props.hora || props.horaInicio} 
  />
));

/**
 * Componente especializado para mostrar solo cuenta regresiva de finalización
 */
export const CuentaRegresivaFin = memo((props) => (
  <CuentaRegresiva 
    {...props} 
    fechaFin={props.fecha || props.fechaFin} 
    horaFin={props.hora || props.horaFin} 
  />
));

export default CuentaRegresiva;
