import React from "react";
import "./customOrderTrack.css";
import { useUpdateStatusMutation} from "../../../services/customOrderApi";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useState } from "react";
import {LocalShipping ,House ,Cancel ,} from "@mui/icons-material";
import { FaBoxOpen } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { BsCheckCircle } from 'react-icons/bs';

function CustomOrderTrack(props) {

  const [updateOrder] = useUpdateStatusMutation();
  
  const [data, setdata] = useState({
    id: props.data.CustomCake.id,
    order_Status: props.data.CustomCake.order_Status,
  });

  if(data.order_Status === "Canceled"){
    return (
      <div className="main">
      <ul>
        <li>
          <CgNotes className="icon" />
          <div className= "canceldOrder1">
             <Cancel />
          </div>
          <p className="text">Order Placed</p>
        </li>
        <li>
          <FaBoxOpen className="icon" />
          <div className="canceldOrder">
            <Cancel />
          </div>
          <p className="text">Under Package</p>
        </li>
        <li>
          <LocalShipping className="icon" />
          <div className="canceldOrder" >
            <Cancel />
          </div>
          <p className="text">On The way to deliver</p>
        </li>
        <li>
         <House className="icon" />
          <div className= "canceldOrder">
            <Cancel />
          </div>
          <p className="text">Delivered</p>
        </li>
        <li>
          <Cancel className="icon" />
          <div className= "canceldOrder">
            <BsCheckCircle />
          </div>
          <p className="text">Canceled</p>
        </li>
      </ul>
    </div>
    )
  }

  let activeBar = 0;
  if (data.order_Status === "Order Placed") {
    activeBar = 1;
  } else if (data.order_Status === "Under Package") {
    activeBar = 2;
  } else if (data.order_Status === "On The way to deliver") {
    activeBar = 3;
  } else if (data.order_Status === "Delivered") {
    activeBar = 4;
  } 

  const handleUpdate = (orderStatus) => {
    const actualData={
      id:data.id,
      order_Status: orderStatus
    }
    confirmAlert({
      title: `Update Order Status to ${orderStatus}`,
      message: 'Are you sure to Update Order Status.',
      buttons: [
        {
          label: 'Yes',
          
          onClick: async() => {
            setdata({
              id:data.id,
              order_Status: orderStatus
            })
            console.log("actualData", actualData);
            const res= await updateOrder(actualData)
            if(res.isError){
              console.log(res.error.error)
            }
            if(res.data){
              console.log("update status Res", res.data)
            } 
          }        
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  return (
    <div className="main">
      <ul>
        <li>
          <CgNotes className="icon" />
          <div
            className={
              activeBar >= 1 ? " progress one active" : " progress one"
            }
            onClick={() => handleUpdate("Order Placed")}
          > <BsCheckCircle className="uil" />
          </div>
          <p className="text">Order Placed</p>
        </li>
        <li>
          <FaBoxOpen className="icon" />
          <div
            className={
              activeBar >= 2 ? " progress two active" : " progress two"
            }
            onClick={() => handleUpdate("Under Package")}
          >
            <BsCheckCircle className="uil" />
          </div>
          <p className="text">Under Package</p>
        </li>
        <li>
          <LocalShipping className="icon" />
          <div
            className={
              activeBar >= 3 ? " progress three active" : " progress three"
            }
            onClick={() => handleUpdate("On The way to deliver")}
          >
            <BsCheckCircle className="uil" />
          </div>
          <p className="text">On The way to deliver</p>
        </li>
        <li>
         <House className="icon" />
          <div
            className={
              activeBar >= 4 ? " progress four active" : " progress four"
            }
            onClick={() => handleUpdate("Delivered")}
          >
            <BsCheckCircle className="uil" />
          </div>
          <p className="text">Delivered</p>
        </li>
        <li>
          <div>  
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CustomOrderTrack;
