import React, {useState, useEffect} from 'react'
import ordersAPI from '../../services/ordersAPI'
import Pagination from '../../components/Pagination'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'

const LastOrdersPage = (props) => {

    const [orders, setOrders] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const itemsPerPage = 10

    const fetchOrders = async () => {
        try {
            const data = await ordersAPI.findLasts(itemsPerPage, currentPage)
            setOrders(data['hydra:member'])
            setTotalItems(data['hydra:totalItems'])
        } catch (error) {
            toast.error('Impossible de charger les commandes, veuillez rééssayer ultèrieurement...')
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [currentPage])

    const handlePageChange = (page) => {
        window.scrollTo({top: 0, behavior: 'smooth' })
        setOrders([])
        setCurrentPage(page)
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à HH:mm')

    const hasOrders = () => {
        if (orders.length > 0){
            return true
        } else {
            return false
        }
    }

    return (
        <>
        <div className="slide bg-primary">
            <div className="container pb-5">
                <div className="d-flex justify-content-start align-items-center">
                    <h1 className="text-poppins-bold text-dark mb-4">Nouvelles commandes</h1>
                </div>
                
                {hasOrders() ?
                <>
                    <Table borderless striped className="text-poppins mb-3">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th className="text-center">Date</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Client</th>
                                <th className="text-center">Tél.</th>
                                <th>Ville</th>
                                <th>Statut</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td className="text-center">{formatDate(order.createdAt)}</td>
                                    <td className="text-center">{order.total}€</td>
                                    <td className="text-center">
                                        {order.deliveryInfos.lastname}
                                        &nbsp;
                                        {order.deliveryInfos.firstname}
                                    </td>
                                    <td className="text-center">{order.deliveryInfos.phone}</td>
                                    <td>{order.deliveryInfos.city}</td>
                                    <td>{order.status}</td>
                                    <td className="text-center">
                                        <Link to={`/admin/orders/${order.id}`} className="btn btn-success"><i className="fas fa-eye"></i></Link>
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
                :
                    <div className="empty-cart">
                        <h3 className="text-poppins-bold text-dark text-center">Pas de nouvelles commandes</h3>
                    </div>
                    
                }
            </div> 
        </div>
        
        </>
    )
}

export default LastOrdersPage