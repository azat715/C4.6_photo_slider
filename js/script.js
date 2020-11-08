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

    increment() {
        if (this.count < photos.length - 1) {
            this.count++
        } else {
            this.count = 0;
        };
    },

    decrement() {
        if (this.count > 0) {
            this.count--
        } else {
            this.count = photos.length - 1;
        };
    },
}; 

// элементы html
const foto_frame = document.getElementById('foto_frame'); 
const list_img = document.getElementById('list_img');

// кнопки
const btnNext = document.getElementsByName('j-btNext')[0];
const btnPrev = document.getElementsByName('j-btPrev')[0];

btnNext.addEventListener('click', () => {
    counter.increment();
    let img = photos[counter.count];
    img.filename = getFilename;
    foto_frame.innerHTML = `<img src=${img.src} width=${img.width} height=${img.height}" alt=${img.filename()}></img>`;
    
})

btnPrev.addEventListener('click', () => {
    counter.decrement();
    let img = photos[counter.count];
    img.filename = getFilename;
    foto_frame.innerHTML = `<img src=${img.src} width=${img.width} height=${img.height}" alt=${img.filename()}></img>`;
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
    img.filename = getFilename;
    console.log(img);
    foto_frame.innerHTML = `<img src=${img.src} width=${img.width} height=${img.height}" alt=${img.filename()}></img>`;
    createListImg();
});