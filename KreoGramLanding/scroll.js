const ourCompany = document.querySelector('#our-company')
const examples = document.querySelector('#examples')
const reviews = document.querySelector('#reviews')

const ourCompanyPosition = document.querySelector('#our-company-position')
const examplesPosition = document.querySelector('#example-position')
const reviewsPosition = document.querySelector('#reviews-position')

const rect = (element) => {
    return element.getBoundingClientRect();

}


ourCompany.addEventListener('click', () => {
    let positionX = rect(ourCompanyPosition).x,
        positionY = rect(ourCompanyPosition).y;
    console.log(positionX, positionY)
    window.scrollTo(positionX, positionY)
})

examples.addEventListener('click', () => {
    let positionX = rect(examplesPosition).x,
        positionY = rect(examplesPosition).y;
    console.log(positionX, positionY)
    window.scrollTo(positionX, positionY)
})

reviews.addEventListener('click', () => {
    let positionX = rect(reviewsPosition).x,
        positionY = rect(reviewsPosition).y;
    console.log(positionX, positionY)
    window.scrollTo(positionX, positionY)
})