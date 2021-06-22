function timer() {
   const deadLine = '2021-06-25';

   function getTimeRemaining(endTime) {
      const t = Date.parse(endTime) - Date.parse(new Date()),
         days = Math.floor(t / (1000 * 60 * 60 * 24)),   //получим количество дней из миллисекунд
         hours = Math.floor(t / (1000 * 60 * 60) % 24),  //получим количество часов из миллисекунд
         minutes = Math.floor((t / 1000 / 60) % 60),  //получим количество минут из миллисекунд
         seconds = Math.floor((t / 1000) % 60); //получим количество секунд из миллисекунд

      return {
         'total': t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      }
   }


   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endTime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);

      updateClock(); //вызвали  функцию для того что б при обнавлении страницы счетчик сразу обнавился 

      function updateClock() {
         const t = getTimeRemaining(endTime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadLine);
}

module.exports = timer;