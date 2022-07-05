import _, { forEach } from 'lodash';
import './styles/style.css'

function component() {
    const element = document.createElement('div');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
  
    return element;
}

// array of toDo objects
const toDoArray = (() => {
    const container = [];
    const addObj = (object) => {
        container.push(object);
    }

    return {
        container,
        addObj,
    }
})();

// creates toDo objects
const toDoObject = (title, description, date, priority) => {
    return {
        title,
        description,
        date,
        priority,
    }
}

const toDoContainer = (() => {
    const containerList = document.querySelector('.todo-container-list');

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    let priority = document.querySelector('input[name="priority"]:checked').value;

    const createAdd = () => {
        const newToDo = toDoObject(title.value, description.value, date.value, document.querySelector('input[name="priority"]:checked').value);
        toDoArray.addObj(newToDo);
    };

    const clearForm = () => {
        title.value = '';
        description.value = '';
        date.value = ''; 
        document.querySelector('input[name="priority"]:checked').checked = false;
    }

    const addToContainer = () => {
        console.log(priority);
        console.log(document.querySelector('input[name="priority"]:checked').value);
        createAdd();
    }

    const printArray = () => {
        toDoArray.container.forEach(object => {
            print(object);
        });
    }

    function clear() {
        while (containerList.firstChild) {
            containerList.removeChild(containerList.firstChild);
        }
    }

    return {
        clearForm,
        addToContainer,
        printArray,
        clear,
    }
})();

function print(obj) {
    const containerList = document.querySelector('.todo-container-list');
    const box = document.createElement('div');
    box.classList.add('printObj');
    box.innerText = `${obj.title}\n\n${obj.description}\n${obj.date}\n${obj.priority}`;

    containerList.appendChild(box);
}

const buttonClicker = (target) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    let priority = document.querySelector('input[name="priority"]:checked');

    // this will modify the text on the book and update information within the (target) book object
    if (target.classList == 'form-bttn') {
        if (title.value == '' || 
        description.value == '' ||
        date.value == '' ||
        priority.value == false) {
            return;
        } 

        toDoContainer.addToContainer();
        toDoContainer.clearForm();
        toDoContainer.clear();
        toDoContainer.printArray();
    }
}

document.addEventListener('click', (event) => {
    const { target } = event;
    buttonClicker(target);
});