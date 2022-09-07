import React  from 'react'
import '../feedbacks/feedbacks.css'
import {useGetAllQuestionQuery}  from '../../services/feedbackApi'
import afatar from "../../images/femaleAfatar.png";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Question() {
  const response = useGetAllQuestionQuery();
  console.log("qdata: ", response.qdata);
  console.log("Success: ", response.isSuccess);

  if (response.isLoading) return <div>Loading....</div>;
  if (response.isError) return <h1>An error occured {response.error.error}</h1>;
  const arr = response.data.slice().reverse();
  return (
    <>
      <div>
        <h1> Customers Questions </h1> 
      </div>
      <div className="reviewsGrid">
        {arr.map((qdata, index) => (
          <div key={index} className="container">
              <div className="col">
                  <img src={afatar} alt="" />
                  <div className="name"> Sender Name: {" "} {qdata.userName} </div>
                  <p className='reviewMsg'>
                    {qdata.email}
                  </p>
                  <p>
                    {qdata.messageDate}
                  </p>
                  <h5>Message</h5>
                  <h5>{qdata.message}</h5>
              </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Question