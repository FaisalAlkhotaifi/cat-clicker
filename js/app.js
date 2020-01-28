const modal = {
    currentCat: null,
    cats: [
        {
            name: 'Cute Cat',
            image: 'images/cat.jpg',
            counter: 0
        },
        {
            name: 'Shy Cat',
            image: 'images/cat2.jpg',
            counter: 0
        },
        {
            name: 'Family Cat',
            image: 'images/cat3.jpg',
            counter: 0
        },
        {
            name: 'Superised Cat',
            image: 'images/cat4.jpg',
            counter: 0
        },
        {
            name: 'Funny Cat',
            image: 'images/cat5.jpeg',
            counter: 0
        },
    ],
};

const controller = {
    getCatList: function() {
        return modal.cats;
    },

    getCurrentCat: function() {
        return modal.currentCat;
    },

    setCurrentCat: function(cat) {
        modal.currentCat = cat;
    },

    incrementCounter: function() {
        modal.currentCat.counter++;
        catView.render();
    },

    init: function() {
        modal.currentCat = modal.cats[0];
        cartListView.init();
        catView.init();
    }
};

const catView = {
    init: function() {
        this.catContainerElement = $('#display-cat-container');
        this.catNameElement = $('#cat_name');
        this.catImageElement = $('#cat_image');
        this.catCounterElement = $('#counter');

        this.catImageElement.click(function() {
            controller.incrementCounter();
        });

        this.render();
    },

    render: function() {
        const currentCat = controller.getCurrentCat();
        this.catNameElement.text(currentCat.name);
        this.catImageElement.attr('src', currentCat.image);
        this.catCounterElement.text(currentCat.counter);
    }
};

const cartListView = {
    init: function() {
        this.catListElement = $('#cat-list');
        this.render();
    },

    render: function() {
        this.catListElement.html('');

        const self = this;
        const catsList = controller.getCatList();

        catsList.forEach(function (cat) {
            const itemElement = document.createElement('li');
            itemElement.classList.add('btn', 'btn-link');
            itemElement.innerText = cat.name;
            itemElement.addEventListener('click', (function (catCopy) {
                return function () {
                    controller.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            self.catListElement.append(itemElement);
        });
    }
};

controller.init();