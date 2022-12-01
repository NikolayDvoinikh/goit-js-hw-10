import { refs } from './index';

const COUNTRIES_URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  name = refs.inputField.value;
  console.log(name);
  fetch(`${COUNTRIES_URL}${name}`)
    .then(res => res.json())
    .then(data =>
      data.map(({ name, capital, population, flags, languages }) =>
        console.log(name.official, capital, population, flags.svg, languages)
      )
    )
    .catch(error => console.log(error));
}
