//import "@babel/polyfill";

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    // пишем таймер:

    let deadline = '2020-10-21';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');


        //let timeInterval = setInterval(updateClock, 1000);


        // function updateClock() {
        //     let t = getTimeRemaining(endtime);
        //     if (t.seconds < 10) {
        //         t.seconds = '0' + t.seconds;
        //     }
        //     if (t.minutes < 10) {
        //         t.minutes = '0' + t.minutes;
        //     }
        //     if (t.hours < 10) {
        //         t.hours = '0' + t.hours;
        //     }
        //     hours.textContent = t.hours;
        //     minutes.textContent = t.minutes;
        //     seconds.textContent = t.seconds;
        //     if (t.total <= 0) {
        //         clearInterval(timeInterval);
        //     }
        // }
        // переписываем setInterval в ES6:
        let timeInterval = setInterval(() => {
            let t = getTimeRemaining(endtime);
            if (t.seconds < 10) {
                t.seconds = '0' + t.seconds;
            }
            if (t.minutes < 10) {
                t.minutes = '0' + t.minutes;
            }
            if (t.hours < 10) {
                t.hours = '0' + t.hours;
            }
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }, 1000);

    }

    setClock('timer', deadline);

    // модальное окно
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        // console.log(this); искала класс more-splash
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // подключаем модальное окно к кнопкам Узнать больше:

    let descriptionBtns = document.querySelectorAll('.description-btn');
    //     description = document.querySelectorAll('.description');
    // console.log(description);

    // в стандарте ES5:
    // function showOverlay() {
    //         overlay.style.display = 'block';
    //         document.body.style.overflow = 'hidden';

    // }


    // можно и через цикл:

    // for (let i = 0; i < descriptionBtns.length; i++){
    //     descriptionBtns[i].addEventListener('click', function(){
    //         showOverlay();
    //     });
    // }

    // descriptionBtns.forEach(function(item,i,descriptionBtns){
    //     item.addEventListener('click',function(){
    //         showOverlay();
    //     });
    // });

    // переписываем в ES6 делаем функцию showOverlay стрелочной :
    descriptionBtns.forEach(function (item, i, descriptionBtns) {
        item.addEventListener('click', function () {
            let showoverlay = () => {
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            };
            showoverlay();
        });
    });

    //Form для двух форм отдельно :

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    // let form = document.querySelector('.main-form'),
    // input = form.getElementsByTagName('input'),
    // statusMessage = document.createElement('div');
    // statusMessage.classList.add('status');

    // form.addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);
    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//обычный формат
    //    // request.setRequestHeader('Content-type','application/json;charset = utf - 8');/*заголо
    //    // вок запроса в формате JSON*/

    //     let formData = new FormData(form);

    //     //для формата JSON создаем промежуточный объект:
    //     // let obj = {};
    //     // formData.forEach(function(value, Key){
    //     //     obj[Key] = value;
    //     // });
    //     // let json = JSON.stringify(obj);
    //    // request.send(json);// - поменяли тело запроса.

    //     request.send(formData); // для обычного формата.


    //     request.addEventListener('readystatechange', function () {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0 ; i < input.length ; i++){
    //         input[i].value = '';
    //     }
    // });

    // //подключаем скрипт отправки данных к контактной форме:
    // let contactForm = document.querySelector('.contact-form'),
    // inputContactForm = contactForm.getElementsByTagName('input');

    // contactForm.addEventListener('submit', function(event){
    //     event.preventDefault();
    //     contactForm.appendChild(statusMessage);
    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    //     let contactFormData = new FormData();

    //         contactFormData.append('email',inputContactForm[0].value);
    //         contactFormData.append('tel',inputContactForm[1].value);


    //     request.send(contactFormData);

    //     request.addEventListener('readystatechange', function () {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0 ; i < inputContactForm.length ; i++){
    //         inputContactForm[i].value = '';
    //     }

    // });
    //Form Common
    let form = document.getElementsByClassName('main-form')[0],
        formBottom = document.getElementById('form'),
        input = document.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //обычный формат

            let formData = new FormData(elem);

            request.send(formData); // для обычного формата.

            request.onreadystatechange = function () {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4) {
                    if (request.status == 200 && request.status < 300) {
                        //thanksModal.style.display = 'block';
                        //mainModal.style.display = 'none';
                        statusMessage.innerHTML = message.success;
                    } else {
                        statusMessage.innerHTML = message.failure;
                    }
                }
            };


            for (let i = 0; i < input.length; i++) {
                input[i].value = '';
            }
        });
    }

    sendForm(form);

    sendForm(formBottom);

    //slider:
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plussSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function () {
        plussSlides(-1);
    });

    next.addEventListener('click', function () {
        plussSlides(1);
    });

    //реализуем точки:
    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') &&
                event.target == dots[i - 1]) {
                currentSlide(i);

            }
        }
    });

    //calc:
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {

        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function () {

        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }

    });

    

});