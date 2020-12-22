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
            <div className="text-center text-md-left">
                <div className="product-img mx-auto mb-3">
                    <img src={props.product.picture} />
                </div>
                <h3 className="text-poppins-bold">{props.product.name}</h3>
                <p className="product-desc text-poppins-light">{props.product.description}</p>
                <h5 className="text-poppins-light">{props.product.price}€</h5>
                <div className="mt-4">
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-primary" onClick={() => decrease(quantity)}>-</button>
                        <span className="align-self-center ml-3 mr-3"> { quantity } </span>
                        <button className="btn btn-outline-primary" onClick={() => increase(quantity)}>+</button> 
                    </div>
                    <div className="row justify-content-center">
                        <button className="btn btn-outline-primary text-poppins mt-3" onClick={() => handleAddToCart(props.product, quantity)}>Ajouter au panier</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Product