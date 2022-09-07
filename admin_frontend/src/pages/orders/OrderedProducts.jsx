import React from 'react'
import {useOrderedProductsQuery}  from '../../services/orderApi'
import './orderedProducts.css'

function OrderdProducts(props) {
  let order_Id= props.data;
  const products = useOrderedProductsQuery(order_Id);
  console.log("Data: ", products.data);
  console.log("Success: ", products.isSuccess);
  if (products.isLoading) return <div>Loading....</div>;
  if (products.isError)
    return <h1>An error occured {products.error.error}</h1>;
  return (
    <div>
      {products.data.map((data, index) => (
        <div key={index}className="productContainer">
          <div className='imagesection'>
            <img src={`http://127.0.0.1:8000${data.product_Id.imageGallery.image1}`} alt="logo" className='imagesection'/>
          </div>
          <div className='productDetails'>
            <div className="headings">
              <h3 className='element'>Product Number </h3>
              <h3 className='element'>Name </h3>
              <h3 className='element'>Price </h3>
              <h3 className='element'>Quantity </h3> 
            </div>
            <div className="data1">
              <h3 className='element'>{data.product_Id.product_Id} </h3>
              <h3 className='element'>{data.product_Id.product_Name} </h3>
              <h3 className='element'>Rs.{data.product_Id.product_Price} </h3>
              <h3 className='element'>{data.quantity} </h3> 
            </div>
          </div>   
        </div>
        ))}
    </div>
  )
}

export default OrderdProducts