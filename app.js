///////////////////////////////////////////

const body = document.querySelector('body');
const darkModeBtn = document.getElementById('dark-mode-button');
const inputItem = document.getElementById('item');
const addItemBtn = document.getElementById('add-item-button');
const ul = document.querySelector('.ul');
const li = document.querySelector('li');
const lis = document.querySelectorAll('li');
const itemsArr = [];

// Set local storage for theme
localStorage.setItem('darkMode', 'false')

// Dark mode toggle
darkModeBtn.addEventListener('click', function() {
    body.classList.toggle('dark-theme')
    
    for (let li of lis) {
        li.classList.toggle('dark-mode')
    }
    // reset local storage
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('darkMode', 'true')
    } else {
        localStorage.setItem('darkMode', 'false')
    }

    let mode = localStorage.getItem('darkMode');

    if ( mode === 'true') {
        darkModeBtn.style.color = '#000'
        darkModeBtn.style.background = '#f5f5f5'
    } else {
        darkModeBtn.style.color = '#f5f5f5'
        darkModeBtn.style.background = '#000'
    }
})

// Mouse Enter
darkModeBtn.addEventListener('mouseenter', () => {
    let mode = localStorage.getItem('darkMode');

    if ( mode === 'true') {
        darkModeBtn.innerText = 'Light'
        darkModeBtn.style.color = '#f5f5f5'
        // darkModeBtn.style.background = '#525252'
        darkModeBtn.style.border = 'none'
    } else {
        darkModeBtn.innerText = 'Dark'
        darkModeBtn.style.color = '#000000'
        // darkModeBtn.style.background = '#525252'
    }
})

// Mouse Out
darkModeBtn.addEventListener('mouseout', () => {
    let mode = localStorage.getItem('darkMode');

    if ( mode === 'false') {
        darkModeBtn.innerText = 'Theme'
        darkModeBtn.style.color = '#525252'
        darkModeBtn.style.borderColor = '#525252'
        darkModeBtn.style.background = 'initial'
    } else {
        darkModeBtn.innerText = 'Theme'
        darkModeBtn.style.background = 'initial'
        darkModeBtn.style.borderColor = '#525252'
        darkModeBtn.style.color = '#8a8a8a'

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
