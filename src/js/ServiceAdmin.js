class ServiceAdmin {
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

    update() {
        console.log('edycja')
        const ulEl = document.querySelector('.panel__excursions');

        ulEl.addEventListener('click', e => {
            e.preventDefault();
            const editBtn = e.target
            
            if(editBtn.classList.contains('excursions__field-input--update')) {
                const liEl = editBtn.closest('.excursions__item');
                const arrWithElToEdit = this.actionService.getArrWithElementsToCreateAndEditLi(liEl);
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
    
                    this.apiService.updateExcursions(data, id)
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

    remove() {
        const ulEl = document.querySelector('.panel__excursions')

        ulEl.addEventListener('click', e => {
        const removeBtn = e.target;

        if(removeBtn.classList.contains('excursions__field-input--remove')) {
            const liEl = removeBtn.closest('.excursions__item');
            const id = liEl.dataset.id;

            this.apiService.removeExcursions(id)
                .then(resp => console.log(resp))
                .catch(err => console.error(err))
                .finally(this.load());
        }
    })
    console.log('usuwanie')
    
    }

    add() {
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

            this.apiService.addExcursions(data)
                .then(resp => console.log(resp))
                .catch(err => console.error(err))
                .finally( this.load() ) 
    })

    }
    
}

export default ServiceAdmin