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
    getUserCustomOrder: builder.query({
      query: (id) => {
        return {
          url: `customizeorder/getUserCustomizeOrder/${id}`,
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
    placeCustomOrder: builder.mutation({
      query: (data) => {
        return {
          url: `customizeorder/placeCustomOrder/`,
          method: 'POST',
          body: data,
          headers: {
            'Content-type': 'application/json',
          }
      }}
    }),   
    updateOrder: builder.mutation({
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

export const {useUpdateOrderMutation , useGetProfileOrderQuery, usePlaceCustomOrderMutation ,useGetDetaildCustomOrderQuery,
   useGetAllCustomOrdersQuery, useGetUserCustomOrderQuery} = customOrderApi