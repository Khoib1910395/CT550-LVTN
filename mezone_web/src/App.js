import './App.css';
import React from 'react'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home';
import SignIn from './page/SignIn/SignIn';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import UserProfile from './page/userProfile/UserProfile';
function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>

          <Route path='/' element={<Home />} ></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          {/* <PrivateRoute path="/profile" element={<UserProfile />}></PrivateRoute> */}
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App