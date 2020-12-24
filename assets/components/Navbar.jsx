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

    const closeMenu = () => {
        const menu = document.getElementById('navbarNav')
        menu.classList.remove('show')
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
            <NavLink className="navbar-brand" to="/">Drink<span>Store</span></NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/" onClick={() => closeMenu()}>Accueil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/products" onClick={() => closeMenu()}>Cocktails</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-poppins" to="/cart" onClick={() => closeMenu()}>Mon panier</NavLink>
                    </li>
                    {isAdmin ?
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/lasts-orders" onClick={() => closeMenu()}>Nouvelles commandes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/orders" onClick={() => closeMenu()}>Commandes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-poppins" to="/admin/products" onClick={() => closeMenu()}>Produits</NavLink>
                            </li>
                        </>
                    :
                        <>
                        </>
                    }
                </ul>
                {isAuthenticated ?
                    <button className="btn btn-danger text-poppins mt-2 mt-md-0" onClick={() => handleLogout()}>Déconnexion</button>
                :
                    <></>
                }
            </div>
        </nav>
    )
}

export default Nav