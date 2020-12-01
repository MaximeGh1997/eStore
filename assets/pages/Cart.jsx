import React, { useEffect, useState } from 'react'
import cartService from '../services/cartService'
import Table from 'react-bootstrap/Table'

const CartPage = (props) => {
    
    const [cart, setCart] = useState(cartService.cart)

    return (
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
                <tr>
                    <td>{item.product.name}</td>
                    <td>{item.quantity} x {item.product.price}€</td>
                    <td>{item.total}€</td>
                </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}

export default CartPage