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


    return (
        <div className="product-list">
            {loading ? (
                <div className="product-list__loading"><LoadingBox /></div>
            ) : error ? (
                <div className="product-list__error">{error}</div>
            ) : (
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
                        {updatedProducts && updatedProducts.map(product => (
                            <tr key={product._id}>
                                <td className="name">{product.name}</td>
                                <td className="description">{product.description}</td>
                                <td className="picture"><img src={product.images[0]} alt='product picture'></img></td>
                                <td className="category">{product.category}</td>
                                <td className="price">${product.price}</td>
                                <td className="quality">{product.quality}</td>
                                <td className='quantity'>{product.quantity}</td>
                                <td className='delete'><button className='buttonAP' onClick={() => handleDelete(product._id)}>Delete</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
            <Modal className='modal' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Xác nhận xoá sản phẩm</h2>
                <p>Bạn có chắc chắn muốn xoá sản phẩm này?</p>
                <div className="modal__buttons">
                    <button className='cancelBtn  buttonAP__can' onClick={() => setModalIsOpen(false)}>Hủy</button>
                    <button className='successBtn buttonAP' onClick={() => confirmDelete()}>Xoá</button>
                </div>
            </Modal>
        </div>
    );
};

export default ProductList;