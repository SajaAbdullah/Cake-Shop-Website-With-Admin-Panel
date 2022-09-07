import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => {
        return {
          url: 'order/getAllorder/',
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    updateOrder: builder.mutation({
      query:(order) => {
        console.log(order)
        const {id, ...rest} = order
        console.log(`rest: ${rest.order_Status}`)
        return {
          url: `order/update/${id}`,
          method: 'PUT',
          body: rest,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    detaildOrder: builder.query({
      query: (id) => {
        return {
          url: `order/getDetaildOrder/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    orderedProducts: builder.query({
      query: (id) => {
        return {
          url: `order/orderdProducts/${id}`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    deleteOrder: builder.mutation({
      query:(order) => {
        return {
          url: `order/delete/${order}`,
          method: 'DELETE',
          body:order,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    updatePayment: builder.mutation({
      query:(order) => {
        console.log(order)
        const {id, ...rest} = order
        return {
          url: `order/paymentUpdate/${id}`,
          method: 'PUT',
          body: rest,
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
  }),
})

export const { useGetAllOrderQuery, useUpdateOrderMutation ,useDeleteOrderMutation,
  useDetaildOrderQuery ,useOrderedProductsQuery ,useUpdatePaymentMutation} = orderApi