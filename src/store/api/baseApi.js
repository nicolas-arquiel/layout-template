import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// TODO: Configurar la URL base de tu API
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL_API || 'http://localhost:3000/api'

const baseQuery = fetchBaseQuery({
  refetchOnMountOrArgChange: true,
  baseUrl: API_BASE_URL,
  credentials: "same-origin",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("access_token")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    headers.set("Content-Type", "application/json")
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: [
    // Agregar aquí los tags para invalidación de cache
    // Ejemplo: "Users", "Posts", etc.
  ],
  endpoints: (builder) => ({
    // Los endpoints se inyectarán desde otros archivos usando injectEndpoints
  })
})
