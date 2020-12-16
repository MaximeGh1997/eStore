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
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <NavLink className="navbar-brand" to="/">eStore</NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/">Accueil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/products">Cocktails</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/cart">Mon panier</NavLink>
                    </li>
                    {isAdmin ?
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/lasts-orders">Nouvelles commandes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/orders">Commandes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/products">Produits</NavLink>
                            </li>
                        </>
                    :
                        <>
                        </>
                    }
                </ul>
                {isAuthenticated ?
                    <button className="btn btn-danger text-poppins" onClick={() => handleLogout()}>Déconnexion</button>
                :
                    <></>
                }
            </div>
        </nav>
    )
}

export default Nav