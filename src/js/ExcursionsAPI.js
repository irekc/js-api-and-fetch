class ExcursionsAPI {
constructor() {
    this.url = 'http://localhost:3000';
    this.urlExcursions = `${this.url}/excursions`;
    this.urlOrders = `${this.url}/orders`;

}

loadExcursions() {
    console.log('ładowanie')
    this._fetch(this.urlExcursions)
        .then(data => this.insertExcursions(data))
        .catch(err => console.error(err))
        
}
    
insertExcursions(excursionsArr) {
    console.log('dodawanie')
    const ulEl = document.querySelector('.panel__excursions');
    ulEl.innerHTML = '';
    
    excursionsArr.forEach( item => {
        const liEl = this._createLiEl(item);
        ulEl.appendChild(liEl)
    })

}   

updateExcursions() {
    const ulEl = document.querySelector('.panel__excursions')

    console.log('edycja')
    ulEl.addEventListener('click', e => {
        e.preventDefault();
        const editBtn = e.target
        console.log('edycja')
        if(editBtn.tagName === 'INPUT') {
            const liEl = editBtn.closest('.excursions__item');
            const arrWithElToEdit = this._getArrWithElementsToCreateAndEditLi(liEl);
            const isEditable = arrWithElToEdit.every(element => element.isContentEditable);

            if(isEditable) {
                const id = liEl.dataset.id;
                const [titleLi, descriptionLi, adultPriceEl, childPriceEl] = arrWithElToEdit;
                const data = {
                    name: titleLi.innerText,
                    description: descriptionLi.innerText,
                    adultPrice: adultPriceEl.innerText,
                    childPrice: childPriceEl.innerText
                };
                const options = {
                    method: 'PUT',
                    body: JSON.stringify( data ),
                    headers: { 'Content-Type':'application/json' }
                };

                this._fetch(`${this.urlExcursions}/${id}`, options)
                    .then(resp => console.log(resp))
                    .catch(err => console.error(err))
                    .finally(() => {
                        e.target.value = 'edytuj';
                        arrWithElToEdit.forEach(element => element.setAttribute('contenteditable', false))

                    })
                
            } else {
                e.target.value = 'zapisz';
                arrWithElToEdit.forEach(element => element.setAttribute('contenteditable', true))
            }
        }
    })
   
}

removeExcursions(e) {
    console.log('usuwanie')
    const targetEl = e.target.closest('.excursions__item');
    if(targetEl.tagName === 'LI') {
        const id = targetEl.dataset.id;
        const options = {method: 'DELETE'};
        fetch(`${this.urlExcursions}/${id}`, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally(this.loadExcursions);
    }
    
   
};

addExcursions() {
    const form = document.querySelector('.panel__form');
    form.addEventListener('submit', e => {
        e.preventDefault();

        const [formName, formDescription, formAdultPrice, formChildPrice] = e.target.elements;
        const data = {
            
            name: formName.value,
            description: formDescription.value,
            adultPrice: formAdultPrice.value,
            childPrice: formChildPrice.value
        }

        console.log(data)
        const options = {
            method: 'POST',
            body: JSON.stringify( data ),
            headers: {'Content-type': 'application/json'}
        }

        this._fetch(this.urlExcursions, options)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
            .finally( this.loadExcursions )
    })

}

_createLiEl( item ) {
    const {id, name, description, adultPrice, childPrice} = item;
    const newLiEl = this._clonePrototypeToNewLi();
    const [titleLi, descriptionLi, adultPriceEl, childPriceEl] = this._getArrWithElementsToCreateAndEditLi(newLiEl);

    newLiEl.dataset.id = id;
    titleLi.innerText = name;
    descriptionLi.innerText = description;
    adultPriceEl.innerText = adultPrice;
    childPriceEl.innerText = childPrice;

    return newLiEl
}

_getArrWithElementsToCreateAndEditLi(newLiEl) {
    const [headerEl, formEl] = newLiEl.children;
    const [titleLi, descriptionLi] = headerEl.children;
    const [adultEl, childEl, submitEL] = formEl.children;
    const [adultPriceEl] = adultEl.children[0].children;
    const [childPriceEl] = childEl.children[0].children;

    return [titleLi, descriptionLi, adultPriceEl, childPriceEl]
}

_clonePrototypeToNewLi() {
    const liElPrototype = document.querySelector('.excursions__item--prototype');
    const newLiEl = liElPrototype.cloneNode(true);
    newLiEl.classList.remove('excursions__item--prototype')
    
    return newLiEl;
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