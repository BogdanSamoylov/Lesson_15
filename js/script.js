window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    let tab        = document.querySelectorAll('.info-header-tab'),
        info       = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for(let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event)=> {
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            } 
        }
    });

    let deadline = '2020-10-21';

    let getTimeRemeining = (endtime) => {
        let t       = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours   = Math.floor((t/(1000*60*60)));

            return {
                'total'  : t,
                'hours'  : hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }

    let setClock = (id, endtime) => {
       let timer         = document.getElementById(id),
           hours         = timer.querySelector('.hours'),
           minutes       = timer.querySelector('.minutes'),
           seconds       = timer.querySelector('.seconds'),
           TimerInterval = setInterval(updateClock, 1000);

           function updateClock() {
               let t = getTimeRemeining(endtime);
               hours.textContent   = Zero(t.hours);
               minutes.textContent = Zero(t.minutes);
               seconds.textContent = Zero(t.seconds);

               if(t.total<=0) {
                  clearInterval(TimerInterval);
                  hours.textContent   = '00';
                  minutes.textContent = '00';
                  seconds.textContent = '00';
               }
               function Zero(num) {
                if(num<=9){
                  return '0' + num;
                }else 
                    return num;
                }
            }      
    }
    setClock('timer', deadline);

    let more    = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close   = document.querySelector('.popup-close');

    more.addEventListener('click', ()=> {
         overlay.style.display = 'block';
         this.classList.add('more-splash');
         document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', ()=> {
          overlay.style.display = 'none';
          more.classList.add('more-splash');
          document.body.style.overflow = '';
    });

    class Options {
        constructor (height, width, bg, fontSize, textAlign) {
           this.height    = height;
           this.width     = width;
           this.bg        = bg;
           this.fontSize  = fontSize;
           this.textAlign = textAlign;
        }

        CreateDiv () {
            let div = document.createElement ('div');
            document.body.appendChild(div);
            let param = `height:    ${this.height}px; 
                         width:     ${this.width}px; 
                         bg:        ${this.bg}; 
                         fontSize:  ${this.fontSize}px; 
                         textAlign: ${this.textAlign};`;
            div.style.cssText = param;
        }
    }

    const item = new Options (300, 350, "white", 14, "center");
    item.CreateDiv();

    //Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы скоро с вами свяжемся!',
        failure: 'Что-то пошло не так...'
      };
     
      let form = document.querySelector('.main-form'),
        contactForm = document.querySelector('#form'),
        statusMessage = document.createElement('div');
     
      statusMessage.classList.add('status');
     
      form.addEventListener('submit', sendForm);
      contactForm.addEventListener('submit', sendForm);
     
      function sendForm(event) {
        event.preventDefault();
        event.target.appendChild(statusMessage);
     
        let formData = new FormData(event.target);
        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);
     
        function postData(data) {
          return new Promise(function(resolve, reject){
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      
            request.send(data);
      
            request.addEventListener('readystatechange', function () {
              if (request.readyState < 4) {
                resolve();
              } else if (request.readyState === 4 && request.status == 200) {
                resolve();
              } else {
                reject();
              }
            });
      
            let input = event.target.getElementsByTagName('input');
            for (let i = 0; i < input.length; i++) {
              input.value = '';
            }
          });
        }
     
        postData(json)
          .then(() => statusMessage.innerHTML = message.loading)
          .then(() => statusMessage.innerHTML = message.success)
          .catch(() => statusMessage.innerHTML = message.failure);
      }

      //Slider

      let slideIndex = 1,
          slides     = document.querySelectorAll('.slider-item'),
          prev       = document.querySelector('.prev'),
          next       = document.querySelector('.next'),
          dotsWrap   = document.querySelector('.slider-dots'),
          dots       = document.querySelectorAll('.dot');

      showSlides(slideIndex);

      function showSlides (n) {
        if (n > 1){
          slideIndex = 1;
        }
        if (n < 1){
          slideIndex = slides.length;
        }
          slides.forEach((item) => item.style.display = 'none');
          dots.forEach((item)   => item.classList.remove('dot-active'));
          slides[slideIndex - 1].style.display = 'block';
          dots[slideIndex - 1].classList.add('dot-active');
      }

      function plusSlides (n) {
         showSlides(slideIndex += n);
      }
      function currentSlides (n) {
        showSlides(slideIndex = n);
      }

      prev.addEventListener('click', function() {
        plusSlides(-1);
      });

      next.addEventListener('click', function () {
        plusSlides(1);
      });

      dotsWrap.addEventListener('click', function(event) {
        for(i=0; i < dots.length + 1; i++){
          if(event.target.classList.contains('dot') && event.target == dots[i-1]){
            currentSlides(i);
           }
         }
      });
});

sendForm(form);
sendForm(formBottom);