import React from 'react'
import { AppBar, Toolbar, Grid, Card, Typography, Box,TextField, Button,Alert, CircularProgress } from '@mui/material';
import logo from '../images/logo.ico';
import backImg from '../images/login-form__bg.png';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../features/authSlice';
import { getToken, storeToken } from '../services/LocalStorageService';
import { useLoginUserMutation } from '../services/userAuthApi';


const UserLogin = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    if (res.error) {
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      res.data.token.type === 'ADMIN' ? navigate('/admin/dashboard'):  navigate('/dashboard') 
      
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])

  return (
    <div>  
    <Box sx={{ flexGrow: 1 ,}} >
      <AppBar position="static" color="primary" >
        <Toolbar >
        <Box
            component="img"
            sx={{
            height: 100,
            margin: 2,
            }}
            alt="logo"
            src={logo}
        />
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>  Bake and Take  Admin Dashboard </Typography>
        </Toolbar>
      </AppBar>
    </Box >
      <Grid container sx={{ display: "flex", justifyContent: "center" , margin:'30px' }} >
        <Grid item lg={5} sm={7} xs={12}>
          <Card sx={{ width: "100%", height: "100%",marginTop:'30px' ,backgroundImage:`url(${backImg})`}}>
            <Box sx={{ mx: 3, height: 300 }}>
              <h3 style={{color:"#A53860", fontSize: 33, textAlign:"center" ,marginTop:'30px'}}> Admin Login</h3>
              {server_error ? console.log(server_error) : ""}
              <Box
                component="form"
                noValidate
                sx={{ mt: 1 }}
                id="login-form"
                onSubmit={handleSubmit}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                />
                {server_error.email ? (
                  <Typography
                    style={{ fontSize: 16, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.email[0]}
                  </Typography>
                ) : (
                  ""
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                />
                {server_error.password ? (
                  <Typography
                    style={{ fontSize: 16, color: "red", paddingLeft: 10 }}
                  >
                    {server_error.password[0]}
                  </Typography>
                ) : (
                  ""
                )}
                <Box textAlign="center">
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, px: 5 }}
                    >
                      Login
                    </Button>
                  )}
                </Box>
                {server_error.non_field_errors ? (
                  <Alert severity="error">
                    {server_error.non_field_errors[0]}
                  </Alert>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Box component="img" sx={{ height: 150 }} alt="logo" src={logo} />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserLogin;
