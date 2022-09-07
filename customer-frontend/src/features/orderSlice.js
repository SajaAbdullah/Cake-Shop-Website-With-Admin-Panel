import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:"",
    order_Status: "",
    order_Delivery_Date: "",
    order_Delivery_Time :" ",
    total_Amount: "",
}

export const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.id = action.payload.id
      state.order_Status = action.payload.order_Status
      state.order_Delivery_Date = action.payload.order_Delivery_Date
      state.order_Delivery_Time = action.payload.order_Delivery_Time
      state.total_Amount= action.payload.total_Amount

    },
    unsetOrder: (state, action) => {
      state.id = action.payload.id
      state.order_Status = action.payload.order_Status
      state.order_Delivery_Date = action.payload.order_Delivery_Date
      state.order_Delivery_Time = action.payload.order_Delivery_Time
      state.total_Amount= action.payload.total_Amount
    },
  }
})

export const { setOrder, unsetOrder } = orderSlice.actions

export default orderSlice.reducer