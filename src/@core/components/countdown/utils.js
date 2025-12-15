// src/@core/components/countdown/utils.js
import { DateTime } from 'luxon';

/**
 * Formatea una fecha a un formato específico - Soporta múltiples formatos de entrada
 * 
 * @param {string|Date} fecha - Fecha en varios formatos posibles (YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY, Date)
 * @param {string} formatoSalida - Formato de salida deseado (yyyy-MM-dd, dd-MM-yyyy, dd/MM/yyyy)
 * @returns {string} - Fecha formateada según el formato solicitado o cadena vacía si no es válida
 */
export function formatearFecha(fecha, formatoSalida = "yyyy-MM-dd") {
  if (!fecha) return "";

  let yyyy, mm, dd;

  // Caso 1: Formato ISO YYYY-MM-DD
  if (typeof fecha === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    [yyyy, mm, dd] = fecha.split("-");
  }
  // Caso 2: Formato DD/MM/YYYY
  else if (typeof fecha === 'string' && fecha.includes("/")) {
    const partes = fecha.split("/");
    if (partes.length === 3) {
      [dd, mm, yyyy] = partes;
    }
  }
  // Caso 3: Formato DD-MM-YYYY
  else if (typeof fecha === 'string' && fecha.includes("-") && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    const partes = fecha.split("-");
    if (partes.length === 3) {
      [dd, mm, yyyy] = partes;
    }
  }
  // Caso 4: Formato con espacios (DD MM YYYY)
  else if (typeof fecha === 'string') {
    const partesEspacios = fecha.trim().split(/\s+/);
    if (partesEspacios.length === 3) {
      [dd, mm, yyyy] = partesEspacios.map((v) => v.padStart(2, "0"));
    }
  }

  // Si no se pudo extraer con los métodos anteriores, intentar con Date
  if (!yyyy || !mm || !dd) {
    try {
      const fechaObj = new Date(fecha);
      if (!isNaN(fechaObj.getTime())) {
        yyyy = fechaObj.getFullYear();
        mm = String(fechaObj.getMonth() + 1).padStart(2, "0");
        dd = String(fechaObj.getDate()).padStart(2, "0");
      }
    } catch (error) {
      console.error("Error al formatear fecha:", error);
      return "";
    }
  }

  // Si aún no tenemos valores válidos, retornar vacío
  if (!yyyy || !mm || !dd) return "";

  // Formatear según el formato solicitado
  switch (formatoSalida) {
    case "dd-MM-yyyy":
      return `${dd}-${mm}-${yyyy}`;
    case "dd/MM/yyyy":
      return `${dd}/${mm}/${yyyy}`;
    case "yyyy-MM-dd":
    default:
      return `${yyyy}-${mm}-${dd}`;
  }
}

/**
 * Calcula la cuenta regresiva para un evento
 * 
 * @param {string|Date} fecha - Fecha objetivo del evento
 * @param {string} hora - Hora objetivo (formato HH:MM)
 * @param {boolean} incluirTextoDescriptivo - Si se incluye descripción textual del tiempo
 * @param {boolean} incluirFormatoHHMMSS - Si se incluye formato horario HH:MM:SS
 * @param {string} tipoEvento - 'iniciar' o 'finalizar'
 * @param {string} textoEventoComienza - Texto personalizado para "Comienza en"
 * @param {string} textoEventoFinaliza - Texto personalizado para "Finaliza en"
 * @param {string} textoEventoFinalizado - Texto personalizado para "Finalizó hace"
 * @returns {object|null} Objeto con la información de la cuenta regresiva o null si la fecha es inválida
 */
