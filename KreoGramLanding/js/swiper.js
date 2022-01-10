const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    slidesPerView: "auto",
    centeredSlides: false,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
});
