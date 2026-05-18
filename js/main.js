const searchForm = document.querySelector("#searchForm");
const countryInput = document.querySelector("#countryInput");
const suggestionsList = document.querySelector("#suggestionsList");
const historyChips = document.querySelector("#historyChips");
const clearHistoryBtn = document.querySelector("#clearHistoryBtn");
const themeToggle = document.querySelector("#themeToggle");
const newsTitle = document.querySelector("#newsTitle");

let currentController = null;

function applyTheme(theme) {
  const activeTheme = theme || "light";

  document.body.dataset.theme = activeTheme;
  themeToggle.textContent = activeTheme === "dark" ? "☀️" : "🌙";
}

applyTheme(localStorage.getItem("theme"));

themeToggle.addEventListener("click", () => {
  const next = document.body.dataset.theme === "dark" ? "light" : "dark";

  applyTheme(next);

  localStorage.setItem("theme", next);
});
