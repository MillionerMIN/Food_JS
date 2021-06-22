'use strict';

window.addEventListener('DOMContentLoaded', () => {
   const tabs = require('./modules/tabs'),     //Tab
      timer = require('./modules/timer'),      // Timer
      modal = require('./modules/modal'),      // Model window
      cards = require('./modules/cards'),      //Используем классы для карточек
      forms = require('./modules/forms'),      //Forms
      slider = require('./modules/slider'),   // Slider
      calc = require('./modules/calc');      // Calc

   tabs();
   timer();
   modal();
   cards();
   forms();
   slider();
   calc();
});