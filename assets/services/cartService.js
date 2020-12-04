
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

function update (item, quantity, total) {
    item.quantity = quantity
    item.total = total
}

function remove (item) {
    cart.splice(cart.indexOf(item), 1)
    return cart
}

function getTotal (cart) {
    var cartTotal = 0
    cart.forEach((item) => {
        cartTotal += item.total
    })
    return cartTotal
}

export default {
    cart: cart,
    add: add,
    update: update,
    remove: remove,
    getTotal: getTotal
}