document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartElement = document.getElementById("cart");
    const addToCartBtns = document.querySelectorAll(".cart-btn");

    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            cartCount++;
            cartElement.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${cartCount})`;
            
            const originalText = btn.textContent;
            btn.textContent = "Added!";
            btn.style.backgroundColor = "#3b2416";
            btn.style.color = "#f2c14e";
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "#d99a1e";
                btn.style.color = "#2b1a0e";
            }, 1000);
        });
    });

    const searchInput = document.querySelector("#placeholder input");
    const searchBtn = document.querySelector("#placeholder button");
    const productCards = document.querySelectorAll(".product-card");

    function filterProducts() {
        const query = searchInput.value.toLowerCase().trim();
        productCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    searchInput.addEventListener("keyup", filterProducts);
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        filterProducts();
        document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
    });

    const shopNowBtn = document.querySelector("#text button");
    const featuredSection = document.getElementById("featured");

    if (shopNowBtn && featuredSection) {
        shopNowBtn.addEventListener("click", () => {
            featuredSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    const categoryBoxes = document.querySelectorAll("#boxes > div");
    categoryBoxes.forEach(box => {
        box.addEventListener("click", () => {
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
