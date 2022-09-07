import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id:"",
    first_Name: "",
    last_Name: "",
    email: "",
    phone_Number: "",
    type: "",
}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.id = action.payload.id
      state.first_Name = action.payload.first_Name
      state.last_Name = action.payload.last_Name
      state.email = action.payload.email
      state.phone_Number = action.payload.phone_Number
      state.type= action.payload.type

    },
    unsetUserInfo: (state, action) => {
      state.id = action.payload.id
      state.first_Name = action.payload.first_Name
      state.last_Name = action.payload.last_Name
      state.email = action.payload.email
      state.phone_Number = action.payload.phone_Number
      state.type= action.payload.type
    },
  }
})

export const { setUserInfo, unsetUserInfo } = userSlice.actions

export default userSlice.reducer