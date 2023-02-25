import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import Rating from '../../components/Rating/Rating';
import "./ProductPage.css"
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { detailsProduct } from '../../actions/Product';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const ProductPage = (props) => {

    const dispatch = useDispatch();
    const productID = props.match.params.id;


    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    console.log(product);


    const [qty, setQty] = useState(1);


    useEffect(() => {
        dispatch(detailsProduct(productID));
    }, [dispatch, productID]);



    const addToCart = () => {
        props.history.push(`/cart/${productID}?qty=${qty}`)
    }

    const SlideSetting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    return (

        <div>
            {loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    (
                        <div>
                            <Link to="/" className="back-res">Back to result</Link>
                            <div className="row">
                                <div className='pd-img'>
                                    <Slider {...SlideSetting} className="slider">
                                        {product.images.map((image) => (
                                            <div key={image}>
                                                <img src={image} alt="product" />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>

                                <div className="col-2">
                                    <ul>
                                        <li className="pd-name">{product.name}</li>

                                        <li className="pd-rating">
                                            <Rating rating={product.ratings?.reduce((acc, cur) => acc + cur.rating, 0) / product.ratings?.length}
                                                numRev={product.ratings.length} />
                                        </li>

                                        <li className="pd-price">${product.price}</li>

                                        <li className="pd-desc">
                                            Description :
                                            <p>{product.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-3">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <p>Total amount</p>
                                                <div className="price">${product.price * qty}</div>
                                            </li>
                                            <li>
                                                <p>Stock</p>
                                                {product.quantity > 10
                                                    ? (<span className="success">In stock</span>)
                                                    : product.quantity < 10 && product.quantity > 0
                                                        ? (<span className="m-success">Hurry! Few in stock</span>)
                                                        : (<span className="error">Out of stock</span>)
                                                }
                                                <div>
                                                    ({product.quantity} products in stock)
                                                </div>
                                            </li>


                                            {
                                                (product.quantity > 0) && (
                                                    <>
                                                        <li>
                                                            <p>Qty</p>
                                                            <div className="qty-select">
                                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                    {
                                                                        [...Array(product.quantity).keys()].map((x) => (
                                                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <button className="add-to-cart" onClick={addToCart}>
                                                                Add to cart
                                                            </button>
                                                        </li>
                                                    </>

                                                )
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }

        </div>

    )


}

export default ProductPage
