let money = document.querySelector('.input__value'),
    category = document.querySelector('.input__category'),
    sendInfoButton = document.querySelector('.send-information'),
    daySpendingCategory = document.querySelector('.day__spending-wrapper__item__text'),
    daySpendingMoney = document.querySelector('.day__spending-wrapper__item__buttons'),
    totalSpend = document.querySelector('.total-value'),
    calendar = document.querySelector('.date'),
    currentDate = document.querySelector('.currentDate');

let spendsMoney;
let spendsCategory;

!localStorage.spendsMoney ? spendsMoney = [] : spendsMoney = JSON.parse(localStorage.getItem('money'));
!localStorage.spendsCategory ? spendsCategory = [] : spendsCategory = JSON.parse(localStorage.getItem('category'));

function SpendMoney(description) {
    this.description = description;
}

function SpendCategory(description) {
    this.description = description;
}

function total() {
    let p = 0;
    let currentNumber = 0;
    while (p < spendsMoney.length) {
        let nextNumber = Number(spendsMoney[p].description);
        currentNumber = currentNumber + nextNumber;
        p++;
        totalSpend.innerHTML = currentNumber + '$';
    }
}

function creatTemplateMoney(money, index) {
    return `
	    <div>
	        <p>${money.description }</p>
	        <button onclick="editSpend(${index})">Edit</button>
	        <button onclick="deleteSpend(${index})">Delete</button>
	    </div>
	`
}

function creatTemplateCategory(category) {
    return `
	    <p>${category.description+ '$'}</p>
        `
}

function fillHtmlList() {
    daySpendingMoney.innerHTML = "";
    daySpendingCategory.innerHTML = "";
    totalSpend.innerHTML = "";
    if (spendsMoney.length > 0 && spendsCategory.length > 0) {
        spendsCategory.forEach((item, index) => {
            daySpendingMoney.innerHTML += creatTemplateMoney(item, index);
        });
        spendsMoney.forEach((item, index) => {
            daySpendingCategory.innerHTML += creatTemplateCategory(item, index);
        });
        total();
        writeCurrentDay();
    }
}

fillHtmlList();

function updateLocal() {
    localStorage.setItem('money', JSON.stringify(spendsMoney));
    localStorage.setItem('category', JSON.stringify(spendsCategory));
}

function cleanInput() {
    money.value = "";
    category.value = "";
}

function editSpend(index) {
    category.value = spendsCategory[index].description;
    money.value = spendsMoney[index].description;
    spendsCategory.splice(index, 1);
    spendsMoney.splice(index, 1);
    total();
    writeCurrentDay();
    updateLocal();
    fillHtmlList();
}

function deleteSpend(index) {
    spendsCategory.splice(index, 1);
    spendsMoney.splice(index, 1);
    total();
    updateLocal();
    fillHtmlList();
}

function writeCurrentDay() {
    currentDate.innerHTML = calendar.value;
}

function error() {
    alert('ERROR');
    cleanInput();
}

sendInfoButton.addEventListener('click', () => {
    if (money.value.length > 0 && category.value.length > 0) {
        spendsMoney.push(new SpendMoney(money.value));
        spendsCategory.push(new SpendCategory(category.value));
        updateLocal();
        fillHtmlList();
        cleanInput();
        total();
        writeCurrentDay();

    } else {
        error();
    }
})