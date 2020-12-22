import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Pagination from '../../components/Pagination'
import productsAPI from '../../services/productsAPI'
import moment from 'moment'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import TableLoader from '../../components/loaders/TableLoader'

const ProductsPage = (props) => {

    const [products, setProducts] = useState([])

    //pour pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 15

    const [isLoading, setIsLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const data = await productsAPI.findByPage(itemsPerPage, currentPage)
            setProducts(data['hydra:member'])
            setTotalItems(data['hydra:totalItems'])
            setIsLoading(false)
        } catch (error) {
            toast.error('Impossible de charger les produits, veuillez rééssayer ultèrieurement...')
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [currentPage])

    const handleDelete = async (id, name) => {
        const originalProducts = [...products]
        setProducts(products.filter(product => product.id !== id))

        try {
            await productsAPI.delete(id)
            toast.warning(`Le produit ${name} à bien été supprimé !`)
        } catch (error) {
            toast.error("Une érreur est survenue... Veuillez rééssayer")
            setProducts(originalProducts)
        }
    }

    const handlePageChange = (page) => {
        window.scrollTo({top: 0, behavior: 'smooth' })
        setProducts([])
        setCurrentPage(page)
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à HH:mm')

    return (
        <>
        <div className="slide bg-primary">
            <div className="container pb-5">
                <div className="d-flex justify-content-start align-items-center">
                    <h1 className="text-poppins-bold text-dark mb-4">Administration des produits</h1>
                </div>
                <Link to="/admin/products/new" className="btn btn-success text-poppins mb-3">Ajouter un produit</Link>
                {(!isLoading) ? (
                    <>
                    <div className="table-responsive">
                        <Table borderless striped className="text-poppins mb-3">
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
                                        <td className="row justify-content-center text-center">
                                            <Link to={`/admin/products/${product.id}`} className="btn btn-warning mr-2"><i className="fas fa-edit"></i></Link>
                                            <Button variant="danger" onClick={() => {if(window.confirm('Supprimer ce produit ?')) {handleDelete(product.id, product.name)}}}><i className="fas fa-trash"></i></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                        <Pagination
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            length={totalItems}
                            onPageChanged={handlePageChange}
                        />
                    </>
                ) : (
                    <TableLoader/>
                )}
            </div>  
        </div>
        </>
    )
}

export default ProductsPage