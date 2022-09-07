import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const customOrderApi = createApi({
  reducerPath: 'customOrderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    getAllCustomOrders: builder.query({
      query: () => {
        return {
          url: 'customizeorder/getAllCustomizeOrder/',
          method: 'GET', 
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getDetaildCustomOrder: builder.query({
      query: (id) => {
        return {
          url: `customizeorder/getDetaildCustomOrder/${id}`,
          method: 'GET', 
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    updateStatus: builder.mutation({
      query: (data) => {
        const {id, ...rest} = data
        return {
          url: `customizeorder/updateStatus/${id}`,
          method: 'PUT',
          body: rest,
          headers: {
            'Content-type': 'application/json',
          }
      }}
    }), 
    getProfileOrder: builder.query({
      query: (id) => {
        return {
          url: `customizeorder/getProfileOrder/${id}`,
          method: 'GET', 
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),  
  }),
})

export const {useUpdateStatusMutation , useGetAllCustomOrdersQuery,
  useGetDetaildCustomOrderQuery,useGetProfileOrderQuery, } = customOrderApi