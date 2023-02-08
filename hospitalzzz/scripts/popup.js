let modalWindow = {
  closeBtn: document.querySelector('.modal-wrapper__content__close-btn'),
  inputModal: document.querySelectorAll('.input__form'),
  buttonArray: document.querySelectorAll('.button-consultation'),
  buttonModal: document.querySelector('.button-consultation__modal'),
  modalWrapper: document.querySelector('.modal'),
  modal: document.querySelector('.order-a-consultation__modal'),
  start: function() {
    this.openWindow();
    this.closeWindow();
    // this.send();
  },
  openWindow: function() {
    for (let i = 0; i < this.buttonArray.length; i++) {
      this.buttonArray[i].addEventListener('click', () => {
        console.log('wwww');
        this.modal.classList.toggle('order-a-consultation__modal__active');
      });
    }
  },
  closeWindow: function() {
    this.modalWrapper.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.modal.classList.toggle('order-a-consultation__modal__active');
        let p = 0;
        while (p < this.inputModal.length) {
          this.inputModal[p].value = '';
          p++;
        }
      }
    });
    this.closeBtn.addEventListener('click', (e) => {
      this.modal.classList.toggle('order-a-consultation__modal__active');
      let p = 0;
      while (p < this.inputModal.length) {
        this.inputModal[p].value = '';
        p++;
      }
    });
  },

};

modalWindow.start();
