import axios from 'axios'

function findByPage (itemsPerPage, currentPage) {
    return axios.get(`http://127.0.0.1:8000/api/products/?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function findAll () {
    return axios.get("http://127.0.0.1:8000/api/products")
                .then(response => response.data['hydra:member'])
}

export default {
    findAll: findAll,
    findByPage : findByPage
}