class ExcursionsAPI {
constructor() {
    this.url = 'http://localhost:3000';
    this.urlExcursions = `${this.url}/excursions`;
    this.urlOrders = `${this.url}/orders`;

}

loadExcursions() {
    return this._fetch(this.urlExcursions)
}


updateExcursions(data, id) {

    const options = {
        method: 'PUT',
        body: JSON.stringify( data ),
        headers: { 'Content-Type':'application/json' }
    };

    return this._fetch(this.urlExcursions, options, `/${id}`)
}

removeExcursions(id) {
    const options = {method: 'DELETE'};

    return this._fetch(this.urlExcursions, options, `/${id}`)
   
};

addExcursions( data ) {
   return this._add(this.urlExcursions, data)
}

addOrder( data ) {
    return this._add(this.urlOrders, data)
}

_add( url, data ) {
    const options = {
        method: 'POST',
        body: JSON.stringify( data ),
        headers: {'Content-type': 'application/json'}
    }

    return this._fetch(url, options)  

}

_fetch(urlPath, options, additionPath = '') {
    const url = urlPath + additionPath
    return fetch(url, options)
    .then(resp => {
        if(resp.ok) {return resp.json()}
        return Promise.reject(resp)
    })
}

}

export default ExcursionsAPI;