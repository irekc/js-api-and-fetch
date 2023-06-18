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
        const newLiEl = liElPrototype.cloneNode(true);
        newLiEl.classList.remove('excursions__item--prototype')
        
        return newLiEl;
    }

    getArrWithElementsToCreateAndEditLi(newLiEl) {
        const [headerEl, formEl] = newLiEl.children;
        const [titleLi, descriptionLi] = headerEl.children;
        const [adultEl, childEl] = formEl.children;
        const [adultPriceEl] = adultEl.children[0].children;
        const [childPriceEl] = childEl.children[0].children;
    
        return [titleLi, descriptionLi, adultPriceEl, childPriceEl]
    }

}

export default Actions