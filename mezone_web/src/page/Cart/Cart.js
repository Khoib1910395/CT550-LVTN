import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addToCart,removeFromCart } from '../../actions/Cart';
import { addToCart2, removeFromCart2} from '../../actions/Cart_upgrade';
import { Link } from 'react-router-dom';
import MessageBox from "../../components/messageBox/MessageBox";
import "./Cart.css"
import CancelIcon from '@material-ui/icons/Cancel';


const Cart = (props) => {

    const productID = props.match.params.id;
    const qty = props.location.search ? 
        Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector((state) => state.userSignin.userInfo?.cart || []);
    const dispatch = useDispatch();

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID,qty));
        }
    }, [dispatch, productID, qty])


    const removeProduct = (id) =>{
        dispatch(removeFromCart2(id));
    }

    const checkOut =() =>{
        props.history.push('/shipping');
    }

    return (
        <div>
            <Link to="/" className="back-res">Back to home</Link>

            <div className="row-container">
                <div className="col-4">
                    <h1>Shopping Cart</h1>
                    {cart.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (   
                        <ul>
                            {
                                cart && cart.map((item)=>(
                                    <li key={item.product.name}>
                                        <div className="row1">
                                            <div className="small">
                                                <img src={item.product.images}
                                                alt= ""
                                                ></img>
                                            </div>

                                            <div className="min-30">
                                                <Link to={`/products/product/${item.product._id}`}>{item.product.name}</Link>
                                            </div>
                                            <div className="qty-select">
                                                <select value={item.quantity} 
                                                onChange={(e) => 
                                                dispatch(addToCart2(item.product,Number(e.target.value)))
                                                }>
                                                {
                                                    [...Array(item.quantity).keys()].map((x)=>(
                                                        <option value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                                </select>
                                            </div>
                                            <p>${item.product.price * item.quantity}</p>
                                            <div className="remove-btn">
                                                <button type="button" onClick={() => removeProduct(item.product._id)}>
                                                    <CancelIcon/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>

                <div className="col-5">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <p>
                                    Subtotal ({cart?.reduce((a, c) => {
                                        return a + c.quantity;
                                    }, 0)} items) : 
                                </p>
                                <p className="price">$ {cart?.reduce((a, c) => a + c.product.price * c.quantity, 0)}</p>
                            </li>
                            <li>
                                <button type="button" onClick={checkOut}
                                className="checkout-btn"
                                disabled={cart?.length === 0 || null}
                                >
                                    Proceed to buy {cart?.length} Item(s)
                                </button>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </div>
        
    )
}

export default Cart
