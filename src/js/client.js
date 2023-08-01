import './../css/client.css';
import Actions from './Actions';

import ExcursionsAPI from './ExcursionsAPI';
import ServiceClient from './ServiceClient';

const api = new ExcursionsAPI();
const actions = new Actions();
// const basket = [];

document.addEventListener('DOMContentLoaded', init);

function init() {
    const clientExcursions = new ServiceClient(api, actions)
    clientExcursions.load();
    clientExcursions.addExcursionToBasket();

}
console.log('client');