
const products = [
    {
        id: 1,
        name: "HONOR Magic7 Pro",
        price: 12990000,
        category: "phone",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
    },
    {
        id: 2,
        name: "HONOR 200 Pro",
        price: 7990000,
        category: "phone",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
    },
    {
        id: 3,
        name: "HONOR Pad 9",
        price: 3990000,
        category: "tablet",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500"
    },
    {
        id: 4,
        name: "HONOR MagicBook",
        price: 8990000,
        category: "laptop",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
    },
    {
        id: 5,
        name: "HONOR X9c",
        price: 4590000,
        category: "phone",
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
    },
    {
        id: 6,
        name: "HONOR Earbuds",
        price: 890000,
        category: "accessory",
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500"
    },
    {
        id: 7,
        name: "HONOR Pad X9",
        price: 2990000,
        category: "tablet",
        image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500"
    },
    {
        id: 8,
        name: "HONOR Watch",
        price: 1590000,
        category: "accessory",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    }
];

let cart = [];
let currentCategory = "all";

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartOverlay = document.getElementById("cartOverlay");

function formatPrice(price) {
    return price.toLocaleString("uz-UZ");
}

function renderProducts() {
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesCategory =
            currentCategory === "all" ||
            product.category === currentCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)} so'm</p>
            <button onclick="addToCart(${product.id})">
                Savatchaga qo'shish
            </button>
        </div>
    `).join("");

    if (filtered.length === 0) {
        productGrid.innerHTML = "<p>Mahsulot topilmadi.</p>";
    }
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    const count = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = count;
    document.getElementById("totalPrice").textContent =
        formatPrice(total);

    document.getElementById("cartItems").innerHTML =
        cart.length ? cart.map(item => `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.quantity} x ${formatPrice(item.price)} so'm</p>
                </div>
                <button onclick="removeFromCart(${item.id})">
                    O'chirish
                </button>
            </div>
        `).join("") : "<p>Savatcha hozircha bo'sh.</p>";
}

document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter.active")
            ?.classList.remove("active");

        button.classList.add("active");
        currentCategory = button.dataset.category;
        renderProducts();
    });
});

document.getElementById("searchInput")
    .addEventListener("input", renderProducts);

document.getElementById("searchBtn")
    .addEventListener("click", () => {
        document.getElementById("searchBox")
            .classList.toggle("show");
    });

document.getElementById("cartBtn")
    .addEventListener("click", () => {
        cartOverlay.classList.add("show");
    });

document.getElementById("closeCart")
    .addEventListener("click", () => {
        cartOverlay.classList.remove("show");
    });

cartOverlay.addEventListener("click", event => {
    if (event.target === cartOverlay) {
        cartOverlay.classList.remove("show");
    }
});

document.getElementById("menuBtn")
    .addEventListener("click", () => {
        document.querySelector(".nav")
            .classList.toggle("open");
    });

document.getElementById("checkoutBtn")
    .addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Savatchangiz bo'sh!");
            return;
        }

        alert("Buyurtma qabul qilish uchun backend va aloqa tizimini ulash kerak.");
    });

renderProducts();
updateCart();
