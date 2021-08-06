let getData = {
    dataForm: document.querySelector('.data-form'),
    saveBtn: document.querySelector('.save-btn'),

    start: function () {
        let that = this
        this.saveBtn.addEventListener('click', () => {
            that.generateData(that.getValue())
        })
    },

    getValue: function () {
        let inputValue = {}
        let inputArray = this.dataForm.querySelectorAll('input')
        for (let i = 0; i < inputArray.length; i++) {
            let value = inputArray[i].value
            let inputType = inputArray[i].dataset.inputtype
            inputValue = { ...inputValue, [inputType]: Number(value) }
        }
        return inputValue
    },

    generateData: function (value) {
        let randomNumber = value.random
        if (randomNumber >= 1 & randomNumber <= 10 & Number.isInteger(randomNumber)) {
            let myCef = Math.pow((value.myAge + value.myMarkTp) * value.myMarkSesia / value.myBirthday - value.myHeight, randomNumber)
            let friendCef = Math.pow((value.friendsAge + value.friendsMarkTp) * value.friendsMarkSesia / value.friendsBirthday - value.friendsHeight, randomNumber)
            console.log(myCef);
            console.log(friendCef);
            
            if (myCef >= friendCef) {
                alert('I am better then my friend!')
            } else {
                alert('My friend is nerd!')
            }
        } else {
            alert('Your random number is wrong')
        }
    }
}
getData.start()