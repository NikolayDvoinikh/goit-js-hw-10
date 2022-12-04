const COUNTRIES_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  console.log(name);
  return fetch(
    `${COUNTRIES_URL}${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
