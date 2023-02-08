import React from 'react'

import "./Product.css"
import { Link } from 'react-router-dom'


const Product = ({product}) => {

    return (
        
        <div className="product-card" >
            <div className="product-image">
                <img src= {product.images} alt=""/>
            </div>
            <h2>{product.name}</h2>
            <div>
                Quality: {product.quality === 100 ? <span>New</span> : <span>{product.quality}%</span>}
            </div>
            
        </div>
        
    )
}

export default Product
