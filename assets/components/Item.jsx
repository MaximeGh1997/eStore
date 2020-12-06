import React from 'react';
import Button from 'react-bootstrap/Button'

const Item = (props) => {
    
    const increase = (item) => {
        if (item.quantity < 15) {
            item.quantity++
            item.total = item.product.price * item.quantity
            props.updateItem(item)  
        }
    }

    const decrease = (item) => {
        if (item.quantity > 1) {
            item.quantity--
            item.total = item.product.price * item.quantity
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
            <td>
                <Button variant="primary" className="mr-2" onClick={() => decrease(props.item)}>-</Button>
                {props.item.quantity}
                <Button variant="primary" className="ml-2" onClick={() => increase(props.item)}>+</Button>
            </td>
            <td>{props.item.product.price}€</td>
            <td>{props.item.total}€</td>
            <td><Button variant="primary" onClick={() => remove(props.item)}>Delete</Button></td>
        </tr>
        </>
    )
}

export default Item