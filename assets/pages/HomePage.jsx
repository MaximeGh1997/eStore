import React, {useState, useEffect, useContext} from 'react'
import CartContext from '../contexts/CartContext'
import productsAPI from '../services/productsAPI'
import Product from '../components/Product'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import Rellax from 'rellax'
import Img from '../uploads/bartender-preparing-cocktail-at-counter.jpg'
import CardLoader from '../components/loaders/CardLoader'

const HomePage = (props) => {

    const [newProducts, setNewProducts] = useState([])

    const {addItem} = useContext(CartContext)

    const [isLoading, setIsLoading] = useState(true)

    const fetchNewProducts = async () => {
        try {
            const data = await productsAPI.findLasts()
            setNewProducts(data)
            setIsLoading(false)
        } catch (error) {
            toast.warning('Impossible de charger les nouveautées... Rééssayer ultèrieurement')
        }
    }

    useEffect(() => {
        fetchNewProducts()
        new Rellax('.jumbotron', {
            speed: -8,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false  
        })
    }, [])

    return (
        <>
            <div className="h-60 jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="text-archivo display-4">DrinkStore</h1>
                    <p className="text-poppins-light lead">Bienvenue sur Drink Store, découvrez nos différents cocktails et passez votre commande en ligne !</p>
                </div>
            </div>

            <div className="box-content bg-dark">
                <div className="container pb-5">
                    <div className="row slide justify-content-md-between">
                        <div className="col-md-6 align-self-center mb-3 mb-md-0">
                            <img className="img-fluid" src={Img} alt=""/>
                        </div>
                        <div className="col-md-5 align-self-center text-center text-md-left mb-5 mb-md-0 p-3 p-md-0">
                            <h1 className="text-poppins-bold mb-3">Qui sommes nous ?</h1>
                            <p className="text-poppins-light font-italic">Drink Store est le fruit d'une expérience ReactJS, parcourez une plateforme web intuitive et mettez à disposition vos produits.</p>
                            <p className="text-poppins-light font-italic">Nous proposons ici une carte de cocktails à commander en ligne, vous recevrez chaque commande et ses informations instantanément</p>
                        </div>
                    </div>

                    <h1 className="text-center mb-5 text-poppins-bold">Nouveautées</h1>
                    <div className="row">
                        {(!isLoading) ? (
                            <>
                                {newProducts.map(product => (
                                    <Product
                                        key={product.id}
                                        product={product}
                                        addItem={addItem}
                                    />
                                ))}
                            </>
                        ) : (
                            <>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                            </>
                        )}
                    </div>
                    <div className="row justify-content-center">
                        <Link to='/products' className='btn btn-outline-primary text-poppins'>Voir plus</Link>
                    </div>
                </div> 
            </div>
        </>
    )
}

export default HomePage