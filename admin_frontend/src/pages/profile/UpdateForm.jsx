import React from "react";
import "./profile.css";
import { CircularProgress } from "@mui/material";
import { useUpdateUserMutation } from "../../../services/userCRUDApi";
import { useState , useEffect } from "react";
import { Alert } from '@mui/material';

const UpdateForm = (responseData) => {
  const [data, setData] = useState("");
  const [success , setSuccess] = useState(false)
  const [server_error, setServerError] = useState({});
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  
  useEffect(() => {
      setData ({
        id: responseData.data.id,
        first_Name: responseData.data.first_Name,
        last_Name: responseData.data.last_Name,
        phone_Number: responseData.data.phone_Number,
        house_Number: responseData.data.house_Number,
        street_Number:responseData.data.street_Number,
        city: responseData.data.city,
        area: responseData.data.area,
      })
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
      address_Id: responseData.data.address_Id,
      address:{
        house_Number: data.house_Number,
        street_Number: data.street_Number,
        city: data.city,
        area: data.area,
      }   
    };

    console.log(actualData);
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
    }
  };
  return (
    <div>
      <span className="userUpdateTitle">Edit</span> 
      {success? <Alert severity='success'> Profile Data Updated Successfully </Alert> : ''}
      <form className="userUpdateForm" onSubmit={handleSubmit}>
        <div className="userUpdateLeft">
          <span className="userUpdateItem">
            <label>First Name</label>
            <input
              type="text"
              value={data.first_Name || ""}
              onChange={handleChange}
              className="userUpdateInput"
              name="first_Name"
            />
          {server_error.first_Name ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.first_Name[0]}</lable> : ""}
          </span>
          <span className="userUpdateItem">
            <label>Last Name</label>
            <input  
              type="text"
              value={data.last_Name || ""}
              onChange={handleChange}
              className="userUpdateInput"
              name="last_Name"> 
            </input>
            {server_error.last_Name ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.last_Name[0]}</lable> : ""}
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
            {server_error.phone_Number ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.phone_Number[0]}</lable> : ""}

          </span>
          <span className="userShowTitle" >
            <label style={{marginTop: '3px' ,}} >Address:</label>
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
            <select  className="userUpdateSelect"
              name="city"  
              value={data.city || ""} onChange={handleChange}>
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
          <button type="submit" className="userUpdateButton">Update</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateForm;
