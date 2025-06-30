// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  let cartCount = 0;
  const cartCountSpan = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.product-item button');
  const cartItemsList = document.getElementById('cart-items');
  const cartModal = document.getElementById('cart-modal');
  const cartLink = document.getElementById('cart-link');
  const closeCart = document.getElementById('close-cart');
  let cartProducts = [];

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const productItem = button.closest('.product-item');
      const productName = productItem.querySelector('h3').textContent;
      if (button.classList.contains('in-cart')) {
        // Remove from cart
        cartCount--;
        button.textContent = "Add to Cart";
        button.classList.remove('in-cart');
        cartProducts = cartProducts.filter(name => name !== productName);
      } else {
        // Add to cart
        cartCount++;
        button.textContent = "Remove from Cart";
        button.classList.add('in-cart');
        cartProducts.push(productName);
      }
      cartCountSpan.textContent = cartCount;
      renderCart();
    });
  });

  function renderCart() {
    cartItemsList.innerHTML = '';
    if (cartProducts.length === 0) {
      cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
      cartProducts.forEach(name => {
        const li = document.createElement('li');
        li.textContent = name;
        cartItemsList.appendChild(li);
      });
    }
  }

  cartLink.addEventListener('click', function (e) {
    e.preventDefault();
    cartModal.style.display = 'block';
  });

  closeCart.addEventListener('click', function () {
    cartModal.style.display = 'none';
  });

  // Product search functionality
  const searchInput = document.getElementById('product-search');
  const productItems = document.querySelectorAll('.product-item');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      productItems.forEach(function (item) {
        const name = item.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});