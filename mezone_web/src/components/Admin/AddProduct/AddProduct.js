import React, { useState } from 'react';
import axios from '../../../Axios';
import cloudinaryCore from 'cloudinary-core';
import './AddProduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quality, setQuality] = useState('');
  const [category, setCategory] = useState('Mobiles');
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const cloudinary = new cloudinaryCore.Cloudinary({
    cloud_name: 'ct466nlcntt',
    api_key: '919823429952228',
    api_secret: 'u4kXe_RMD3yR6eK19Ii4M7pAiPM',
  });

  const handleProductUpload = async (event) => {
    const files = event.target.files;
    const uploadedImages = [];

    // Create an array of Promises for each file upload
    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'g9mbnmjd');

      return cloudinary.uploader.upload(formData);
    });

    try {
      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      // Extract URLs from the results and add to uploadedImages array
      results.forEach((result) => {
        uploadedImages.push(result.secure_url);
      });

      // Update the state with the uploaded image URLs
      setImageUrls(uploadedImages);
      console.log(uploadedImages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: productName,
      description: description,
      price: price,
      quantity: quantity,
      quality: quality,
      category: category,
      images: images,
    };

    // Set x-auth-token header with admin authentication token
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const authToken = userInfo.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authToken,
      },
    };

    try {
      await axios.post("/admin/add-product", formData, config);
      // show success message or redirect to product list page
    } catch (error) {
      // handle error
    }

  };

  return (
    <div className='addproduct-container'>
      <form onSubmit={handleProductSubmit}>
        <div className='form'>
          {images.length > 0 ? (
            images.map((image) => (
              <img key={image} src={image} alt="Product" height="200" />
            ))
          ) : (
            <div className='form-ip-sec'>
              <label htmlFor="product-images">Select Product Images</label>
              <input
                id="product-images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleProductUpload}
              />
            </div>
          )}
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-name">Product Name</label>
          <input
            id="product-name"
            type="text"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-description">Description</label>
          <textarea
            id="product-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-price">Price</label>
          <input
            id="product-price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-quantity">Quantity</label>
          <input
            id="product-quantity"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-quality">Quality (oldest is 1, New is 100)</label>
          <input
            id="product-quality"
            type="number"
            value={quality}
            onChange={(event) => setQuality
              (event.target.value)}
          />
        </div>
        <div className='form-ip-sec'>
          <label htmlFor="product-category">Category</label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Mobiles">Mobiles</option>
            <option value="Essentials">Essentials</option>
            <option value="Appliances">Appliances</option>
            <option value="Books">Book</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <button className="submit-btn" type="submit">Add Product</button>
      </form>

    </div>

  );
};

export default AddProduct;