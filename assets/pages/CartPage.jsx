import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import Cart from '../components/Cart'
import Field from '../components/forms/Field'
import ordersAPI from '../services/ordersAPI'

const CartPage = (props) => {

    const {cart, clearCart} = useContext(CartContext)
    
    const [buyer, setBuyer] = useState({
        lastname:'',
        firstname:'',
        email:'',
        phone:'',
        address:'',
        zip:'',
        city:'',
        infos:''
    })

    const [errors, setErrors] = useState({
        lastname:'',
        firstname:'',
        email:'',
        phone:'',
        adress:'',
        zip:'',
        city:''
    })

    const [checked, setChecked] = useState(false)

    const isEmpty = () => {
        if (cart.length > 0) {
            return false
        } else {
            return true
        }
    }

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
            await ordersAPI.send(cart, buyer, checked)
            setBuyer({
                lastname:'',
                firstname:'',
                email:'',
                phone:'',
                address:'',
                zip:'',
                city:'',
                infos:''
            })
            setChecked(false)
            clearCart()
            // toast
        } catch ({response}) {
            if (response.data.type == 'cart_violations') {
                // toast
            }
            else if (response.data.type == 'checked_violations') {
                // toast
            }
            else if(response.data.type == 'buyer_violations') {
                const {errors} = response.data
                const formErrors = []
                errors.forEach(({propertyPath, message}) => {
                    if (!formErrors[propertyPath]) {
                        formErrors[propertyPath] = message
                    }
                })
                setErrors(formErrors)
                // toast
            }
        }
    }

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">My cart</h1>
            </div>
            <Cart isOnPage = {true} />

            {isEmpty() ?
                <></>
            :
            <>
                <div className="d-flex justify-content-start align-items-center">
                    <h1 className="mt-5 mb-3">Send my order</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <Field
                        type="text"
                        name="lastname"
                        label="Nom *"
                        placeholder="Votre nom"
                        error={errors.lastname}
                        value={buyer.lastname}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="firstname"
                        label="Prénom *"
                        placeholder="Votre prénom"
                        error={errors.firstname}
                        value={buyer.firstname}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="email"
                        name="email"
                        label="E-mail *"
                        placeholder="Votre e-mail"
                        error={errors.email}
                        value={buyer.email}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="phone"
                        label="Téléphone *"
                        placeholder="Votre numéro de télephone"
                        error={errors.phone}
                        value={buyer.phone}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="address"
                        label="Adresse *"
                        placeholder="Votre adresse"
                        error={errors.adress}
                        value={buyer.address}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="zip"
                        label="Code postal *"
                        placeholder="Votre code postal"
                        error={errors.zip}
                        value={buyer.zip}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="city"
                        label="Ville *"
                        placeholder="Votre ville"
                        error={errors.city}
                        value={buyer.city}
                        onChange={handleChange}
                        required='required'
                    />
                    <div className="form-group">
                        <label htmlFor="infos">Informations supplémentaire</label>
                        <textarea
                            name="infos"
                            id="infos"
                            placeholder="Votre commentaire"
                            value={buyer.infos}
                            onChange={handleChange}
                            className="form-control"
                        >
                        </textarea>
                    </div>
                    <div className="form-check mb-3">
                        <input type="checkbox" className="form-check-input" id="accept" checked={checked} onChange={() => handleCheckedChange()} />
                        <label className="form-check-label" htmlFor="accept">Je certifie sur l'honneur que les informations ci-dessus sont correctes</label>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success mb-5">Send</button>
                    </div>
                </form>
            </>
            }
        </>
    )
}

export default CartPage