import React, { useContext } from 'react'
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

    return (
        <>
        {props.isOnPage ?
            <>
            {isEmpty() ?
                <>
                <div className="empty-cart">
                    <h3 className="align-self-center">Votre panier est vide</h3>
                </div>
                </>
            :
            <>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <>
                            <Item
                                item={item}
                                key={item}
                                updateItem={updateItem}
                                removeItem={removeItem}
                            />
                        </>
                    ))}
                    <tr>
                        <td>Cart's total</td>
                        <td></td>
                        <td></td>
                        <td>{getTotal()} €</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="primary" onClick={() => {if(window.confirm('Are you sure to clear your cart ?')){clearCart()}}}>Clear cart</Button>
            </>
            }
            </>
        :
            <>
                <div className="shopping">
                    <div id="cartBtn" onClick={() => handleClick()}><i className="fas fa-shopping-basket"></i><span>{cart.length}</span></div>
                
                    <div className="cart">
                        <div className="command">
                            {isEmpty() ?
                                <div>Votre panier est vide</div>
                            :
                                <div className="list">
                                    <Table striped hover>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map(item => (
                                                <>
                                                    <Item
                                                        item={item}
                                                        key={item.product.id}
                                                        updateItem={updateItem}
                                                        removeItem={removeItem}
                                                    />
                                                </>
                                            ))}
                                            <tr>
                                                <td>Cart's total</td>
                                                <td></td>
                                                <td></td>
                                                <td>{getTotal()} €</td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <Button variant="primary" onClick={() => {if(window.confirm('Are you sure to clear your cart ?')){clearCart()}}}>Clear cart</Button>
                                    <Link to="/cart" className="btn btn-primary ml-2">Validate my cart</Link>
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