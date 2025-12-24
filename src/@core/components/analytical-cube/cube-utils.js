/**
 * Utilerías genéricas para el Motor de Cubos Analíticos
 */

/**
 * Genera la estructura jerárquica de filas
 * @param {Array} datos - El conjunto de datos base
 * @param {Array} dimensiones - Array de definiciones de dimensiones para las filas
 * @param {number} nivel - Nivel actual de recursión
 * @returns {Array} Listado de grupos jerárquicos
 */
export const generarFilasJerarquicas = (datos, dimensiones, nivel = 0) => {
  if (nivel >= dimensiones.length) return datos;
  
  const dimension = dimensiones[nivel];
  const agrupado = {};

  datos.forEach(item => {
    const idValor = item[dimension.idCampo];
    const labelValor = item[dimension.campo] || 'N/A';
    const key = `${idValor}`;
    
    if (!agrupado[key]) {
      agrupado[key] = { 
        id: idValor, 
        nombre: labelValor, 
        dimension: dimension.id, 
        nivel: nivel, 
        items: [] 
      };
    }
    agrupado[key].items.push(item);
  });

  return Object.values(agrupado).map(grupo => {
    if (nivel + 1 < dimensiones.length) {
      grupo.hijos = generarFilasJerarquicas(grupo.items, dimensiones, nivel + 1);
    }
    grupo.totalesPorColumna = {};
    return grupo;
  }).sort((a, b) => {
    const nameA = String(a.nombre || '');
    const nameB = String(b.nombre || '');
    return nameA.localeCompare(nameB);
  });
};

/**
 * Genera la estructura jerárquica de columnas
 * @param {Array} datos - El conjunto de datos base
 * @param {Array} dimensiones - Array de definiciones de dimensiones para las columnas
 * @param {number} nivel - Nivel actual de recursión
 * @returns {Array} Listado de grupos jerárquicos para las columnas
 */
export const generarColumnasJerarquicas = (datos, dimensiones, nivel = 0) => {
  if (nivel >= dimensiones.length || !datos || datos.length === 0) return [];
  
  const dimension = dimensiones[nivel];
  const agrupado = {};

  datos.forEach(item => {
    const idValor = item[dimension.idCampo];
    const labelValor = item[dimension.campo] || 'N/A';
    const key = `${idValor}`;
    
    if (!agrupado[key]) {
      agrupado[key] = { 
        id: idValor, 
        nombre: labelValor, 
        dimension: dimension.id, 
        items: [] 
      };
    }
    agrupado[key].items.push(item);
  });

  return Object.values(agrupado).map(grupo => {
    if (nivel + 1 < dimensiones.length) {
      grupo.hijos = generarColumnasJerarquicas(grupo.items, dimensiones, nivel + 1);
    }
    return grupo;
  }).sort((a, b) => {
    const nameA = String(a.nombre || '');
    const nameB = String(b.nombre || '');
    return nameA.localeCompare(nameB);
  });
};

/**
 * Aplana las columnas jerárquicas para obtener las columnas finales de la tabla
 * @param {Array} columnasJerarquicas - Estructura generada por generarColumnasJerarquicas
 * @param {Array} medidas - Array de definiciones de medidas
 * @returns {Array} Listado plano de columnas de datos
 */
export const obtenerColumnasFinales = (columnasJerarquicas, medidas) => {
  const finales = [];
  
  const recorrer = (nodos, path = []) => {
    nodos.forEach(nodo => {
      const currentPath = [...path, { id: nodo.id, nombre: nodo.nombre, dimension: nodo.dimension }];
      if (nodo.hijos && nodo.hijos.length > 0) {
        recorrer(nodo.hijos, currentPath);
      } else {
        medidas.forEach(medida => {
          finales.push({
            path: currentPath,
            medida: medida,
            id: `${currentPath.map(p => p.id).join('-')}-${medida.id}`
          });
        });
      }
    });
  };

  if (columnasJerarquicas.length === 0) {
    medidas.forEach(medida => {
      finales.push({ path: [], medida: medida, id: medida.id });
    });
  } else {
    recorrer(columnasJerarquicas);
  }
  
  return finales;
};

/**
 * Agrega los datos de un conjunto de items para una medida específica
 * @param {Array} items - Conjunto de filas de datos
 * @param {Object} medida - Definición de la medida
 * @returns {number} El resultado de la agregación (actualmente solo SUM)
 */
export const agregarDato = (items, medida) => {
  return items.reduce((sum, item) => sum + (Number(item[medida.campo]) || 0), 0);
};

/**
 * Extrae valores únicos para una dimensión específica
 * @param {Array} datos - Dataset
 * @param {Object} dimension - Definición de la dimensión
 * @returns {Array} Listado de opciones únicas
 */
export const extraerValoresUnicos = (datos, dimension) => {
  const unique = {};
  datos.forEach(item => {
    const id = item[dimension.idCampo];
    if (id && !unique[id]) {
      unique[id] = {
        value: id,
        label: item[dimension.campo] || `${dimension.nombre} ${id}`,
        dimension: dimension.id
      };
    }
  });
  return Object.values(unique).sort((a, b) => a.label.localeCompare(b.label));
};
