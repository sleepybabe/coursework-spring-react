import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import Users from './pages/Users'
import Products from './pages/Products'
import Orders from './pages/Orders'
import ErrorPage from './pages/ErrorPage'
import AddUser from './pages/AddUser'
import AddProduct from './pages/AddProduct'
import Menu from './pages/Menu'
import MenuForUsers from './pages/MenuForUsers'
import UserData from './pages/UserData'
import ProductData from './pages/ProductData'
import ShoppingCart from './pages/ShoppingCart'

import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Profile from "./components/authorization/Profile";
import { connect } from "react-redux";

class App extends React.Component {
    render() {

        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/addProduct' element={<AddProduct/>} />
                        <Route path='/addUser' element={<AddUser/>} />
                        <Route path="/users/:id" element={<UserData/>}/>
                        <Route path="/products/:id" element={<ProductData/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="*" element={<ErrorPage/>}/>
                        <Route path="/menu" element={<Menu/>}/>
                        <Route path="/menuForUsers" element={<MenuForUsers/>}/>
                        <Route path="/" element={<MenuForUsers/>}/>
                        <Route path="/shoppingCart" element={<ShoppingCart/>}/>
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route path="/profile" element={<Profile/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);
