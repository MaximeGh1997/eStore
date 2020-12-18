import React, {useState, useContext} from 'react'
import Field from '../../components/forms/Field'
import authAPI from '../../services/authAPI'
import AuthContext from '../../contexts/AuthContext'
import {toast} from 'react-toastify'
import Loader from 'react-loader-spinner'

const LoginPage = (props) => {

    const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            await authAPI.authenticate(credentials)
            setIsAuthenticated(true)
            if (authAPI.isAdmin()) {
                setIsAdmin(true)
            }
            toast.success('Vous êtes connecté')
            props.history.push('/admin/lasts-orders')
        } catch (error) {
            setIsLoading(false)
            setError('Verifiez vos informations de connexion')
            toast.error('Nom d\'utilisateur ou mot de passe incorrect !')
        }
    }

    const handleLogout = () => {
        authAPI.logout()
        setIsAuthenticated(false)
        setIsAdmin(false)
        toast.info('Vous êtes déconnecté')
    }

    return (
        <>
        <div className="slide bg-primary">
           <div className="container pb-5">
            {isAuthenticated ?
                <div className="row">
                    <div className="col-6 offset-3 mt-5">
                        <h3 className="text-poppins-bold text-dark text-center mb-3">Vous êtes déjà connecté</h3>
                        <div className="row justify-content-center">
                           <button className="btn btn-danger text-poppins" onClick={() => handleLogout()}>Déconnexion</button> 
                        </div>
                    </div>
                </div>
            :
                <div className="row">
                    <div className="col-6 offset-3 mt-5">
                        <h3 className="text-poppins-bold text-center text-dark mb-3">Connexion à l'administration</h3>
                        <form onSubmit={handleSubmit}>
                            <Field 
                                label="Nom d'utilisateur"
                                name="username"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Votre nom d'utilisateur"
                                error={error}
                            />
                            <Field
                                label="Mot de passe"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                type="password"
                                error={error}
                            />
                            <div className="row justify-content-center form-group">
                                <button className="btn btn-success text-poppins mt-3">Connexion</button>
                            </div>
                            <div className="row justify-content-center">
                                <Loader
                                    visible={isLoading}
                                    type="ThreeDots"
                                    color="#b3b3b3"
                                    height={50}
                                    width={50}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div> 
        </div>
        
        </>
    )
}

export default LoginPage