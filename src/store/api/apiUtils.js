import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Crea una configuración base para RTK Query con headers de autenticación comunes
 * @param {string} baseUrl - La URL base para la API
 * @returns {Object} Configuración para fetchBaseQuery
 */
export const createBaseQuery = (baseUrl) => {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")

            if (token) {
                try {
                    // Intentar parsear si es una cadena JSON (lo cual es según authSlice)
                    const parsedToken = JSON.parse(token);
                    if (parsedToken) {
                        headers.set("Authorization", `Bearer ${parsedToken}`)
                    }
                } catch (e) {
                    // Si el parseo falla, quizás sea una cadena en bruto (legado)
                    headers.set("Authorization", `Bearer ${token}`)
                }
            }
            headers.set("Content-Type", "application/json")
            return headers
        },
    })
}
