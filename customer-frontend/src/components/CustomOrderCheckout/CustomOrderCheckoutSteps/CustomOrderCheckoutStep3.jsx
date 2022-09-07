import { useEffect   } from 'react';
import { useSelector } from "react-redux";
import {useUpdateOrderMutation , useGetDetaildCustomOrderQuery} from '../../../services/customOrderApi'

export const CustomOrderCheckoutStep3 = (props) => {
  const [updateOrder] = useUpdateOrderMutation();
  
  useEffect( async() => {
    const data ={
      id: props.CustomOrder_Id,
      order_Status: "Order Placed",
    }
    const res= await updateOrder(data)
      if(res.isError){
        console.log(res.error.error)
      }
      if(res.data){
         console.log(res.data)
      }  
  
    },[] )
    
    let customOrder = useGetDetaildCustomOrderQuery(props.CustomOrder_Id)

   if (customOrder.isLoading) return <div>Loading....</div>;
   if (customOrder.isError) return <h1>An error occured {response.error.error}</h1>;
     console.log('detaild custom Order', customOrder.data)
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP Three -->  */}
      <div className="checkout-purchase checkout-form">
        <h4>
          Bake & Take Thanks
          <br />
          you for your Order!
        </h4>
        <p>
          We at Bake & Take truly appreciate your business, and we’re so
          grateful for the trust you’ve placed in us. We sincerely hope you are
          satisfied with your purchase. and we’ll do our best to continue to
          give you the kind of service you deserve.
        </p>
        <ul className="checkout-purchase__list">
          <li>
            <span>Order number</span>{customOrder.data.id}
          </li>
          <li>
            <span>Order status</span> Order Placed
          </li>
          <li>
            <span>Payment Statues</span>Awaiting Payment
          </li>
          <li>
            <span>Delivery Date</span> {customOrder.data.order_Delivery_Date}
          </li>
          <li>
            <span>Delivery Time</span> {customOrder.data.order_Delivery_Time}
          </li>
          <li>
            <span>Total Amount</span> {customOrder.data.CustomCake.amount}
          </li>
        </ul>
        
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
