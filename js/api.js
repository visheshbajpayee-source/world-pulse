

export async function getCountrySuggestions(query, signal) {
  const url = `https://restcountries.com/v3.1/name/${query}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("No country suggestions found.");
  }

  return response.json();
}


export async function getCountryData(countryName, signal){
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  
  const response = await fetch(url, { signal });
  if (!response.ok){
    throw new Error("Country not found."); 
  }
  const data = await response.json();
  return data[0];
}

export async function getWeatherData(latitude, longitude, signal){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&forecast_days=3&timezone=auto`;

  const response = await fetch(url, { signal });

  if(!response.ok){
    throw new Error ("Weather data could not be loaded.");
  }
  return response.json();
}

export async function getNewsData(countryName, signal){
  const query = encodeURIComponent(countryName);
  const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=6&token=${CONFIG.GNEWS_API_KEY}`;

  const response = await fetch(url, { signal });

  if (!response.ok){
    throw new Error ("News data could not be loaded.");
  }

  return response.json();
}

export async function getHolidayData(year, countryCode, signal){
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}	`

  const response = await fetch(url, { signal });

  if (!response.ok){
    throw new Error ("Holiday data could not be loaded.")
  }
  return response.json()
}

export async function getFunFact(signal){
  const url = "https://api.api-ninjas.com/v1/facts";

  const response = await fetch(url, {signal, hesders: {
    "X-Api-Key": CONFIG.API_NINJAS_KEY
  }
});

if (!response.ok){
  throw new Error("Fun fact could not be loaded.");
}
const data = await response.json();

return data[0]?.fact ?? "No fact found.";
}