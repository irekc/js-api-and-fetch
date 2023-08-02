import './../css/admin.css';

import ExcursionsAPI from './ExcursionsAPI';
import ServiceAdmin from './ServiceAdmin';
import Actions from './Actions';

const api = new ExcursionsAPI();
const actions = new Actions()

document.addEventListener('DOMContentLoaded', init)

function init() {
    
    const excursions = new ServiceAdmin(api, actions)
    excursions.load();
    excursions.update();
    excursions.remove();
    excursions.add();
}

