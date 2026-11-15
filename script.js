document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    let wishCount = 0;

    const cartCountEl = document.getElementById("cart-count");
    const wishCountEl = document.getElementById("wish-count");
    const addToCartBtns = document.querySelectorAll(".cart-btn");
    const wishBtns = document.querySelectorAll(".wish-btn");

    // 1. Add to Cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            cartCount++;
            cartCountEl.textContent = cartCount;

            const originalText = btn.textContent;
            btn.textContent = "Added ✓";
            btn.style.backgroundColor = "#3b2416";
            btn.style.color = "#f2c14e";

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = "";
                btn.style.color = "";
            }, 900);
        });
    });

    // 2. Wishlist toggle functionality
    wishBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            const icon = btn.querySelector("i");

            if (btn.classList.contains("active")) {
                icon.classList.replace("fa-regular", "fa-solid");
                wishCount++;
            } else {
                icon.classList.replace("fa-solid", "fa-regular");
                wishCount--;
            }
            wishCountEl.textContent = wishCount;
        });
    });

    // 3. Search & Category Filter
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const categorySelect = document.getElementById("category-select");
    const productCards = document.querySelectorAll(".product-card");
    const noResultsMsg = document.getElementById("no-results");
    const featuredSection = document.getElementById("featured");

    function filterProducts(selectedCat = categorySelect.value) {
        const query = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        productCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            const cardCat = card.getAttribute("data-category");

            const matchesSearch = title.includes(query);
            const matchesCategory = selectedCat === "all" || cardCat === selectedCat;

            if (matchesSearch && matchesCategory) {
                card.style.display = "block";
                visibleCount++;
            } else {
                card.style.display = "none";
            }
        });

        noResultsMsg.style.display = visibleCount === 0 ? "block" : "none";
    }

    searchInput.addEventListener("keyup", () => filterProducts());
    categorySelect.addEventListener("change", () => filterProducts());

    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        filterProducts();
        featuredSection.scrollIntoView({ behavior: "smooth" });
    });

    // 4. Category Cards & Sub-header Filter Click
    document.querySelectorAll(".cat-card").forEach(card => {
        card.addEventListener("click", () => {
            const cat = card.getAttribute("data-category");
            categorySelect.value = cat;
            filterProducts(cat);
            featuredSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    document.querySelectorAll("#header span[data-filter]").forEach(link => {
        link.addEventListener("click", () => {
            const cat = link.getAttribute("data-filter");
            categorySelect.value = cat;
            filterProducts(cat);
            featuredSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Reset Filters ("Show All" / "View All")
    document.getElementById("reset-filter").addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "all";
        filterProducts("all");
    });

    document.getElementById("view-all-products").addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "all";
        filterProducts("all");
    });

    // Hero CTA Button
    document.getElementById("hero-btn").addEventListener("click", () => {
        featuredSection.scrollIntoView({ behavior: "smooth" });
    });
});
