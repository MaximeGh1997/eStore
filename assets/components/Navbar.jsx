import React from 'react'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import authAPI from '../services/authAPI'
import {toast} from 'react-toastify'

const Nav = (props) => {

    const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin} = useContext(AuthContext)
    
    const handleLogout = () => {
        authAPI.logout()
        setIsAuthenticated(false)
        setIsAdmin(false)
        toast.info('Vous êtes déconnecté')
        props.history.replace('/admin/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">eStore</NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart">My cart</NavLink>
                    </li>
                    {isAdmin ?
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/products">My products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/orders">All orders</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/lasts-orders">Lasts orders</NavLink>
                            </li>
                        </>
                    :
                        <>
                        </>
                    }
                </ul>
                {isAuthenticated ?
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Déconnexion</button>
                :
                    <></>
                }
            </div>
        </nav>
    )
}

export default Nav