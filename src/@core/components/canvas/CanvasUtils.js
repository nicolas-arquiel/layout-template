/**
 * Transforma los datos de entrada, reemplazando los campos que son objetos con una estructura
 * de {label:'', value:''} por su valor 'value'.
 * @param {object} data - Los datos de entrada que se van a transformar.
 * @returns {object} - Los datos transformados.
 */
export const transformData = (data) => {
  // Utilizamos Object.keys para obtener las claves del objeto 'data'
  // Luego, usamos reduce para crear un nuevo objeto transformado
  return Object.keys(data).reduce((transformedData, key) => {
    // Verificamos si el campo es un objeto con una propiedad 'value'
    if (typeof data[key] === "object" && "value" in data[key]) {
      // Si es un objeto, reemplazamos el campo por su valor 'value'
      transformedData[key] = data[key].value;
    }
    // Devolvemos el objeto transformado
    return transformedData;
  }, { ...data }); // Clonamos 'data' para no modificar el objeto original
};
