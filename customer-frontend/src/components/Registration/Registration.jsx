import { SocialLogin } from "components/shared/SocialLogin/SocialLogin";
import router from "next/router";
import { useState } from 'react';
import { useRegisterUserMutation } from '../../services/userAuthApi'
import { storeToken } from '../../services/LocalStorageService';

export const Registration = () => {
 
  const [server_error, setServerError] = useState({})
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const actualData = {
      first_Name: data.get('first_Name'),
      last_Name: data.get('last_Name'),
      email: data.get('email'),
      password: data.get('password'),
      phone_Number: '03000000000',
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
      router.push("/")
    }
  }
  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className="login registration">
        <div className="wrapper">
          <div
            className="login-form js-img"
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleSubmit}>
              <h3>Register Now</h3>
                <div
                  className="box-field "
                  style={{ width: "100% !important" }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first Name"
                    name="first_Name"
                  />
                  {server_error.first_Name ? (
                    <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                      {server_error.first_Name[0]}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="box-field" style={{ width: "100% !important" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    name="last_Name"
                  />
                </div>
                {server_error.last_Name ? (
                  <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                    {server_error.last_Name[0]}
                  </p>
                ) : (
                  ""
                )}
              <div className="box-field" style={{ width: "100% !important" }}>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>
              {server_error.email ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.email[0]}
                </p>
              ) : (
                ""
              )}
              <div className="box-field " style={{ width: "100% !important" }}>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  name="password"
                />
              </div>
              {server_error.password ? (
                <p style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                  {server_error.password[0]}
                </p>
              ) : (
                ""
              )}
              <button className="btn" type="submit">
                Registration
              </button>
              <div className="login-form__bottom">
                <span>
                  Already have an account?{" "}
                  <a onClick={() => router.push("/login")}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className="promo-video__decor js-img"
          src="/assets/img/promo-video__decor.jpg"
          alt=""
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
