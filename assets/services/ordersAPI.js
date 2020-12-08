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

export default {
    send: send
}