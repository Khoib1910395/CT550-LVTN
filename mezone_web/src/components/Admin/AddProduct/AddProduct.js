import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, cloudinaryUpload } from "../../../actions/Admin";
import "./AddProduct.css";

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState("Mobiles"); 

  const [product, setProduct] = useState({
    name: "",
    description: "",
    images: [],
    quantity: 0,
    price: 0,
    category: category,
    quality: 100,
  });

  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("file", e.target.files[0], "file");
    cloudinaryUpload(uploadData)
      .then((response) => {
        setImageUrl(response.secure_url);
        setProduct((prevState) => ({
          ...prevState,
          images: [response.secure_url],
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProduct((prevState) => ({
      ...prevState,
      images: [{ imageUrl }],
      category: category, 
    }));
    dispatch(addProduct(product));
    setImageUrl(null);
    setCategory("Mobiles"); 
    setProduct({
      name: "",
      description: "",
      images: [],
      quantity: 0,
      price: 0,
      category: category, 
      quality: 100,
    });
  };

  return (
    <div class="add-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
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
          <label for="description">Description:</label>
          <textarea
            id="description"
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
          <label for="images">Images:</label>
          <input
            type="file"
            id="images"
            onChange={(e) => handleFileUpload(e)}
          />
          {imageUrl && (
            <img className="preview-image" src={imageUrl} alt="preview" />
          )}

        </div>
        <div>
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
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
          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
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
          <label for="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Mobiles">Mobiles</option>
            <option value="Laptops">Essentials</option>
            <option value="Electronics">Electronics</option>
            <option value="Appliances">Appliances</option>
            <option value="Book">Book</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <div>
          <label for="quality">Quality:</label>
          <input
            type="number"
            id="quality"
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