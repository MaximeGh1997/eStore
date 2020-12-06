import React, { useEffect, useState } from 'react'
import Cart from '../components/Cart'

const CartPage = (props) => {
    

    return (
        <>
            <div className="d-flex justify-content-start align-items-center">
                <h1 className="mb-3">My cart</h1>
            </div>
            <Cart isOnPage = {true} />
        </>
    )
}

export default CartPage