export const calcularCuentaRegresiva = (
  fecha, 
  hora, 
  incluirTextoDescriptivo = false, 
  incluirFormatoHHMMSS = false, 
  tipoEvento = 'finalizar',
  textoEventoComienza = "Comienza en",
  textoEventoFinaliza = "Finaliza en",
  textoEventoFinalizado = "Finalizó hace"
) => {
  if (!fecha) return null;

  // Fecha y hora actual (Argentina)
  const ahora = DateTime.now().setZone('America/Argentina/Buenos_Aires');
  
  let fechaObjetivo;

  // Caso 1: Formato ISO con hora incluida (2025-04-16T14:30)
  if (typeof fecha === 'string' && fecha.includes('T')) {
    fechaObjetivo = DateTime.fromISO(fecha, {
      zone: 'America/Argentina/Buenos_Aires',
    });
  } 
  // Caso 2: Otros formatos de fecha
  else {
    // Formateamos a DD-MM-YYYY para consistencia
    let fechaFormateada;
    
    if (typeof fecha === 'string' && fecha.match(/^\d{2}-\d{2}-\d{4}$/)) {
      fechaFormateada = fecha;
    } else {
      fechaFormateada = formatearFecha(fecha, 'dd-MM-yyyy');
    }
    
    if (!fechaFormateada) return null;

    // Si hay hora, la incluimos. Si no, usamos el final del día
    fechaObjetivo = hora
      ? DateTime.fromFormat(`${fechaFormateada} ${hora}`, 'dd-MM-yyyy HH:mm', {
          zone: 'America/Argentina/Buenos_Aires',
        })
      : DateTime.fromFormat(fechaFormateada, 'dd-MM-yyyy', {
          zone: 'America/Argentina/Buenos_Aires',
        }).endOf('day');
  }

  // Validar que la fecha objetivo sea correcta
  if (!fechaObjetivo.isValid) return null;

  // Determinar el estado del evento según el tipo
  let eventoFinalizado, eventoIniciado;
  
  if (tipoEvento === 'iniciar') {
    eventoIniciado = fechaObjetivo <= ahora;
    eventoFinalizado = false; // No aplica para eventos por iniciar
  } else { // 'finalizar'
    eventoFinalizado = fechaObjetivo < ahora;
    eventoIniciado = true; // Asumimos que ya inició en modo finalizar
  }
  
  // Calcular la diferencia de tiempo
  const diferenciaTiempo = fechaObjetivo.diff(ahora, ['days', 'hours', 'minutes', 'seconds']).toObject();
  
  // Extraer las unidades de tiempo y redondear hacia abajo
  const dias = Math.floor(diferenciaTiempo.days || 0);
  const horas = Math.floor(diferenciaTiempo.hours || 0);
  const minutos = Math.floor(diferenciaTiempo.minutes || 0);
  const segundos = Math.floor(diferenciaTiempo.seconds || 0);

  // Construir el objeto resultado
  const resultado = { 
    dias, 
    horas, 
    minutos, 
    segundos,
    finalizado: eventoFinalizado,
    iniciado: eventoIniciado,
    tipo: tipoEvento
  };
  
  // Agregar formato HH:MM:SS si se solicitó
  if (incluirFormatoHHMMSS) {
    if ((tipoEvento === 'finalizar' && eventoFinalizado) || (tipoEvento === 'iniciar' && eventoIniciado)) {
      // Si ya finalizó o inició según el tipo, mostramos 00:00:00
      resultado.textoFormato = "00:00:00";
    } else {
      // Convertir días a horas para el formato (formato total de horas)
      const horasTotales = (dias * 24) + horas;
      const horasStr = horasTotales.toString().padStart(2, '0');
      const minutosStr = Math.abs(minutos).toString().padStart(2, '0');
      const segundosStr = Math.abs(segundos).toString().padStart(2, '0');
      resultado.textoFormato = `${horasStr}:${minutosStr}:${segundosStr}`;
    }
  }

  // Generar texto descriptivo si se solicitó
  if (incluirTextoDescriptivo) {
    const partes = [];

    // Caso: Evento por iniciar
    if (tipoEvento === 'iniciar') {
      if (eventoIniciado) {
        // Ya inició: calculamos hace cuánto tiempo
        const tiempoPasado = ahora.diff(fechaObjetivo, ['days', 'hours', 'minutes']).toObject();
        const diasPasados = Math.floor(Math.abs(tiempoPasado.days || 0));
        const horasPasadas = Math.floor(Math.abs(tiempoPasado.hours || 0));
        const minutosPasados = Math.floor(Math.abs(tiempoPasado.minutes || 0));
        
        // Crear descripción del tiempo pasado
        if (diasPasados > 0) partes.push(`${diasPasados} día${diasPasados !== 1 ? 's' : ''}`);
        if (horasPasadas > 0 && diasPasados === 0) partes.push(`${horasPasadas} hora${horasPasadas !== 1 ? 's' : ''}`);
        if (minutosPasados > 0 && diasPasados === 0 && horasPasadas === 0) partes.push(`${minutosPasados} minuto${minutosPasados !== 1 ? 's' : ''}`);
        
        // Texto completo con prefijo
        resultado.texto = partes.length > 0 
          ? `${textoEventoComienza.replace(" en", "")} hace ${partes.join(' y ')}` 
          : `${textoEventoComienza.replace(" en", "")} hace menos de 1 minuto`;
        
        // Solo la parte de tiempo
        resultado.tiempoTexto = partes.length > 0 
          ? `hace ${partes.join(' y ')}` 
          : `hace menos de 1 minuto`;
      } else {
        // No ha iniciado: tiempo faltante
        if (dias > 0) partes.push(`${dias} día${dias !== 1 ? 's' : ''}`);
        if (horas > 0) partes.push(`${horas} hora${horas !== 1 ? 's' : ''}`);
        if (minutos > 0 && dias === 0) partes.push(`${minutos} minuto${minutos !== 1 ? 's' : ''}`);
        if (segundos > 0 && dias === 0 && horas === 0 && minutos === 0) partes.push(`${segundos} segundo${segundos !== 1 ? 's' : ''}`);
        
        // Texto completo con prefijo
        resultado.texto = partes.length > 0 
          ? `${textoEventoComienza} ${partes.join(' y ')}` 
          : `${textoEventoComienza} menos de 1 segundo`;
        
        // Solo la parte de tiempo
        resultado.tiempoTexto = partes.length > 0 
          ? partes.join(' y ') 
          : `menos de 1 segundo`;
      }
    } 
    // Caso: Evento por finalizar
    else { 
      if (eventoFinalizado) {
        // Ya finalizó: calculamos hace cuánto
        const tiempoPasado = ahora.diff(fechaObjetivo, ['days', 'hours', 'minutes']).toObject();
        const diasPasados = Math.floor(Math.abs(tiempoPasado.days || 0));
        const horasPasadas = Math.floor(Math.abs(tiempoPasado.hours || 0));
        const minutosPasados = Math.floor(Math.abs(tiempoPasado.minutes || 0));
        
        // Crear descripción del tiempo pasado
        if (diasPasados > 0) partes.push(`${diasPasados} día${diasPasados !== 1 ? 's' : ''}`);
        if (horasPasadas > 0 && diasPasados === 0) partes.push(`${horasPasadas} hora${horasPasadas !== 1 ? 's' : ''}`);
        if (minutosPasados > 0 && diasPasados === 0 && horasPasadas === 0) partes.push(`${minutosPasados} minuto${minutosPasados !== 1 ? 's' : ''}`);
        
        // Texto completo con prefijo
        resultado.texto = partes.length > 0 
          ? `${textoEventoFinalizado} ${partes.join(' y ')}` 
          : `${textoEventoFinalizado} menos de 1 minuto`;
        
        // Solo la parte de tiempo
        resultado.tiempoTexto = partes.length > 0 
          ? partes.join(' y ') 
          : `menos de 1 minuto`;
      } else {
        // No ha finalizado: tiempo restante
        if (dias > 0) partes.push(`${dias} día${dias !== 1 ? 's' : ''}`);
        if (horas > 0) partes.push(`${horas} hora${horas !== 1 ? 's' : ''}`);
        if (minutos > 0 && dias === 0) partes.push(`${minutos} minuto${minutos !== 1 ? 's' : ''}`);
        if (segundos > 0 && dias === 0 && horas === 0 && minutos === 0) partes.push(`${segundos} segundo${segundos !== 1 ? 's' : ''}`);
        
        // Texto completo con prefijo
        resultado.texto = partes.length > 0 
          ? `${textoEventoFinaliza} ${partes.join(' y ')}` 
          : `${textoEventoFinaliza} menos de 1 segundo`;
        
        // Solo la parte de tiempo
        resultado.tiempoTexto = partes.length > 0 
          ? partes.join(' y ') 
          : `menos de 1 segundo`;
      }
    }
  }

  return resultado;
};

