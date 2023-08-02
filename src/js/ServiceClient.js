class ServiceClient {
    constructor(api, actions, basket=[]) {
        this.apiService = api;
        this.actionService = actions;
        this.basket = basket;
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

    addExcursionToBasket() {
        const ulEl = document.querySelector('.panel__excursions')

        ulEl.addEventListener('click', e => {
            e.preventDefault();
            const addBtn = e.target;
            const errors = []
            
            if(addBtn.classList.contains('excursions__field-input--submit')) {
                const liEl = addBtn.closest('.excursions__item');
                const errorsEl = liEl.querySelector('.excursions__field--errors')
                const objectWithElToAddToBasket = this.actionService.getObjectWithElementsLiToBasket( liEl )
                let {adults, children} = objectWithElToAddToBasket;
                const adultInputEl = liEl.querySelector('.excursions__field-input--adult')
                const childrenInputEl = liEl.querySelector('.excursions__field-input--children')

                if(!adults || !children) {
                    errors.push('oba pola muszą być uzupełnione')
                }
                
                if(isNaN(adults) || isNaN(children)) {
                    errors.push('wartości w polach muszą być liczbą')
                    console.log(errors)
                }

                if(errors.length > 0) {
                    errorsEl.innerText = errors.join(' | ')
                } else {
                    errorsEl.innerText = '';
                    this.basket.push(objectWithElToAddToBasket)
                    console.log(this.basket)
                    this.loadExcursionsInPanelSummary()
                    adultInputEl.value = '';
                    childrenInputEl.value = '';
                }
            }
        })

    }

    loadExcursionsInPanelSummary () {
        const panelSummary = document.querySelector('.panel__summary');
        const summaryItemPrototype = panelSummary.querySelector('.summary__item--prototype');
        panelSummary.innerHTML = '';
        panelSummary.appendChild(summaryItemPrototype)

        const orderTotalPriceEl = document.querySelector('.order__total-price-value')
        let orderTotalPrice = 0;

        if(summaryItemPrototype) {
            this.basket.forEach( (item, index) => {
                const {title, adultPrice, adults, childPrice, children} = item
                const newSummaryItem = summaryItemPrototype.cloneNode(true);
                newSummaryItem.classList.remove('summary__item--prototype');
                newSummaryItem.dataset.id = index;
                
                const [titleEl, totalPriceEl, summaryPricesEl, removeBtn] = this.actionService.getArrWithElementsSummaryItem( newSummaryItem );
                const totalPrice = adultPrice * adults + childPrice * children;
                orderTotalPrice += totalPrice;

                titleEl.innerText = title
                totalPriceEl.innerHTML = `${totalPrice}PLN`;
                summaryPricesEl.innerText = `dorośli: ${adults} x ${adultPrice}PLN, dzieci: ${children} x ${childPrice}PLN`;
                removeBtn.addEventListener('click', this.removeSummaryItem.bind(this))

                panelSummary.appendChild(newSummaryItem)
            })
            orderTotalPriceEl.innerText = `${orderTotalPrice}PLN`
        }

    }

    removeSummaryItem (e) {
        e.preventDefault()
        
        const liEl = e.target.closest('.summary__item')
        const id = liEl.dataset.id
        this.basket.splice(id, 1);
        this.loadExcursionsInPanelSummary()
    }

    panelOrderHandler () {
        const panelOrderForm = document.querySelector('.panel__order')
        const nameInput = panelOrderForm.querySelector('.order__field-input[name="name"]')
        const emailInput = panelOrderForm.querySelector('.order__field-input[name="email"]')
        const errorsEl = panelOrderForm.querySelector('.order__field-errors')
        const orderTotalPriceEl = panelOrderForm.querySelector('.order__total-price-value')
        
        if(panelOrderForm) {
            panelOrderForm.addEventListener('submit', (e) => {
                const name = nameInput.value;
                const email = emailInput.value;
                const errors = []
                
                
                if(!name || !email) {
                    errors.push('oba pola muszą być uzupełnione')
                }
                
                if(!email.includes('@')) {
                    errors.push('adres email musi zawierać "@"')
                }
                
                if(orderTotalPriceEl.innerText === '0PLN') {
                    errors.push('proszę dodać chociaż jedną wycieczkę')
                }
                
                if(errors.length > 0) {
                    e.preventDefault()
                    errorsEl.innerText = errors.join(' | ')
                } else {
                    alert(`twoje zamówienie zostało zrealizowane, szczegóły wysłano na adres ${emailInput.value}`)
                }
            })

        }
    }
}

export default ServiceClient;