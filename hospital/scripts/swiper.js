const swiper = new Swiper('.mySwiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

});

new Swiper('.reviewSwiper',{
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
})


