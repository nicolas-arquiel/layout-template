import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from './apiUtils'

// Ejemplo de una segunda API con diferente URL base
const SECOND_API_URL = import.meta.env.VITE_APP_SECOND_API_URL || 'http://localhost:4000/api'

export const secondApi = createApi({
    reducerPath: 'secondApi',
    baseQuery: createBaseQuery(SECOND_API_URL),
    tagTypes: ['Example'],
    endpoints: (builder) => ({
        getExampleData: builder.query({
            query: () => 'data',
        }),
    }),
})

export const { useGetExampleDataQuery } = secondApi
