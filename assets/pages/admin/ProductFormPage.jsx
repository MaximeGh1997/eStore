import React, {useState, useEffect} from 'react'
import productsAPI from '../../services/productsAPI'
import Field from '../../components/forms/Field'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const ProductFormPage = ({match, history}) => {

    var {id = 'new'} = match.params

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        picture: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        price: '',
        picture: ''
    })

    const [editing, setEditing] = useState(false)

    const fetchProduct = async (id) => {
        try {
            const {name, description, price, picture} = await productsAPI.find(id)
            setProduct({name, description, price, picture})
        } catch (error) {
            toast.error('Impossible de charger le produit demandé...')
        }
    }

    useEffect(() => {
        if (id !== 'new') {
            fetchProduct(id)
            setEditing(true)
        }
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (editing) {
                await productsAPI.update(id, product)
                toast.success('Le produit à bien été modifié !')
                history.push('/admin/products')
            } else {
                await productsAPI.create(product)
                toast.success('Le produit à bien été enregistré !')
                history.push('/admin/products')
            }
        } catch ({response}) {
            const {violations} = response.data
            if (violations) {
                const formErrors = {}
                violations.forEach(({propertyPath, message}) => {
                    formErrors[propertyPath] = message
                })
                setErrors(formErrors)
            }
            toast.error('Une érreur est survenue... Veuillez rééssayer')
        }
    }

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                {editing ? <h1 className="mb-4">Modification du produit: {product.name}</h1> : <h1 className="mb-4">Ajout d'un produit</h1>}
            </div>
                <form onSubmit={handleSubmit}>
                    <Field
                        type="text"
                        name="name"
                        label="Nom du produit *"
                        placeholder="Nom du produit"
                        error={errors.name}
                        value={product.name}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="number"
                        name="price"
                        label="Prix du produit *"
                        placeholder="Prix du produit"
                        step="any"
                        error={errors.price}
                        value={product.price}
                        onChange={handleChange}
                        required='required'
                    />
                    <Field
                        type="text"
                        name="picture"
                        label="Image du produit"
                        placeholder="Url de l'image"
                        error={errors.picture}
                        value={product.picture}
                        onChange={handleChange}
                    />
                    <div className="form-group">
                        <label htmlFor="description">Description du produit</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Brève description du produit"
                            value={product.description}
                            onChange={handleChange}
                            className={"form-control" + (errors.description && " is-invalid")}
                        >
                        </textarea>
                        {errors.description && (
                            <p className="invalid-feedback">{errors.description}</p>
                        )
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-success mr-2">Enregistrer</button>
                        <Link to="/admin/products" className="btn btn-secondary">Retour aux produits</Link>
                    </div>
                </form>
        </>
    )
}

export default ProductFormPage