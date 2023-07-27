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

    addExcursionToBasket( basket ) {
        const ulEl = document.querySelector('.panel__excursions')

        ulEl.addEventListener('click', e => {
            e.preventDefault();
            const addBtn = e.target;
            const errors = []
            
            if(addBtn.classList.contains('excursions__field-input--submit')) {
                const liEl = addBtn.closest('.excursions__item');
                const errorsEl = liEl.querySelector('.excursions__field--errors')
                const objectWithElToAddToBasket = this.actionService.getObjectWithElementsLiToBasket( liEl )
                const {adults, children} = objectWithElToAddToBasket;

                if(!adults || !children) {
                    errors.push('oba pola muszą być uzupełnione')
                }
                
                if(isNaN(adults) || isNaN(children)) {
                    errors.push('wartości w polach muszą być liczbą')
                    console.log(errors)
                }

                if(errors.length > 0) {
                    errorsEl.innerText = errors.toString()
                } else {
                    errorsEl.innerText = '';
                    basket.push(objectWithElToAddToBasket)
                    console.log(basket)
                }
            }
        })

    }
}

export default ServiceClient;