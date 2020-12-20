import axios from 'axios'
import jwtDecode from 'jwt-decode'
import {API_URL} from '../config'

function logout () {
    localStorage.removeItem("authToken")
    delete axios.defaults.headers['Authorization']
}

function authenticate (credentials) {
    return axios.post(`${API_URL}/login_check`, credentials)
                .then(response => response.data.token)
                .then(token => {
                    localStorage.setItem("authToken", token)
                    axios.defaults.headers['Authorization']="Bearer " + token
                    return true
                })
}

function setup(){
    const token = localStorage.getItem("authToken")

    if(token){
        const jwtData = jwtDecode(token)
        
        if((jwtData.exp * 1000) > new Date().getTime()){
            axios.defaults.headers["Authorization"]="Bearer " + token
        }
    }
}

function isAuthenticated () {
    const token = localStorage.getItem("authToken")
    if (token) {
        const jwtData = jwtDecode(token)
        if ((jwtData.exp * 1000) > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}

function isAdmin () {
    const token = localStorage.getItem("authToken")
    if (token) {
        const jwtData = jwtDecode(token)
        if ((jwtData.exp * 1000) > new Date().getTime() && jwtData.roles.includes('ROLE_ADMIN')) {
            return true
        }
        return false
    }
    return false
}

export default {
    authenticate: authenticate,
    setup: setup,
    isAuthenticated: isAuthenticated,
    isAdmin: isAdmin,
    logout: logout
}