import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { getToken } from '../../../services/LocalStorageService';
import {usePostReviewMutation} from '../../../services/feedbackApi'


export const ReviewFrom = (props) => {
  const [rating, setRating] = useState(0);
  const [postReview] = usePostReviewMutation(); 
  const [success , setSuccess] = useState(false)
  const [server_error, setServerError] = useState({})
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      userName: data.get('userName'),
      content: data.get('content'),
      rating: rating,
      product:props.data,
    }
    console.log("data " , actualData)
    const res = await postReview(actualData)

    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setSuccess(true)
    }
  }
  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    console.log(rating)
  };
  return (
    <>
      {/* <!-- Product Review Form --> */}
      <div className='product-detail__form post-comment__form'>
        <div className='subscribe-form__img'>
          <img src='/assets/img/subscribe-img.png' />
        </div>
        <form  onSubmit={handleSubmit}>
          <h4>leave a review</h4>
          <p>We Appreciate your Kindness.</p>
          <div className='rating' data-id='rating_1'>
            <Rating
              onClick={handleRating}
              ratingValue={rating}
              fillColor='#cfc819'
              size='20px'
              emptyColor='#fff'
            />
          </div>
          <div className='box-field'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your name'
              name='userName'
            />
            {server_error.name ? (
              <lable style={{ fontSize: 16, color: "red", paddingTop: 10 }}>
                {server_error.name[0]} </lable>) : ("")}
          </div>
          <div className='box-field'>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
              name='email'
            />
            {server_error.non_user_errors ? (
              <lable style={{ fontSize: 16, color: "red", paddingTop: 10 }}>
                {server_error.non_user_errors[0]} </lable>) : ("")}
          </div> 
          <div className='box-field box-field__textarea'>
            <textarea
              className='form-control'
              placeholder='Enter your review'
              name='content'
            ></textarea>
            {server_error.content ? (
              <lable style={{ fontSize: 16, color: "red", paddingTop: 10 }}>
                {server_error.content[0]} </lable>) : ("")}
          </div>
          <button type='submit' className='btn'>
            send
          </button>
        </form>
        <div style={{marginTop:"1.5rem"}}>  
          {success? <label style={{fontSize: 16,  paddingTop: 10 , color:'#450920'}}> Thank You for your Review </label > : ''}
        </div>
        
      </div>
    </>
  );
};
