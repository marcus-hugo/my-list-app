const body = document.querySelector('body');
const darkModeBtn = document.getElementById('dark-mode-button');
const inputItem = document.getElementById('item');
const addItemBtn = document.getElementById('add-item-button');
const ul = document.querySelector('.ul');
const li = document.querySelector('li')
const itemsArr = [];
const isCheckedArr = [];

darkModeBtn.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
});

addItemBtn.addEventListener('click', function () {
    if (inputItem.value === '') {
        alert('Please enter an item!');
    } else {
        itemsArr.push({
            'value': `${inputItem.value}`,
            'isChecked': 'false'
        });
        inputItem.value = '';
        renderItems(itemsArr);
    }
})

function checkTodoItem() {
    const checkedBtns = document.querySelectorAll('.items-text'); //<p> elements
    const lis = document.querySelectorAll('.rendered-items'); //<li> elements
    console.log(checkedBtns, lis)
    for(let i=0; i<checkedBtns.length; i++) {
        checkedBtns[i].addEventListener('click', function() {
            if(checkedBtns[i].id == itemsArr[i].value) {
                itemsArr[i].isChecked = 'true';
                lis[i].classList.add('checked');
            }
        })
    }
}

function isChecked(a,b) {

}

function renderItems(items) {
    let listItems = '';

    for (let i = 0; i < items.length; i++) {
        listItems += `
            <li id="${items[i].value}" class="rendered-items">
                <p class="items-text" id="${items[i].value}">${items[i].value}</p>
                <button id=${items[i].value} class="delete-button">DELETE</button>
            </li>
        `;
    }

    ul.innerHTML = listItems;
    deleteBtns(itemsArr);
    checkTodoItem()
    
    for (let i=0; i<itemsArr.length; i++) {
        const lis = document.querySelectorAll('li');

        if(itemsArr[i].isChecked == 'true') {
            lis[i].classList.add('checked');
        }
    }
}

function deleteBtns(items) {
    let removeBtns = document.querySelectorAll('.delete-button');

    for (let i = 0; i < itemsArr.length; i++) {
        removeBtns[i].addEventListener('click', function () {

            let findServiceIndex = (items) => items.value === removeBtns[i].id;
            let serviceIndex = items.findIndex(findServiceIndex);

            if (removeBtns[i].id === itemsArr[i].value) {
                itemsArr.splice(serviceIndex, 1);
                renderItems(items);
            }
        })
    }
}

inputItem.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItemBtn.click();
    }
})