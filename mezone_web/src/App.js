import './App.css';
import React, { useEffect } from 'react'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Home from './page/Home/Home';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UserProfile from './page/userProfile/UserProfile';
import UpdateProfile from './page/updateProfile/UpdateProfile';
import BecomeASeller from './page/becomeASeller/BecomeASeller';
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
import OrderDetails from './page/orderDetails/OrderDetails';
import OrderHistory from './page/orderHistory/OrderHistory';
import NotFound from './page/notFound/NotFound';
import Ad from './components/Auction/AuctionPost/AuctionPost';
import DashBoard from './components/Auction/DashBoard/DashBoard'
import AdForm from './components/Auction/AdForm/AdForm';

// Actions
import { loadUser } from './actions/User';
// Redux
import { Provider } from 'react-redux';
import store from './Store';

function App() {

  // Load user
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);


  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact></Route>
            <Route path="/home" component={Home} exact></Route>

            <Route exact path="/signin" component={SignIn}></Route>
            <Route exact path="/signup" component={SignUp}></Route>

            <Route exact path="/auction" component={Auction}></Route>
            <Route path='/auction/ads/:adId' component={Ad} />
            <Route path='/auction/dashboard' component={DashBoard} />
            <Route path='/auction/postad' component={AdForm} />

            <Route path="/products/product/:id" component={ProductPage}></Route>

            <Route path="/usedproduct" component={usedProductPage} exact></Route>
            <Route path="/category/:cat" component={CategoryPage} exact></Route>
            <Route exact path="/cart/:id?" component={Cart}></Route>
            <Route path="/shipping" component={ShippingAddress}></Route>
            <Route path="/payment" component={PaymentMethod}></Route>
            <Route path="/placeorder" component={PlaceOrder}></Route>
            <Route path="/orderhistory" component={OrderHistory}></Route>
            <Route path="/orderDetails/:id" component={OrderDetails}></Route>

            <Route path="/admin" component={AdminScreen}></Route>

            <Route path="/searchresults/:query" component={SearchResults} exact></Route>

            <PrivateRoute exact path="/profile" component={UserProfile} />
            <PrivateRoute exact path="/profile/update" component={UpdateProfile} />
            <PrivateRoute exact path="/profile/sellerform" component={BecomeASeller} />

            <Route component={NotFound} />

          </Switch>
          {/* <Footer /> */}
        </Router>
      </Provider>
    </>
  )
}

export default App