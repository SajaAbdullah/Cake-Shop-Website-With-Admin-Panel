import { useEffect  ,useRef } from 'react';
import { useSelector } from "react-redux";
import {useUpdateOrderMutation} from '../../../services/orderApi'


export const CheckoutStep3 = () => {
  const order = useSelector(state => state.order)
  const [updateOrder] = useUpdateOrderMutation();
  
  useEffect( async() => {
    const data ={
      id: order.id,
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
  console.log('order form stor', order)
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
            <span>Order number</span>{order.id}
          </li>
          <li>
            <span>Order status</span> Order Placed
          </li>
          <li>
            <span>Payment Statues</span>Awaiting Payment
          </li>
          <li>
            <span>Delivery Date</span> {order.order_Delivery_Date}
          </li>
          <li>
            <span>Delivery Time</span> {order.order_Delivery_Time}
          </li>
        </ul>
        
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
