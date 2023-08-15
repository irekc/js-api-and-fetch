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
    
        const titleLi = newLiEl.querySelector('.excursions__title')
        const descriptionLi = newLiEl.querySelector('.excursions__description')
        const adultPriceEl = newLiEl.querySelector('.excursions__field-name--adult')
        const childPriceEl = newLiEl.querySelector('.excursions__field-name--child')
    
        return [titleLi, descriptionLi, adultPriceEl, childPriceEl]
    }

    getObjectWithElementsLiToBasket( liEl ) {

        const titleLi = liEl.querySelector('.excursions__title');
        const adultPriceEl = liEl.querySelector('.excursions__field-name--adult');
        const childPriceEl = liEl.querySelector('.excursions__field-name--child');
        const adultsEl = liEl.querySelector('.excursions__field-input--adult');
        const childrenEl = liEl.querySelector('.excursions__field-input--children');

        return {
            title: titleLi.innerText,
            adultPrice: adultPriceEl.innerText,
            childPrice: childPriceEl.innerText,
            adults: adultsEl.value,
            children: childrenEl.value
        }
    }

    getArrWithElementsSummaryItem( item ) {
        const titleEl = item.querySelector('.summary__name');
        const totalPriceEl = item.querySelector('.summary__total-price')
        const summaryPricesEl = item.querySelector('.summary__prices')
        const removeBtn = item.querySelector('.summary__btn-remove')

        return [titleEl, totalPriceEl, summaryPricesEl, removeBtn]
    }

    getArrWithElementsToAddExcurionToBasket( btnEl ) {
        const liEl = btnEl.closest('.excursions__item');
                const errorsEl = liEl.querySelector('.excursions__field--errors')
                const adultInputEl = liEl.querySelector('.excursions__field-input--adult')
                const childrenInputEl = liEl.querySelector('.excursions__field-input--children')

                return [liEl, errorsEl, adultInputEl, childrenInputEl]
    }
}

export default Actions 