class ExcursionsAPI {
constructor() {
    this.urlExcursions = 'http://localhost:3000/excursions';
    this.urlOrders = 'http://localhost:3000/orders';

}

loadExcursions() {
    this._fetch(this.urlExcursions)
        .then(data => this.insertExcursions(data))
        .catch(err => console.error(err))
}

insertExcursions(excursionsArr) {
    const ulEl = document.querySelector('.panel__excursions');
    // ulEl.innerHTML = '';
    excursionsArr.forEach( item => {
        const liEl = this._createLiEl(item);
        ulEl.appendChild(liEl)
    })

}   

_createLiEl( item ) {
    console.log(item)
    const {id, name, description, adultPrice, childPrice} = item;

    const liElPrototype = document.querySelector('.excursions__item--prototype');
    const newLiEl = liElPrototype.cloneNode(true);
    newLiEl.classList.remove('excursions__item--prototype')
    
    const [headerEl, formEl] = newLiEl.children;
    const [titleLi, descriptionLi] = headerEl.children;
    const [adultEl, childEl, submitEL] = formEl.children;
    const [adultPriceEl] = adultEl.children[0].children;
    const [childPriceEl] = childEl.children[0].children;

    newLiEl.dataset.id = id;
    titleLi.innerText = name;
    descriptionLi.innerText = description;
    adultPriceEl.innerText = adultPrice;
    childPriceEl.innerText = childPrice;

    console.dir(adultEl.children[0])    
    console.log(newLiEl)
    return newLiEl
}

_fetch(url, options) {
    return fetch(url, options)
    .then(resp => {
        if(resp.ok) {return resp.json()}
        return Promise.reject(resp)
    })
}

}

export default ExcursionsAPI;