/**
 * Determina el color a mostrar según el estado de la cuenta regresiva
 * 
 * @param {string} estadoEvento - Estado del evento ('no_iniciado', 'en_curso', 'finalizado')
 * @param {string} colorInicio - Color para eventos no iniciados
 * @param {string} colorEnCurso - Color para eventos en curso
 * @param {string} colorFin - Color para eventos finalizados
 * @returns {string} - Clase CSS con el color correspondiente
 */
export const determinarColorEvento = (
  estadoEvento,
  colorInicio = 'primary',
  colorEnCurso = 'warning',
  colorFin = 'danger'
) => {
  switch (estadoEvento) {
    case 'no_iniciado': return colorInicio;
    case 'en_curso': return colorEnCurso;
    case 'finalizado': return colorFin;
    default: return colorFin;
  }
};

/**
 * Determina el texto prefijo según el estado del evento
 * 
 * @param {string} estadoEvento - Estado del evento ('no_iniciado', 'en_curso', 'finalizado')
 * @param {string} textoComienza - Texto para eventos no iniciados
 * @param {string} textoFinaliza - Texto para eventos en curso
 * @param {string} textoFinalizado - Texto para eventos finalizados
 * @returns {string} - Texto prefijo correspondiente
 */
export const determinarPrefijoEvento = (
  estadoEvento,
  textoComienza = "Comienza en",
  textoFinaliza = "Finaliza en", 
  textoFinalizado = "Finalizó hace"
) => {
  switch (estadoEvento) {
    case 'no_iniciado': return textoComienza;
    case 'en_curso': return textoFinaliza;
    case 'finalizado': return textoFinalizado;
    default: return "";
  }
};

/**
 * Genera un ID único para el componente
 * 
 * @returns {string} - ID único
 */
export const generarIdUnico = () => `cuenta-regresiva-${Math.random().toString(36).substring(2, 9)}`;
