import { useState } from 'react';
import { DesignOrderCard } from './Card/DesignOrderCard';
import { useSelector } from "react-redux";
import {useGetProfileOrderQuery} from '../../../services/customOrderApi'

export const ProfileDesignOrders = () => {
  
  const user = useSelector(state => state.user)
  
  const [active, setActive] = useState(-1);
  const response = useGetProfileOrderQuery(user.id);
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
          <div className='profile-orders__col'>Date</div>
          <div className='profile-orders__col'>Delivery address</div>
          <div className='profile-orders__col'>amount</div>
          <div className='profile-orders__col'>Status</div>
        </div>
        {orders.map((order, index) => (
          <DesignOrderCard
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
