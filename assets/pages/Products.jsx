import React, { useEffect, useState, useContext } from 'react'
import ProductContext from '../contexts/ProductContext'
import productsAPI from '../services/productsAPI'
import Product from '../components/Product'

const ProductsPage = (props) => {

    const {products, addItem} = useContext(ProductContext)

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">Our products</h1>
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
            
        </>
    )
}



export default ProductsPage