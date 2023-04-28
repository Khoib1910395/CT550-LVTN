import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../actions/Product';
import LoadingBox from '../../loadingBox/LoadingBox';
import { deleteProduct } from '../../../actions/Admin';
import Modal from 'react-modal';
import './AllProduct.css';

function ProductList() {
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    const [updatedProducts, setUpdatedProducts] = useState([]);

    useEffect(() => {
        if (products) {
            setUpdatedProducts(products);
        }
    }, [products]);

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    const handleDelete = (id) => {
        setModalIsOpen(true);
        localStorage.setItem('productIdToDelete', id);
    };

    const confirmDelete = () => {
        const productId = localStorage.getItem('productIdToDelete');
        const filteredProducts = updatedProducts.filter(product => product._id !== productId);
        setUpdatedProducts(filteredProducts);
        dispatch(deleteProduct(productId));
        setModalIsOpen(false);
    };

    // Tính toán danh sách sản phẩm được hiển thị dựa trên số trang và số lượng sản phẩm trên mỗi trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = updatedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Tạo một mảng các trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(updatedProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="product-list">
            {loading ? (
                <div className="product-list__loading"><LoadingBox /></div>
            ) : error ? (
                <div className="product-list__error">{error}</div>
            ) : (
                <>
                    <div className="product-list__select">
                        <span>Show:</span>
                        <select
                            className="product-list__select-box"
                            value={productsPerPage}
                            onChange={(e) => setProductsPerPage(e.target.value)}
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                        <span>products per page</span>
                    </div>
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th className="name">Name</th>
                                <th className="description">Description</th>
                                <th className="picture">Picture</th>
                                <th className="category">Category</th>
                                <th className="price">Price</th>
                                <th className="quality">Quality</th>
                                <th className="quantity">Quantity</th>
                                <th className="Action">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map(product => (
                                <tr key={product._id}>
                                    <td className="name">{product.name}</td>
                                    <td className="description">{product.description}</td>
                                    <td className="picture">
                                        <a href={`products/product/${product._id}`}>
                                            <img src={product.images} alt={product.name} />
                                        </a>  
                                    </td>
                                    <td className="category">{product.category}</td>
                                    <td className="price">${product.price}</td>
                                    <td className="quality">{product.quality}</td>
                                    <td className="quantity">{product.quantity}</td>
                                    <td className="Action">
                                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>
                                            <i className="fas fa-trash-alt">Delete</i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <ul className="page-numbers">
                            {pageNumbers.map(number => (
                                <li key={number} className={currentPage === number ? "active" : null}>
                                    <button onClick={() => setCurrentPage(number)}>{number}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        className="Modal"
                        overlayClassName="Overlay"
                    >
                        <div className="delete-modal">
                            <h2>Are you sure to delete this product?</h2>
                            <div className="delete-modal__btns">
                                <button className="delete-btn" onClick={confirmDelete}>Yes</button>
                                <button className="cancel-btn" onClick={() => setModalIsOpen(false)}>No</button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
}
export default ProductList;