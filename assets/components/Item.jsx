import React, { useEffect, useState } from 'react';
import cartService from '../services/cartService'
import Button from 'react-bootstrap/Button'

const Item = (props) => {

    const [quantity, setQuantity] = useState(props.item.quantity)
    const [total, setTotal] = useState(props.item.total)
    
    const more = (item, quantity, total) => {
        quantity++
        total = item.product.price * quantity
        setQuantity(quantity)
        setTotal(total)
        item.quantity = quantity
        item.total = total
        props.updateItem(item)
    }

    const less = (item, quantity, total) => {
        if (quantity == 1) {
            quantity--
            setQuantity(quantity)
            props.removeItem(item)
        } else if (quantity > 1) {
            quantity--
            total = item.product.price * quantity
            setQuantity(quantity)
            setTotal(total)
            item.quantity = quantity
            item.total = total
            props.updateItem(item)
        }
    }

    const remove = (item) => {
        props.removeItem(item)
    }

    return (
        <>
        <tr>
            <td>{props.item.product.name}</td>
            <td><Button variant="primary" onClick={() => less(props.item, quantity, total)}>-</Button><Button variant="primary" onClick={() => more(props.item, quantity, total)}>+</Button>{quantity} x {props.item.product.price}€</td>
            <td>{total}€ <Button variant="primary" onClick={() => remove(props.item)}>Delete</Button></td>
        </tr>
        </>
    )
}

export default Item