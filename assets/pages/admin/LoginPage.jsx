import React, {useState, useContext} from 'react'
import Field from '../../components/forms/Field'
import authAPI from '../../services/authAPI'
import AuthContext from '../../contexts/AuthContext'

const LoginPage = (props) => {

    const {isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        const {name, value} = e.currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await authAPI.authenticate(credentials)
            setIsAuthenticated(true)
            if (authAPI.isAdmin()) {
                setIsAdmin(true)
            }
            setError('')
            //toast
        } catch (error) {
            setError('Nom d\'utilisateur ou mot de passe incorrect !')
        }
    }

    const handleLogout = () => {
        authAPI.logout()
        setIsAuthenticated(false)
        setIsAdmin(false)
    }

    return (
        <>
            {isAuthenticated ?
                <div className="row">
                    <div className="col-6 offset-3 mt-5">
                    <h3 className="mb-3">Vous êtes déjà connecté</h3>
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Déconnexion</button>
                </div>
                </div>
            :
                <div className="row">
                    <div className="col-6 offset-3 mt-5">
                        <h3 className="mb-3">Connexion à l'administration</h3>
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
                            />
                            <div className="form-group">
                                <button className="btn btn-success">Connexion</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default LoginPage