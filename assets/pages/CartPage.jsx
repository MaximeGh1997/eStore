import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import Cart from '../components/Cart'
import Field from '../components/forms/Field'
import ordersAPI from '../services/ordersAPI'
import {toast} from 'react-toastify'
import Loader from 'react-loader-spinner'

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

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setBuyer({...buyer, [name]: value})
    }

    const handleCheckedChange = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (checked !== true) {
            setIsLoading(false)
            toast.error('Veuillez accepter les conditions d\'utilisation !')
            return
        }
        try {
            await ordersAPI.send(cart, buyer, checked)
            clearCart()
            toast.success('Merci pour votre commande ! Elle est désormais enregistrée et en cours de traitement...')
            props.history.push('/products')
        } catch ({response}) {
            if (response.data.type == 'cart_violations') {
                setIsLoading(false)
                toast.error(response.data.title)
            }
            else if (response.data.type == 'checked_violations') {
                setIsLoading(false)
                toast.error(response.data.title)
            }
            else if(response.data.type == 'buyer_violations') {
                setIsLoading(false)
                const {errors} = response.data
                const formErrors = []
                errors.forEach(({propertyPath, message}) => {
                    if (!formErrors[propertyPath]) {
                        formErrors[propertyPath] = message
                    }
                })
                setErrors(formErrors)
                toast.error('Des érreurs dans votre formulaire...')
            }
        }
    }

    return (
        <>
            <div className="container pb-5">
                <h1 className="mb-5 text-poppins-bold">Mon panier</h1>
                <Cart isOnPage = {true} />
            </div>
                {(!cart.length > 0) ?
                    <></>
                :
                <>
                <div className="slide bg-primary">
                    <div className="container">
                        <h1 className="mb-3 text-poppins-bold text-dark">Valider ma commande</h1>
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
                                <label htmlFor="infos" className="text-dark text-poppins">Informations supplémentaires</label>
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
                                <label className="form-check-label text-dark text-poppins" htmlFor="accept">J'accepte les conditions d'utilisation et certifie que mes informations sont correctes</label>
                            </div>
                            <div className="row pl-3">
                                <button type="submit" className="btn btn-success text-poppins-light mr-3 mb-5">Envoyer</button>
                                <Loader
                                    visible={isLoading}
                                    type="ThreeDots"
                                    color="#b3b3b3"
                                    height={40}
                                    width={40}
                                />
                            </div>
                        </form> 
                    </div>
                </div>
                </>
                }
        </>
    )
}

export default CartPage