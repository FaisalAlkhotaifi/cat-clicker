function CounterObject () {
    let counter = 0;

    return {
        increase: () => { counter += 1; },
        getValue: () => { return counter; },
        reset: () => { counter = 0; }
    }
};

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

const catContainer = $('#display-cat-container');

const cats = [
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
];

function setDisplayedCat(cat) {
    cat.nameElement.text(cat.name);
    cat.imageElement.attr('src', cat.pic);
    cat.counterElement.text(cat.counter);
}

function handleDisplayOfCat(currentIndex) {
    cats.forEach(function(cat, index) {
        if (index === currentIndex) {
            cat.containerElement.removeClass('hideContainer');
        } else {
            cat.containerElement.addClass('hideContainer');
        }
    })
}

function createCatItemList(cat, index) {
    const itemElement = document.createElement('li');
    itemElement.classList.add('btn', 'btn-link');
    itemElement.innerText = cat.name;
    itemElement.addEventListener('click', (function (catCopy, indexCopy) {
        return function () {
            console.log(`The current counter of ${catCopy.name} is ${catCopy.counter}`);
            handleDisplayOfCat(indexCopy);
            setDisplayedCat(catCopy);
        };
    })(cat, index));

    return itemElement;
}

$(function() {
    if (cats.length > 0) {
        catContainer.removeClass('hideContainer');
        setDisplayedCat(cats[0]);

        const catListElement = $('#cat-list');
        cats.forEach(function(cat, index) {
            const itemElement = createCatItemList(cat, index);
            catListElement.append(itemElement);

            cat.imageElement.click((function(catCopy) {
                return function() {
                    catCopy.counter++;
                    catCopy.counterElement.text(cat.counter);
                }
            })(cat));
        });
    } else {
        catContainer.addClass('hideContainer');
    }
}());