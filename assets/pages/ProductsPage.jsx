import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import productsAPI from '../services/productsAPI'
import Product from '../components/Product'
import Pagination from '../components/Pagination'
import {toast} from 'react-toastify'
import Rellax from 'rellax'
import Cover from '../uploads/young-happy-couple-drinking-tasty-sweet-cocktails-at-tropical-bar-smiling-and-having-fun-bright-clothes-and-positive-emotions.jpg'

const ProductsPage = (props) => {

    const [products, setProducts] = useState([])

    //pour pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 5

    const {addItem} = useContext(CartContext)

    const fetchProducts = async () => {
        try {
            const data = await productsAPI.findByPage(itemsPerPage, currentPage)
            setProducts(data['hydra:member'])
            setTotalItems(data['hydra:totalItems'])
        } catch (error) {
            toast.error('Impossible de charger les produits, veuillez reéssayer ultèrieurement...')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    useEffect(() => {
        new Rellax('.header', {
            speed: -8,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false  
        })
    }, [])

    const handlePageChange = (page) => {
        setProducts([])
        setCurrentPage(page)
    }

    return (
        <>
        <div className="header">
            <img src={Cover} alt=""/>
        </div>
        <div className="box-content bg-dark">
           <div className="container slide pb-5">
                <div className="d-flex justify-content-start align-items-center">
                    <h1 className="text-poppins-bold mb-5">Nos cocktails</h1>
                </div>
                <div className="row">
                {products.map(product => (
                        <Product
                            key={product.id}
                            product={product}
                            addItem={addItem}
                        />
                    ))} 
                </div>
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={totalItems}
                    onPageChanged={handlePageChange}
                />     
            </div> 
        </div>
        </>
    )
}



export default ProductsPage