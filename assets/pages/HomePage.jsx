import React, {useState, useEffect, useContext} from 'react'
import CartContext from '../contexts/CartContext'
import productsAPI from '../services/productsAPI'
import Product from '../components/Product'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'

const HomePage = (props) => {

    const [newProducts, setNewProducts] = useState([])

    const {addItem} = useContext(CartContext)

    const fetchNewProducts = async () => {
        try {
            const data = await productsAPI.findLasts()
            setNewProducts(data)
        } catch (error) {
            toast.warning('Impossible de charger les nouveautées... Rééssayer ultèrieurement')
        }
    }

    useEffect(() => {
        fetchNewProducts()
    }, [])

    return (
        <>
            <div className="h-60 jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Fluid jumbotron</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
            </div>

            <div className="container">
                <div className="row slide">
                    <div className="col-5 align-self-center picture">
                        
                    </div>
                    <div className="col-6 offset-1 align-self-center text-poppins-light font-italic">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis est quos quis dolor tempora modi exercitationem maiores eum autem ad architecto, praesentium itaque laboriosam voluptate doloribus, esse id, iste vitae explicabo aliquam consequuntur! Minus doloremque quaerat rerum sint, consequuntur labore?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum laudantium omnis dolor explicabo non aliquid nisi architecto corrupti rerum saepe!</p>
                    </div>
                </div>

                <h1 className="text-center mb-5 title">Nouveautées</h1>
                <div className="row">
                     {newProducts.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            addItem={addItem}
                        />
                     ))}
                </div>
                <div className="row justify-content-center">
                    <Link to='/products' className='btn btn-outline-primary'>Voir plus</Link>
                </div>
            </div>
        </>
    )
}

export default HomePage