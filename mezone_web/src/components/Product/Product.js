import React from 'react'

import "./Product.css"
import { Link } from 'react-router-dom'


const Product = ({product}) => {

    return (
        <Link to={`/products/product/${product._id}`}>
        <div className="product-card" >
            <div className="product-image">
                <img src= {product.images[0]} alt=""/>
            </div>
            <h2>{product.name}</h2>
            <div>
                Quality: {product.quality === 100 ? <span><b>New</b></span> : <span>{product.quality}%</span>}
            </div>
            <div>Price: $<b>{product.price}</b></div>
        </div>
        </Link>
    )
}

export default Product
