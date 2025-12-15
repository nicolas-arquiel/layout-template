import { createBaseQuery } from './apiUtils'
import { createApi } from '@reduxjs/toolkit/query/react'

// TODO: Configurar la URL base de tu API
const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL_API || 'http://localhost:3000/api'

const baseQuery = createBaseQuery(API_BASE_URL)

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
