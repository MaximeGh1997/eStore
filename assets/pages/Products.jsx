import React, { useEffect, useState } from 'react'
import productsAPI from '../services/productsAPI'
import Card from 'react-bootstrap/Card'

const ProductsPage = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const data = await productsAPI.findAll()
            setProducts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">Nos produits</h1>
            </div>
            <div className="row">
               {products.map(product => (
                <div className="col-4 mb-3">
                    <Card className="h-100">
                    <Card.Img variant='top' src={product.picture} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>{product.description}</Card.Text>
                        <Card.Text>{product.price}€</Card.Text>
                    </Card.Body>
                    </Card>
                </div>
                ))} 
            </div>
            
        </>
    )
}



export default ProductsPage