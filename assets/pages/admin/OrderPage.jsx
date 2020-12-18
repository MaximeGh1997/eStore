import React, {useState, useEffect} from 'react'
import ordersAPI from '../../services/ordersAPI'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import {toast} from 'react-toastify'
import Loader from 'react-loader-spinner'

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

    const [isLoading, setIsLoading] = useState(true)
    const [statusLoader, setStatusLoader] = useState(false)

    const fetchOrder = async (id) => {
        try {
            const data = await ordersAPI.find(id)
            setOrder(data)
            setStatus(data.status)
            setItems(data.OrderDetails)
            setBuyer(data.deliveryInfos)
            setIsLoading(false)
        } catch (error) {
            toast.error('Impossible de charger la commande demandée...')
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
        setStatusLoader(true)
        try {
            await ordersAPI.setStatus(id, status)
            setStatusLoader(false)
            toast.success('Le statut à bien été mis à jour !')
        } catch (error) {
            setStatusLoader(false)
            toast.error('Impossible de mettre à jour le statut... Veuillez rééssayer ultèrieurement')
        }
    }

    return (
        <>
        <div className="slide bg-primary text-dark">
           <div className="container pb-5">
            {(!isLoading) ? (
                <>
                    <h1 className="text-poppins-bold mb-4">Commande n°{order.id}</h1>
                    <div className="row justify-content-center">
                        <div className="status row col-auto justify-content-between mb-4">
                            <div className="row form-group mr-3">
                                <span className="text-poppins col-4">Statut:</span>
                                <select name="status" id="status" className="col-8 form-control text-poppins" value={status} onChange={handleChange}>
                                    <>
                                    {STATUS.map(s =>  <option key={s.name} value={s.title}>{s.title}</option> )}
                                    </> 
                                </select>
                            </div>
                            <button className="btn btn-success text-poppins ml-3 mr-3" onClick={() => handleClick(order.id, status)}>Mettre à jour</button>
                            <Loader
                                visible={statusLoader}
                                type="ThreeDots"
                                color="#b3b3b3"
                                height={40}
                                width={40}
                            />
                        </div>
                    </div>
            
                    <h3 className="mt-2 mb-4 text-poppins-bold">Détail de la commande</h3>
                    <Table className="text-poppins mb-5">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Produit</th>
                                <th className="text-center">Quantité</th>
                                <th>Prix</th>
                                <th className="text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <>
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    {item.product ? <td>{item.product.name}</td> : <td className="font-italic">Produit supprimé</td>}
                                    <td className="text-center">{item.quantity}</td>
                                    {item.product ?<td>{item.product.price}€</td> : <td className="font-italic">Produit supprimé</td>}
                                    <td className="text-center">{item.total}€</td>
                                </tr>
                                </>
                            ))}
                            <tr>
                                <td colSpan="4">Total commande</td>
                                <td className="text-center">{order.total}€</td>
                            </tr>
                        </tbody>
                    </Table>
                    
                    <h3 className="mt-2 mb-5 text-poppins-bold">Informations sur la commande</h3>
                        <div className="col-6 offset-3 mt-2 text-poppins">
                            <dl className="row">
                                <dt className="col-sm-3 mb-2"><h5>Date</h5></dt>
                                <dd className="col-sm-9 text-right font-italic mb-2"><h6>{formatDate(order.createdAt)}</h6></dd>

                                <dt className="col-sm-3 mb-2"><h5>Client</h5></dt>
                                <dd className="col-sm-9 text-right font-italic mb-2"><h6>{buyer.lastname} {buyer.firstname}</h6></dd>

                                <dt className="col-sm-3 mb-2"><h5>Téléphone</h5></dt>
                                <dd className="col-sm-9 text-right font-italic mb-2"><h6>{buyer.phone}</h6></dd>

                                <dt className="col-sm-3 mb-2"><h5>E-mail</h5></dt>
                                <dd className="col-sm-9 text-right font-italic  mb-2"><h6>{buyer.email}</h6></dd>

                                <dt className="col-sm-3 mb-2"><h5>Adresse</h5></dt>
                                <dd className="col-sm-9 text-right font-italic mb-2"><h6>{buyer.adress}</h6></dd>

                                <dt className="col-sm-3 mb-2"><h5>Ville</h5></dt>
                                <dd className="col-sm-9 text-right font-italic mb-2"><h6>{buyer.zip} {buyer.city}</h6></dd>
                            </dl>
                            <h5>Commentaires</h5>
                            {order.infos ?
                                <p className="font-italic">{order.infos}</p>
                            :
                                <p className="font-italic">Pas de commentaire</p>
                            }
                        </div>
                </>
            ) : (
                <div className="center-loader">
                    <Loader
                        visible={isLoading}
                        type="Oval"
                        color="#b3b3b3"
                        height={100}
                        width={100}
                    />
                </div>
            )}
            </div> 
        </div>
        </>
    )
}

export default OrderPage