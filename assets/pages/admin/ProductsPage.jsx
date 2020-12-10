import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from '../../components/Pagination'
import productsAPI from '../../services/productsAPI'

const ProductsPage = (props) => {

    const [products, setProducts] = useState([])

    //pour pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 15

    const fetchProducts = async () => {
        try {
            const data = await productsAPI.findByPage(itemsPerPage, currentPage)
            setProducts(data['hydra:member'])
            setTotalItems(data['hydra:totalItems'])
        } catch (error) {
            console.log(error)
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
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-4">Administration des produits</h1>
            </div>
            <Button variant="success" className="mb-3">Ajouter un produit</Button>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Date d'ajout</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}€</td>
                            <td>{product.createdAt}</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
    )
}

export default ProductsPage