// For playing the video 
const video = document.getElementById('video');
        video.addEventListener('mouseenter', () => {
            video.play();
        });
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0; // Reset to the start when hover ends
        });


// Making add to cart functional
document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartBox = document.getElementById("cartbox");
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const viewCartButton = document.getElementById("viewCart");
    const closeCartButton = document.getElementById("closeCart");

    document.querySelectorAll(".ordernow").forEach(button => {
        button.addEventListener("click", function () {
            let itemContainer = this.closest(".item");
            let itemName = itemContainer.querySelector(".imagebox img").alt;
            let itemPrice = parseFloat(itemContainer.querySelector(".price").textContent.replace("Rs.", "").trim());
            let quantityInput = itemContainer.querySelector(".quantity");
            let quantity = parseInt(quantityInput.value);
            if (!quantity || quantity <= 0) {
                alert("Please enter a valid quantity!");
                return;               
            }
            // Check if item already exists in the cart
            let existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: quantity });
            }

            alert(`${itemName} added to cart!`);
            quantityInput.value = 1;
        });
    });

    // Function to update cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.innerHTML = `<b>${item.name}</b> - Rs.${item.price} x ${item.quantity} = Rs.${item.price * item.quantity}`;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.innerText = `Total: Rs.${total}`;
    }

    // Show cart when "View Cart" is clicked
    viewCartButton.addEventListener("click", function () {
        updateCartDisplay();
        cartBox.style.display = "block";
    });

    // Hide cart when "Close Cart" is clicked
    closeCartButton.addEventListener("click", function () {
        cartBox.style.display = "none";
    });
});
