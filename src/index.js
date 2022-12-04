import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
export { refs };
const DEBOUNCE_DELAY = 1300;

const refs = {
  inputField: document.querySelector('input#search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(onInputSearch, DEBOUNCE_DELAY)
);

function onInputSearch(e) {
  let countryName = e.target.value.trim();

  if (countryName === '') {
    clearDataCountryInfo();
    clearDataSearchList();
    return;
  } else {
    fetchCountries(countryName)
      .then(renderList)
      .catch(err =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
}

function clearDataSearchList() {
  refs.countryList.innerHTML = '';
}
function clearDataCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

function markupSearchList(searchCountries) {
  console.log(searchCountries);
  const markupList = searchCountries
    .map(({ name, flags }) => {
      return `
            <li style='display: flex; align-items: center;'>
                <img src="${flags.svg}"  alt="Country Flag" width='40' height='30'>
                <span>&nbsp${name.official}</span>
            </li>`;
    })
    .join('');
  clearDataCountryInfo();
  refs.countryList.innerHTML = markupList;
}

function markupCountryInfo(searchCountries) {
  const markupCountry = searchCountries
    .map(({ name, capital, population, flags, languages }) => {
      return `<img src="${flags.svg}" alt="Country Flag" width="40" height="30">
          <span style="
    font-size: 36px; font-weight: 700">${name.official}</span>
          <p><b>Capital: </b>${capital}</p>
          <p><b>Population: </b>${population}</p>
          <p><b>Languages: </b>${Object.values(languages).join(', ')}</p>`;
    })
    .join('');
  clearDataSearchList();
  refs.countryInfo.innerHTML = markupCountry;
  refs.countryInfo.span.style.fontSize = '36px';
}

function renderList(searchCountries) {
  if (searchCountries.length > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (searchCountries.length === 1) {
    markupCountryInfo(searchCountries);
  } else {
    markupSearchList(searchCountries);
    return;
  }
}
refs.countryList.style.fontWeight = '700';
refs.countryList.style.listStyle = 'none';
refs.countryList.style.padding = '0';
