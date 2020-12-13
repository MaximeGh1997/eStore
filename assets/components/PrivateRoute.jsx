import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import {toast} from 'react-toastify'

const PrivateRoute = (props) => {
    const {isAdmin} = useContext(AuthContext)

    if (!isAdmin) {
        toast.error('Vous n\'êtes pas autorisé à accéder à cette ressource !')
    }

    return isAdmin ?
    (
        <Route path={props.path} component={props.component}/>
    )
    :
    (
        <Redirect to='/' />
    )
}

export default PrivateRoute