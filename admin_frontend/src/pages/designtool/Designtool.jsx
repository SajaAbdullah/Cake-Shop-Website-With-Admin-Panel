import React from 'react'
import {useUpdateStatusMutation , useGetAllCustomOrdersQuery}  from '../../services/customOrderApi'
import './designtool.css';
import { useNavigate } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import backImg from '../../images/login-form__bg.png';

function Designtool() {
  const navigate = useNavigate();
  const response = useGetAllCustomOrdersQuery();
  const [updateOrder] = useUpdateStatusMutation();
  console.log("Response information: ", response);
  console.log("Data: ", response.data);
  console.log("Success: ", response.isSuccess);
  
  if (response.isLoading) return <div>Loading....</div>;
  if (response.isError) return <h1>An error occured {response.error.error}</h1>;
  
  const arr = (response.data).slice().reverse();
  const handleCancel= (props)=>{
    const updateData= {
      id:props,
      order_Status:"Canceled",
    }
    confirmAlert({
      title: 'Confirm to Cancel Order',
      message: 'Are you sure to Cancel this Order.',
      buttons: [
        {
          label: 'Yes',
          onClick: async() => {
            const res= await updateOrder(updateData)
            if(res.isError){
              console.log(res.error.error)
            }
            if(res.data){
              console.log(res.data)     
            }}
          },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  }

  const handleEdit = props => {
    console.log(props);
    navigate(`/admin/customorder/details/${props}`);
  };

  return (
    <div >
      <h1 style={{ marginBottom: "3rem" }}>Custom Orders List </h1>
      <div className="customOrdergrid">
        {arr.map((data, index) => (
          <div key={index} className="customOrdercontainer">
            <div className="customOrdercard" style={{backgroundImage:`url(${backImg})`}}>
              <img src={`http://127.0.0.1:8000${data.finalProduct.finalProductImg}`} alt="logo" className="customOrderimage" />
              <div className="customOrderdata">
                <h1 className="customOrdertitle">{data.order_Status}</h1>
                <div className='customOrderdataGrid'>
                  <h3>Cake Shape: </h3>
                  <p className='customOrderinfo'>{data.Cake_Shape_layers.cake_shape} </p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Cake Flavor: </h3>
                  <p className='customOrderinfo'>{data.sponge_Flavor.flavor_name} {" "} </p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Cake Icing: </h3>
                  <p className='customOrderinfo'>{data.Icing.decoration_name}</p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Msg on Cake: </h3>
                  <p className='customOrderinfo' style={{color:`${data.msg_color.color_Code}`}}>{data.msg_on_cake} </p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Top Image: </h3>
                  <p className='customOrderinfo'>{data.Top_Img_Decoration.name} </p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Total Amount: </h3>
                  <p className='customOrderinfo'> Rs. {' '} {data.amount} </p>
                </div>
                <div className='customOrderdataGrid'>
                  <h3>Special Instruction: </h3>
                  <p className='customOrderinfo'> {data.special_instruction} </p>
                </div>
                <div className="customOrderbuttons">
                  <button className="customOrderbutton" onClick={() => handleEdit(data.id)}>
                     Order Details </button>
                  <button
                    className="customOrderbutton" 
                    style={{ backgroundColor: "red" }} 
                    onClick={() => handleCancel(data.id)}
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Designtool
