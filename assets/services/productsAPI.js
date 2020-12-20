import axios from 'axios'
import {API_URL} from '../config'

function findByPage (itemsPerPage, currentPage) {
    return axios.get(`${API_URL}/products/?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
                .then(response => response.data)
}

function findAll () {
    return axios.get(`${API_URL}/products`)
                .then(response => response.data['hydra:member'])
}

function find (id) {
    return axios.get(`${API_URL}/products/${id}`)
                .then(response => response.data)
}

function deleteProduct (id) {
    return axios.delete(`${API_URL}/products/${id}`)
}

function updateProduct (id, product) {
    return axios.put(`${API_URL}/products/${id}`, product)
}

function createProduct (product) {
    return axios.post(`${API_URL}/products`, product)
}

function findLastsProducts () {
    return axios.get(`${API_URL}/products?order[createdAt]=desc`)
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