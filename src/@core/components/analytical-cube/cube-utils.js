/**
 * Utilerías para el Motor de Cubos Analíticos
 * Optimizado para rendimiento
 */

/**
 * Genera la estructura jerárquica de filas
 * @param {Array} datos - Conjunto de datos base
 * @param {Array} dimensiones - Definiciones de dimensiones para filas
 * @param {number} nivel - Nivel actual de recursión
 * @returns {Array} Grupos jerárquicos
 */
export const generarFilasJerarquicas = (datos, dimensiones, nivel = 0) => {
  if (nivel >= dimensiones.length || !datos?.length) return [];
  
  const dimension = dimensiones[nivel];
  const agrupado = new Map();

  // Usar Map para mejor rendimiento
  for (const item of datos) {
    const idValor = item[dimension.idCampo];
    const key = String(idValor);
    
    if (!agrupado.has(key)) {
      agrupado.set(key, { 
        id: idValor, 
        nombre: item[dimension.campo] || 'N/A', 
        dimension: dimension.id, 
        nivel, 
        items: [] 
      });
    }
    agrupado.get(key).items.push(item);
  }

  // Convertir a array y procesar hijos
  const result = Array.from(agrupado.values());
  
  if (nivel + 1 < dimensiones.length) {
    for (const grupo of result) {
      grupo.hijos = generarFilasJerarquicas(grupo.items, dimensiones, nivel + 1);
      grupo.totalesPorColumna = {};
    }
  } else {
    for (const grupo of result) {
      grupo.totalesPorColumna = {};
    }
  }

  // Ordenar alfabéticamente
  return result.sort((a, b) => 
    String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es')
  );
};

/**
 * Genera la estructura jerárquica de columnas
 * @param {Array} datos - Conjunto de datos base
 * @param {Array} dimensiones - Definiciones de dimensiones para columnas
 * @param {number} nivel - Nivel actual de recursión
 * @returns {Array} Grupos jerárquicos para columnas
 */
export const generarColumnasJerarquicas = (datos, dimensiones, nivel = 0) => {
  if (nivel >= dimensiones.length || !datos?.length) return [];
  
  const dimension = dimensiones[nivel];
  const agrupado = new Map();

  for (const item of datos) {
    const idValor = item[dimension.idCampo];
    const key = String(idValor);
    
    if (!agrupado.has(key)) {
      agrupado.set(key, { 
        id: idValor, 
        nombre: item[dimension.campo] || 'N/A', 
        dimension: dimension.id, 
        items: [] 
      });
    }
    agrupado.get(key).items.push(item);
  }

  const result = Array.from(agrupado.values());
  
  if (nivel + 1 < dimensiones.length) {
    for (const grupo of result) {
      grupo.hijos = generarColumnasJerarquicas(grupo.items, dimensiones, nivel + 1);
    }
  }

  return result.sort((a, b) => 
    String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es')
  );
};

/**
 * Aplana columnas jerárquicas para obtener columnas finales
 * @param {Array} columnasJerarquicas - Estructura de generarColumnasJerarquicas
 * @param {Array} medidas - Definiciones de medidas
 * @returns {Array} Listado plano de columnas
 */
export const obtenerColumnasFinales = (columnasJerarquicas, medidas) => {
  const finales = [];
  
  const recorrer = (nodos, path = []) => {
    for (const nodo of nodos) {
      const currentPath = [...path, { 
        id: nodo.id, 
        nombre: nodo.nombre, 
        dimension: nodo.dimension 
      }];
      
      if (nodo.hijos?.length > 0) {
        recorrer(nodo.hijos, currentPath);
      } else {
        for (const medida of medidas) {
          finales.push({
            path: currentPath,
            medida,
            id: `${currentPath.map(p => p.id).join('-')}-${medida.id}`
          });
        }
      }
    }
  };

  if (!columnasJerarquicas?.length) {
    // Sin dimensiones de columna, solo medidas
    for (const medida of medidas) {
      finales.push({ path: [], medida, id: medida.id });
    }
  } else {
    recorrer(columnasJerarquicas);
  }
  
  return finales;
};

/**
 * Agrega datos para una medida específica
 * @param {Array} items - Filas de datos
 * @param {Object} medida - Definición de medida
 * @returns {number} Resultado de agregación (SUM)
 */
export const agregarDato = (items, medida) => {
  if (!items?.length) return 0;
  
  let sum = 0;
  const campo = medida.campo;
  
  for (const item of items) {
    const val = item[campo];
    if (val != null) {
      sum += Number(val) || 0;
    }
  }
  
  return sum;
};

/**
 * Extrae valores únicos para una dimensión
 * @param {Array} datos - Dataset
 * @param {Object} dimension - Definición de dimensión
 * @returns {Array} Opciones únicas ordenadas
 */
export const extraerValoresUnicos = (datos, dimension) => {
  if (!datos?.length) return [];
  
  const unique = new Map();
  const idCampo = dimension.idCampo;
  const campo = dimension.campo;
  
  for (const item of datos) {
    const id = item[idCampo];
    if (id != null && !unique.has(id)) {
      unique.set(id, {
        value: id,
        label: item[campo] || `${dimension.nombre} ${id}`,
        dimension: dimension.id
      });
    }
  }
  
  return Array.from(unique.values()).sort((a, b) => 
    String(a.label).localeCompare(String(b.label), 'es')
  );
};