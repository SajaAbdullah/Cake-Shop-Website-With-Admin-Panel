import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { userCRUDApi } from '../services/userCRUDApi'
import {orderApi} from '../services/orderApi'
import{customOrderApi} from '../services/customOrderApi'
import { productApi } from '../services/productApi'
import {feedbackApi} from '../services/feedbackApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authReducer,
    user: userReducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userCRUDApi.reducerPath]: userCRUDApi.reducer,
    [productApi.reducerPath]:  productApi.reducer,
    [feedbackApi.reducerPath]:  feedbackApi.reducer,
    [customOrderApi.reducerPath]: customOrderApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userAuthApi.middleware,
    userCRUDApi.middleware,
    productApi.middleware,
    feedbackApi.middleware,
    customOrderApi.middleware),
})

setupListeners(store.dispatch)