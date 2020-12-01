import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">eStore</NavLink>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink className="nav-link" to="/products">Products</NavLink>
                </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav