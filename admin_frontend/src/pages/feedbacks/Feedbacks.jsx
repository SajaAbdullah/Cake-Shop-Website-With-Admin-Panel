import React ,{useState} from 'react'
import './feedbacks.css'
import {Star} from "@mui/icons-material"; 
import {useGetAllReviewQuery ,useDeleteReviewMutation}  from '../../services/feedbackApi'
import afatar from "../../images/femaleAfatar.png";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Feedbacks() {
    const response = useGetAllReviewQuery();

  console.log("Data: ", response.data);
  console.log("Success: ", response.isSuccess);

  if (response.isLoading) return <div>Loading....</div>;
  if (response.isError) return <h1>An error occured {response.error.error}</h1>;
  const arr = response.data.slice().reverse();
  const ckeckRateing = props => {
    let repeat = [];
    if (props === 20) {
      return (repeat = [1]);
    } else if (props === 40) {
      return (repeat = [1, 1]);
    } else if (props === 60) {
      return (repeat = [1, 1, 1]);
    } else if (props === 80) {
      return (repeat = [1, 1, 1, 1]);
    } else if (props === 100) {
      return (repeat = [1, 1, 1, 1, 1]);
    } else if (props === 0) {
      return (repeat = []);
    }
  };
  
  return (
    <>
      <div>
        <h1> Customers Reviews </h1>
      </div>
      <div className="reviewsGrid">
        {arr.map((data, index) => (
          <div key={index} className="container">
              <div className="col">
                  <img src={afatar} alt="" />
                  <div className="name">{data.customer.first_Name} {" "}{data.customer.last_Name}</div>
                  <div className="stars">
                    {ckeckRateing(data.rating).map((data, index) => (
                      <Star sx={{ color: "#eef163"}} />
                    ))}
                  </div>
                  <p className='reviewMsg'>
                    {data.content}
                  </p>
                  <p>
                    {data.reviewDate}
                  </p>
                  <h5>Product Reviewd</h5>
                  <h5>{data.productReviewed.product_Name}</h5>
              </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Feedbacks