import './App.css';
import React from 'react'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Home from './page/Home/Home';
import SignIn from './page/SignIn/SignIn';
import SignUp from './page/SignUp/SignUp';
import AllProducts from './page/admin/AllProducts';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UserProfile from './page/userProfile/UserProfile';
import UpdateProfile from './page/updateProfile/UpdateProfile';
import ProductPage from './page/productPage/ProductPage';
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
          <Route path="/products/product/:id" component={ProductPage}></Route>
          <Switch>
            <PrivateRoute exact path="/profile" component={UserProfile} />
            <PrivateRoute exact path="/profile/update" component={UpdateProfile} />
          </Switch>

          <Route path="/productlist" component={AllProducts}></Route>
        </Switch>

        <Footer />
      </Router>
    </>
  )
}

export default App