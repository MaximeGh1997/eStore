import React, {useState, useEffect} from 'react'
import ordersAPI from '../../services/ordersAPI'
import moment from 'moment'
import Pagination from '../../components/Pagination'
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Select from '../../components/forms/Select'

const STATUS = [
    {
        name:'inProgress',
        title: 'EN COURS'
    },
    {
        name:'delivered',
        title: 'LIVRER'
    }
]

const OrdersPage = (props) => {
    
    const [orders, setOrders] = useState([])
    const [selectedStatus, setSelectedStatus] = useState('TOUTES')
    const [filteredOrders, setFilteredOrders] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 15

    const fetchOrders = async () => {
        try {
            const data = await ordersAPI.findAll()
            setOrders(data)
            setFilteredOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à HH:mm')

    const handleChange = (e) => {
        const {value} = e.currentTarget
        setSelectedStatus(value)
        setCurrentPage(1)

        if (value == 'ALL') {
            setFilteredOrders(orders)
        } else {
            const filteredOrders = orders.filter(order => order.status == value)
            setFilteredOrders(filteredOrders)
        }
    }

    const paginatedOrders = Pagination.getData(filteredOrders, currentPage, itemsPerPage)

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-4">Administration des commandes</h1>
            </div>
            <Select
                name="status"
                label="Sélectionnez un statut"
                value={selectedStatus}
                onChange={handleChange}
            >
                <>
                    <option value="ALL">TOUTES</option>
                    {STATUS.map(s =>  <option key={s.name} value={s.title}>{s.title}</option> )}
                </>
            </Select>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Total</th>
                        <th className="text-center">Client</th>
                        <th className="text-center">Tél.</th>
                        <th>Ville</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.map(order => (
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
                length={filteredOrders.length}
                onPageChanged={handlePageChange}
            />
        </>
    )
}

export default OrdersPage