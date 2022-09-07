import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const feedbackApi = createApi({
  reducerPath: 'feedbackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
  endpoints: (builder) => ({
    getAllReview: builder.query({
      query: () => {
        return {
          url: 'feedback/getAllReview',
          method: 'GET', 
          headers: {
            'Content-type': 'application/json',
          }
        }
      }
    }),
    getAllQuestion: builder.query({
      query: () => {
        return {
          url: `feedback/getAllQuestion/`,
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    postReview: builder.mutation({
      query: (review) => {
        return {
          url: `feedback/postReview/`,
          method: 'POST',
          body: review,
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    postQusetion: builder.mutation({
      query: (Qusetion) => {
        return {
          url: `feedback/postQusetion/`,
          method: 'POST',
          body: Qusetion,
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `feedback/deleteReview/${id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    deleteQuestion: builder.mutation({
      query: (id) => {
        return {
          url: `feedback/deleteQuestion/${id}`,
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          }
        }}
    }),
    
  }),
})

export const {useDeleteReviewMutation , useGetAllReviewQuery, usePostReviewMutation,usePostQusetionMutation,
  useGetAllQuestionQuery ,useDeleteQuestionMutation } = feedbackApi