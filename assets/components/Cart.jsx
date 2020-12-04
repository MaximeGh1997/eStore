import React, { useState, useEffect, useContext } from 'react'
import cartService from '../services/cartService'
import CartContext from '../contexts/CartContext'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Item from './Item'

const Cart = (props) => {

    const {cart, updateItem, removeItem} = useContext(CartContext)

    const getTotal = () => {
        var cartTotal = 0
        cart.forEach((item) => {
            cartTotal += item.total
        })
        return cartTotal
    }

    return (
        <>
        {props.isOnPage ?
            <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">My cart</h1>
            </div>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <>
                        <Item
                            item={item}
                            key={item.id}
                            updateItem={updateItem}
                            removeItem={removeItem}
                        />
                        </>
                    ))}
                    <tr>
                        <td>Cart's total</td>
                        <td></td>
                    <td>{getTotal()} €</td>
                    </tr>
                </tbody>
            </Table>
            </>
        :
            <>
            
            </>
        }
        </>
    )
}

export default Cart