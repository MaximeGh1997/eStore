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
        <tr key={props.item}>
            <td>{props.item.product.name}</td>
            <td className="row justify-content-center text-center">
                <Button variant="outline-primary" className="mr-1 mr-md-3" size="sm" onClick={() => decrease(props.item)}>-</Button>
                <span>{props.item.quantity}</span>
                <Button variant="outline-primary" className="ml-1 ml-md-3" size="sm" onClick={() => increase(props.item)}>+</Button>
            </td>
            <td className="text-center">{props.item.product.price}€</td>
            <td className="text-center">{props.item.total} €</td>
            <td className="text-center"><Button variant="outline-primary" size="sm" onClick={() => {if(window.confirm('Supprimer ce produit ?')){remove(props.item)}}}>Supprimer</Button></td>
        </tr>
        </>
    )
}

export default Item