///////////////////////////////////////////

const body = document.querySelector('body');
const darkModeBtn = document.getElementById('dark-mode-button');
const inputItem = document.getElementById('item');
const addItemBtn = document.getElementById('add-item-button');
const ul = document.querySelector('.ul');
const li = document.querySelector('li');
const lis = document.querySelectorAll('li');
const itemsArr = [];
let darkMode = localStorage.getItem('darkMode');

if (darkMode === 'true') {
    darkModeBtn.classList.contains('dark-theme') ? 
    darkModeBtn.innerText = 'Light' : 
    darkModeBtn.innerText = "Dark"

    body.classList.add('dark-theme')
    darkModeBtn.classList.add('dark-theme')

    for (let li of lis) {
        li.classList.add('dark-theme')
    }
} else {
    body.classList.remove('dark-theme')
    darkModeBtn.classList.remove('dark-theme')
    
    for (let li of lis) {
        li.classList.remove('dark-theme')
    }
}

// Dark mode toggle
darkModeBtn.addEventListener('click', function() {
    body.classList.toggle('dark-theme')
    darkModeBtn.classList.toggle('dark-theme')

    for (let li of lis) {
        li.classList.toggle('dark-theme')
    }
    
    darkModeBtn.classList.contains('dark-theme') ? 
    darkModeBtn.innerText = 'Light' : 
    darkModeBtn.innerText = "Dark"

     // reset local storage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('darkMode', 'true')
    } else {
        localStorage.setItem('darkMode', 'false')
    }
})

// Add button pushes input value to itemsArr
addItemBtn.addEventListener('click', function () {
    if (inputItem.value === '') {
        alert('Please enter an item!');
    } else {
        itemsArr.push({
            'value': `${inputItem.value}`,
            'newVal': `${inputItem.value.replace(/\s+/g, '')}`,
            'isChecked': 'false' // boolean for checked state
        });
        inputItem.value = '';
        renderItems(itemsArr);
    }
})

// Check items (before render)
function checkTodoItem() {
    const checkedBtns = document.querySelectorAll('.items-text'); //<p> elements
    const lis = document.querySelectorAll('.rendered-items'); //<li> elements
    
    for(let i=0; i<checkedBtns.length; i++) {

        checkedBtns[i].addEventListener('click', function() {
            lis[i].classList.toggle('checked')

            if (lis[i].classList.contains('checked')) {
                itemsArr[i].isChecked = 'true';
            } else {
                itemsArr[i].isChecked = 'false';
            }
        })  
    }

    checkedBtns.forEach(chkBtn => {
        chkBtn.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                chkBtn.click();
            }
        })
    });
}

// Is it checked? (add checked class after render)
function isChecked() {
    const checkedBtns = document.querySelectorAll('.items-text'); //<p> elements
    const lis = document.querySelectorAll('.rendered-items'); //<li> elements

    for (let i=0; i<itemsArr.length; i++) {

            if (itemsArr[i].isChecked === 'true') {
                lis[i].classList.add('checked');
            } else if(itemsArr[i].isChecked = 'false') {
                lis[i].classList.remove('checked');
            }
    }
}

// Render items
function renderItems(items) {
    let listItems = '';

    for (let i = 0; i < items.length; i++) {
        listItems += `
            <li id="${items[i].value}" class="rendered-items">
                <p tabindex="0" role="button" class="items-text" id="${items[i].value}">${items[i].value}</p>
                <button id=${items[i].value.replace(/\s+/g, '') } class="delete-button">DELETE</button>
            </li>
        `;
    }
    ul.innerHTML = listItems;

    deleteBtns(itemsArr);
    checkTodoItem();
    isChecked();
}

// Delete items
function deleteBtns(items) {
    let removeBtns = document.querySelectorAll('.delete-button');

    for (let i = 0; i < itemsArr.length; i++) {
        removeBtns[i].addEventListener('click', function () {

            let findServiceIndex = (items) => items.newVal === removeBtns[i].id;
            let serviceIndex = items.findIndex(findServiceIndex);

            if (removeBtns[i].id === itemsArr[i].newVal) {
                itemsArr.splice(serviceIndex, 1);
                renderItems(items);
            }
        })
    }
}

// Enter key for click
inputItem.addEventListener ('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItemBtn.click();
    }
})
