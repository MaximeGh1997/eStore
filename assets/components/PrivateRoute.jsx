import React, { useContext } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

const PrivateRoute = (props) => {
    const {isAdmin} = useContext(AuthContext)

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