
const cart = []

function add (product, quantity) {
    const total = product.price * quantity
    const item = {
        product: product,
        quantity: quantity,
        total: total
    }
    cart.push(item)
}

function remove (item) {
    cart.splice(cart.indexOf(item), 1)
}

export default {
    cart: cart,
    add: add,
    remove: remove,
}