import React,{useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Home.css"
import Product from '../../components/Product/Product'
import { listProducts } from '../../services/Product'
import ProductList from '../../components/ProductList/ProductList';

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    const productList = useSelector( state => state.productList);
    const {loading, error, products} = productList;

    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    }

    const settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 900,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }  
            },
            {
                breakpoint: 680,
                settings: {
                    dots: true,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }  
            },
            
        ]
    }

    return (
        <div className="home-page-container">

            <div className="banner-container">

                <Slider {...settings}>

                    <div className="banners">
                      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/TS/D37847648_Accessories_savingdays_Jan22_Cat_PC_1500.jpg" alt=""/>
                    </div>
                    <div className="banners">
                      <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img2021/Vday/bwl/English.jpg" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/AdvantagePrime/BAU/14thJan/D37196025_IN_WL_AdvantageJustforPrime_Jan_Mob_ingress-banner_1242x450.jpg" alt=""/>
                    </div>
                    <div className="banners">
                        <img src="https://images-na.ssl-images-amazon.com/images/G/31/Symbol/2020/00NEW/1242_450Banners/PL31_copy._CB432483346_.jpg" alt=""/>
                    </div>

                </Slider>
            
            </div>

            <ProductList/>
            
            <div>
                <h2>Deal of day</h2>
                <span> that is zone show deal of day product</span>
            </div>

            <div className="home-product-slider">

                <h2 className="sec-title">More Products</h2>

                <Slider {...settings2}>
                    {products && products.map((product)=>{
                            return(
                                <Product key={product._id} product={product} /> 
                            )
                        })
                    }

                </Slider>
            </div>

        </div>
    )
}

export default Home
