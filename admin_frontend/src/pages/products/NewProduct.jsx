import React from "react";
import { useState} from "react";
import {useNavigate } from "react-router-dom";
import {usePostProductMutation } from "../../services/productApi";
import "./newProduct.css";
import { CircularProgress} from "@mui/material";
import { DriveFolderUpload} from "@mui/icons-material";
import { Alert } from '@mui/material';

function NewProduct() {
  const navigate = useNavigate();
  const [server_error, setServerError] = useState({});
  const [success , setSuccess] = useState(false)
  const [postProduct, { isLoading }] = usePostProductMutation();
 
  const [imge, setImge] = useState({
    image1: '', image2: '', image3: '', image4: '',
  });

  const [data, setData] = useState({
      product_Name: '',
      product_isSale: 'Yes',
      product_Price: '',
      product_Stock: '',
      product_Description: '',
      image1: '',
      image2: '',
      image3: '',
      image4: '',
      category_Name: 'Chocolate',
  })
  
  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setData(values => ({ ...values, [name]: value }));
  };

  const handleImage = event => {
    console.log(event.target.files);
    const name = event.target.name;
    const value = event.target.files[0];
    setImge(values => ({ ...values, [name]: value}));
    const objectUrl = URL.createObjectURL(value)
    setData(values => ({ ...values, [name]: objectUrl}));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    let formData = new FormData();
    formData.append('image1', imge.image1);
    formData.append('image2', imge.image2);
    formData.append('image3', imge.image3 );
    formData.append('image4', imge.image4 );
    formData.append('product_Name', data.product_Name);
    formData.append('product_isSale', data.product_isSale);
    formData.append('product_Price', data.product_Price);
    formData.append('product_Stock',  data.product_Stock);
    formData.append(' product_Description', data.product_Description);
    formData.append('category_Name', data.category_Name);
        
    const res = await postProduct(formData)
    
    if (res.error) {
      if (typeof (res.error.data.errors) === 'undefined') {
        alert('A server/network error occurred. ' +'Looks like CORS might be the problem. ' +
        'Sorry about this - we will get it fixed shortly.');
      }
      console.log(typeof (res.error.data.errors))   
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    } 
    
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setSuccess(true)
      setTimeout(function(){ navigate('/admin/products')} , 3000);
      //navigate('/admin/products')
    }
  }
  return (
      <div className="container1">
        <div className="photoContainer">
          <div className="photoGrid">
            <div className="productPhoto"> <img src={data.image1} alt="1" /> 
            <div className="uploadContainer"><DriveFolderUpload sx={{ fontSize: "40px" }}  /> <input type="file" name="image1" onChange={handleImage}/> </div></div>
            <div className="productPhoto"><img src={data.image2} alt="2" />
            <div className="uploadContainer"><DriveFolderUpload sx={{ fontSize: "40px" }}  /> <input type="file" name="image2" onChange={handleImage}/> </div></div>
            <div className="productPhoto"><img src={data.image3} alt="3" /> 
            <div className="uploadContainer"><DriveFolderUpload sx={{ fontSize: "40px" }}  /> <input type="file" name="image3" onChange={handleImage}/> </div></div>
            <div className="productPhoto"><img src={data.image4} alt="4" />
            <div className="uploadContainer"><DriveFolderUpload sx={{ fontSize: "40px" }}  /> <input type="file" name="image4" onChange={handleImage}/> </div></div>
            
          </div>
        </div>
        <div className="dataContainer"><div className="info_data"><div className="name"><h1> Name: {''} {data.product_Name}</h1></div>
            <div className="productInfo "><h3>Sale Status:</h3><span> {data.product_isSale}</span></div>
            <div className="productInfo "><h3> Product Price:</h3><span> Rs. {' '}{data.product_Price}</span></div>
            <div className="productInfo"><h3>Product Stock:</h3><span> {data.product_Stock} </span></div>
            <div className="productInfo "><h3>Product Category:</h3><span> {data.category_Name} {''} Cake </span></div>
            <div className="descript"><h3> Product Description:</h3><p>{data.product_Description}</p></div>
          </div>
        <form className="editProductForm" onSubmit={handleSubmit}>
          <div className="newproductItem">
            <label>Product Name</label>
            <input
              type="text"
              name="product_Name"
              value={data.product_Name || ""}
              onChange={handleChange}
            />
            {server_error.product_Name ? (
              <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.product_Name[0]} </lable>) : ("")}
          </div>
          <div className="newproductItem">
            <label>Product Description</label>
            <input type="text" name="product_Description" 
            value={data.product_Description || ""}
            onChange={handleChange}
             />
            {server_error.product_Name ? (
              <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.product_Name[0]} </lable>) : ("")}
          </div>
          <div className="newproductItem">
            <label>Product Price</label>
            <input type="text"  name="product_Price"
             value={data.product_Price || ""}
            onChange={handleChange}
            />
            {server_error.product_Price ? (
              <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.product_Price[0]}
              </lable>) : ("")}
          </div>
          <div className="newproductItem">
            <label>Product Stock</label>
            <input type="text" name="product_Stock" value={data.product_Stock || ""}
              onChange={handleChange} />
            {server_error.product_Stock ? (
              <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
              {server_error.product_Stock[0]}</lable>) : ("")}
          </div>
          <div className="newproductItem">
            <label>Product Sale Status</label>
            <select className="newProductSelect" name="product_isSale" id="product_isSale" 
            value={data.product_isSale || " "}
            onChange={handleChange} >
              <option value="Yes" >Yes</option>
              <option value= "No">No</option>
            </select>
          </div>
          <div className="btn_con">
          <div className="newproductItem">
            <label>Update Category</label>
            <select className="newProductSelect" name="category_Name" id="category_Name"
            value={data.category_Name || ""}
            onChange={handleChange} required>
              <option value="Chocolate">Chocolate Cake</option>
              <option value="Cupcakes">Cup Cake</option>
              <option value="Aniversary">Aniversary Cake</option>
              <option value="Birthday">Birthday Cake</option>
            </select>
          </div>
          {isLoading ? (<CircularProgress /> ) : (
            <button type="submit" className="btn1">
              Add Product</button>
          )}
          </div>       
        </form>
        {server_error.image1 ? <Alert severity='error'>{ `image1: ${server_error.image1[0]}`}</Alert> : ''} 
        {server_error.image2 ? <Alert severity='error'>{ `image2: ${server_error.image2[0]}`}</Alert> : ''} 
        {server_error.image3 ? <Alert severity='error'>{ `image3: ${server_error.image3[0]}`}</Alert> : ''} 
        {server_error.image4 ? <Alert severity='error'>{ `image4: ${server_error.image4[0]}`}</Alert> : ''} 
        {success? <Alert severity='success'> Product addedd Successfully </Alert> : ''} 
        
      </div>
      </div>
  );
}

export default NewProduct;
