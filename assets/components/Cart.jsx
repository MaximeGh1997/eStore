import React, { useContext, useState, useEffect } from 'react'
import CartContext from '../contexts/CartContext'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Item from './Item'
import {Link} from 'react-router-dom'

const Cart = (props) => {

    const {cart, updateItem, removeItem, clearCart} = useContext(CartContext)

    const getTotal = () => {
        var cartTotal = 0
        cart.forEach((item) => {
            cartTotal += item.total
        })
        return cartTotal
    }

    const handleClick = () => {
        const shopping = document.querySelectorAll('.shopping')[0]
        shopping.classList.toggle('open')
    }

    const openCart = () => {
        const shopping = document.querySelectorAll('.shopping')[0]
        shopping.classList.add('open')
    }

    const closeCart = () => {
        const shopping = document.querySelectorAll('.shopping')[0]
        shopping.classList.remove('open')
    }

    return (
        <>
        {props.isOnPage ?
            <>
            {(!cart.length > 0) ?
                <>
                <div className="empty-cart">
                    <h3 className="text-poppins text-center mb-3">Votre panier est vide</h3>
                    <div className="row justify-content-center">
                        <Link to='/products' className='btn btn-outline-primary text-poppins'>Voir les cocktails</Link>
                    </div>
                </div>   
                </>
            :
            <>
            <div className="border border-primary rounded p-5">
                    {cart.map(item => (
                        <>
                            <Item
                                item={item}
                                updateItem={updateItem}
                                removeItem={removeItem}
                                isOnPage={props.isOnPage}
                            />
                        </>
                    ))}
                    <p className="text-poppins-light mt-3 text-right">Total panier : <span className="font-weight-bold">{getTotal()} €</span></p>
                    <button className="btn btn-outline-primary btn-sm text-poppins-light float-right mb-3" onClick={() => {if(window.confirm('Vider votre panier ?')){clearCart()}}}>Vider mon panier</button>             
            </div>
            </>
            }
            </>
        :
            <>
                <div className="shopping" onMouseLeave={() => closeCart()}>
                    <div className="d-none d-md-block" id="cartBtn" onMouseEnter={() => openCart()}>
                        <i className="fas fa-shopping-cart"></i>
                        <span>{cart.length}</span>
                    </div>
                    <Link to="/cart">
                        <div className="d-block d-md-none" id="cartBtn"><i className="fas fa-shopping-cart"></i><span>{cart.length}</span></div>
                    </Link>

                    <div className="cart">
                        <div className="command">
                            {(!cart.length > 0) ?
                                <span className="text-poppins-light border border-primary rounded p-2">Votre panier est vide</span>
                            :
                                <div className="list">
                                    <div className="border border-primary rounded p-3">
                                        {cart.map(item => (
                                            <>
                                                <Item
                                                    item={item}
                                                    updateItem={updateItem}
                                                    removeItem={removeItem}
                                                    isOnPage={props.isOnPage}
                                                />
                                            </>
                                        ))}
                                        <p className="text-poppins-light mt-3 text-right">Total panier : <span className="font-weight-bold">{getTotal()} €</span></p>         
                                    </div>
                                    <div className="row justify-content-center mt-2">
                                       <Link to="/cart" className="btn btn-sm btn-outline-primary text-poppins">Mon panier</Link> 
                                    </div>
                                </div>
                            }
                        </div>
                    </div> 
                </div>
            </>
        }
        </>
    )
}

export default Cart