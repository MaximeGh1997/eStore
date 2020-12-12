import axios from 'axios'

function send (cart, buyer, checked) {
    let orderData = new FormData()
    orderData.append('cart', JSON.stringify(cart))
    orderData.append('buyer', JSON.stringify(buyer))
    orderData.append('checked', checked)

    return axios.post('http://127.0.0.1:8000/orders/create', orderData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => response.data)
}

function findByPage (itemsPerPage, currentPage) {
    return axios.get(`http://127.0.0.1:8000/api/orders/?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function findAll () {
    return axios.get('http://127.0.0.1:8000/api/orders')
                .then(response => response.data['hydra:member'])
}

function find (id) {
    return axios.get(`http://127.0.0.1:8000/api/orders/${id}`)
                .then(response => response.data)
}

function findLasts (itemsPerPage, currentPage) {
    return axios.get(`http://127.0.0.1:8000/api/orders/?status=EN+COURS&pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function setStatus (id, status) {
    return axios.put(`http://127.0.0.1:8000/api/orders/${id}`, {
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