import './App.css';
import React from 'react'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Home from './page/Home/Home';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import AllProducts from './page/admin/AllProducts/AllProducts';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UserProfile from './page/userProfile/UserProfile';
import UpdateProfile from './page/updateProfile/UpdateProfile';
import ProductPage from './page/productPage/ProductPage';
import CategoryPage from './page/CategoryPage/CategoryPage';
import Auction from './page/auction/Auction';
import SearchResults from './page/searchResults/SearchResults';
import usedProductPage from './page/usedProductPage/UsedProductPage';
import Cart from './page/Cart/Cart';
import ShippingAddress from './page/shippingAddress/ShippingAddress';
import PaymentMethod from './page/paymentMethod/PaymentMethod';
import PlaceOrder from './page/placeOrder/PlaceOrder';
import AdminScreen from './page/admin/adminScreen/AdminScreen';
import AddProduct from './page/admin/AddProduct/AddProduct';
import OrderDetails from './page/orderDetails/OrderDetails';
import OrderHistory from './page/orderHistory/OrderHistory';
function App() {
  return (
    <>
      <Router>
        <Header />

        <Switch>
          <Route path="/" component={Home} exact></Route>
          <Route path="/home" component={Home} exact></Route>
          
          <Route exact path="/signin" component={SignIn}></Route>
          <Route exact path="/signup" component={SignUp}></Route>
          <Route exact path="/auction" component={Auction}></Route>
          <Route path="/products/product/:id" component={ProductPage}></Route>
          
          <Route path="/usedproduct" component={usedProductPage} exact></Route>
          <Route path="/category/:cat" component={CategoryPage} exact></Route>
          <Route exact path="/cart/:id?" component={Cart}></Route>
          <Route path="/shipping" component={ShippingAddress}></Route>
          <Route path="/payment" component={PaymentMethod}></Route>
          <Route path="/placeorder" component={PlaceOrder}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <Route path="/orderDetails/:id" component={OrderDetails}></Route>

          <Route path="/productlist" component={AllProducts}></Route>
          <Route path="/admin" component={AdminScreen}></Route>
          <Route path="/addproduct" component={AddProduct}></Route>

          <Route path="/searchresults/:query" component={SearchResults} exact></Route>
          <Switch>
            <PrivateRoute exact path="/profile" component={UserProfile} />
            <PrivateRoute exact path="/profile/update" component={UpdateProfile} />
          </Switch>
          
          
          
        </Switch>

        <Footer />
      </Router>
    </>
  )
}

export default App