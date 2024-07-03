document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://fakestoreapi.com/products';
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category');
    const sortSelect = document.getElementById('sort');
    const cheapestProductDiv = document.getElementById('cheapest-product');

    let products = [];
    let filteredProducts = [];

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            filteredProducts = products;
            displayProducts(filteredProducts);
            displayCheapestProduct();
        })
        .catch(error => console.error('Error fetching products:', error));

    function displayProducts(products) {
        productList.innerHTML = '';
        const sortedByName = [...products].sort((a, b) => a.title.localeCompare(b.title));
        sortedByName.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p>$${product.price}</p>
            `;
            productList.appendChild(productElement);
        });
    }

    function displayCheapestProduct() {
        if (products.length === 0) return;

        const sortedProducts = [...products].sort((a, b) => a.price - b.price);
        const cheapestProduct = sortedProducts[0];

        cheapestProductDiv.innerHTML = `
            <h2>Cheapest Product</h2>
            <div class="product">
                <img src="${cheapestProduct.image}" alt="${cheapestProduct.title}">
                <h2>${cheapestProduct.title}</h2>
                <p>${cheapestProduct.description}</p>
                <p>$${cheapestProduct.price}</p>
            </div>
        `;
    }

    function filterAndSortProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const selectedSort = sortSelect.value;

        filteredProducts = products
            .filter(product =>
                product.title.toLowerCase().includes(searchTerm) &&
                (selectedCategory === '' || product.category === selectedCategory)
            )
            .sort((a, b) => selectedSort === 'asc' ? a.price - b.price : b.price - a.price);

        displayProducts(filteredProducts);
        displayCheapestProduct(); 
    }

    searchInput.addEventListener('input', filterAndSortProducts);
    categorySelect.addEventListener('change', filterAndSortProducts);
    sortSelect.addEventListener('change', filterAndSortProducts);

    searchInput.addEventListener('input', filterAndSortProducts);
    categorySelect.addEventListener('change', filterAndSortProducts);
    sortSelect.addEventListener('change', filterAndSortProducts);
});
