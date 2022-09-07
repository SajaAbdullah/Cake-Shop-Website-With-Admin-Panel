import React from 'react'
import { BrowserRouter, Route, Navigate,Routes } from "react-router-dom";
import { useSelector ,} from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {UserLogin,Logout, Question, CustomerEdit,AppLayout,AdminDashboard, Orders,OrderDetails,Customers,
  Designtool,CustomOrderDetails ,Sales,Notifications,Feedbacks,Staff,NewStaff, Products,ProductEdit
  ,NewProduct ,Profile } from "./adminExportFiles";


const theme = createTheme({
  palette: {
    primary: {
      main: '#DA627D',
      dark:'#A53860'
    },
  },
});

function App() {
  const {access_token} = useSelector(state => state.auth);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="logout" element={<Logout /> } />
          <Route  path="login" element={ <UserLogin /> } />
          {/* admin routes */}
          <Route path="admin" element={access_token ? < AppLayout/>  : <Navigate to="/login" />} >
            <Route index path="dashboard" element={ <AdminDashboard />}/>
            <Route path="customers" element={<Customers />} />
            <Route path="customer/edit/:id" element={<CustomerEdit />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/details/:id" element={<OrderDetails/>} />
            <Route path="designtool" element={<Designtool />} />
            <Route path="customorder/details/:id" element={<CustomOrderDetails />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="question" element={<Question />} />
            <Route path="feedbacks" element={<Feedbacks />} />
            <Route path="products" element={<Products />} />
            <Route path="product/new" element={<NewProduct />} />
            <Route path="product/edit/:id" element={<ProductEdit />} />
            <Route path="profile" element={<Profile />} />
            <Route path="sales" element={<Sales />} />
            <Route path="staff" element={<Staff/>} />
            <Route path="staff/edit/:id" element={<CustomerEdit />} />
            <Route path="newstaff" element={<NewStaff/>} />
          </Route>
          <Route path="*" element={<h1> Please type /admin in URL </h1>} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
  );
}
    
export default App;
