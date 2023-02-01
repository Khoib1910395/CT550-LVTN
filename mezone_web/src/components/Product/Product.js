import React from 'react'

import "./Product.css"
import { Link } from 'react-router-dom'


const Product = ({product}) => {

    return (
        
        <div className="product-card" >
            <div className="product-image">
                <img src= {product.image} alt=""/>
            </div>
            <h2>{product.name}</h2>
        </div>
        
    )
}

export default Product