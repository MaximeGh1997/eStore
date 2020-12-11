import React, {useState, useEffect} from 'react'
import ordersAPI from '../../services/ordersAPI'
import moment from 'moment'

const OrderPage = ({match}) => {

    const {id} = match.params

    const [order, setOrder] = useState({})
    const [items, setItems] = useState([])
    const [buyer, setBuyer] = useState([])

    const fetchOrder = async (id) => {
        try {
            const data = await ordersAPI.find(id)
            setOrder(data)
            setItems(data.OrderDetails)
            setBuyer(data.deliveryInfos)
            console.log('order ok')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrder(id)
    }, [id])

    const formatDate = (str) => moment(str).format('DD/MM/YYYY à HH:mm')

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-4">Commande n°{order.id}</h1>
            </div>
            <div className="d-flex justify-content-start align-items-center">
                <h3 className="mb-4">Détail de la commande</h3>
            </div>
            <div className="row">
                <div className="col-6">
                    <p>Status: {order.status}</p>
                    <p>Date: {formatDate(order.createdAt)}</p>
                </div>
                <div className="col-6">
                    {items.map(item => (
                        <>
                            <p key={item.id}>{item.product.name} x {item.quantity} = {item.total}€</p>
                        </>
                    ))}
                    <p>Total: {order.total}€</p>
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center">
                <h3 className="mb-4">Informations sur la commande</h3>
            </div>
            <div className="row">
                <div className="col-12">
                    <p>Client: {buyer.lastname} {buyer.firstname}</p>
                    <p>Téléphone: {buyer.phone}</p>
                    <p>E-mail: {buyer.email}</p>
                </div>
            </div>
        </>
    )
}

export default OrderPage