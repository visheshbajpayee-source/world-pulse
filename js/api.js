import { CONFIG } from "../config.js";

let controller;

function getSignal() {
  if (controller) controller.abort();

  controller = new AbortController();

  return controller.signal;
}

async function fetchData(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

export async function fetchCountryInfo(country) {
  try {
    const data = await fetchData(
      "https://restcountries.com/v3.1/name/" + country,
      {
        signal: getSignal()
      }
    );

    return data[0];

  } catch (error) {
    console.error("Country Error:", error);
  }
}

export async function fetchWeather(lat, lon) {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current_weather: true,
      daily: "temperature_2m_max,temperature_2m_min",
      forecast_days: 3,
      timezone: "auto"
    });

    const url =
      "https://api.open-meteo.com/v1/forecast?" +
      params.toString();

    return await fetchData(url);

  } catch (error) {
    console.error("Weather Error:", error);
  }
}

export async function fetchNews(country) {
  try {
    const params = new URLSearchParams({
      q: country,
      max: 6,
      lang: "en",
      token: CONFIG.GNEWS_KEY
    });

    const url =
      "https://gnews.io/api/v4/search?" +
      params.toString();

    const data = await fetchData(url);

    return data.articles;

  } catch (error) {
    console.error("News Error:", error);

    return [];
  }
}

export async function fetchHolidays(code) {
  try {
    const year = new Date().getFullYear();

    const url =
      "https://date.nager.at/api/v3/PublicHolidays/" +
      year +
      "/" +
      code;

    return await fetchData(url);

  } catch (error) {
    console.error("Holiday Error:", error);

    return [];
  }
}

export async function fetchFunFact() {
  try {
    const data = await fetchData(
      "https://api.api-ninjas.com/v1/facts",
      {
        headers: {
          "X-Api-Key": CONFIG.NINJA_KEY
        }
      }
    );

    return data[0].fact;

  } catch (error) {
    console.error("Fact Error:", error);

    return "No fact available";
  }
}

export async function fetchAllDashboardData(country) {
  try {
    const info = await fetchCountryInfo(country);

    const [lat, lon] = info.capitalInfo.latlng;

    const code = info.cca2;

    const [weather, news, holidays, fact] =
      await Promise.all([
        fetchWeather(lat, lon),
        fetchNews(country),
        fetchHolidays(code),
        fetchFunFact()
      ]);

    return {
      info,
      weather,
      news,
      holidays,
      fact
    };

  } catch (error) {
    console.error("Dashboard Error:", error);
  }
}