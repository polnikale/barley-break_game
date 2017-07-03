function insertNumbers(number, value) {
    boxes[number].textContent = value;
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function returnMax(value1, value2) {
    return value1 > value2 ? value1 :  value2;
}

function returnMin(value1, value2) {
    return value1 > value2 ? value2 : value1;
}

function countEven(value) {
    usedNumbers.forEach((usedNumber) => {
        if (usedNumber < value) evenness++;
    }); // counting whether that specific summary will be even or odd
}

function defineNumbers() {
    for (let boxNumber = 15; boxNumber >= 0; boxNumber--) {
        if (numbers.length === 2) {
            let usablePosBig, usablePosLess;
            if (reserved === 0) {
                usablePosBig = 2;
                usablePosLess = 1;
            } else if (reserved === 1) {
                usablePosBig = 2;
                usablePosLess = 0;
            } else if (reserved === 2) {
                usablePosBig = 1;
                usablePosLess = 0;
            } else {
                usablePosBig = 1;
                usablePosLess = 0;
            }
            let biggerNumber = returnMax(numbers[0], numbers[1]); 
            let lessNumber = returnMin(numbers[0], numbers[1]);
            countEven(biggerNumber);
            countEven(lessNumber);
            if (evenness % 2 === 1) {
                insertNumbers(usablePosLess, biggerNumber);
                insertNumbers(usablePosBig, lessNumber);
                evenness++;
            } else {
                insertNumbers(usablePosLess, lessNumber);
                insertNumbers(usablePosBig, biggerNumber);
            }
            boxNumber = -1;
        } else {
            if (boxNumber == reserved) {
                continue;
            }
            do {
                loopNumber = randomInteger(1, 15);
            } while(usedNumbers.indexOf(loopNumber) != -1) //if we have number already used, we rnd again
            countEven(loopNumber);
            usedNumbers.push(loopNumber);
            numbers.splice(numbers.indexOf(loopNumber), 1);
            insertNumbers(boxNumber, loopNumber);
        }
    }
}//this huge func was made with only one purpose: to make barley-break, in which user can certainly win

function changeStyle(picked, reserved) {
    reserved.textContent = currentBox.textContent;
    reserved.classList.remove('reserved');
    reserved.classList.add('picked');
    picked.textContent = '';
    picked.classList.add('reserved');
    picked.classList.remove('picked');
}

function moveBox(event) {
    let key = event.keyCode; //when person clicks on arrows at their keyboards - we have an event. 38-up,37-left,40-down,39-right 
    if (key === 37) {
        if (boxes[ boxes.indexOf(currentBox) ] % 4 === 1 || !boxes[ boxes.indexOf(currentBox) - 1].classList.contains('reserved')) {
            return;
        }
        changeStyle(currentBox, boxes[boxes.indexOf(currentBox) - 1]);
        currentBox = boxes[boxes.indexOf(currentBox) - 1];
    } else if (key === 38) {
        if (boxes[ boxes.indexOf(currentBox) ] <= 3 || !boxes[ boxes.indexOf(currentBox) - 4].classList.contains('reserved')) {
            return;
        }
        changeStyle(currentBox, boxes[boxes.indexOf(currentBox) - 4]);
        currentBox = boxes[boxes.indexOf(currentBox) - 4];
    } else if (key === 39) {
        if (boxes[ boxes.indexOf(currentBox) ] % 4 === 3 || !boxes[ boxes.indexOf(currentBox) + 1].classList.contains('reserved')) {
            return;
        }
        changeStyle(currentBox, boxes[boxes.indexOf(currentBox) + 1]);
        currentBox = boxes[boxes.indexOf(currentBox) + 1];
    } else if (key === 40) {
        if (boxes[ boxes.indexOf(currentBox) ] >= 13 || !boxes[ boxes.indexOf(currentBox) + 4].classList.contains('reserved')) {
            return;
        }
        changeStyle(currentBox, boxes[boxes.indexOf(currentBox) + 4]);
        currentBox = boxes[boxes.indexOf(currentBox) + 4];
    }
}

function changeTarget(event) {
    let target = event.target;
    if (!target.classList.contains('boxes') || target.classList.contains('reserved')) {
        return;
    }
    if (picked) {
        currentBox.classList.remove('picked');
    }
    currentBox = target;
    currentBox.classList.add('picked');
    picked = true;
    window.addEventListener('keydown', moveBox);
}

let currentBox;
let picked;
let loopNumber;
let forTrade;
let boxes = document.querySelectorAll('.boxes');
boxes = [].slice.call(boxes);
let wrapper = document.querySelector('.wrapper');
let reserved = randomInteger(0, 15); //defining number of box that won't have any nmber in it!
boxes[reserved].classList.add('reserved');//styling box which is empty
let usedNumbers = [];
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let evenness = 0; //this is the number, that will tell, whether the final sum(speial formula) will be even 
                  //or odd - based on this i'll bne able to make barley-break, that will always be excecutable
defineNumbers();

document.body.addEventListener('click', changeTarget);