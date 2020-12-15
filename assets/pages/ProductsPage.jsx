import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../contexts/CartContext'
import productsAPI from '../services/productsAPI'
import Product from '../components/Product'
import Pagination from '../components/Pagination'
import {toast} from 'react-toastify'

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

    const handlePageChange = (page) => {
        setProducts([])
        setCurrentPage(page)
    }

    return (
        <>
        <div className="container pt-5 pb-5">
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="title mb-4">Nos cocktails</h1>
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
        </>
    )
}



export default ProductsPage