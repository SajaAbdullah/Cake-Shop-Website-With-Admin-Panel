

export const DesignOrderCard = ({ order, index, onCollapse, active }) => {
  
  let activeBar = false;
  if (order.CustomCake.order_Status === "Order Placed") {
    activeBar = false;
  } else if (order.CustomCake.order_Status === "Under Package") {
    activeBar = false;
  } else if (order.CustomCake.order_Status === "On The way to deliver") {
    activeBar = false;
  } else if (order.CustomCake.order_Status === "Delivered") {
    activeBar = true;
  } else if (order.CustomCake.order_Status === "Canceled") {
    activeBar = false;
  }

  return (
    <>
      <div className={`profile-orders__item ${active === index && 'active'}`}>
        <div className='profile-orders__row'>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Date</span>
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
            <span className='profile-orders__item-price'>Rs. {order.CustomCake.amount}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Status</span>
            <span
              className={`profile-orders__col-${activeBar ? 'delivered' : 'onway'}`}
            >
              {order.CustomCake.order_Status}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className='profile-orders__col-btn'
            ></span>
          </div>
        </div>
        <div className='profile-orders__content'>
          <ul>
              <li key={index}>
                <img src={`http://127.0.0.1:8000${order.CustomCake.finalProduct.finalProductImg}`} style={{width:"5rem"}} />
                <span > {order.CustomCake.Cake_Shape_layers.layer_description} </span>
                <span > {order.CustomCake.sponge_Flavor.flavor_name} </span>
              </li>
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
