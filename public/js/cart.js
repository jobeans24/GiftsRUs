// Set up the global variables
const cartBtn = document.querySelector('#cart-button');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('.close-cart');
const clearCart = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart-center');  
const cartOverlay = document.querySelector('.cart-overlay'); 
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content'); 
const productsDOM = document.querySelector('.products-center'); 
// cart
let cartArray = [];
// buttons
let buttonsDOM = [];
// Getting the products
class gifts {
    async getGifts() {
        try {
            let result = await fetch('/api/gifts');
            let data = await result.json();
            let gifts = data;
            gifts = gifts.map(item => {
                const { id } = item;
                const { name, price, image } = item;
                return { id, name, price, image };
            });
            return gifts;
        } catch (error) {
            console.log(error);
        }
    }
}
// Display products
class UI {
    displayGifts(gifts) {
        let result = '';
        gifts.forEach(gift => {
            result += `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img src=${gift.image} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${gift.id}>
                        <i class="fas fa-shopping-cart"></i>
                        Add to cart
                    </button>
                </div>
                <h3>${gift.name}</h3>
                <h4>$${gift.price}</h4>
            </article>
            <!-- end of single product -->
            `;
        });
        productsDOM.innerHTML = result;
    }
    getBagButtons() {
        const buttons = [...document.querySelectorAll('.bag-btn')];
        buttonsDOM = buttons;
        buttons.forEach(button => {
            let id = button.dataset.id;
            let inCart = cartArray.find(item => item.id === id);
            if (inCart) {
                button.innerText = 'In Cart';
                button.disabled = true;
            }
            button.addEventListener('click', event => {
                event.target.innerText = 'In Cart';
                event.target.disabled = true;
                // get product from products
                let cartItem = { ...Storage.getGift(id), amount: 1 };
                // add product to the cart
                cartArray = [...cartArray, cartItem];
                // save cart in local storage
                Storage.saveCart(cartArray);
                // set cart values
                this.setCartValues(cartArray);
                // display cart item
                this.addCartItem(cartItem);
                // show the cart
                this.showCart();
            });
        });
    }
    setCartValues(cart) {
        let tempTotal = 0;
        let itemsTotal = 0;
        cart.map(item => {
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
    }
    addCartItem(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <img src=${item.image} alt="product">
            <div>
                <h4>${item.name}</h4>
                <h5>$${item.price}</h5>
                <span class="remove-item" data-id=${item.id}>remove</span>
            </div>
            <div>
                <i class="fas fa-chevron-up" data-id=${item.id}></i>
                <p class="item-amount">${item.amount}</p>
                <i class="fas fa-chevron-down" data-id=${item.id}></i>
            </div>
        `;
        cartContent.appendChild(div);
    }
    showCart() {
        cartOverlay.classList.add('transparentBcg');
        cart.classList.add('showCart');
    }
    setupAPP() {
        cartArray = Storage.getCart();
        this.setCartValues(cartArray);
        this.populateCart(cartArray);
        cartBtn.addEventListener('click', this.showCart);
        closeCart.addEventListener('click', this.hideCart);
    }
    populateCart(cart) {
        cart.forEach(item => this.addCartItem(item));
    }
    hideCart() {
        cartOverlay.classList.remove('transparentBcg');
        cart.classList.remove('showCart');
    }
    cartLogic() {
        clearCart.addEventListener('click', () => {
            this.clearCart();
        });
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);
            } else if (event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;
                let tempItem = cartArray.find(item => item.id === id);
                tempItem.amount = tempItem.amount + 1;
                Storage.saveCart(cartArray);
                this.setCartValues(cartArray);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            } else if (event.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                let tempItem = cartArray.find(item => item.id === id);
                tempItem.amount = tempItem.amount - 1;
                if (tempItem.amount > 0) {
                    Storage.saveCart(cartArray);
                    this.setCartValues(cartArray);
                    lowerAmount.previousElementSibling.innerText = tempItem.amount;
                } else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement);
                    this.removeItem(id);
                }
            }
        });
    }
    clearCart() {
        let cartItems = cartArray.map(item => item.id);
        cartItems.forEach(id => this.removeItem(id));
        while (cartContent.children.length > 0) {
            cartContent.removeChild(cartContent.children[0]);
        }
        this.hideCart();
    }
    removeItem(id) {
        cartArray = cartArray.filter(item => item.id !== id);
        this.setCartValues(cartArray);
        Storage.saveCart(cartArray);
        let button = this.getSingleButton(id);
        button.disabled = false;
        button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
    }
    getSingleButton(id) {
        return buttonsDOM.find(button => button.dataset.id === id);
    }
}
// Local storage
class Storage {
    static saveGifts(gifts) {
        localStorage.setItem('gifts', JSON.stringify(gifts));
    }
    static getGift(id) {
        let gifts = JSON.parse(localStorage.getItem('gifts'));
        return gifts.find(gift => gift.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    static getCart() {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    const gift = new gifts();
    // setup app
    ui.setupAPP();
    // get all products
    gift.getGifts().then(gifts => {
        ui.displayGifts(gifts);
        Storage.saveGifts(gifts);
    }).then(() => {
        ui.getBagButtons();
        ui.cartLogic();
    });
});
