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

    const isEmpty = () => {
        if (cart.length > 0) {
            return false
        } else {
            return true
        }
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
            {isEmpty() ?
                <>
                <div className="empty-cart">
                    <h3 className="text-poppins text-center mb-3">Votre panier est vide</h3>
                    <div className="row justify-content-center">
                        <Link to='/products' className='btn btn-outline-primary'>Voir les cocktails</Link>
                    </div>
                </div>   
                </>
            :
            <>
            <Table borderless variant="custom" className="text-poppins">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th className="text-center">Quantité</th>
                        <th className="text-center">Prix</th>
                        <th className="text-center">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <>
                            <Item
                                item={item}
                                updateItem={updateItem}
                                removeItem={removeItem}
                            />
                        </>
                    ))}
                    <tr>
                        <td colSpan="3">Total panier</td>
                        <td className="text-center">{getTotal()} €</td>
                        <td className="text-center"><Button variant="outline-primary" size="sm" onClick={() => {if(window.confirm('Vider votre panier ?')){clearCart()}}}>Vider mon panier</Button></td>
                    </tr>
                </tbody>
            </Table>
            </>
            }
            </>
        :
            <>
                <div className="shopping" onMouseLeave={() => closeCart()}>
                    <Link to="/cart">
                        <div id="cartBtn" onMouseEnter={() => openCart()}><i className="fas fa-shopping-cart"></i><span>{cart.length}</span></div>
                    </Link>

                       <div className="cart">
                        <div className="command">
                            {isEmpty() ?
                                <div className="empty-msg text-poppins-light">Votre panier est vide</div>
                            :
                                <div className="list">
                                    <Table borderless variant="custom" className="small-cart text-poppins-light">
                                        <thead>
                                            <tr>
                                                <th>Produit</th>
                                                <th className="text-center">Quantité</th>
                                                <th className="text-center">Prix</th>
                                                <th className="text-center">Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(item => (
                                                <>
                                                    <Item
                                                        item={item}
                                                        updateItem={updateItem}
                                                        removeItem={removeItem}
                                                    />
                                                </>
                                            ))}
                                            <tr>
                                                <td colSpan="3">Total panier</td>
                                                <td className="text-center">{getTotal()} €</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div className="row justify-content-center">
                                       <Link to="/cart" className="btn btn-outline-primary">Mon panier</Link> 
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