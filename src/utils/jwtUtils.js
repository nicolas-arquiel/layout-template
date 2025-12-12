/**
 * Genera un token JWT simulado válido (header.payload.signature)
 * @param {Object} payload - Datos a incluir en el payload
 * @param {number} expiresInSeconds - Tiempo de expiración en segundos (default: 24h)
 * @returns {string} Token JWT simulado
 */
export const generateMockJwt = (payload = {}, expiresInSeconds = 86400) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInSeconds;

  const finalPayload = {
    ...payload,
    iat: now,
    exp: exp
  };

  const base64UrlEncode = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(finalPayload);
  const signature = "mock-signature"; // No necesitamos una firma real para decodificar el payload

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};
