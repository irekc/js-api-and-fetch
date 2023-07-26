class ServiceClient {
    constructor(api, actions) {
        this.apiService = api;
        this.actionService = actions;
    }

    load() {
        this.apiService.loadExcursions()
            .then(data => this.insert( data ))
            .catch(err => console.error(err))
    }

    insert( excursionsArr ) {
        const ulEl = document.querySelector('.panel__excursions');
        ulEl.innerHTML = '';
        
        excursionsArr.forEach( item => {
            const liEl = this.actionService.createLiEl(item);
            ulEl.appendChild(liEl)
        })
    }
}

export default ServiceClient;