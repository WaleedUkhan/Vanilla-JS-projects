// script.js

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutFormContainer = document.getElementById('checkout-form-container');
    const checkoutForm = document.getElementById('checkout-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    let cart = [];
    let totalPrice = 0;

    // Function to display products dynamically
    function displayProducts() {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;

            productGrid.appendChild(productCard);
        });
    }

    // Function to add item to the cart
    function addToCart(productId) {
        const product = products.find(p => p.id === parseInt(productId));
        
        const cartItem = cart.find(item => item.id === product.id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        updateCartDisplay();
    }

    // Function to update cart display
    function updateCartDisplay() {
        cartItems.innerHTML = '';
        totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity}
                <button class="increase-quantity" data-id="${item.id}">+</button>
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Function to increase quantity
    function increaseQuantity(productId) {
        const cartItem = cart.find(item => item.id === parseInt(productId));
        if (cartItem) cartItem.quantity += 1;
        updateCartDisplay();
    }

    // Function to decrease quantity
    function decreaseQuantity(productId) {
        const cartItem = cart.find(item => item.id === parseInt(productId));
        if (cartItem && cartItem.quantity > 1) cartItem.quantity -= 1;
        else removeItem(productId);
        updateCartDisplay();
    }

    // Function to remove item from cart
    function removeItem(productId) {
        cart = cart.filter(item => item.id !== parseInt(productId));
        updateCartDisplay();
    }

    // Event listener for cart actions (increase, decrease, remove)
    cartItems.addEventListener('click', (event) => {
        const productId = event.target.getAttribute('data-id');
        if (event.target.classList.contains('increase-quantity')) increaseQuantity(productId);
        else if (event.target.classList.contains('decrease-quantity')) decreaseQuantity(productId);
        else if (event.target.classList.contains('remove-item')) removeItem(productId);
    });

    // Event listener for adding to cart
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });

    // Show checkout form
    checkoutBtn.addEventListener('click', () => {
        checkoutFormContainer.style.display = 'block';
    });

    // Handle form submission (checkout process)
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Simulate checkout process
        const formData = new FormData(checkoutForm);
        const name = formData.get('name');
        const address = formData.get('address');

        // Display confirmation message
        confirmationMessage.style.display = 'block';
        confirmationMessage.innerHTML = `
            Thank you, ${name}!<br>
            Your order has been placed and will be shipped to ${address}.<br>
            Total Amount: $${totalPrice.toFixed(2)}
        `;

        // Clear the cart and form
        cart = [];
        updateCartDisplay();
        checkoutForm.reset();
        checkoutFormContainer.style.display = 'none'; // Hide checkout form
    });

    // Initial display of products
    displayProducts();
});
