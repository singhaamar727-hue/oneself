// Book search and category filter for the Books page.

const searchInput = document.getElementById("searchInput");
const bookCards = document.querySelectorAll(".book-card");
const categoryButtons = document.querySelectorAll(".filters button");
const noResults = document.getElementById("noResults");

let selectedCategory = "All";

function filterBooks() {
    const searchText = searchInput.value.toLowerCase();
    let visibleBooks = 0;

    bookCards.forEach(function(card) {
        const category = card.dataset.category;
        const bookText = card.innerText.toLowerCase();

        const matchesCategory =
            selectedCategory === "All" || category === selectedCategory;
        const matchesSearch = bookText.includes(searchText);

        if (matchesCategory && matchesSearch) {
            card.style.display = "block";
            visibleBooks++;
        } else {
            card.style.display = "none";
        }
    });

    noResults.hidden = visibleBooks !== 0;
}

if (searchInput) {
    searchInput.addEventListener("input", filterBooks);
}

categoryButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        filterBooks();
    });
});

// Read a category from the URL when a visitor comes from Categories page.
const params = new URLSearchParams(window.location.search);
const requestedCategory = params.get("category");

if (requestedCategory && categoryButtons.length > 0) {
    const matchingButton = document.querySelector(
        '.filters button[data-category="' + requestedCategory + '"]'
    );

    if (matchingButton) {
        matchingButton.click();
    }
}
