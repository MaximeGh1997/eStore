import React from 'react'
import {Link} from 'react-router-dom'

const Footer = (props) => {


    return (

        <footer className="page-footer font-small teal pt-4 bg-light">
            <div className="container text-center text-md-left text-dark pt-3 pb-3">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase text-archivo">DrinkStore</h5>
                        
                        <p className="font-weight-light">Drink Store est le fruit d'une expérience ReactJS, offrant a son administrateur une plateforme web intuitive lui permettant de mettre en vente ses produits.</p>
                        <p className="font-weight-light">Ce site est une plateforme commerciale fictive</p>
                    </div>
                
                    <hr className="clearfix w-100 d-md-none pb-3" />
                
                    <div className="col-md-6 mb-md-0 mb-3 text-center">
                        <h5 className="font-weight-bold text-uppercase">Liens</h5>

                        <ul className="list-unstyled">
                        <li>
                            <Link to="/" className="text-dark">Accueil</Link>
                        </li>
                        <li>
                            <Link to="/products" className="text-dark">Cocktails</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="text-dark">Mon panier</Link>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        
            <div className="footer-copyright text-center py-3 bg-dark text-white font-weight-light">© 2020 - created by
                <a href="http://www.maxime-gh.com" target="blank" className="text-white"> Maxime Gh</a>
            </div>
        </footer>

    )
}

export default Footer