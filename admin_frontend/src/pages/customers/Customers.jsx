import "./Customers.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline ,Edit} from "@mui/icons-material";
import {useGetAllCustomersQuery, useDeleteUserMutation} from '../../services/userCRUDApi'
import { useState } from "react";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from 'react-router-dom'
import { Alert } from "@mui/material";

export default function Customers() {
  const [success , setSuccess] = useState(false)
  const { data,isLoading} = useGetAllCustomersQuery()
  const navigate = useNavigate();
  const [deleteUser]= useDeleteUserMutation()

  if(isLoading) return <div>Loading.....</div>
  console.log(data)

  const handleDelete = (props) => {
    confirmAlert({
      title: 'Confirm to Delete Customer',
      message: 'Are you sure to Delete Staff Member.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => { 
            await deleteUser(props)
            setSuccess(true)              
          }        
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  };
  
  const handleEdit = (props) => {
    console.log(props)
    navigate(`/admin/customer/edit/${props}`);
  };
  const columns = [
    {field: "id", headerName: "ID", width: 130,headerClassName: 'column', },
    {field: "first_Name",headerName: "First Name",width: 270, headerClassName: 'column',},
    {field: "last_Name",headerName: "Last name",width: 270,headerClassName: 'column',},
    {field: "email", headerName: "Email", width: 360 ,headerClassName: 'column',}, 
    {field: "phone_Number",headerName: "Phone Number",width: 310,headerClassName: 'column',},
    {field: "action",headerName: "Action",width: 320,headerClassName: 'column',
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
    <div style={{display: 'flex' , flexDirection:"row"}}>
      <h1 className="userTitle">Customers List</h1>
      {success ? (<Alert severity="success"> Customer Deleted Successfully </Alert>) : ( "")}
    </div>
      
      <div className="userList">
        <DataGrid rows={data} columns={columns} style={{ fontSize:'18px',borderRadius:'1rem',backgroundColor :" #fff0f1"}}/>
      </div>
    </>
  );
}
