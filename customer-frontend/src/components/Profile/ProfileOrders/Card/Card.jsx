import {useOrderedProductsQuery}  from '../../../../services/orderApi'


export const Card = ({ order, index, onCollapse, active }) => {
  const  orderItems = useOrderedProductsQuery(order.order_Id);
  console.log(orderItems)
  if (orderItems.isLoading) return <div>Loading....</div>;
  if (orderItems.isError) return <h6>An error occured {orderItems.error.error}</h6>;

  
  let activeBar = false;
  if (order.order_Status === "Order Placed") {
    activeBar = false;
  } else if (order.order_Status === "Under Package") {
    activeBar = false;
  } else if (order.order_Status === "On The way to deliver") {
    activeBar = false;
  } else if (order.order_Status === "Delivered") {
    activeBar = true;
  } else if (order.order_Status === "Canceled") {
    activeBar = false;
  }

  return (
    <>
      <div className={`profile-orders__item ${active === index && 'active'}`}>
        <div className='profile-orders__row'>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>date</span>
            <span className='profile-orders__item-date'>{order.order_Placment_Date}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Delivery address</span>
            <span className='profile-orders__item-addr'>H: {" "}{order.address.house_Number} , St:  {" "}
            {order.address.street_Number} , Area: {" "}
             {order.address.area} , City: {" "}
             {order.address.city}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>amount</span>
            <span className='profile-orders__item-price'>Rs. {order.total_Amount}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Status</span>
            <span
              className={`profile-orders__col-${activeBar ? 'delivered' : 'onway'}`}
            >
              {order.order_Status}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className='profile-orders__col-btn'
            ></span>
          </div>
        </div>
        <div className='profile-orders__content'>
          <ul>
            {orderItems.data.map((item, index) => (
              <li key={index}>
                <img src={`http://127.0.0.1:8000${item.product_Id.imageGallery.image1}`} style={{width:"5rem"}} />
                {item.product_Id.product_Name}
                <span>Rs.{item.product_Id.product_Price}</span>
              </li>
            ))}
            <li>
              Payment Methods:
              <span>Cash on Delivery</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
