import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    postProduct: builder.mutation({
      query: (formData) => {
        return {
          url: 'product/add/',
          method: 'POST',
          body: formData,
        }
      }
    }),
    addImages: builder.mutation({
      query: (formData) => {
        return {
          url: 'product/image/add/',
          method: 'POST',
          body: formData,
        }
      }
    }),
    getAllProduct: builder.query({
      query: () => {
        return {
          url: 'product/getAllproduct/',
          method: 'GET', 
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    updateProduct: builder.mutation({
      query:({ formData, id }) => {
        return {
          url: `product/update/${id}`,
          method: 'PUT',
          body: formData,
        }
      }
    }),
    detailedProduct: builder.query({
      query: (id) => {
        console.log( 'api',id);
        return {
          url: `product/getDetailedProduct/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    deleteProduct: builder.mutation({
      query:(product) => {
        return {
          url: `product/delete/${product}`,
          method: 'DELETE',
          body:product,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})

export const { useAddImagesMutation ,usePostProductMutation,useGetAllProductQuery, useUpdateProductMutation ,useDeleteProductMutation,
  useDetailedProductQuery} = productApi