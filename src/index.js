import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';
export { refs };
const DEBOUNCE_DELAY = 1300;

const refs = {
  inputField: document.querySelector('input#search-box'),
};

refs.inputField.addEventListener(
  'input',
  debounce(fetchCountries, DEBOUNCE_DELAY)
);
