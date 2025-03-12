document.addEventListener("DOMContentLoaded", function () {
    const homeTab = document.getElementById("home-tab");
    const beautyTab = document.getElementById("beauty-tab");
    const serviceList = document.getElementById("service-list");

    const categoryFilter = document.createElement("select");
    categoryFilter.id = "category-filter";
    categoryFilter.innerHTML = `
        <option value="">All Services</option>
        <option value="home">Home Services</option>
        <option value="beauty">Beauty Services</option>
    `;

    const searchInput = document.createElement("input");
    searchInput.id = "service-search";
    searchInput.type = "text";
    searchInput.placeholder = "Search services...";

    // Create a filter container and add it to the service section
    const filterContainer = document.createElement("div");
    filterContainer.classList.add("service-filter");
    filterContainer.style.marginBottom = "20px";
    filterContainer.appendChild(categoryFilter);
    filterContainer.appendChild(searchInput);

    document.querySelector(".services").insertBefore(filterContainer, serviceList);

    function updateServiceVisibility(category) {
        const homeServices = document.querySelectorAll(".home-service");
        const beautyServices = document.querySelectorAll(".beauty-service");

        if (category === "home") {
            homeServices.forEach(service => (service.style.display = "flex"));
            beautyServices.forEach(service => (service.style.display = "none"));
        } else if (category === "beauty") {
            homeServices.forEach(service => (service.style.display = "none"));
            beautyServices.forEach(service => (service.style.display = "flex"));
        } else {
            homeServices.forEach(service => (service.style.display = "flex"));
            beautyServices.forEach(service => (service.style.display = "flex"));
        }
    }

    function searchServices() {
        const searchTerm = searchInput.value.toLowerCase();
        document.querySelectorAll(".service").forEach(service => {
            const serviceName = service.querySelector("p").textContent.toLowerCase();
            if (serviceName.includes(searchTerm)) {
                service.style.display = "flex";
            } else {
                service.style.display = "none";
            }
        });
    }

    homeTab.addEventListener("click", () => {
        updateServiceVisibility("home");
        categoryFilter.value = "home";
    });

    beautyTab.addEventListener("click", () => {
        updateServiceVisibility("beauty");
        categoryFilter.value = "beauty";
    });

    categoryFilter.addEventListener("change", () => {
        updateServiceVisibility(categoryFilter.value);
    });

    searchInput.addEventListener("input", searchServices);

    // Initialize the service list
    updateServiceVisibility("home");
});
