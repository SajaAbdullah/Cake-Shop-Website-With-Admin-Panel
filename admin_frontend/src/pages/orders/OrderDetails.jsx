import {useParams} from 'react-router-dom';
import {useDetaildOrderQuery}  from '../../services/orderApi'
import {useReactToPrint} from 'react-to-print';
import './orderDetails.css'
import OrderdProducts from './OrderedProducts';
import OrderTrack from './OrderTrack';
import backImg from '../../images/login-form__bg.png';
import { useRef } from 'react';

const OrderDetails = () => {
  const { id } = useParams()
  const responseInfo = useDetaildOrderQuery(id);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Order_Invoice',
  })

  if (responseInfo.isLoading) return <div>Loading....</div>;
  if (responseInfo.isError)
    return <h1>An error occured {responseInfo.error.error}</h1>;

    return (
    <div ref={componentRef} >
      <div className='contain' style={{backgroundImage:`url(${backImg})`}}>
        <div className='detailsTitle'>
          <h1>Order Invoice</h1>
          <button className="printButton" onClick={handlePrint}> Print Invoice</button>
        </div>
        <div>
          <h2 > Order Statues: </h2>
          <div ><OrderTrack data={responseInfo.data}  /></div>
        </div>
        <div className='sectionsHeading1'>
          <h2 > Order Details : </h2>
          <h2 style={{ marginLeft:"28rem" }}> Delivery Address</h2>
        </div>
        <div className='orderDetails'>
          <div className='leftHead'>
            <p className='spani'>Order ID: </p><br/>
            <p className='spani'>Placment Date/Time: </p><br/>
            <p className='spani'>Delivery_Charges: </p><br/>
            <p className='spani'>Total Amount: </p><br/>
            <p className='spani'>Note: </p><br/>
          </div>
          <div className='rightvalue'>
            <p className='spani'>{responseInfo.data.order_Id}</p><br/>
            <p className='spani'>{responseInfo.data.order_Placment_Date} {" "} {responseInfo.data.order_Placment_Time}</p><br/>
            <p className='spani'>  Rs. {' '} {responseInfo.data.delivery_Charges} </p><br/>
            <p className='spani'> Rs. {' '}{responseInfo.data.total_Amount}</p><br/>
            <p className='spani'> {responseInfo.data.note}</p><br/>
          </div>
          <div className='delivrySection'>
            <div className='leftHead'>
            <p className='spani'>Customer: </p><br/>
            <p className='spani'>Phone Number: </p><br/>
            <p className='spani'>Delivery Address: </p><br/>
            <p className='spani'>Delivery Date: </p><br/>
            <p className='spani'>Delivery Time Slot: </p><br/>
            </div>
            <div className='rightvalue'>
            <p className='spani'>{responseInfo.data.customer.first_Name}  {responseInfo.data.customer.last_Name}</p><br/>
            <p className='spani'>{responseInfo.data.customer.phone_Number} .</p><br/>
            <p className='spani'>H: {" "}{responseInfo.data.address.house_Number} , St:  {" "}
            {responseInfo.data.address.street_Number} , Area: {" "}
             {responseInfo.data.address.area} , City: {" "}
             {responseInfo.data.address.city}</p><br/>
            <p className='spani'>{responseInfo.data.order_Delivery_Date} </p><br/>
            <p className='spani'>{responseInfo.data.order_Delivery_Time} </p><br/>
            </div>
          </div>
        </div>
        <div className='sectionsHeading'>
          <h2 > Order Payment: </h2>         
        </div>
        <div className='orderDetails'>
          <div className='leftHead'>
            <p className='spani'>Payment ID: </p><br/>
            <p className='spani'>Payment Status: </p><br/>
          </div>
          <div className='rightvalue'>
            <p className='spani'>{responseInfo.data.payment.payment_Id}</p><br/>
            <p className='spani'>{responseInfo.data.payment.payment_Status}</p><br/>
          </div>
          <div className='delivrySection'>
            <div className='leftHead'>
            <p className='spani'>Payment Type: </p><br/>
            <p className='spani'>Amount Paid: </p><br/>
            </div>
            <div className='rightvalue'>
            <p className='spani'>{responseInfo.data.payment.payment_Type}</p><br/>
            <p className='spani'> Rs. {' '}{responseInfo.data.payment.amount_Paid} </p><br/>
            
          </div>
          </div>
        </div>
        <div className='sectionsHeading'>
          <h2 > Products: </h2>
        </div>
        <div>
          {<OrderdProducts data={id} />}
        </div>
      </div>   
    </div>
  )
}

export default OrderDetails
