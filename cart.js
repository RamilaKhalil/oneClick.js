document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("cart-total");
  const totalItems = document.getElementById("total-items"); // Select total items span
  const cartBadge = document.querySelector(".cart-badge"); // Select cart badge

  // Get cart from localStorage
  // @ts-ignore
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to render cart items
  const renderCart = () => {
    // @ts-ignore
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
      // @ts-ignore
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      // @ts-ignore
      cartTotal.textContent = "₹0.00";
      // @ts-ignore
      totalItems.textContent = "0";
      updateCartBadge(0); // Update badge to 0
      return;
    }

    cart.forEach((item, index) => {
      const itemTotal = item.quantity * item.price;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h3>${item.name}</h3>
          <p>Price: ₹${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Total: ₹${itemTotal.toFixed(2)}</p>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;

      // @ts-ignore
      cartItemsContainer.appendChild(cartItem);
    });

    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // @ts-ignore
        const index = e.target.getAttribute("data-index");
        removeItemFromCart(index);
      });
    });

    // @ts-ignore
    cartTotal.textContent = `₹${total.toFixed(2)}`;
  };

  // Add item to cart
  // @ts-ignore
  const addToCart = (name, price, image) => {
    const cartItem = {
      name,
      price,
      image,
      quantity: 1,
    };

    const existingItemIndex = cart.findIndex((item) => item.name === cartItem.name);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartQuantity();
  };

  // Remove item from cart
  const removeItemFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartQuantity();
  };

  // Update cart quantity in the navbar and total items
  const updateCartQuantity = () => {
    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    // @ts-ignore
    totalItems.textContent = cartQuantity; // Update total items in the cart summary
    updateCartBadge(cartQuantity);
  };

  // Update the cart badge in the navigation
  const updateCartBadge = (quantity) => {
    // @ts-ignore
    cartBadge.textContent = quantity > 0 ? quantity : "";
  };

  // Initial render of the cart
  renderCart();
  updateCartQuantity();
});
