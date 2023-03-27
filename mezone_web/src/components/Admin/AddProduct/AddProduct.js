import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../actions/Admin";
import { CloudinaryContext, Image } from "cloudinary-react";


const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
    quantity: 0,
    price: 0,
    category: "",
    quality: 0,
  });

  const dispatch = useDispatch();
  //      cloud_name: "ct466nlcntt",
  //      api_key: "919823429952228",
  //      api_secret: "u4kXe_RMD3yR6eK19Ii4M7pAiPM"
  // const cloudinary = require("cloudinary").v2;

  const handleImageUpload = async (e) => {
  //   const files = Array.from(e.target.files);

  //   const formData = new FormData();
  //   formData.append("file", files[0]);
  //   formData.append("upload_preset", "g9mbnmjd");

  //   const res = await fetch(
  //     `https://api.cloudinary.com/v1_1/ct466nlcntt/image/upload`,
  //     {
  //       method: "POST",
  //       body: formData,
  //     }
  //   );

  //   const data = await res.json();

  //   setProduct((prevState) => ({
  //     ...prevState,
  //     images: [...prevState.images, data.public_id],
  //   }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    setProduct({
      name: "",
      description: "",
      images: [],
      quantity: 0,
      price: 0,
      category: "",
      quality: 0,
    });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div>
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageUpload} />
          {product.images.map((image, index) => (
            <Image key={index} cloudName="ct466nlcntt" publicId={image} />
          ))}
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                quantity: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                price: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={product.category}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label>Quality:</label>
          <input
            type="number"
            value={product.quality}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                quality: e.target.value,
              }))
            }
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;