const displayBtn = document.querySelector('.button');
const form = document.querySelector('.form');
const closed = document.querySelector('.close');
const container = document.querySelector('.container');
const moon = document.querySelector('.moon');
const books = document.querySelector('.books');
const addBtn = document.querySelector('#btn');
const input = document.querySelector('#input');
const clear = document.querySelector('.clear');

const TICK = "fa-check-circle";
const TICK_THROUGH = "tick-through";
const UNTICK = "fa-circle-o";


const today = new Date();

let options = { month: 'short', day: 'numeric', year: 'numeric' };

let date = today.toLocaleDateString("en-US", options);

let LIST, id;

//FETCH FROM LOCALSTORAGE
let data = localStorage.getItem("BOOK");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadBooks(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadBooks(array) {
    array.forEach(book => {
        addBooks(book.title, book.date, book.id, book.done, book.trash);
    });
}



addBtn.addEventListener('click', () => {

    if (input.value != "") {
        let title = input.value;
        addBooks(title, date, id, false, false);

        LIST.push({
            title: title,
            date: date,
            id: id,
            done: false,
            trash: false
        });

        closeForm();
    } else {
        alert("Please, Add a book!");
        closeForm();
    }

    //STORE IN LOCALSTORAGE
    localStorage.setItem("BOOK", JSON.stringify(LIST));

    input.value = "";
    id++;
})


function addBooks(bookTitle, date, id, done, trash) {

    let DONE = done ? TICK : UNTICK;
    let LINE = done ? TICK_THROUGH : "";

    if (trash) {
        return;
    }

    let position = "beforeend";

    let text = `
    <li >
        <div class="book">
            <i class="fa ${DONE}" id="${id}" task="complete"></i>
            <div>
                <span class="title ${LINE}">${bookTitle}</span><br>
                <i class="date">${date}</i>
            </div>
            <i class="fa fa-minus-circle " id="${id}" task="delete"></i>
        </div>
        <hr>
    </li>
    `;
    books.insertAdjacentHTML(position, text);
}


books.addEventListener('click', (event) => {
    let element = event.target;
    let elementTask = element.attributes.task.value;

    if (elementTask == "complete") {
        completeBook(element);
    } else if (elementTask == "delete") {
        deleteBook(element);
    }

    //STORE IN LOCALSTORAGE
    localStorage.setItem("BOOK", JSON.stringify(LIST));
});

function completeBook(element) {
    element.classList.toggle(TICK);
    element.classList.toggle(UNTICK);

    element.parentNode.querySelector('.title').classList.toggle(TICK_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function deleteBook(element) {
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);

    LIST[element.id].trash = true;
}

clear.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})


displayBtn.addEventListener('click', () => {
    form.style.display = 'block';
    displayBtn.style.display = 'none';
});

closed.addEventListener('click', () => {
    closeForm();
});

moon.addEventListener('click', () => {
    container.classList.toggle('dark-mode');
});

function closeForm() {
    form.style.display = 'none';
    displayBtn.style.display = 'block';
}