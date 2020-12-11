import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from '../../components/Pagination'
import productsAPI from '../../services/productsAPI'
import moment from 'moment'
import {Link} from 'react-router-dom'

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

    const handleDelete = async (id) => {
        const originalProducts = [...products]
        setProducts(products.filter(product => product.id !== id))

        try {
            await productsAPI.delete(id)
            console.log('Produit supprimé')
            // toast
        } catch (error) {
            console.log(error)
            // toast
            setProducts(originalProducts)
        }
    }

    const handlePageChange = (page) => {
        setProducts([])
        setCurrentPage(page)
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à HH:mm')

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-4">Administration des produits</h1>
            </div>
            <Link to="/admin/products/new" className="btn btn-success mb-2">Ajouter un produit</Link>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nom</th>
                        <th className="text-center">Prix</th>
                        <th className="text-center">Date d'ajout</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td className="text-center">{product.price}€</td>
                            <td className="text-center">{formatDate(product.createdAt)}</td>
                            <td className="text-center">
                                <Link to={`/admin/products/${product.id}`} className="btn btn-warning mr-2"><i className="fas fa-edit"></i></Link>
                                <Button variant="danger" onClick={() => {if(window.confirm('Are you sure to delete this product ?')) {handleDelete(product.id)}}}><i className="fas fa-trash"></i></Button>
                            </td>
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