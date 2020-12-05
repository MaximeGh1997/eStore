/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React, { useState } from 'react';
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Products from './pages/Products'
import CartContext from './contexts/CartContext'
import CartPage from './pages/CartPage'
import Navbar from './components/Navbar'
import Cart from './components/Cart'

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/app.js');

const App = () => {

    const [cart, setCart] = useState([])

    const addItem = (item) => {
        setCart([...cart, item])
    }

    const updateItem = (item) => {
        const newCart = [...cart]
        newCart.item = item
        setCart(newCart)
    }

    const removeItem = (item) => {
        const newCart = [...cart]
        newCart.splice(newCart.indexOf(item), 1)
        setCart(newCart)
    }

    return (
            <CartContext.Provider value={{ cart, addItem, updateItem, removeItem }}>
                <HashRouter>
                    <Navbar/>
                    <main className="container pt-5 h-100">
                        <Switch>
                            <Route path="/products" component={Products}/>
                            <Route path="/cart" component={CartPage}/>
                        </Switch>
                        <Cart isOnPage = {false} />
                    </main>
                </HashRouter>
            </CartContext.Provider>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App/>, rootElement)