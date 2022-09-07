import React from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { useGetAllProductQuery } from "../../services/productApi";

function Products() {
  const navigate = useNavigate();
  const response = useGetAllProductQuery();
 
  console.log("Response Information: ", response);
  console.log("Data: ", response.data);
  console.log("Success: ", response.isSuccess);

  if (response.isLoading) return <div>Loading....</div>;
  if (response.isError) return <h1>An error occured {response.error.error}</h1>;
  let arr = (response.data).slice().reverse();
 
  const handleEdit = props => {
    console.log(props)
    navigate(`/admin/product/edit/${props}`);
  };

  const handleNew = () => {
    navigate(`/admin/product/new`);
  };

  return (
    <div>
      <div className="titlediv">
      <h1 style={{ marginBottom: "3rem" }}> Products List </h1>
      <button className="newBtn" onClick={() => handleNew()}> New Product </button>
      </div>
      <div className="productGrid">
        {arr.map((data, index) => (
          <section key={index} className="product">
            <div className="product__photo">
              <div className="photo-container">
                <div className="photo-main">
                  <img
                    src={`http://127.0.0.1:8000${data.imageGallery.image1}`}
                    alt="mainePhoto"
                  />
                </div>
                <div className="photo-album">
                  <ul>
                    <li>
                      <img
                        src={`http://127.0.0.1:8000${data.imageGallery.image2}`}
                        alt="image1"
                      />
                    </li>
                    <li>
                      <img
                        src={`http://127.0.0.1:8000${data.imageGallery.image3}`}
                        alt="image2"
                      />
                    </li>
                    <li>
                      <img
                        src={`http://127.0.0.1:8000${data.imageGallery.image4}`}
                        alt="image3"
                      />
                    </li>
                    <li>
                      <img
                        src={`http://127.0.0.1:8000${data.imageGallery.image1}`}
                        alt="image4"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="product__info">
              <div className="title">
                <h1>{data.product_Name}</h1>
                <span>ID: {data.product_Id}</span>
              </div>
              <div className="dataProduct ">
                <h3>For Sale:</h3>
                <span> {data.product_isSale} </span>
              </div>
              <div className="dataProduct ">
                <h3> Price:</h3>
                <span> {data.product_Price} PKR</span>
              </div>
              <div className="dataProduct">
                <h3>Stock:</h3>
                <span> {data.product_Stock} </span>
              </div>
              <div className="dataProduct ">
                <h3> Category:</h3>
                <span> {data.product_category.category_Name} </span>
              </div>
              <div className="description">
                <h3>Description:</h3>
                <p>{data.product_Description}</p>
              </div>
              <button
                className="buy--btn"
                onClick={() => handleEdit(data.product_Id)}
              >
                Edit Product
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Products;
