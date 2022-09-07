import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
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
  }),
})

export const {useGetAllProductQuery, useDetailedProductQuery} = productApi