"use strict"
// ? =========== Разворот на весь экран сертификатов и достижений ==============
const modalWindow = document.querySelector('.modal__window');   // ^ Модальное окно
const awardSection = document.querySelector('.award__section');   // ^ Секция с картами
const cardItems = document.querySelectorAll('.card');   // ^ Массив карт

function closeModal(card) {   // ^ Закрытие модального окна
    let imageModal = modalWindow.querySelector('img');   // ^ Записываю картинку модального окна

    modalWindow.classList.remove('_active');   // ^ !Создаю модальное окно

    if(imageModal != null) {   // ^ Если она существует - удаляю
        imageModal.remove();   // ^ !Создаю клон картинки
    }

    document.body.classList.remove('_modal-open');   // ^ !Блокирую скрол
    if(card) {
        card.lastElementChild.classList.add('_hidden');   // ^ !Открываю картинку
        card.classList.remove('_active');   // ^ !Раскручиваю карту
    }
}

modalWindow.addEventListener('click', function(e) {   // ^ Сдушаю клики по модальному окну
    if(!e.target.closest('img')) {    // ^ Если клик произошёл по окну
        cardItems.forEach(el => {   // ^ Ищу активную карту
            if (el.classList.contains('_active')) {
                let card = el;

                closeModal(card);   // ^ Закрываю окно
            }
        });

        closeModal();
    }
});

awardSection.addEventListener('click', function(e) {   // ^ Остлеживаю клики на секцию
    if(e.target.closest('.card__button')) {
        let card = e.target.closest('.card');   // ^ Запоминаю карут на которую кликнули
        let cardImage = card.lastElementChild.lastElementChild;

        modalWindow.classList.add('_active');   // ^ Создаю модальное окно
        modalWindow.appendChild(cardImage.cloneNode())   // ^ Создаю клон картинки
        document.body.classList.add('_modal-open');   // ^ Блокирую скрол
        card.lastElementChild.classList.remove('_hidden');   // ^ Открываю картинку
        card.classList.add('_active');   // ^ Раскручиваю карту
    }
});

// ? =========== Открытие аватарки ==============

function openAvatar(el) {
    let image = el.lastElementChild;   // ^ Записываю картинку для её создания

    modalWindow.classList.add('_active');   // ^ Создаю модальное окно
    modalWindow.appendChild(image.cloneNode())   // ^ Создаю клон картинки
    document.body.classList.add('_modal-open');   // ^ Блокирую скрол
}

// ? =========== Копирование текста с карточки ==============

function copyText(el) {   // ^ Функция копирования
    let temp = document.createElement("input");   // ^ Создаю инпут
    document.body.appendChild(temp);   // ^ Добавляю его на страницу
    let dirtyValue = el.querySelector('.contact-value').textContent;   // ^ Копирую нужный текст
    let value = dirtyValue.trim();   // ^ Избавляюсь от пробелов
    temp.setAttribute("value", value);   // ^ Даю значение с карточки
    temp.select();   // ^ Делаю его выбранным
    document.execCommand("copy");   // ^ Копирую текст с валью
    temp.remove();   // ^ Удаляю инпут
}

// ? =========== Слайдер ==============
const sliderLine = document.querySelector('.slider__line');   // ^ Линия с картинками
const sliderImage = document.querySelectorAll('.slider__img');   // ^ Массив картинок

let count = 0;   // ^ Счётчик

function sliderMove(number) {   // ^ Функция при клике на кнопку
    count = count + number;   // ^ Изменения счётчика

    if(count < 0) {   // ^ Обработка недопустимых значений
        count = sliderImage.length - 1;
    }
    if(count > sliderImage.length - 1) {   // ^ Обработка недопустимых значений
        count = 0;
    }

    rollSlider();   // ^ Функция сдвига слайдера
};

function rollSlider() {   // ^ Функция сдвига слайдера
    let width = sliderImage[count].offsetWidth;   // ^ Нахожу размер картинки

    sliderLine.style.transform = 'translate(-' + count * width + 'px)'   // ^ Двигаю линию
}