$(function() {
    class Cat {
        constructor(name, pic, containerElement, nameElement, imageElement, counterElement, counter = 0){
            this.name = name;
            this.pic = pic;
            this.containerElement = containerElement;
            this.nameElement = nameElement;
            this.imageElement = imageElement;
            this.counterElement = counterElement;
            this.counter = counter;
        }
    }

    const modal = {
        cats: [
            new Cat(
                'Cute Cat',
                './images/cat.jpg',
                $('#cat_continer_1'),
                $('#cat_name_1'),
                $('#cat_image_1'),
                $('#counter_1')),
            new Cat(
                'Shy Cat',
                './images/cat2.jpg',
                $('#cat_continer_2'),
                $('#cat_name_2'),
                $('#cat_image_2'),
                $('#counter_2')),
            new Cat(
                'Family Cat',
                './images/cat3.jpg',
                $('#cat_continer_3'),
                $('#cat_name_3'),
                $('#cat_image_3'),
                $('#counter_3')),
            new Cat(
                'Superised Cat',
                './images/cat4.jpg',
                $('#cat_continer_4'),
                $('#cat_name_4'),
                $('#cat_image_4'),
                $('#counter_4')),
            new Cat(
                'Funny Cat',
                './images/cat5.jpeg',
                $('#cat_continer_5'),
                $('#cat_name_5'),
                $('#cat_image_5'),
                $('#counter_5'))
        ]
    };

    const controller = {
        getCatList: function() {
            return modal.cats;
        },

        init: function() {
            view.init();
        }
    };

    const view = {
        init: function () {
            const catContainer = $('#display-cat-container');
            if (controller.getCatList().length > 0) {
                catContainer.removeClass('hideContainer');
                view.setDisplayedCat(controller.getCatList()[0]);
                view.render();
            } else {
                catContainer.addClass('hideContainer');
            }
        },

        render: function() {
            const catListElement = $('#cat-list');
            view.addCatList(catListElement);
        },

        addCatList: function(catListElement) {
            controller.getCatList().forEach(function (cat, index) {
                const itemElement = view.createCatItemList(cat, index);
                catListElement.append(itemElement);

                cat.imageElement.click((function (catCopy) {
                    return function () {
                        catCopy.counter++;
                        catCopy.counterElement.text(cat.counter);
                    }
                })(cat));
            });
        },

        createCatItemList: function (cat, index) {
            const itemElement = document.createElement('li');
            itemElement.classList.add('btn', 'btn-link');
            itemElement.innerText = cat.name;
            itemElement.addEventListener('click', (function (catCopy, indexCopy) {
                return function () {
                    view.handleDisplayOfCat(indexCopy);
                    view.setDisplayedCat(catCopy);
                };
            })(cat, index));

            return itemElement;
        },

        setDisplayedCat: function(cat) {
            cat.nameElement.text(cat.name);
            cat.imageElement.attr('src', cat.pic);
            cat.counterElement.text(cat.counter);
        },

        handleDisplayOfCat: function(currentIndex) {
            controller.getCatList().forEach(function(cat, index) {
                if (index === currentIndex) {
                    cat.containerElement.removeClass('hideContainer');
                } else {
                    cat.containerElement.addClass('hideContainer');
                }
            })
        }
    };

    controller.init();
}());