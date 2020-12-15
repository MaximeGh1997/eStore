import axios from 'axios'

function findByPage (itemsPerPage, currentPage) {
    return axios.get(`http://127.0.0.1:8000/api/products/?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function findAll () {
    return axios.get("http://127.0.0.1:8000/api/products")
                .then(response => response.data['hydra:member'])
}

function find (id) {
    return axios.get(`http://127.0.0.1:8000/api/products/${id}`)
                .then(response => response.data)
}

function deleteProduct (id) {
    return axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
}

function updateProduct (id, product) {
    return axios.put(`http://127.0.0.1:8000/api/products/${id}`, product)
}

function createProduct (product) {
    return axios.post("http://127.0.0.1:8000/api/products", product)
}

function findLastsProducts () {
    return axios.get('http://127.0.0.1:8000/api/products?order[createdAt]=desc')
        .then (response => response.data['hydra:member'].slice(0,3))
}

export default {
    findAll: findAll,
    findByPage : findByPage,
    find: find,
    delete: deleteProduct,
    update: updateProduct,
    create: createProduct,
    findLasts: findLastsProducts
}