import {useParams} from 'react-router-dom';
import {useGetDetaildCustomOrderQuery}  from '../../../services/customOrderApi'
import {useReactToPrint} from 'react-to-print';
import './customOrderDetails.css'
import OrderTrack from './CustomOrderTrack';
import backImg from '../../../images/login-form__bg.png';
import { useRef } from 'react';

const CustomOrderDetails = () => {
  const { id } = useParams()
  const res = useGetDetaildCustomOrderQuery(id);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Order_Invoice',
  })

  if (res.isLoading) return <div>Loading....</div>;
  if (res.isError)
    return <h1>An error occured {res.error.error}</h1>;

    return (
      <div ref={componentRef}>
        <div
          className="customOrder_container"
          style={{ backgroundImage: `url(${backImg})` }}
        >
          <div className="customOrder_detailsTitle">
            <h1>Order Invoice</h1>
            <button className="customOrder_printButton" onClick={handlePrint}>
              {" "}
              Print Invoice
            </button>
          </div>
          <div>
            <h2> Order Statues: </h2>
            <div>
              <OrderTrack data={res.data} />
            </div>
          </div>
          <div className="customOrder_sectionsHeading1">
            <h2> Order Details : </h2>
            <h2 style={{ marginLeft: "23rem" }}> Delivery Address</h2>
          </div>
          <div className="customOrder_orderDetails">
            <div className="customOrder_leftHead">
              <p className="customOrder_span">Order ID: </p>
              <br />
              <p className="customOrder_span">Placment Date: </p>
              <br />
              <p className="customOrder_span">Placment Date/Time: </p>
              <br />
              <p className="customOrder_span">Delivery_Charges: </p>
              <br />
              <p className="customOrder_span">Total Amount: </p>
              <br />
            </div>
            <div className="customOrder_rightvalue">
              <p className="customOrder_span">{res.data.id}</p>
              <br />
              <p className="customOrder_span">
                {res.data.order_Placment_Date}{" "}
              </p>
              <br />
              <p className="customOrder_span">
                {" "}
                {res.data.order_Placment_Time}
              </p>
              <br />
              <p className="customOrder_span">
                {" "}
                Rs. {res.data.delivery_Charges}{" "}
              </p>
              <br />
              <p className="customOrder_span">
                {" "}
                Rs. {res.data.CustomCake.amount}
              </p>
              <br />
            </div>
            <div className="delivrySection">
              <div className="customOrder_leftHead">
                <p className="customOrder_span">Customer: </p>
                <br />
                <p className="customOrder_span">Phone Number: </p>
                <br />
                <p className="customOrder_span">Delivery Address: </p>
                <br />
                <p className="customOrder_span">Delivery Date: </p>
                <br />
                <p className="customOrder_span">Delivery Time Slot: </p>
                <br />
              </div>
              <div className="customOrder_rightvalue">
                <p className="customOrder_span">
                  {res.data.CustomCake.customer.first_Name}{" "}
                  {res.data.CustomCake.customer.last_Name}
                </p>
                <br />
                <p className="customOrder_span">
                  {res.data.CustomCake.customer.phone_Number} .
                </p>
                <br />
                <p className="customOrder_span">
                  H: {res.data.address.house_Number} , St:{" "}
                  {res.data.address.street_Number} , Area:{" "}
                  {res.data.address.area} , City: {res.data.address.city}
                </p>
                <br />
                <p className="customOrder_span">
                  {res.data.order_Delivery_Date}{" "}
                </p>
                <br />
                <p className="customOrder_span">
                  {res.data.order_Delivery_Time}{" "}
                </p>
                <br />
              </div>
            </div>
          </div>
          <div className="customOrder_sectionsHeading">
            <h2> Order Payment: </h2>
          </div>
          <div className="orderDetails">
            <div className="customOrder_leftHead">
              <p className="customOrder_span">Payment ID: </p>
              <br />
              <p className="customOrder_span">Payment Status: </p>
              <br />
            </div>
            <div className="customOrder_rightvalue">
              <p className="customOrder_span">{res.data.payment.payment_Id}</p>
              <br />
              <p className="customOrder_span">
                {res.data.payment.payment_Status}
              </p>
              <br />
            </div>
            <div className="delivrySection">
              <div className="customOrder_leftHead">
                <p className="customOrder_span">Payment Type: </p>
                <br />
                <p className="customOrder_span">Amount Paid: </p>
                <br />
              </div>
              <div className="customOrder_rightvalue">
                <p className="customOrder_span">
                  {res.data.payment.payment_Type}
                </p>
                <br />
                <p className="customOrder_span">
                  {" "}
                  Rs. {res.data.payment.amount_Paid}{" "}
                </p>
                <br />
              </div>
            </div>
          </div>
          <h2> Cake Design </h2>
          <div className="designCakeProduct">
              <img
                src={`http://127.0.0.1:8000${res.data.CustomCake.finalProduct.finalProductImg}`}
                alt="mainePhoto"
                className="CakeDesign"
              />
            <div>
              <div className="customOrderCakeGrid">
                <h3>Cake Shape: </h3>
                <p className="customOrderCakeinfo">
                  {res.data.CustomCake.Cake_Shape_layers.cake_shape}{" "}
                </p>
              </div>
              <div className="customOrderCakeGrid">
                <h3>Cake Flavor: </h3>
                <p className="customOrderCakeinfo">
                  {res.data.CustomCake.sponge_Flavor.flavor_name}{" "}
                </p>
              </div>
              <div className="customOrderCakeGrid">
                <h3>Cake Layers: </h3>
                <p className="customOrderCakeinfo">
                  {" "}
                  Rs. {res.data.CustomCake.Cake_Shape_layers.layer_description}{" "}
                </p>
              </div>
              <div className="customOrderCakeGrid">
                <h3>Cake Icing: </h3>
                <p className="customOrderCakeinfo">
                  {res.data.CustomCake.Icing.decoration_name}
                </p>
              </div>
              <div className="customOrderCakeGrid">
                <h3>Msg on Cake: </h3>
                <p className="customOrderCakeinfo"> style={{color:`${res.data.msg_color.color_Code}`}}
                  {res.data.CustomCake.msg_on_cake}{" "}
                </p>
              </div>
              <div className="customOrderCakeGrid">
                <h3>Special Instruction: </h3>
                <p className="customOrderCakeinfo">
                  {" "}
                  {res.data.CustomCake.special_instruction}{" "}
                </p>
              </div>
            </div>
            <div>
              <h3>Top Image:</h3>
               <h3>{res.data.CustomCake.Top_Img_Decoration.name}{" "} </h3>
              <img
                src={`http://127.0.0.1:8000${res.data.CustomCake.Top_Img_Decoration.image}`}
                alt="mainePhoto"
                className="Top_Img"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default CustomOrderDetails
