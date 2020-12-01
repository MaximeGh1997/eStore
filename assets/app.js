/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Products from './pages/Products'
import Navbar from './components/Navbar'

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Hello Webpack Encore! Edit me in assets/app.js');

const App = () => {

    

    return (
       <HashRouter>
           <Navbar/>
           <main className="container pt-5">
               <Switch>
                   <Route path="/products" component={Products}/>
               </Switch>
           </main>
       </HashRouter>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App/>, rootElement)