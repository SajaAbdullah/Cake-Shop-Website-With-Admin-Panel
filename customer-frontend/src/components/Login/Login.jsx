import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import router from "next/router";
import {  useState } from 'react';
import { setUserToken } from '../../features/authSlice';
import { storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { useDispatch } from 'react-redux';

export const Login = () => {
  const [server_error, setServerError] = useState({})
  const [loginUser] = useLoginUserMutation()
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
      dispatch(setUserToken({ access_token: res.data.token }))
      router.push("/")
      {res.data.token.type === 'ADMIN' ? router.push("/http://localhost:3001/admin/dashboard") :router.push("/")}  
    }
  }
  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className="login">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            <form onSubmit={handleSubmit} >
            <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your Email "
                  name='email'
                />
              </div>
              {server_error.email ? <p style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</p> : ""}
              <div className="box-field">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name='password'
                />
              </div>
              {server_error.password ? <p style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</p> : ""}

              <button className="btn" type="submit">
                login
              </button>
              <div className="login-form__bottom">
                <span>
                  No account?{" "}
                  <a onClick={() => router.push("/registration")}>
                    Register now
                  </a>
                </span>
                {/* //<a href="#">Lost your password?</a> */}
              </div>
              {server_error.non_field_errors ? <lable style={{ fontSize: 16, color: 'red', paddingTop: 20 }} severity='error'>{server_error.non_field_errors[0]}</lable> : ''}
            </form>
          </div>
          
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
