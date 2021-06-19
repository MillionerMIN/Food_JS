'use strict';

window.addEventListener('DOMContentLoaded', () => {

   //Tab
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParant = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });

      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParant.addEventListener('click', (event) => {
      const target = event.target;

      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         })
      }
   })

   // Timer

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

   // Model window

   const modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';
   }

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.style.overflow = '';
      clearInterval(modalTimeId);
   }

   modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close' == '')) {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimeId = setTimeout(openModal, 50000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);

   //Используем классы для карточек

   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 2.5;
         this.changeToBLR();
      }

      changeToBLR() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');

         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => element.classList.add(className));
         }

         element.innerHTML = `
                     <img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-descr">${this.descr}</div>
                     <div class="menu__item-divider"></div>
                     <div class="menu__item-price">
                           <div class="menu__item-cost">Цена:</div>
                           <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                     </div>
         `;
         this.parent.append(element);
      }
   }

   const getResource = async (url) => {
      const res = await fetch(url);

      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }

      return res.json();
   }

   getResource('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });


   // getResource('http://localhost:3000/menu')
   //    .then(data => createCard(data));

   // function createCard(data) {
   //    data.forEach(({ img, altimg, title, descr, price }) => {
   //       const element = document.createElement('div');

   //       element.classList.add('menu__item');
   //       element.innerHTML = `
   //                   <img src=${img} alt=${altimg}>
   //                   <h3 class="menu__item-subtitle">${title}</h3>
   //                   <div class="menu__item-descr">${descr}</div>
   //                   <div class="menu__item-divider"></div>
   //                   <div class="menu__item-price">
   //                         <div class="menu__item-cost">Цена:</div>
   //                         <div class="menu__item-total"><span>${price * 2.5}</span> руб/день</div>
   //                   </div>
   //       `
   //       document.querySelector('.menu .container').append(element);
   //    });
   // }

   
   //Forms

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Мы скоро свяжемся с вами',
      failure: 'Что-то пошло не так...'
   }

   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'appliation/json'
         },
         body: data
      });

      return await res.json();
   }

   function bindPostData(form) {

      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;
         form.insertAdjacentElement('afterend', statusMessage);

         const formData = new FormData(form); //в input обязательно должен быть отребут name

         // const object = {};
         // formData.forEach(function (value, key) {
         //    object[key] = value;
         // });

         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
            }).finally(() => {
               form.reset();
            })
      });
   }

   function showThanksModal(message) {

      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class='modal__content'>
            <div class='modal__close'>&times;</div>
            <div class='modal__title'>${message}</div>
         </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }

   // fetch('http://localhost:3000/menu')
   //    .then(data => data.json())
   //    .then(res => console.log(res));

});

