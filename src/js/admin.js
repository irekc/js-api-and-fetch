import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

const excursions = new ExcursionsAPI();

excursions.loadExcursions()

console.log('admin');