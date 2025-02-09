document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("cart-total");
  const totalItems = document.getElementById("total-items");
  const cartBadge = document.querySelector(".cart-badge");

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
      updateCartBadge(0);
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

    // Add event listener to remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        // @ts-ignore
        const index = e.target.getAttribute("data-index");
        removeItemFromCart(index);
      });
    });

    // @ts-ignore
    cartTotal.textContent = `₹${total.toFixed(2)}`;
  };
  const addToCart = (event) => {
    const productCard = event.target.closest(".product-card");
    const name = productCard.querySelector("h3").innerText;
    const image = productCard.querySelector("img").src;

    // 🟢 Check for Discounted Product
    const discountPriceElement = productCard.querySelector(".discount-price");
    const originalPriceElement = productCard.querySelector(".original-price");

    let price = 0;

    if (discountPriceElement && discountPriceElement.innerText.trim() !== "") {
      // ✅ Agar discount price hai aur khali nahi hai, toh use karo
      price = parseFloat(
        discountPriceElement.innerText.replace("₹", "").trim()
      );
    } else if (
      originalPriceElement &&
      originalPriceElement.innerText.trim() !== ""
    ) {
      // ✅ Agar sirf original price hai, toh use karo
      price = parseFloat(
        originalPriceElement.innerText.replace("₹", "").trim()
      );
    } else {
      // ✅ Normal product case (No class, direct <p> tag)
      const priceElement = productCard.querySelector("p");
      if (priceElement) {
        price = parseFloat(priceElement.innerText.replace("₹", "").trim());
      }
    }

    // Console log for debugging
    console.log(`Adding to cart: ${name}, Price: ₹${price}`);

    // 🛒 Create cart item
    const cartItem = { name, price, image, quantity: 1 };

    // 🔄 Check if item already exists in cart
    const existingItemIndex = cart.findIndex(
      (item) => item.name === cartItem.name
    );
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    // 💾 Save cart in localStorage
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
    totalItems.textContent = cartQuantity;
    updateCartBadge(cartQuantity);
  };

  // Update the cart badge in the navigation
  const updateCartBadge = (quantity) => {
    // @ts-ignore
    cartBadge.textContent = quantity > 0 ? quantity : "";
  };

  // Attach event listener to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Initial render of the cart
  renderCart();
  updateCartQuantity();
});
