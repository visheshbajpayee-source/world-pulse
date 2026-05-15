

export async function getCountrySuggestions(query, signal) {
  const url = `https://restcountries.com/v3.1/name/${query}`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("No country suggestions found.");
  }

  return response.json();
}
