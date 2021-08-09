// name	string	Имя персонажа.
// species string  Вид персонажа
// status	string	Статус персонажа («Живой», «Мертвый» или «неизвестный»).
// gender 	string	Пол персонажа («женский», «мужской», «бесполый» или «неизвестный»).
// origin 	object	origin.name место происхождения персонажа.
// location	object	location.name последнее местоположение персонажа.
// image	string (URL) Ссылка на изображение персонажа. Все изображения имеют размер 300x300 пикселей, и большинство из них - это средние снимки или портреты, поскольку они предназначены для использования в качестве аватаров.
// episode	array (urls) Список серий, в которых появлялся этот персонаж.


// https://rickandmortyapi.com/api/character
// /?page=2

///?name=Summer


// const url1 = `https://rickandmortyapi.com/api/character`;
// const urlPage = `https://rickandmortyapi.com/api/character/?page=1`;
// const urlName = `https://rickandmortyapi.com/api/character/?name=Summer`;

sendRequest('https://rickandmortyapi.com/api/character');


function sendRequest(url, pageNum) {

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            createPagesList(data.info.pages);
            createCharacter(data.results);
            addActiveClass(pageNum);
        });
}

function createCharacter(arr) {
    const characters = document.querySelector('.characters');
    for (let item of arr) {
        // console.log(item.episode);

        const character = document.createElement('div');
        character.classList.add('character');
        character.innerHTML = `<div class="character__inner"><div class="character__img"><img src="${item.image}"></div><div class="character__description"><p class="character__text">Имя: <span>${item.name}</span></p><p class="character__text">Вид: <span>${item.species}</span></p><p class="character__text">Происхождение: <span>${item.origin.name}</span></p>
        </div><button class="character__btn character__btn--open">Подробно</button></div><div class="character__inner character__additional-info  character__inner--hide "><div class="character__description"><p class="character__text">Статус: <span>${item.status}</span></p><p class="character__text">Пол: <span>${item.gender}</span></p><p class="character__text">Последний раз был замечен: <span>${item.location.name}</span></p><p class="character__text">Эпизоды с участием:</p><ul></ul></div><button class="character__btn character__btn--close">Закрыть</button></div>`;

        characters.append(character);

        // добавляем список эпизодов
        let ul = character.querySelector('ul');
        // console.log(ul);

        let episodes = item.episode;
        // console.log(episodes);
        for (let ep of episodes) {
            // console.log(ep);
            let li = document.createElement('li');
            li.textContent = ep;
            ul.append(li);
        }


        // открывть по клику
        const btnOpen = character.querySelector('.character__btn--open');
        btnOpen.addEventListener('click', (e) => {
            let elem = e.currentTarget.closest('.character');
            // console.log(elem);
            elem.style.width = 500 + 'px';
            let elemHideDiv = elem.querySelector('.character__additional-info');
            // console.log(elemHideDiv);
            elemHideDiv.classList.remove('character__inner--hide');
            btnOpen.style.display = 'none';
        });
        const btnClose = character.querySelector('.character__btn--close');

        // закрывать по клику
        btnClose.addEventListener('click', (e) => {
            let elem = e.currentTarget.closest('.character');
            console.log(elem);
            elem.style.width = 250 + 'px';
            let elemHideDiv = elem.querySelector('.character__additional-info');
            console.log(elemHideDiv);
            elemHideDiv.classList.add('character__inner--hide');
            btnOpen.style.display = 'none';
            btnOpen.style.display = 'block';
        });

    }
}

function createPagesList(amountPages) {
    const pagesList = document.querySelector('.pages-list');

    for (let i = 1; i <= amountPages; i++) {
        const page = document.createElement('li');
        page.classList.add('pages-list__item');
        page.textContent = i;
        pagesList.append(page);
        page.addEventListener('click', (e) => {
            const pageNum = e.currentTarget.innerHTML;
            // console.log(pageNum);
            clearOutput(); // очищаем предыдущий вывод
            sendRequest(`https://rickandmortyapi.com/api/character/?page=${pageNum}`, pageNum);
        });
    }


}

function clearOutput() {
    let characters = document.querySelectorAll('.character');
    characters.forEach(element => {
        element.style.display = 'none';
    });
    let pagesListItems = document.querySelectorAll('.pages-list__item');
    pagesListItems.forEach(element => {
        element.style.display = 'none';
    });
}

function addActiveClass(pageNum) {
    let pagesListItems = document.querySelectorAll('.pages-list__item');
    // console.log(pagesListItems);
    pagesListItems.forEach(el => {
        if (el.innerHTML === pageNum) {
            el.classList.add('active');
            // console.log(el);
        }
    });
}