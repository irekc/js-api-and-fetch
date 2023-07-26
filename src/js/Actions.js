class Actions {

    createLiEl( item ) {
        const {id, name, description, adultPrice, childPrice} = item;
        const newLiEl = this.clonePrototypeToNewLi();
        const [titleLi, descriptionLi, adultPriceEl, childPriceEl] = this.getArrWithElementsToCreateAndEditLi(newLiEl);
    
        newLiEl.dataset.id = id;
        titleLi.innerText = name;
        descriptionLi.innerText = description;
        adultPriceEl.innerText = adultPrice;
        childPriceEl.innerText = childPrice;
    
        return newLiEl
    }

    clonePrototypeToNewLi() {
        const liElPrototype = document.querySelector('.excursions__item--prototype');
        console.dir(liElPrototype)
        const newLiEl = liElPrototype.cloneNode(true);
        console.log(newLiEl)
        newLiEl.classList.remove('excursions__item--prototype')
        
        return newLiEl;
    }

    getArrWithElementsToCreateAndEditLi(newLiEl) {
    
        const titleLi = newLiEl.querySelector('.excursions__title')
        const descriptionLi = newLiEl.querySelector('.excursions__description')
        const adultPriceEl = newLiEl.querySelector('.excursions__field-name--adult')
        const childPriceEl = newLiEl.querySelector('.excursions__field-name--child')
    
        return [titleLi, descriptionLi, adultPriceEl, childPriceEl]
    }



}

export default Actions 