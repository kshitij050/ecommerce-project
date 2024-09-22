document.addEventListener('DOMContentLoaded', function () {
    // Handle Add to Cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const image = this.getAttribute('data-image');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            addToCart(name, image, price);
        });
    });

    // Handle Buy Now
    document.querySelectorAll('.buy-now').forEach(button => {
        button.addEventListener('click', function () {
            const image = this.getAttribute('data-image');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            buyNow(name, image, price);
        });
    });

    // Search functionality
    document.querySelector('.search-bar').addEventListener('submit', searchProducts);

    // Load cart items on cart page
    if (document.getElementById('cart-items')) {
        loadCartItems();
    }
});

// Set product details to localStorage
function setProductDetails(name, image, price, description) {
    localStorage.setItem('productName', name);
    localStorage.setItem('productImage', image);
    localStorage.setItem('productPrice', price);
    localStorage.setItem('productDescription', description);
}

// Search products
function searchProducts(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Buy Now functionality
function buyNow(name, image, price) {
    alert(`Buy Now: ${name} for ${price}`);
}

// Add to Cart functionality
function addToCart(name, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name, image, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
}

// Load cart items
function loadCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Calculate total price
        totalPrice += parseFloat(item.price.replace('$', ''));
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
}

// Handle grid layout adjustment on resize
window.addEventListener('resize', adjustGridLayout);

function adjustGridLayout() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        const columns = Math.floor(window.innerWidth / 200);
        productGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
}

// Initial grid layout adjustment
adjustGridLayout();
