import React, {useState} from 'react'
import './staff.css'
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline ,Edit} from "@mui/icons-material";
import {useGetAllStaffQuery , useDeleteUserMutation} from '../../services/userCRUDApi'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from 'react-router-dom' 
import { Alert } from "@mui/material";

function Staff() {
  const [success , setSuccess] = useState(false)
  const { data,isLoading} = useGetAllStaffQuery()
  const [deleteUser]= useDeleteUserMutation()
  const navigate = useNavigate();

  if(isLoading) return <div>Loading.....</div>
 
  const handleEdit = (props) => {
    console.log(props)
    navigate(`/admin/customer/edit/${props}`);
  };
  const handleDelete = (props)=>{
    confirmAlert({
      title: 'Confirm to Delete Staff Member',
      message: 'Are you sure to Delete Staff Member.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            const res= await deleteUser(props)
            if(res.error){
              console.log("error in deleting user")
            }
            setSuccess(true)       
          }        
        },
        {
          label: 'No',
          onClick: () => {}
        }]});
  }
  const columns = [
    {field: "type", headerName: "Staff", width: 90,headerClassName: 'column', },
    {field: "id", headerName: "ID", width: 70,headerClassName: 'column', },
    {field: "first_Name",headerName: "First Name",width: 200, headerClassName: 'column',},
    {field: "last_Name",headerName: "Last name",width: 200,headerClassName: 'column',},
    {field: "email", headerName: "Email", width: 310 ,headerClassName: 'column',}, 
    {field: "phone_Number",headerName: "Phone Number",width: 250,headerClassName: 'column',},
    {field: "action",headerName: "Action",width: 310,headerClassName: 'column',
      renderCell: (params) => {
        return (
          <>
            <Edit className="userListEdit" onClick={() => handleEdit(params.row.id)}/>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <>
      <div className="userTitleContainer">
        <h1 className="userTitle">Staff List</h1>
        {success ? (<Alert severity="success"> {"       "}Staff Deleted Successfully </Alert>) : ( "")} 
        <Link to="/admin/newstaff">
          <button className="userAddButton"> Create User</button>
        </Link>
      </div>
      <div className="userList"> 
        <DataGrid rows={data} columns={columns} style={{ fontSize:'18px',borderRadius:'1rem',backgroundColor :" #fff0f1"}}/>
      </div>
    </>
  );
}

export default Staff