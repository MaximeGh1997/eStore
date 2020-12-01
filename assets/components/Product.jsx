import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import cartService from '../services/cartService'

const Product = (props) => {

    const [quantity, setQuantity] = useState(0)

    const add = (quantity) => {
        quantity++
        setQuantity(quantity)
    }

    const remove = (quantity) => {
        if (quantity > 0) {
            quantity--
            setQuantity(quantity)
        }
    }

    const handleAddToCart = (id, quantity) => {
        if (quantity > 0) {
            cartService.add(id, quantity)
            setQuantity(0) 
        }
    }

    return (
        <>
        <div className="col-4 mb-3">
            <Card className="h-100">
                <Card.Img variant='top' src={props.product.picture} />
                <Card.Body>
                    <Card.Title>{props.product.name}</Card.Title>
                    <Card.Text>{props.product.description}</Card.Text>
                    <Card.Text>{props.product.price}€</Card.Text>
                </Card.Body>
                <Button variant="primary" onClick={() => remove(quantity)}>-</Button><span>{ quantity }</span><Button variant="primary" onClick={() => add(quantity)}>+</Button>
                <Button variant="primary" onClick={() => handleAddToCart(props.product, quantity)}>Add to cart</Button>
            </Card>
        </div>
        </>
    )
}

export default Product