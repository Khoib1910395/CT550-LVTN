import React, {useEffect, useState} from 'react'
import "./UsedProductPage.css"
import { useSelector , useDispatch} from 'react-redux'
import Product from '../../components/Product/Product'
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { usedProduct } from '../../actions/Product'
import PriceCheckBox from '../../components/priceCheckBox/PriceCheckBox'
import {prices} from "../../data/priceRanges";


const UsedProductPage = (props) => {

    const [range, setRange] = useState([0,50000]);
    
    const dispatch = useDispatch();

    const productList = useSelector( state => state.productList);
    const {loading,error,products} = productList;


    useEffect(() => {
        dispatch(usedProduct());
    }, [dispatch])



    const handleFilters = (filters) => {

        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key].id === parseInt(filters, 10)) {
                array = data[key].array;
            }
        }
        setRange(array);
    }



    return (
        <div className="search-page-container">

            <div className="filter-options-container">
                <button className="clear-filter-btn" onClick={() => setRange([0,50000])}>
                    Clear filters
                </button>
                <h3>
                    Filter Price:
                </h3>

                <PriceCheckBox
                list={prices}
                handleFilters = {filters => handleFilters(filters)}
                />
                
            </div>

            <div className="search-page-product-container">
                {loading ? <LoadingBox />
                :
                error ? <MessageBox variant="danger">{error}</MessageBox>
                :
                (
                    <>
                    <h2 className="sec-title">Products under used product category</h2>
                    <div className="search-product-container">

                        {products.filter(product=>
                                product.price <= range[1]
                                && product.price >= range[0]
                            ).map(filteredProduct => (
                                <Product key={filteredProduct._id} product={filteredProduct} />
                            ))
                        }
                    </div>
                    </>
                )
                }

            </div>
        </div>
    )
}

export default UsedProductPage
