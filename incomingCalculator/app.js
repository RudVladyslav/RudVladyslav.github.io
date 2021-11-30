// income inputs
const incomeSalary = document.getElementById('income-salary'),
    incomeFreelance = document.getElementById('income-freelance'),
    incomeExtra1 = document.getElementById('income-extra-1'),
    incomeExtra2 = document.getElementById('income-extra-2');

// costs inputs
const costsFlat = document.getElementById('costs-flat'),
    costsHouseService = document.getElementById('costs-house-service'),
    costTransport = document.getElementById('cost-transport'),
    costCredit = document.getElementById('cost-credit');

//total inputs
const totalMonthInput = document.getElementById('total-month'),
    totalDayInput = document.getElementById('total-day'),
    totalYearInput = document.getElementById('total-year');

let totalMonth, totalDay, totalYear;

//money box
const moneyBoxRange = document.getElementById('money-box-range'),
    accumulationInput = document.getElementById('accumulation'),
    spend = document.getElementById('spend');

let accumulation = 0;
let totalPrecents = 0;

const strToNum = str => str.value ? parseInt(str.value) : 0;

const countingAvailableMoney = () => {
    let totalPerMonth = strToNum(incomeSalary) + strToNum(incomeFreelance) + strToNum(incomeExtra1) + strToNum(incomeExtra2);
    let totalCosts = strToNum(costsFlat) + strToNum(costsHouseService) + strToNum(costTransport) + strToNum(costCredit);
    totalMonth = totalPerMonth - totalCosts;
    totalMonthInput.value = totalMonth;
}

const totalDayCalculation = () =>{
    spend.value = totalMonth-accumulation;
    totalDay= (spend.value/30);
    totalDayInput.value = totalDay.toFixed();
}

const totalYearCalculation = () =>{
    totalYear = accumulation*12;
    totalYearInput.value = totalYear.toFixed();
}

const calculationPrecents = () => {
    if (totalMonth){
        accumulation = ((totalMonth * totalPrecents)/100).toFixed();
        accumulationInput.value = accumulation;
        totalDayCalculation();
        totalYearCalculation();
    }

}

const inputs = document.querySelectorAll('.input');
for (let input of inputs) {
    input.addEventListener('input', () => {
        countingAvailableMoney();
        calculationPrecents();
    })
}

moneyBoxRange.addEventListener('input', (e) => {
    const totalPrecentEl = document.getElementById('total-precents');
    totalPrecents = e.target.value;
    totalPrecentEl.innerHTML = totalPrecents;
    calculationPrecents();
})
