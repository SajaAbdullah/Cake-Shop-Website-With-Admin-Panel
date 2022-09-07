import "./newStaff.css";
import { useState } from 'react';
import { useRegisterStaffMutation } from '../../services/userAuthApi'
import {CircularProgress ,Alert } from '@mui/material';
import backImg from '../../images/login-form__bg.png';
import {useNavigate } from "react-router-dom";

const NewStaff =() =>{
    const navigate = useNavigate();
    const [server_error, setServerError] = useState({})
    const [registerUser, { isLoading }] = useRegisterStaffMutation()   
    const [success , setSuccess] = useState(false)

    const handleSubmit  = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
        first_Name: data.get("first_Name"),
        last_Name: data.get("last_Name"),
        email: data.get("email"),
        password: data.get("password"),
        type: data.get("type"),
        phone_Number: data.get("phone_Number"),
        address :{
          house_Number: data.get("house_Number"),
          street_Number: data.get("street_Number"),
          city: data.get("city"),
          area: data.get("area")
        }   
      };
      

      const res = await registerUser(actualData);
      if (res.error) {
        console.log(res.error.data.errors)
        setServerError(res.error.data.errors);
      }
      if (res.data) {
        console.log(res.data);
        setSuccess(true)
        setTimeout(function(){ navigate('/admin/staff')} , 3000);
      }
    };
  return (
    <div className="newUser" >
      <h1 className="newUserTitle">Create New Staff User Account</h1>
      {success ? (<Alert severity="success"> {"       "}Staff Added Successfully {"       "}</Alert>) : ( "")} 
      <form className="newUserForm" onSubmit={handleSubmit} style={{backgroundImage:`url(${backImg})`}}>
        <div className="newUserItem">
          <lable>First Name</lable>
          <input type="text" placeholder="Enter First Name" name="first_Name" />
          {server_error.first_Name ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.first_Name[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Last Name</lable>
          <input type="text" placeholder="Enter Last Name" name="last_Name" />
          {server_error.last_Name ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.last_Name[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Email</lable>
          <input type="email" placeholder="Enter Email Address" name="email" />
          {server_error.email ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Password</lable>
          <input type="password" placeholder="Enter Password" name="password"/>
          {server_error.password ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Phone Number</lable>
          <input type="text" placeholder="03xxxxxxxxx" name="phone_Number" />
          {server_error.phone_Number ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.phone_Number[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>User Type</lable>
          <select className="newUserSelect" name="type" id="type">
            <option value="STAFF">Staff</option>
            <option value="DELIVER_BOY">Delivery Boy</option>
          </select>
        </div>
        <div className="newUserItem">
          <lable>House Number</lable>
          <input type="text" placeholder="Enter House Number" name="house_Number"/>
          {server_error.house_Number ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.house_Number[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Street Number</lable>
          <input type="text" placeholder="Enter Street Number " name="street_Number" />
          {server_error.street_Number ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.street_Number[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>Area</lable>
          <input type="text" name="area" placeholder="Enter Area/Phase" />
          {server_error.area ? <lable style={{ fontSize: 16, color: 'red', paddingLeft: 10 }}>{server_error.area[0]}</lable> : ""}
        </div>
        <div className="newUserItem">
          <lable>City</lable>
          <select className="newUserSelect" name="city" id="city">
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
          </select>
        </div>
        <div> </div>
        
        {isLoading ? <CircularProgress /> : <button  type="submit" className="newUserButton">Create Staff</button> } 
      </form>
    </div>
  );
}

export default NewStaff