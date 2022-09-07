import React from 'react'
import'./customerEdit.jsx.css'
import { useParams } from "react-router-dom";
import { useGetUserQuery } from '../../services/userCRUDApi';
import {House,Signpost,LocationCity,CalendarToday,BadgeOutlined,LocationSearching,MailOutline,PhoneAndroid,} from "@mui/icons-material";
import user_image from "../profile/UserAfatar.jpg";
import backImg from '../../images/login-form__bg.png';
import { Alert, CircularProgress } from "@mui/material";
import { useUpdateUserMutation } from "../../services/userCRUDApi";
import { useState , useEffect } from "react";

function CustomerEdit() {
  const { id } = useParams()
  const  responseData  = useGetUserQuery(id)
  const [data, setData] = useState("");
  const [success , setSuccess] = useState(false)
  const [server_error, setServerError] = useState({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  console.log("Data: ", responseData.data);
  console.log("Success: ", responseData.isSuccess);

  useEffect(() => {
    if (responseData.isSuccess) {
    setData ({
        id: responseData.data.id,
        first_Name: responseData.data.first_Name,
        last_Name: responseData.data.last_Name,
        phone_Number: responseData.data.phone_Number,
        data_Joind:responseData.data.data_Joind,
        email:responseData.data.email,
        last_login:responseData.data.last_login,
        house_Number: responseData.data.address.house_Number,
        street_Number:responseData.data.address.street_Number,
        city: responseData.data.address.city,
        area: responseData.data.address.area,

      })
    }
  }, [responseData])


  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setData(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const actualData = {
      id: data.id,
      first_Name: data.first_Name,
      last_Name: data.last_Name,
      phone_Number: data.phone_Number,
      address_Id: responseData.data.address.address_Id,
      address:{
        house_Number: data.house_Number,
        street_Number: data.street_Number,
        city: data.city,
        area: data.area,
      }   
    };
    console.log('here the data for quary', actualData);
    const res = await updateUser(actualData);
    if (res.error) {
      console.log(typeof res.error.data.errors);
      console.log(res.error.data.errors);
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(typeof res.data);
      console.log("data updated");
      setSuccess(true)
      setServerError({})
    }
  };
  
  
  return (
    <div className="user">
      <h1 className="userTitle">User Profile</h1>
      {success ? (
        <Alert severity="success"> Profile Data Updated Successfully </Alert>
      ) : (
        ""
      )}
      <div className="userContainer">
        <div
          className="userShow"
          style={{ backgroundImage: `url(${backImg})` }}
        >
          <div className="userShowTop">
            <img src={user_image} alt="" className="userShowImg" />
            <div className="userShowTopTitle  ">
              <span className="userShowUsername ">
                <span style={{ marginRight: "2rem" }}> First Name: </span>{" "}
                {data.first_Name}
              </span>
              <span className="userShowUsername FontSize">
                <span style={{ marginRight: "2rem" }}>Last Name:</span>{" "}
                {data.last_Name}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle FontSize ">Account Details</span>
            <div className="userShowInfo">
              <div >
                <BadgeOutlined sx={{marginRight:'0.2rem'}} />
                <span>
                  User ID: 
                </span>
              </div>
              <div >
                <span>{data.id}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <CalendarToday sx={{marginRight:'0.2rem'}} />
              <span>
                Account Created At: 
              </span>
              </div>
              <div >
                <span>{data.data_Joind}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <CalendarToday sx={{marginRight:'0.2rem'}} />
              <span>
                Last Login At:
              </span>
              </div>
              <div >
                <span> {data.last_login}</span>
              </div>
            </div>
            <span className="userShowTitle FontSize">Contact Details</span>
            <div className="userShowInfo">
              <div >
              <PhoneAndroid sx={{marginRight:'0.2rem'}} />
              <span>
                Phone Number: 
              </span>
              </div>
              <div >
                <span> {data.phone_Number}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <MailOutline sx={{marginRight:'0.2rem'}} />
              <span>
                Email: 
              </span>
              </div>
              <div >
                <span>{data.email}</span>
              </div>
            </div>

            <div className="userShowInfo">
              <span className="userShowTitle FontSize ">Address:</span>
            </div>
            <div className="userShowInfo">
              <div >
              <House sx={{marginRight:'0.2rem'}} />
              <span> House Number: </span>
              </div>
              <div >
                <span> {data.house_Number}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <Signpost sx={{marginRight:'0.2rem'}} />
              <span> Street Number: </span>
              </div>
              <div >
                <span> {data.street_Number}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <LocationSearching sx={{marginRight:'0.2rem'}} />
              <span> Area: </span>
              </div>
              <div >
                <span> {data.area}</span>
              </div>
            </div>
            <div className="userShowInfo">
              <div >
              <LocationCity sx={{marginRight:'0.2rem'}} />
              <span> City: </span>
              </div>
              <div >
                <span> {data.city}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="userUpdate"
          style={{ backgroundImage: `url(${backImg})` }}
        >
          <div>
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={handleSubmit}>
              <div className="userUpdateLeft">
                <span className="userUpdateItem">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="first_Name"
                    value={data.first_Name || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                  {server_error.first_Name ? (
                    <lable
                      style={{ fontSize: 16, color: "red", paddingLeft: 10 }}
                    >
                      {server_error.first_Name[0]}
                    </lable>
                  ) : (
                    ""
                  )}
                </span>
                <span className="userUpdateItem">
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={data.last_Name || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                    name="last_Name"
                  ></input>
                  {server_error.last_Name ? (
                    <lable
                      style={{ fontSize: 16, color: "red", paddingLeft: 10 }}
                    >
                      {server_error.last_Name[0]}
                    </lable>
                  ) : (
                    ""
                  )}
                </span>
                <span className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    value={data.phone_Number || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                    name="phone_Number"
                  />
                  {server_error.phone_Number ? (
                    <lable
                      style={{ fontSize: 16, color: "red", paddingLeft: 10 }}
                    >
                      {server_error.phone_Number[0]}
                    </lable>
                  ) : (
                    ""
                  )}
                </span>
                <span className="userShowTitle">
                  <label style={{ marginTop: "3px" }}>Address:</label>
                </span>
                <span className="userUpdateItem">
                  <label>House Number</label>
                  <input
                    type="text"
                    value={data.house_Number || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                    name="house_Number"
                  />
                </span>
                <span className="userUpdateItem">
                  <label>Street Number</label>
                  <input
                    type="text"
                    value={data.street_Number || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                    name="street_Number"
                  />
                </span>
                <span className="userUpdateItem">
                  <label>Area</label>
                  <input
                    type="text"
                    value={data.area || ""}
                    onChange={handleChange}
                    className="userUpdateInput"
                    name="area"
                  />
                </span>
                <span className="userUpdateItem">
                  <label>City</label>
                  <select
                    className="userUpdateSelect"
                    name="city"
                    value={data.city || ""}
                    onChange={handleChange}
                  >
                    <option value="Rawalpindi"> Rawalpindi</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </span>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload"> </div>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <button type="submit" className="userUpdateButton">
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CustomerEdit

