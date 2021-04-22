let modalWindowWithTimeout = document.querySelector('.modal-time');
let wrapModalWindowWithTimeout = document.querySelector('.wrap-modal-time')

function showModalWindow() {
    //show
    setTimeout(() => {
            modalWindowWithTimeout.classList.add('active');
        }, 5000)
        //close
    wrapModalWindowWithTimeout.addEventListener('click', function(event) {
        if (event.target.classList.contains('wrap-modal-time')) {
            modalWindowWithTimeout.classList.remove('active');
        } else {
            return false;
        }
    });
}



// showModalWindow();