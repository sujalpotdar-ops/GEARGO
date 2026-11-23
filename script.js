
// // HERO CAROUSEL

// const slides = document.querySelectorAll(".slide");
// const nextBtn = document.getElementById("nextBtn");

// let current = 0;

// if (nextBtn && slides.length > 0) {

//     nextBtn.addEventListener("click", function () {

//         slides[current].classList.remove("active");

//         current = (current + 1) % slides.length;

//         slides[current].classList.add("active");

//     });

// }

// SEARCH
const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", function () {
        searchBox.classList.toggle("show");
        if (searchBox.classList.contains("show") && searchInput) {
            searchInput.focus();
        }
    });
}

if (closeSearch && searchBox && searchInput) {
    closeSearch.addEventListener("click", function () {
        searchBox.classList.remove("show");
        searchInput.value = "";
        filterGear("");
    });
}

// SEARCH GEAR BY NAME
function filterGear(query) {
    document.querySelectorAll(".gear-card").forEach(function (card) {
        const name = card.querySelector("h3").textContent.toLowerCase();
        card.style.display = name.includes(query.toLowerCase()) ? "" : "none";
    });
}

if (searchInput) {
    searchInput.addEventListener("input", function () {
        filterGear(searchInput.value);
    });
}

// RENTAL CART
let cart = JSON.parse(localStorage.getItem("geargoCart") || "[]");

const cartBtn = document.getElementById("cartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function saveCart() {
    localStorage.setItem("geargoCart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty. Choose some gear!</p>";
        cartTotal.textContent = "₹0";
        return;
    }

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(function (item, index) {
        total += item.price;

        const row = document.createElement("div");
        row.className = "cart-item";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "₹" + item.price + " / day";

        const remove = document.createElement("button");
        remove.className = "remove-item";
        remove.textContent = "Remove";

        remove.addEventListener("click", function () {
            cart.splice(index, 1);
            saveCart();
        });

        row.append(name, price, remove);
        cartItems.appendChild(row);
    });

    cartTotal.textContent = "₹" + total;
}

// ADD GEAR TO CART
document.querySelectorAll(".rent-btn").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const card = button.closest(".gear-card");
        if (!card) return;

        const name = card.querySelector("h3").textContent.trim();
        const priceText = card.querySelector(".price").textContent;
        const price = Number(priceText.replace(/[^0-9]/g, ""));

        cart.push({ name: name, price: price });
        saveCart();

        button.textContent = "Added ✓";
        setTimeout(function () {
            button.textContent = "Rent Now";
        }, 1000);
    });
});

// OPEN AND CLOSE CART
if (cartBtn && cartOverlay) {
    cartBtn.addEventListener("click", function () {
        renderCart();
        cartOverlay.classList.add("show");
    });
}

if (closeCart && cartOverlay) {
    closeCart.addEventListener("click", function () {
        cartOverlay.classList.remove("show");
    });
}

if (cartOverlay) {
    cartOverlay.addEventListener("click", function (event) {
        if (event.target === cartOverlay) {
            cartOverlay.classList.remove("show");
        }
    });
}

renderCart();