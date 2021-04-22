let readMore = {
    buttonAray: document.querySelectorAll('.arrow-btn__array'),
    hiddenText: document.querySelectorAll('.hidden-text'),
    hiddenParagraph: document.querySelectorAll('.hidden-paragraph'),
    start: function() {
        for (let i = 0; i < this.buttonAray.length; i++) {
            this.hiddenParagraph[i].classList.remove('hidden-text');
            this.buttonAray[i].addEventListener('click', () => {
                this.hiddenParagraph[i].classList.toggle('show-paragraph');
                this.hiddenText[i].classList.toggle('show-text');
                this.buttonAray[i].classList.toggle('arrow-btn__array-active');


            });

        }

    },
}

let modalWindow = {
    inputModal: document.querySelectorAll('.modal-wrapper__content-input'),
    buttonAray: document.querySelectorAll('.button-consultation'),
    buttonModal: document.querySelector('.button-consultation__modal'),
    modalWrapper: document.querySelector('.modal'),
    modal: document.querySelector('.order-a-consultation__modal'),
    start: function() {
        this.openWindow();
        this.closeWindow();
        this.send();
    },
    openWindow: function() {
        for (let i = 0; i < this.buttonAray.length; i++) {
            this.buttonAray[i].addEventListener('click', () => {
                this.modal.classList.toggle('order-a-consultation__modal__active');
            })

        }
    },
    closeWindow: function() {
        this.modalWrapper.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.modal.classList.toggle('order-a-consultation__modal__active');
                let p = 0;
                while (p < this.inputModal.length) {
                    this.inputModal[p].value = "";
                    p++;
                }
            }
        })
    },
    send: function() {
        this.buttonModal.addEventListener('click', () => {
            let p = 0;
            while (p < this.inputModal.length) {
                this.inputModal[p].value = "";
                p++;
            }
        })
    }
}

let burgerMenu = {
    burgerButton: document.querySelector('.button-burger'),
    mainBurger: document.querySelector('.main-navigation__iner-wrap'),
    openMenu: function() {
        this.burgerButton.addEventListener('click', () => {
            this.mainBurger.classList.toggle('active');
            this.burgerButton.classList.toggle('button-burger__active');
        });
    }
}

if (modalWindow && burgerMenu && readMore) {
    modalWindow.start();
    burgerMenu.openMenu();
    readMore.start();
} else if (modalWindow && burgerMenu) {
    modalWindow.start();
    burgerMenu.openMenu();
}