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
        let timeInterval = setInterval(() => 
         {
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
        },1000);

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
    descriptionBtns.forEach(function(item,i,descriptionBtns){
        item.addEventListener('click',function(){
            let showoverlay = () =>{
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';   
            };
            showoverlay();
        });
    });
//Form with Promise
let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с Вами свяжемся!',
    failure: 'Что-то пошло не так...'
};
    let form = document.getElementsByClassName('main-form')[0],
    formBottom = document.getElementById('form'),
    input = document.getElementsByTagName('input'),
    statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    function sendForm(elem){
        elem.addEventListener('submit', function (e) {
            e.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data){
                return new Promise(function(resolve,reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//обычный формат
                    request.onreadystatechange = function(){
                        if(request.readyState < 4){
                            resolve()                            
                        } else if(request.readyState === 4){
                            if(request.status == 200 && request.status < 300){
                                resolve()
                            }
                            else {
                                reject()
                            }
                        }

                    } 
                    request.send(formData); // для обычного формата.
                });
            }//End postData

            function clearInput(){
                for (let i = 0 ; i < input.length ; i++){
                    input[i].value = '';
                }
            }
            
            postData(formData)
            .then(() => statusMessage.innerHTML = message.loading)
            .then(() =>{       
              //thanksModal.style.display = 'block';
            //mainModal.style.display = 'none';
            statusMessage.innerHTML = message.success;
            })
            .catch(() => statusMessage.innerHTML = message.failure)
            .then(clearInput)
    });
}
sendForm(form);
sendForm(formBottom);





});