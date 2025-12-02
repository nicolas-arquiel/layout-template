import { baseApi } from "@src/store/api/baseApi";

/**
 * API de ejemplo para mostrar cómo usar RTK Query
 * Este archivo muestra el patrón para crear endpoints de API
 */
export const ejemploApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    // GET - Obtener lista de items
    getItems: builder.query({
      query: () => `items`,
      providesTags: ["Items"],
    }),

    // GET - Obtener item por ID
    getItemById: builder.query({
      query: (id) => `items/${id}`,
      providesTags: (result, error, id) => [{ type: "Items", id }],
    }),

    // POST - Crear nuevo item
    createItem: builder.mutation({
      query: (body) => ({
        url: `items`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Items"],
    }),

    // PUT - Actualizar item
    updateItem: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `items/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Items", id }, "Items"],
    }),

    // DELETE - Eliminar item
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

// Exportar hooks generados automáticamente
export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = ejemploApi;
