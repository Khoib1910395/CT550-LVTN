import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct, cloudinaryUpload } from "../../../actions/Admin";
import "./EditProduct.css";

const EditProduct = ({ match }) => {
    const productId = match.params.id;
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
    const { product: productDetails } = useSelector((state) => state.productDetails);

    useEffect(() => {
        if (productDetails && productDetails._id === productId) {
            setProduct(productDetails);
            setCategory(productDetails.category);
        } else {
            // Lấy thông tin sản phẩm từ Redux Store
        }
    }, [dispatch, productId, productDetails]);

    const handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('folder', `${product.name}`);
        uploadData.append('file', e.target.files[0], 'file');

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

    const handleSubmit =
        (e) => {
            e.preventDefault();
            dispatch(editProduct(productId, product));
        };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="edit-product">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input type="text" name="name" value={product.name} onChange={handleInputChange} required />
                </div>    <div className="form-group">
                    <label htmlFor="description">Product Description:</label>
                    <textarea name="description" value={product.description} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Product Price:</label>
                    <input type="number" name="price" value={product.price} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Product Quantity:</label>
                    <input type="number" name="quantity" value={product.quantity} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Product Category:</label>
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Mobiles">Mobiles</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="images">Product Images:</label>
                    <input type="file" name="images" onChange={handleFileUpload} />
                </div>

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProduct;