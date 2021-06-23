'use strict';
import tabs from './modules/tabs';    //Tab
import timer from './modules/timer';     // Timer
import modal from './modules/modal';      // Model window
import cards from './modules/cards';      //Используем классы для карточек
import forms from './modules/forms';     //Forms
import slider from './modules/slider';  // Slider
import calc from './modules/calc';     // Calc
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
   const modalTimeId = setTimeout(() => { openModal('.modal', modalTimeId)}, 30000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   timer('.timer', '2021-07-11');
   modal('[data-modal]', '.modal', modalTimeId);
   cards();
   forms('form' ,modalTimeId);
   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      feild: '.offer__slider-inner'
   });
   calc();
});