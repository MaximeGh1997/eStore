import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Product = (props) => {

    const [quantity, setQuantity] = useState(0)

    const increase = (quantity) => {
        if (quantity < 15) {
            quantity++
            setQuantity(quantity)  
        }
    }

    const decrease = (quantity) => {
        if (quantity > 0) {
            quantity--
            setQuantity(quantity)
        }
    }

    const handleAddToCart = (product, quantity) => {
        if (quantity > 0) {
            const total = product.price * quantity
            const item = {
                product: product,
                quantity: quantity,
                total: total
            }
            props.addItem(item)
            setQuantity(0)
        }
    }

    return (
        <>
        <div className="col-md-6 col-lg-4 mb-5 justify-content-center">
            <div className="product-card">
                <div className="product-img">
                    <img src={props.product.picture} />
                </div>
                
                <h4 className="product-title">{props.product.name}</h4>
                <p className="product-desc">{props.product.description}</p>
                <h5 className="product-price">{props.product.price}€</h5>
                <div className="actions">
                    <div className="row justify-content-center">
                        <Button variant="outline-primary" onClick={() => decrease(quantity)}>-</Button>
                        <span className="align-self-center ml-3 mr-3"> { quantity } </span>
                        <Button variant="outline-primary" onClick={() => increase(quantity)}>+</Button>  
                    </div>
                    <div className="row justify-content-center">
                        <Button variant="outline-primary" className="mt-2" onClick={() => handleAddToCart(props.product, quantity)}>Ajouter au panier</Button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Product