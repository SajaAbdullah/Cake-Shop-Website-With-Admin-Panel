import {  useGetUserCustomOrderQuery} from '../../services/customOrderApi'

const getCustomOrder_Id = () => {
  if (typeof window !== "undefined") {
    let CustomOrder_Id = sessionStorage.getItem("CustomOrder_Id");
    return CustomOrder_Id;
  }
  return 0;
};

export const CustomOrderCheckoutOrders = (props) => {
  
  console.log("card id" ,props.CustomOrder_Id)
  let customOrder = useGetUserCustomOrderQuery(props.CustomOrder_Id)

  if (customOrder.isLoading) return <div>Loading....</div>;
  if (customOrder.isError) return <h1>An error occured {response.error.error}</h1>;
  
  
  
  return (
    <>
      <div className="checkout-order">
        <h5>Your Design Cake Order</h5>
        <div className='checkout-order__item'>
          <div className='checkout-order__item-img'>
            <img src={`http://127.0.0.1:8000${customOrder.data.finalProduct.finalProductImg}`} className=' js-img' alt='' />
          </div>
        <div className='checkout-order__item-info'>
          
            <div className='title6'>
            Cake Flavor: <span>{customOrder.data.sponge_Flavor.flavor_name}</span>
            </div>
            <div className='title6'>
            Cake Shape: <span>{customOrder.data.Cake_Shape_layers.cake_shape}</span>
            </div>
            <div className='title6'>
            Cake Layers: <span>{customOrder.data.Cake_Shape_layers.layer_description}</span>
            </div>
            <div className='title6'>
            Cake Icing: <span>{customOrder.data.Icing.decoration_name}</span>
            </div>
            <div className='title6'>
            Msg on Cake: <span>{customOrder.data.msg_on_cake}</span>
            </div>
            <div className='title6'>
            Top Image: <span>{customOrder.data.Top_Img_Decoration.name}</span>
            </div>
            <div className='title6'>
            Special Instruction: <span>{customOrder.data.special_instruction}</span>
            </div>
        </div>
        
      </div>
      <div className="cart-bottom__total-delivery">
          Delivery{" "}
          <span>Rs. 200</span>
        </div>
        <div className="cart-bottom__total-num">
          total:
          <span>{(customOrder.data.amount).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};
