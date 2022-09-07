import React from 'react'
import { TextField, Button, Box, Alert, Typography ,CircularProgress  } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../services/userAuthApi'
import { storeToken } from '../services/LocalStorageService';

const Registration = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      first_Name: data.get('first_Name'),
      last_Name: data.get('last_Name'),
      email: data.get('email'),
      password: data.get('password'),
      type: "CUSTOMER",
    }
    const res = await registerUser(actualData)
    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      storeToken(res.data.token)
      navigate('/dashboard')
    }
  }
  return <>
      {server_error? console.log(server_error) : ""}
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='first_Name' name='first_Name' label='First Name' />
      {server_error.first_Name ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.first_Name[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='last_Name' name='last_Name' label='Last Name' />
      {server_error.last_Name ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.last_Name[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {server_error.email ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password ? <Typography style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
      <Box textAlign='center'>
        {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Register</Button>}
      </Box>
      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Box>
  
  </>;
};

export default Registration;
