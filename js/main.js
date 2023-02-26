
let categoriesList = document.querySelector('.categories-list');

let categories = document.querySelectorAll('.categories-list li');


let goods = document.querySelector('.goods');

let goodsList = document.querySelectorAll('.goods ul');

let itemsGoods = document.querySelectorAll('.goods li');


let infoPart = document.querySelector('.info');

let itemsInfo = document.querySelectorAll('.info li');



        categoriesList.addEventListener('click', (e) => {
            for (let i = 0; i < categories.length; i++) {
                if (e.target === categories[i]) {
                    goods.classList.add('active');
                    goodsList[i].classList.add('active');

                    for (let j = 0; j < categories.length; j++)
                    if (categories[j] != categories[i]) {
                        goodsList[j].classList.remove('active');
                    };
                };
            };
        });


        goods.addEventListener('click', (e) => {
                for (let i = 0; i < itemsGoods.length; i++) {
                    if (e.target.closest('li') === itemsGoods[i]) {
                        infoPart.classList.add('active');
                        itemsInfo[i].classList.add('active');

                        for (let j = 0; j < itemsGoods.length; j++)
                        if (itemsInfo[j] != itemsInfo[i]) {
                            itemsInfo[j].classList.remove('active');
                        };
                    };
                };
        });




let buyBtn = document.querySelector('.btn-buy');
let ordering = document.querySelector('.ordering');

buyBtn.addEventListener('click', () => {
        ordering.classList.add('active');
});




let testName = new RegExp('^[а-яёїґі]+\\s+[а-яёїґі]+\\s+[а-яёїґі]+$','i');
let nameInput = document.querySelector('.ordering__name');

let testCity = new RegExp('.');
let cityInput = document.querySelector('.ordering__city');

let testNovaPoshta = new RegExp('^[а-яёїґі\\d\\s]+$','i');
let poshtaInput = document.querySelector('.ordering__nova-poshta');

let cashInput = document.querySelector('.payment-method__cash');
let bankCardInput = document.querySelector('.payment-method__bank-card');

let testQuantity = new RegExp('^[1-9]\\d{0,}$');
let numberProduct = document.querySelector('.ordering__quantity-products');

let orderingPayment = document.querySelector('.ordering__payment-method');




let errorEmpty = 'Це обов`язкове поле.';
let errorName = 'Будь ласка, введіть повне ПІБ кирилицею.';
let errorCity = 'Оберіть місто.'
let errorPoshta = 'Будь ласка, вкажіть склад нової пошти кирилицею.';
let errorQuantity = 'Товар продається в кількості не менш ніж 1.';
let errorPayment = 'Оберіть спосіб оплати.';





function createErrorElement(elementBefore) {
        let errorElement = document.createElement('p');
        elementBefore.after(errorElement);
};


function validation(input, test, error) {

    let inputTrim = input.value.trim();
    let testResult = test.test(inputTrim);

    if (!testResult) {
        input.classList.add('error');
        if (input.nextElementSibling.tagName != 'P') {
            createErrorElement(input);
        }
        if (input.nextElementSibling.tagName === 'P') {
            if (input.value === '') {
            input.nextElementSibling.textContent = errorEmpty;
            } else {
            input.nextElementSibling.textContent = '';
            input.nextElementSibling.textContent = error;
        };
    };
    } else {
        input.classList.remove('error');
        if (input.nextElementSibling.tagName === 'P') {
            input.nextElementSibling.remove();
        };
    };
    return testResult;
};


function validationPayment() {

    if (!cashInput.checked && !bankCardInput.checked) {
        cashInput.classList.add('error');
        bankCardInput.classList.add('error');
        if (orderingPayment.nextElementSibling.tagName != 'P') {
            createErrorElement(orderingPayment);
        }
        orderingPayment.nextElementSibling.textContent = errorPayment;
        return false;
    } else if (orderingPayment.nextElementSibling.tagName === 'P') {
        orderingPayment.nextElementSibling.remove();
    } 
    if (cashInput.checked || bankCardInput.checked) {
        cashInput.classList.remove('error');
        bankCardInput.classList.remove('error');
        return true;
    };
};



nameInput.addEventListener('focusout', () => {
    validation(nameInput, testName, errorName);
});

cityInput.addEventListener('blur', () => {
    validation(cityInput, testCity, errorCity);
})

poshtaInput.addEventListener('focusout', () => {
    validation(poshtaInput, testNovaPoshta, errorPoshta);
});

numberProduct.addEventListener('focusout', () => {
    validation(numberProduct, testQuantity, errorQuantity);
});

cashInput.addEventListener('click',validationPayment);
bankCardInput.addEventListener('click', validationPayment);



let container = document.querySelector('.purchased');
let btnInPurchased = document.querySelector('.btn-purchased');




ordering.addEventListener('submit', (e) => {
    e.preventDefault();
       let nameValidation = validation(nameInput, testName, errorName);
       let validationCity = validation(cityInput, testCity, errorCity)
       let poshtaValidation = validation(poshtaInput, testNovaPoshta, errorPoshta);
       validationPayment();
       let quantityValidation = validation(numberProduct, testQuantity, errorQuantity);

        if (nameValidation && validationCity && poshtaValidation && validationPayment && quantityValidation) {

            container.classList.add('active');
            let formCopy = ordering.cloneNode(true);
            container.insertBefore(formCopy, btnInPurchased);
            let selectedProduct = document.querySelector('.info li.active');
            let selectedProductCopy = selectedProduct.cloneNode(true);
            container.insertBefore(selectedProductCopy, formCopy);
            let selectIndex = document.querySelector('.ordering select').selectedIndex;
            let selectArr = document.querySelector('.purchased select').options;
            let inputsArr = document.querySelectorAll('.purchased input');
                selectArr[0].removeAttribute('selected');
                for (i = 0; i < selectArr.length; i++) {
                    if (selectIndex === i) {
                        selectArr[i].setAttribute('selected', 'selected');
                    };
                };
                for (i = 0; i < inputsArr.length; i++) {
                        inputsArr[i].setAttribute('disabled', 'disabled');
                };
            document.querySelector('.purchased select').setAttribute('disabled', 'disabled');
            infoPart.classList.remove('active');
            goods.classList.remove('active');
            document.querySelector('.purchased .valid-purchase-btn').remove();
            btnInPurchased.classList.add('active');
            
    };
});



btnInPurchased.addEventListener('click', () => {
    container.classList.remove('active');
    document.querySelector('.purchased li').remove();
    document.querySelector('.purchased .ordering').remove();
});








