import axios from 'axios'
import {API_URL} from '../config'
import {DOMAIN_URL} from '../config'

function send (cart, buyer, checked) {
    let orderData = new FormData()
    orderData.append('cart', JSON.stringify(cart))
    orderData.append('buyer', JSON.stringify(buyer))
    orderData.append('checked', checked)

    return axios.post(`${DOMAIN_URL}/orders/create`, orderData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => response.data)
}

function findByPage (itemsPerPage, currentPage) {
    return axios.get(`${API_URL}/orders/?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function findAll () {
    return axios.get(`${API_URL}/orders`)
                .then(response => response.data['hydra:member'])
}

function find (id) {
    return axios.get(`${API_URL}/orders/${id}`)
                .then(response => response.data)
}

function findLasts (itemsPerPage, currentPage) {
    return axios.get(`${API_URL}/orders/?status=EN+COURS&pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function setStatus (id, status) {
    return axios.put(`${API_URL}/orders/${id}`, {
        status: status
    })
}

export default {
    send: send,
    findByPage: findByPage,
    findAll: findAll,
    find: find,
    findLasts: findLasts,
    setStatus: setStatus
}