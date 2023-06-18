import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';

const excursions = new ExcursionsAPI();

document.addEventListener('DOMContentLoaded', init)

function init() {
    
    excursions.addExcursions();
    excursions.updateExcursions();
    excursions.loadExcursions();
    
    console.log('admin');
}

