import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import Cart from '../components/Cart'
import Field from '../components/forms/Field'
import ordersAPI from '../services/ordersAPI'

const CartPage = (props) => {

    const {cart, clearCart} = useContext(CartContext)
    
    const [buyer, setBuyer] = useState({
        lastName:'',
        firstName:'',
        email:'',
        phone:'',
        address:'',
        zip:'',
        city:'',
        infos:''
    })

    const [errors, setErrors] = useState({
        lastName:'',
        firstName:'',
        email:'',
        phone:'',
        address:'',
        zip:'',
        city:''
    })

    const [checked, setChecked] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setBuyer({...buyer, [name]: value})
    }

    const handleCheckedChange = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (checked !== true) {
           return
        }
        try {
            const response = await ordersAPI.send(cart, buyer, checked)
            console.log(response)
            setBuyer({
                lastName:'',
                firstName:'',
                email:'',
                phone:'',
                address:'',
                zip:'',
                city:'',
                infos:''
            })
            setChecked(false)
            clearCart()
        } catch ({response}) {
            console.log(response)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">My cart</h1>
            </div>
            <Cart isOnPage = {true} />

            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mt-5 mb-3">Send my order</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom"
                    placeholder="Votre nom"
                    error={errors.lastName}
                    value={buyer.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Votre prénom"
                    error={errors.firstName}
                    value={buyer.firstName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="E-mail"
                    placeholder="Votre e-mail"
                    error={errors.email}
                    value={buyer.email}
                    onChange={handleChange}
                />
                <Field
                    name="phone"
                    label="Tél."
                    placeholder="Votre numéro de télephone"
                    error={errors.phone}
                    value={buyer.phone}
                    onChange={handleChange}
                />
                <Field
                    name="address"
                    label="Adresse"
                    placeholder="Votre adresse"
                    error={errors.address}
                    value={buyer.address}
                    onChange={handleChange}
                />
                <Field
                    name="zip"
                    label="Code postal"
                    placeholder="Votre code postal"
                    error={errors.zip}
                    value={buyer.zip}
                    onChange={handleChange}
                />
                <Field
                    name="city"
                    label="Ville"
                    placeholder="Votre ville"
                    error={errors.city}
                    value={buyer.city}
                    onChange={handleChange}
                />
                <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="accept" checked={checked} onChange={() => handleCheckedChange()} />
                    <label className="form-check-label" htmlFor="accept">Je certifie sur l'honneur que les informations ci-dessus sont correctes</label>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Send</button>
                </div>
            </form>
        </>
    )
}

export default CartPage