import React from 'react';
import Button from 'react-bootstrap/Button'

const Item = (props) => {
    
    const increase = (item) => {
        if (item.quantity < 15) {
            item.quantity++
            item.total = item.product.price * item.quantity
            props.updateItem(item)  
        }
    }

    const decrease = (item) => {
        if (item.quantity > 1) {
            item.quantity--
            item.total = item.product.price * item.quantity
            props.updateItem(item)
        }
    }

    const remove = (item) => {
        props.removeItem(item)
    }

    return (
        <>
        {props.isOnPage ?
            <>
            <div className="row justify-content-between mb-2 item" key={props.item}>
                <div className="col-9 col-sm-3">
                    <h4 className="text-poppins-bold mb-2">{props.item.product.name}</h4>
                    <div className="align-items-center actions">
                        <i className="fas fa-minus-circle fa-sm" onClick={() => decrease(props.item)}></i>
                        <span className="ml-2 mr-2 text-poppins">{props.item.quantity}</span>
                        <i className="fas fa-plus-circle fa-sm" onClick={() => increase(props.item)}></i>
                    </div>
                </div>
                <div className="col-3 col-sm text-poppins align-self-center text-center"><p className="h5">{props.item.product.price}€</p></div>
                <div className="d-none d-sm-block col text-poppins align-self-center text-center"><p className="h5">{props.item.total}€</p></div>
                <div className="col align-self-center text-left mt-2 text-sm-center mt-sm-0">
                    <button className="btn btn-outline-primary" onClick={() => {if(window.confirm('Supprimer ce produit ?')){remove(props.item)}}}>
                        <i className="fas fa-trash-alt fa-xs"></i>
                    </button>
                </div>
            </div>
            <hr className="mb-3 bg-yellow"/>
            </>
            :
            <>
            <div className="row justify-content-between item" key={props.item}>
                <div className="col-auto mr-2">
                    <p className="text-poppins-bold mb-0">{props.item.product.name} <span className="text-poppins-light"> - {props.item.product.price}€</span></p>
                    <div className="align-items-center actions">
                        <i className="fas fa-minus-circle fa-sm" onClick={() => decrease(props.item)}></i>
                        <span className="ml-2 mr-2 text-poppins">{props.item.quantity}</span>
                        <i className="fas fa-plus-circle fa-sm" onClick={() => increase(props.item)}></i>
                    </div>
                </div>
                <div className="col-auto text-right actions">
                    <i className="fas fa-trash-alt fa-xs" onClick={() => {if(window.confirm('Supprimer ce produit ?')){remove(props.item)}}}></i>
                </div>
            </div>
            <hr className="mb-2 bg-yellow"/>
            </>
        }
        </>
    )
}

export default Item