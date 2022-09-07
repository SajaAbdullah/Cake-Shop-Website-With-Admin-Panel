import orderData from 'data/orders/orders';
import { useState } from 'react';
import { Card } from './Card/Card';
import { useSelector } from "react-redux";
import {useGetOrdersQuery} from '../../../services/orderApi'

export const ProfileOrders = () => {
  const user = useSelector(state => state.user)
  const [active, setActive] = useState(-1);
  const response = useGetOrdersQuery(user.id);
  if (response.isLoading) return <div>Loading....</div>;
  if (response.isError) return <h6>An error occured {response.error.error}</h6>;
  const orders = (response.data).slice().reverse();

  const handleCollapse = (indx) => {
    if (active === indx) {
      setActive(-1);
    } else {
      setActive(indx);
    }
  };
  return (
    <>
      <div className='profile-orders'>
        <div className='profile-orders__row profile-orders__row-head'>
          <div className='profile-orders__col'>date</div>
          <div className='profile-orders__col'>Delivery address</div>
          <div className='profile-orders__col'>amount</div>
          <div className='profile-orders__col'>Status</div>
        </div>
        {orders.map((order, index) => (
          <Card
            key={index}
            index={index}
            onCollapse={handleCollapse}
            order={order}
            active={active}
          />
        ))}
      </div>
    </>
  );
};
