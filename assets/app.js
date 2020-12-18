/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route, withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartContext from './contexts/CartContext'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cart from './components/Cart'
import AdminLoginPage from './pages/admin/LoginPage'
import authAPI from './services/authAPI'
import AuthContext from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import AdminProductsPage from './pages/admin/ProductsPage'
import AdminProductFormPage from './pages/admin/ProductFormPage'
import AdminOrdersPage from './pages/admin/OrdersPage'
import AdminOrderPage from './pages/admin/OrderPage'
import AdminLastsOrdersPage from './pages/admin/LastsOrdersPage'
import ScrollToTop from './components/ScrollToTop'

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/app.js');
authAPI.setup()

const App = () => {

    // Cart context
    const [cart, setCart] = useState([])
    
    const addItem = (item) => {
        const newCart = [...cart]
        newCart.push(item)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const updateItem = (item) => {
        const newCart = [...cart]
        newCart.item = item
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const removeItem = (item) => {
        const newCart = [...cart]
        newCart.splice(newCart.indexOf(item), 1)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    const clearCart = () => {
        setCart([])
        localStorage.removeItem('cart')
    }

    // Auth context
    const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())
    const [isAdmin, setIsAdmin] = useState(authAPI.isAdmin())

    const authContextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin
    }

    const NavbarWithRouter = withRouter(Navbar)

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    return (
            <AuthContext.Provider value={authContextValue}>
                <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCart }}>
                    <HashRouter>
                        <NavbarWithRouter/>
                            <ScrollToTop/>
                            <Switch>
                                <Route path="/products" component={ProductsPage}/>
                                <Route path="/cart" component={CartPage}/>
                                <Route path="/admin/login" component={AdminLoginPage}/>
                                <PrivateRoute path="/admin/products/:id" component={AdminProductFormPage}/>
                                <PrivateRoute path="/admin/products" component={AdminProductsPage} />
                                <PrivateRoute path="/admin/orders/:id" component={AdminOrderPage} />
                                <PrivateRoute path="/admin/orders" component={AdminOrdersPage} />
                                <PrivateRoute path="/admin/lasts-orders" component={AdminLastsOrdersPage} />
                                <Route path="/" component={HomePage}/>
                            </Switch>
                        <Footer/>
                        <Cart isOnPage = {false} />
                    </HashRouter>
                    <ToastContainer position={toast.POSITION.BOTTOM_LEFT} bodyClassName="text-poppins-light" />
                </CartContext.Provider>
            </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App/>, rootElement)