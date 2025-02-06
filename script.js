// JavaScript functionality to enhance the website
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;

document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.querySelector('main h1');
    if (welcomeMessage) {
        welcomeMessage.textContent += ' - Enjoy your visit!';
    }

    // Open cart modal
    const viewCartButton = document.getElementById('view-cart');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    if (viewCartButton && cartModal && closeModal) {
        viewCartButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            displayCart(); // Populate the cart modal
            cartModal.style.display = 'block'; // Show the modal
        });

        closeModal.addEventListener('click', function() {
            cartModal.style.display = 'none'; // Hide the modal
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', function(event) {
            if (event.target === cartModal) {
                cartModal.style.display = 'none'; // Hide the modal
            }
        });

        // Add event listeners to "Add to Cart" buttons after products are loaded
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.previousElementSibling.previousElementSibling.textContent;
                const productPrice = parseFloat(this.previousElementSibling.textContent.replace('Price: $', ''));
                cart.push({ name: productName, price: productPrice });
                totalAmount += productPrice;
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('totalAmount', totalAmount);
                alert(`${productName} has been added to your cart!`);
            });
        });
    }
});

// Function to display cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalAmountElement = document.getElementById('total-amount');

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            
            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                removeItem(item.name);
            });
            
            itemElement.appendChild(removeButton);
            cartItemsContainer.appendChild(itemElement);
        });
    }

    if (totalItemsElement) {
        totalItemsElement.textContent = cart.length;
    }
    if (totalAmountElement) {
        totalAmountElement.textContent = totalAmount.toFixed(2);
    }
}

// Function to remove an item from the cart
function removeItem(name) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex > -1) {
        totalAmount -= cart[itemIndex].price; // Subtract the price from total amount
        cart.splice(itemIndex, 1); // Remove the item from the cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        localStorage.setItem('totalAmount', totalAmount); // Update total amount in local storage
        displayCart(); // Refresh the cart display
    }
}
