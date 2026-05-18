import {
  formatNumber,
  formatDate,
  getWeatherLabel,
  getTodayDateString
} from "./utils.js";

const loadingSection = document.querySelector("#loadingSection");
const errorSection = document.querySelector("#errorSection");
const dashboardSection = document.querySelector("#dashboardSection");
const newsSection = document.querySelector("#newsSection");

const countryPanel = document.querySelector("#countryPanel");
const weatherPanel = document.querySelector("#weatherPanel");
const holidayPanel = document.querySelector("#holidayPanel");
const factPanel = document.querySelector("#factPanel");
const newsGrid = document.querySelector("#newsGrid");


const newsCardTemplate = document.querySelector("#newsCardTemplate");

function clearElement(element) {
    element.innerHTML = "";
}

function selectCountry(countryName) {
    document.dispatchEvent(
        new CustomEvent("country-selected", {
            detail: countryName
        })
    )
}

export function showLoading() {
    loadingSection.classList.remove("hidden");
    errorSection.classList.add("hidden");
}

export function hideLoading() {
    loadingSection.classList.add("hidden");
}

export function showError(message) {
    errorSection.textContent = message;
    errorSection.classList.remove("hidden");
}

export function showDashboard() {
    dashboardSection.classList.remove("hidden");
    newsSection.classList.remove("hidden");
}

export function renderSuggestions(countries, suggestionsList) {
    clearElement(suggestionsList);

    countries.slice(0, 6).forEach(country => {
        const countryName = country.name.common;
        const item = document.createElement("li");

        item.textContent = countryName;
        item.tabIndex = 0;

        item.addEventListener("click", () => selectCountry(countryName));

        item.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                selectCountry(countryName)
            }
        });

        suggestionsList.appendChild(item);
    });
}

export function clearSuggestions(suggestionsList) {
    clearElement(suggestionsList);
}

export function renderCountryPanel(country) {
    const countryName = country.name.common;
    const capital = country.capital?.[0] ?? "N/A";

    const currency = country.currencies
        ? Object.values(country.currencies)
            .map(item => item.name)
            .join(" , ")
        : "N/A";

    const languages = country.languages
        ? Object.values(country.languages).join(" , ")
        : "N/A";

    countryPanel.dataset.country = countryName;
    countryPanel.dataset.region = country.region;

    countryPanel.innerHTML = `
      <img
        class = "country-flag"
        src = "${country.flags  .svg}"
        alt = "Flag of ${countryName}"
        loading = "lazy"
      /img>
      
      <h2>${countryName}</h2>

      <p><strong>Capital : </strong> ${capital}</p>
      <p><strong>Region : </strong> ${country.region}</p>
      <p><strong>Population : </strong> ${formatNumber(country.population)}</p>
      <p><strong>Currency : </strong> ${currency}</p>
      <p><strong>Languages : </strong> ${languages}</p>
      <p><strong>Timezones : <strong> ${country.timezones.join(" , ")}</p> 

    `;
}

export function renderWeatherPanel(weather) {
    const current = weather.current_weather;
    const daily = weather.daily;


    const forecastHTML = daily.time
        .map((date, index) => {
            return `
          <div class = "forecast-item">
            <strong> ${formatDate(date)}</strong>
            <p>
              ${daily.temperature_2m_min[index]}°C -
              ${daily.temperature_2m_max[index]}°C
            </p>
          </div>    
        `;
        })
        .join("");


    weatherPanel.innerHTML = `
        <h2>🌤️ Weather</h2>

        <p><strong>Temperature : </strong> ${current.temperature}°C</p> 
        <p><strong>Wind Speed : </strong> ${current.windspeed} km/h</p>
        <p><strong>Condition : </strong> ${getWeatherLabel(current.weathercode)}</p>

        <div class = "forecast-list">
          ${forecastHTML}
        </div>
      `;
}

export function renderHolidayPanel(holidays) {
    const today = getTodayDateString();


    const upcomingHolidays = holidays
        .filter(holiday => holiday.date >= today)
        .slice(0, 3);

    const holidaysHTML = upcomingHolidays.length
        ? upcomingHolidays
            .map(holiday => {
                const todayBadge =
                    holiday.date === today ? `<span class ="badge">Today</span>` : "";

                return `
              <p>
                <strong>${holiday.localName}</strong>
                ${todayBadge}
                <br>
                ${formatDate(holiday.date)}
              </p>  
            `;
            })
            .join("")
        : `<p>No upcoming holidays for this year.</p>`;

    holidayPanel.innerHTML = `
      <h2>🗓️ Upcoming Holidays</h2>
      ${holidaysHTML}
    `;

}
export function renderFactPanel(fact, onAnotherFactClick) {
    factPanel.innerHTML = `
          <h2>💡 Fun Fact</h2>

          <p>${fact}</p>

          <button id = "anotherFactBtn" class = "fact-btn" type = "button">
            Get another fact
          </button>  
        `;

    document.querySelector("#anotherFactBtn")
    document.addEventListener("click", onAnotherFactClick);
}

export function renderNewsCards(articles){
    clearElement(newsGrid);

    if(!articles  || articles.length === 0){
        newsGrid.innerHTML = `<p>No news found</p>`;
        return;
    }

    articles.forEach(article => {
        const clone = newsCardTemplate.content.cloneNode(true);

        clone.querySelector(".news-title").textContent = article.title;
        clone.querySelector(".news-source").textContent = article.source?.name ?? "Unknown Source";
        clone.querySelector(".news-date").textContent = formatDate(article.publishedAt);
        clone.querySelector(".news-link").href = article.url;
    
        newsGrid.appendChild(clone);

    });
    observeNewsCards();
}

function observeNewsCards(){
    const cards = document.querySelectorAll(".news-card");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.2
        }
    );

    cards.forEach(card => observer.observe(card));
}

export function renderHistoryChips(history, container){
    clearElement(container);

    if(history.length === 0){
        container.innerHTML = `<p class = "empty-history">No recent searches yet. </p> `;
        return;
    }

    history.forEach(countryName => {
        const chip = document.createElement("button");

        chip.className = "chip";
        chip.type = "button";
        chip.textContent = countryName;

        chip.addEventListener("click", () => selectCountry(countryName));

        container.appendChild(chip);
    });
}