let countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 5);
countDownDate.setHours(countDownDate.getHours() + 12);
countDownDate.setMinutes(countDownDate.getMinutes() + 10);
countDownDate.setSeconds(countDownDate.getSeconds() + 10);

const $days = document.querySelectorAll('.days');
const $hours = document.querySelectorAll('.hours');
const $minutes = document.querySelectorAll('.minutes');
const $seconds = document.querySelectorAll('.seconds');

const arrLength = $seconds.length;

const timer = function() {

  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  for (let i = 0; i < arrLength; i++) {
    $days[i].innerHTML = days.toString();
    $hours[i].innerHTML = hours.toString();
    $minutes[i].innerHTML = minutes.toString();
    $seconds[i].innerHTML = seconds.toString();
  }


};

setInterval(timer, 1000);
