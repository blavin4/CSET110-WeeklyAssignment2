const cart = document.body.getElementsByClassName("cart-items")[0]

let cartRowTemplate = cart.getElementsByClassName("cart-row")[0].cloneNode(true)
cart.replaceChildren()

let total = document.querySelector(".cart-total-price")

function addToCart(item) {
    let inCart = false
    cart.querySelectorAll(".cart-row").forEach(cartRow => {
        if (item.querySelector(".shop-item-title").innerHTML == cartRow.querySelector(".cart-item-title").innerHTML) {
            inCart = true
            cartRow.querySelector(".cart-quantity-input").value++
            console.log(`${item.querySelector(".shop-item-title").innerHTML} already in cart. Increasing quantity by 1.`)
        }
    })
    if (!inCart) {
        let cartRow = cartRowTemplate.cloneNode(true)
        cartRow.querySelector(".cart-item-image").src = item.querySelector(".shop-item-image").src
        cartRow.querySelector(".cart-item-title").innerHTML = item.querySelector(".shop-item-title").innerHTML
        cartRow.querySelector(".cart-price").innerHTML = item.querySelector(".shop-item-price").innerHTML
        cart.appendChild(cartRow)
        console.log(`${item.querySelector(".shop-item-title").innerHTML} added to cart.`)
    }
    calculateTotal()
}

function calculateTotal() {
    let totalPrice = 0
    cart.querySelectorAll(".cart-row").forEach(cartRow => {
        let price = Number(cartRow.querySelector(".cart-price").innerHTML.replace(/[^0-9.]/g, ""))
        totalPrice += price * cartRow.querySelector(".cart-quantity-input").value
    })
    total.innerHTML = `$${totalPrice.toFixed(2)}`
    console.log(`The total is now ${total.innerHTML}`)
}

function removeItem(item) {
    console.log(`Removed ${item.querySelector(".cart-item-title").innerHTML}`)
    item.remove()
    calculateTotal()
}

function purchase() {
    console.log(`Purchased items for $${total.innerHTML}`)
    cart.replaceChildren()
    calculateTotal()
}