import React from 'react'
import {Link} from 'react-router-dom'

const Footer = (props) => {


    return (

        <footer className="page-footer font-small teal pt-4 bg-light">
            <div className="container text-center text-md-left text-dark pt-3 pb-3">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase font-weight-bold">Cocktails store</h5>
                        
                        <p className="font-weight-light">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita sapiente sint, nulla, nihil
                        repudiandae commodi voluptatibus corrupti animi sequi aliquid magnam debitis, maxime quam recusandae
                        harum esse fugiat. Itaque, culpa?</p>
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