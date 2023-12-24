document.addEventListener("DOMContentLoaded", function () {
    fetchDataAndDisplay();
});

function fetchDataAndDisplay() {
    // Fetch JSON data from the API
    fetch("https://s3.amazonaws.com/open-to-cors/assignment.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Extract JSON data here
        })
        .then(data => {
            console.log("Fetched data:", data);

            // Display products in the table
            displayProducts(data);

            // Populate availableFields select
            populateSelect("availableFields", Object.keys(data[0]));
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function displayProducts(products) {
    const tableBody = document.getElementById("tableBody");

    // Clear previous data
    tableBody.innerHTML = "";

    // Add rows to the table
    products.forEach(product => {
        const row = document.createElement("tr");

        // Create table cells and add text content
        const titleCell = document.createElement("td");
        titleCell.textContent = product.Title;
        row.appendChild(titleCell);

        const priceCell = document.createElement("td");
        priceCell.textContent = product.Price;
        row.appendChild(priceCell);

        const popularityCell = document.createElement("td");
        popularityCell.textContent = product.Popularity;
        row.appendChild(popularityCell);

        const subcategoryCell = document.createElement("td");
        subcategoryCell.textContent = product.Subcategory;
        row.appendChild(subcategoryCell);

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);

    // Clear previous options
    select.innerHTML = "";

    // Add new options
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        select.appendChild(optionElement);
    });
}

function moveItems(sourceSelectId, destinationSelectId) {
    const sourceSelect = document.getElementById(sourceSelectId);
    const destinationSelect = document.getElementById(destinationSelectId);

    // Move selected options from source to destination
    for (let i = 0; i < sourceSelect.options.length; i++) {
        const option = sourceSelect.options[i];
        if (option.selected) {
            destinationSelect.add(option);
            i--; // Adjust the index because the options array changes as we move items
        }
    }
}
