// ------------------------------
// Saludo dinámico según la hora
// ------------------------------
function setGreeting() {
  const greetingEl = document.getElementById("greeting-text");
  if (!greetingEl) return;

  const now = new Date();
  const hour = now.getHours();
  let greeting = "Bienvenido";

  if (hour >= 5 && hour < 12) {
    greeting = "Buenos días";
  } else if (hour >= 12 && hour < 19) {
    greeting = "Buenas tardes";
  } else {
    greeting = "Buenas noches";
  }

  greetingEl.textContent = greeting;
}

// ------------------------------
// Año en el footer
// ------------------------------
function setYear() {
  const yearSpan = document.getElementById("year-span");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ------------------------------
// Navegación por tarjetas
// ------------------------------
function initCardNavigation() {
  const cards = document.querySelectorAll(".app-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    const isSoon = card.dataset.soon === "true";
    const url = card.dataset.url;

    // Clic en toda la tarjeta
    card.addEventListener("click", () => {
      if (isSoon) {
        alert("Esta aplicación estará disponible próximamente.");
        return;
      }
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });

    // Clic en el botón interno
    const button = card.querySelector(".app-card-button");
    if (button) {
      button.addEventListener("click", (event) => {
        event.stopPropagation(); // evita doble acción
        if (isSoon) {
          alert("Esta aplicación estará disponible próximamente.");
        } else if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    }
  });
}

// ------------------------------
// Buscador / filtro en vivo
// ------------------------------
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const cards = document.querySelectorAll(".app-card");
  const noResultsEl = document.getElementById("no-results");

  if (!searchInput || !cards.length) return;

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filterCards() {
    const query = normalize(searchInput.value.trim());
    let visibleCount = 0;

    cards.forEach((card) => {
      const title = normalize(card.dataset.title || "");
      const description = normalize(card.dataset.description || "");

      const match =
        query === "" ||
        title.includes(query) ||
        description.includes(query);

      if (match) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noResultsEl) {
      noResultsEl.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  searchInput.addEventListener("input", filterCards);
}

// ------------------------------
// Inicialización
// ------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setGreeting();
  setYear();
  initCardNavigation();
  initSearch();
});
