const photos = [{src: "assets/5804446092_4c69ea8dc4_c.jpg", width: 799, height: 532,},
                {src: "assets/8480103158_ccfdd4bea7_w.jpg", width: 400, height: 266,},
                {src: "assets/8544713443_f54d8c476b_w.jpg", width: 400, height: 266,},
                {src: "assets/andrew-neel-cckf4TsHAuw-unsplash.jpg", width: 640, height: 427,},
            ]

// получение filename
function getFilename () {
    return this.src.replace(/^.*[\\\/]/, '');
}

let counter = {
    count: 0,
    count_prev: 0,

    increment() {
        if (this.count < photos.length - 1) {
            this.count++;
            this.count_prev = this.count - 1;
        } else {
            this.count = 0;
            this.count_prev = photos.length - 1;
        };
    },

    decrement() {
        if (this.count > 0) {
            this.count--;
            this.count_prev = this.count + 1;
        } else {
            this.count = photos.length - 1;
            this.count_prev = 0;
        };
    },
}; 

// элементы html
const foto_frame = document.getElementById('foto_frame'); 
const list_img = document.getElementById('list_img');

// кнопки
const btnNext = document.getElementsByName('j-btNext')[0];
const btnPrev = document.getElementsByName('j-btPrev')[0];

function changeImg () {
    let img = photos[counter.count];
    foto_frame.innerHTML = `<img src=${img.src} width=${img.width} height=${img.height}" alt=${getFilename.call(img)}></img>`;
    // выделение красным текущего файла в списке
    list_img.children[counter.count_prev].removeAttribute("style");
    let current_file = list_img.children[counter.count];
    current_file.style.color = "red";   
}

btnNext.addEventListener('click', (elem) => {
    elem.target.setAttribute("disabled", "disabled");
    elem.target.removeAttribute("autofocus");
    foto_frame.firstChild.classList.toggle("animated");
    foto_frame.firstChild.style.opacity = 0;
    foto_frame.firstChild.addEventListener("transitionend", () => {
        counter.increment();
        changeImg();
        elem.target.removeAttribute("disabled");
        elem.target.focus();
    }, false);
    elem.tabIndex = "1"
    btnPrev.tabIndex = "2";
})

btnPrev.addEventListener('click', (elem) => {
    elem.target.setAttribute("disabled", "disabled");
    foto_frame.firstChild.classList.add("animated");
    foto_frame.firstChild.addEventListener("animationend", () => {
        counter.decrement();
        changeImg();
        elem.target.removeAttribute("disabled");
        elem.target.focus();
    }, false);
    elem.tabIndex = "1"
    btnNext.tabIndex = "2";
})


// создание списка изображений
function createListImg() {
    photos.forEach( item => {
        item.filename = getFilename;
        let li = document.createElement("li");
        li.innerText = item.filename();
        list_img.appendChild(li);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    let img = photos[0];
    // img.filename = getFilename;
    // console.log(img);
    foto_frame.innerHTML = `<img src=${img.src} width=${img.width} height=${img.height}" alt=${getFilename.call(img)}></img>`;
    createListImg();
    // подсветка первого файла 
    list_img.children[counter.count].style.color = "red";
});