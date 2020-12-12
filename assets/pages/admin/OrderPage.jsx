import React, {useState, useEffect} from 'react'
import ordersAPI from '../../services/ordersAPI'
import moment from 'moment'
import Table from 'react-bootstrap/Table'

const STATUS = [
    {
        name:'inProgress',
        title: 'EN COURS'
    },
    {
        name:'delivered',
        title: 'Livré'.toUpperCase()
    }
]

const OrderPage = ({match}) => {

    const {id} = match.params

    const [order, setOrder] = useState({})
    const [items, setItems] = useState([])
    const [buyer, setBuyer] = useState([])
    const [status, setStatus] = useState('')

    const fetchOrder = async (id) => {
        try {
            const data = await ordersAPI.find(id)
            setOrder(data)
            setStatus(data.status)
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

    const handleChange = (e) => {
        const {value} = e.currentTarget
        setStatus(value)
    }

    const handleClick = async (id, status) => {
        try {
            await ordersAPI.setStatus(id, status)
        } catch (error) {
            console.log(error)
            // toast
        }
    }

    return (
        <>
            <h1 className="mb-4">Commande n°{order.id}</h1>
            <div className="row justify-content-center">
                <div className="status row col-auto justify-content-between mb-4">
                    <div className="row form-group mr-3">
                        <span className="col-4">Statut:</span>
                        <select name="status" id="status" className="col-8 form-control" value={status} onChange={handleChange}>
                            <>
                            {STATUS.map(s =>  <option key={s.name} value={s.title}>{s.title}</option> )}
                            </> 
                        </select>
                    </div>
                    <button className="btn btn-success ml-3" onClick={() => handleClick(order.id, status)}>Mettre à jour</button>
                </div>
            </div>
            
            <h3 className="mt-2 mb-4">Détail de la commande</h3>
            <Table className="mb-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            {item.product ? <td>{item.product.name}</td> : <td className="font-italic">Produit supprimé</td>}
                            <td>{item.quantity}</td>
                            {item.product ?<td>{item.product.price}€</td> : <td className="font-italic">Produit supprimé</td>}
                            <td>{item.total}€</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total commande: {order.total}€</td>
                    </tr>
                </tbody>
            </Table>
            
            <h3 className="mt-2 mb-5">Informations sur la commande</h3>
                <div className="col-6 offset-3 mt-2">
                    <dl className="row">
                        <dt className="col-sm-3 mb-2"><h5>Date</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{formatDate(order.createdAt)}</h6></dd>

                        <dt className="col-sm-3 mb-2"><h5>Client</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{buyer.lastname} {buyer.firstname}</h6></dd>

                        <dt className="col-sm-3 mb-2"><h5>Téléphone</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{buyer.phone}</h6></dd>

                        <dt className="col-sm-3 mb-2"><h5>E-mail</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{buyer.email}</h6></dd>

                        <dt className="col-sm-3 mb-2"><h5>Adresse</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{buyer.adress}</h6></dd>

                        <dt className="col-sm-3 mb-2"><h5>Ville</h5></dt>
                        <dd className="col-sm-9 text-right mb-2"><h6>{buyer.zip} {buyer.city}</h6></dd>
                    </dl>
                    <h5>Commentaires</h5>
                    {order.infos ?
                        <p>{order.infos}</p>
                    :
                        <p>Pas de commentaire</p>
                    }
                </div>
        </>
    )
}

export default OrderPage