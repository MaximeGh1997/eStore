/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Products from './pages/Products'
import CartContext from './contexts/CartContext'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import LoginPage from './pages/admin/LoginPage'
import authAPI from './services/authAPI'
import AuthContext from './contexts/AuthContext'

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/app.js');

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
    const authContextValue = {
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])

    return (
            <AuthContext.Provider value={authContextValue}>
                <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCart }}>
                    <HashRouter>
                        <Navbar/>
                        <main className="container pt-5 h-100">
                            <Switch>
                                <Route path="/products" component={Products}/>
                                <Route path="/cart" component={CartPage}/>
                                <Route path="/admin" component={LoginPage}/>
                            </Switch>
                            <Cart isOnPage = {false} />
                        </main>
                    </HashRouter>
                </CartContext.Provider>
            </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App/>, rootElement)