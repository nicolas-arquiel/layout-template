import CryptoJS from 'crypto-js';

const encryptionKey = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key-do-not-use-in-production';

/**
 * Encrypts data using AES encryption
 * @param {any} data - Data to encrypt (will be stringified if object)
 * @returns {string|null} - Encrypted string or null if failure
 */
export const encryptData = (data) => {
  try {
    if (!data) return null;
    
    // Convert data to string if it's an object
    const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
    
    // Ensure key has 32 bytes (256 bits)
    const key = CryptoJS.enc.Utf8.parse(encryptionKey.padEnd(32, '0').slice(0, 32));
    
    return CryptoJS.AES.encrypt(dataString, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  } catch (error) {
    console.error('Error al encriptar:', error);
    return null;
  }
};

/**
 * Decrypts data using AES encryption
 * @param {string} encryptedData - Encrypted string
 * @returns {any|null} - Decrypted data (parsed JSON if applicable) or null
 */
export const decryptData = (encryptedData) => {
  try {
    if (!encryptedData) return null;
    
    // Ensure key has 32 bytes (256 bits)
    const key = CryptoJS.enc.Utf8.parse(encryptionKey.padEnd(32, '0').slice(0, 32));
    
    const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) return null;

    // Try to parse JSON, return string if fails
    try {
      return JSON.parse(decryptedString);
    } catch {
      return decryptedString;
    }
  } catch (error) {
    console.error('Error al desencriptar:', error);
    return null;
  }
};
