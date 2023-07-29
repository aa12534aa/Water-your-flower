import { flowers } from "./database.js";

function setZoomTo90Percent() {
    const bodyElement = document.body;
    bodyElement.style.zoom = "90%";
}

window.onload = function () {
    setZoomTo90Percent();
};

let HTML = ''
flowers.forEach((flower) => {
    HTML += htmlReturn(flower);
})
document.querySelector('.js-main-grid')
    .innerHTML = HTML;

water();

setInterval(() => {
    water();
    localStorage.setItem('flowers', JSON.stringify(flowers));
}, 1000);

function water() {
    flowers.forEach(element => {
        const backgroundColor = document.querySelector(`.js-flowers-${element.id}`);

        const backgroundColorup = document.querySelector(`.js-flowers-name-${element.id}`);

        const waterDate = new Date(element.waterDate);
        const todayDate = new Date();
        
        const secondsdif = (todayDate - waterDate) / 1000;
        
        if (element.time * 60 * 60 *24 <= secondsdif) {
            backgroundColor.classList.add('waterless');
            backgroundColorup.classList.add('waterless');
            element.waterTxt = 'Your flower needs water!!';
            document.querySelector(`.js-water-text-${element.id}`)
                .innerHTML = 'Your flower needs water!!';
        }
    })
}
document.querySelectorAll('.js-water-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { flowerId } = button.dataset;
        
            const removeBackgroundColor = document.querySelector(`.js-flowers-${flowerId}`);

            const removeBackgroundColorup = document.querySelector(`.js-flowers-name-${flowerId}`);

            removeBackgroundColor.classList.remove('waterless');

            removeBackgroundColorup.classList.remove('waterless');

            flowers.forEach(element => {
                if (element.id === flowerId) {
                    element.waterDate = new Date();

                    element.waterTxt = 'When the background color will turn red water your flower!';
                    document.querySelector(`.js-water-text-${element.id}`)
                        .innerHTML = 'When the background color will turn red water your flower!';
                }
            })
            localStorage.setItem('flowers', JSON.stringify(flowers));
            
        });
    });

document.querySelectorAll('.js-button-update')
    .forEach((button) => {
        button.addEventListener('click', () => {
            const { flowerId } = button.dataset;
            var inputElement = document.querySelector(`.js-input-update-${flowerId}`);
            const newTiming = Number(inputElement.value);

            flowers.forEach(element => {
                if (element.id === flowerId) {
                    element.time = newTiming;
                }
            })
            localStorage.setItem('flowers', JSON.stringify(flowers));
        });
    });

document.querySelector('.js-button-search')
    .addEventListener('click', () => {
        searchFlower();
        document.querySelector(`.js-search-input`)
            .value = '';
    })
document.querySelector('.js-search-input')
    .addEventListener('keydown', (Event) => {
        if (Event.key === 'Enter') {
            searchFlower();
            document.querySelector(`.js-search-input`)
            .value = '';
        }
    })

function searchFlower() {
    var inputElement = document.querySelector(`.js-search-input`);
    const flowerName = inputElement.value;

    if (!flowerName) {
        HTML = ''
        flowers.forEach((flower) => {
            HTML += htmlReturn(flower);
        })
    }
    flowers.forEach(flower => {
        if (flower.name === flowerName) {
            HTML = htmlReturn(flower);
        } 
    })
    document.querySelector('.js-main-grid')
        .innerHTML = HTML;
}

function htmlReturn(flower) {
    var html =
    `
    <div class="flower-container">
        <div class="flower-name js-flowers-name-${flower.id}">
            ${flower.name}
        </div>
        <img class="img-flower" src="${flower.img}">
        <div class="flower-widgets js-flowers-${flower.id}">
            <div class="water-text js-water-text-${flower.id}">
                ${flower.waterTxt}
            </div>
            <button class="water-button js-water-button" data-flower-id="${flower.id}">
                Give water
            </button>
            <div class="update-txt">
                Enter every how many days you want to water your flowers
            </div>
            <div>
                <input class="input-update js-input-update-${flower.id}" placeholder="write">
                <button class="button-update js-button-update" data-flower-id="${flower.id}">
                Update
                </button>
            </div>
        </div>
    </div>
    `
    return html;
}
console.log(flowers);