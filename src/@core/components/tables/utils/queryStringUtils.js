export const objetoAQueryString = (objeto, parentKey = null) => {
  return Object.keys(objeto)
    .map((key) => {
      const valor = objeto[key];
      const clave = parentKey ? `${parentKey}[${key}]` : key;

      if (typeof valor === "object" && valor !== null) {
        return objetoAQueryString(valor, clave);
      } else {
        return `${clave}=${valor}`;
      }
    })
    .join("&");
};
