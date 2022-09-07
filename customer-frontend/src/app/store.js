import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import { userCRUDApi } from '../services/userCRUDApi'
import {orderApi} from '../services/orderApi'
import { productApi } from '../services/productApi'
import {feedbackApi} from '../services/feedbackApi'
import authReducer from '../features/authSlice'
import userReducer from '../features/userSlice'
import{customOrderApi} from '../services/customOrderApi'
import orderReducer from '../features/orderSlice'

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth: authReducer,
    user: userReducer,
    order: orderReducer,
    [customOrderApi.reducerPath]: customOrderApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userCRUDApi.reducerPath]: userCRUDApi.reducer,
    [productApi.reducerPath]:  productApi.reducer,
    [feedbackApi.reducerPath]:  feedbackApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userAuthApi.middleware,
    userCRUDApi.middleware,
    productApi.middleware,
    feedbackApi.middleware,
    customOrderApi.middleware),
})

setupListeners(store.dispatch)