import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../actions/Product';
import LoadingBox from '../../loadingBox/LoadingBox';
import './AllProduct.css'

function ProductList() {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <div className="product-list">
            {loading ? (
                <div className="product-list__loading"><LoadingBox /></div>
            ) : error ? (
                <div className="product-list__error">{error}</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="name">Name</th>
                            <th className="description">Description</th>
                            <th className="picture">Picture</th>
                            <th className="category">Category</th>
                            <th className="price">Price</th>
                            <th className="quality">Quality</th>
                            <th className="quantity">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product._id}>
                                <td className="name">{product.name}</td>
                                <td className="description">{product.description}</td>
                                <td className="picture"><img src={product.images[0]} alt='product picture'></img></td>
                                <td className="category">{product.category}</td>
                                <td className="price">${product.price}</td>
                                <td className="quality">{product.quality}</td>
                                <td className='quantity'>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    );
};

export default ProductList;
