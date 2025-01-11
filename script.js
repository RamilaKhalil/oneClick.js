
document.querySelectorAll(".increment").forEach((button) => {
  button.addEventListener("click", (e) => {
    // @ts-ignore
    const input = e.target.previousElementSibling;
    input.value = parseInt(input.value) + 1;
  });
});

document.querySelectorAll(".decrement").forEach((button) => {
  button.addEventListener("click", (e) => {
    // @ts-ignore
    const input = e.target.nextElementSibling;
    if (parseInt(input.value) > 0) {
      input.value = parseInt(input.value) - 1;
    }
  });
});
// Filter Functionality
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category");

    productCards.forEach((card) => {
      if (
        category === "all" ||
        card.getAttribute("data-category") === category
      ) {
        // @ts-ignore
        card.style.display = "block";
      } else {
        // @ts-ignore
        card.style.display = "none";
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartBadge = document.querySelector(".cart-badge");

  // Get cart from localStorage
  // @ts-ignore
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update the cart badge
  const updateCartBadge = () => {
    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    // @ts-ignore
    cartBadge.textContent = cartQuantity > 0 ? cartQuantity : "";
  };
   // Add item to cart (example function)
   const addToCart = (name, price, image) => {
    const cartItem = { name, price, image, quantity: 1 };

    const existingItemIndex = cart.findIndex((item) => item.name === cartItem.name);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  };

  // Initial badge update
  updateCartBadge();
  document.querySelector(".add-to-cart-btn")?.addEventListener("click", () => {
    addToCart("Sample Item", 500, "image-url.jpg");
  });
});
 





// @ts-ignore
gsap.from("#img1", {
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  y: 60,
});
// @ts-ignore
gsap.from("#img2", {
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  x: 60,
});
// @ts-ignore
gsap.from("#img3", {
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  y: -60,
});
// @ts-ignore
gsap.from("#page1 h1", {
  opacity: 0,
  delay: 0.7,
  duration: 1,
});
// @ts-ignore
gsap.from(".page2 h4 , .page2 p , .page2 #about-us ", {
  opacity: 0,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".page2",
    start: "top 50%",
  },
});
// @ts-ignore
gsap.from(".bundle-container h2 ", {
  opacity: 0,
  duration: 1.5,
  scrollTrigger: {
    trigger: ".bundle-container",
    start: "top 10%",
  },
});
