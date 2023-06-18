class ExcursionsAPI {
constructor() {
    this.url = 'http://localhost:3000';
    this.urlExcursions = `${this.url}/excursions`;
    this.urlOrders = `${this.url}/orders`;

}

loadExcursions() {
    return this._fetch()
}


updateExcursions(data, id) {

    const options = {
        method: 'PUT',
        body: JSON.stringify( data ),
        headers: { 'Content-Type':'application/json' }
    };

    return this._fetch(options, `/${id}`)
}

removeExcursions(id) {
    const options = {method: 'DELETE'};

    return this._fetch(options, `/${id}`)
   
};

addExcursions( data ) {
    const options = {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {'Content-type': 'application/json'}
    }

    return this._fetch(options)   
}

_fetch(options, additionPath = '') {
    const url = this.urlExcursions + additionPath
    return fetch(url, options)
    .then(resp => {
        if(resp.ok) {return resp.json()}
        return Promise.reject(resp)
    })
}

}

export default ExcursionsAPI;