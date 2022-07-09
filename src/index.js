import _, { forEach } from 'lodash';
import './styles/style.css'

// creates toDo objects
const toDoObject = (title, description, date, priority, project) => {
    return {
        title,
        description,
        date,
        priority,
        project,
    }
}

// array of toDo objects
const toDoArray = (() => {
    const container = [];

    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");

    const addToDo = (object) => {
        container.push(object);
    }

    // returns the project value that is currently being seen on the screen
    const projectValue = () => {
        console.log(`project value length is ${projectObj.projectArray.length} and current value is ${projectObj.returnCurrent()}`);
        for(let i = 0; i < projectObj.projectArray.length; i++) {
            if (projectObj.projectArray[i] == projectObj.projectArray[projectObj.returnCurrent()]) {
                console.log(`projected value ${i}`);
                return i;
            }
        }
    };

    // adds new toDo object to Array
    const add = () => {
        const newToDo = toDoObject(title.value, description.value, date.value, 
            document.querySelector('input[name="priority"]:checked').value, projectObj.projectArray[projectValue()]);
        addToDo(newToDo);
    }

    // removes toDo object from Array
    const removeObj = (obj) => {
        const parent = obj.parentElement;
        console.log(parent);
        for (let i = 0; i < container.length; i++) {
            if (parent.id == container[i].title) {
                container.splice(i, 1);
            }
        }
    }
    

    return {
        container,
        add,
        removeObj,
    }
})();

// project functionality to create and manipulate for efficiency
const projectObj = (() => {
    const firstValue = document.querySelector('#first-value').textContent;

    // array needed to maintain new projects
    const projectArray = [`${firstValue}`];

    let arrayIndex = 0;

    let current = 0;

    // necessary, because if current is called outside projectObj then (current = 0) always
    const returnCurrent = () => {
        return current;
    }

    // if new tab then it will be added to projectArray, otherwise it just becomes the current tab
    const newP = (string) => {
        if (!(projectArray.includes(string))) {
            console.log(current);
            projectArray.push(string);
            arrayIndex++;
            current = arrayIndex;
            console.log(current);
            console.log(projectArray);
            return;

        } else if (projectArray.includes(`${string}`)) {
            for (let i = 0; i < projectArray.length; i++) {
                if (projectArray[i] == string) {
                    current = i;
                    console.log(current);
                    return; 
                }
            }
        }
    }

    // removed (current)
    return {
        projectArray,
        arrayIndex,
        returnCurrent,
        newP,
    }
})();

// modifies DOM by inputting toDo objects
const toDoContainer = (() => {
    const containerList = document.querySelector('.todo-container-list');
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    // priority keeps the value of low, so started using querySelector instead (document.querySelector('input[name="priority"]:checked'))
    //let priority = document.querySelector('input[name="priority"]:checked').value;

    // clears form
    const clearForm = () => {
        title.value = '';
        description.value = '';
        date.value = ''; 
        document.querySelector('input[name="priority"]:checked').checked = false;
    }

    // prints all toDo objects
    const printArray = () => {
        toDoArray.container.forEach(object => {
            print(object);
        });
    }

    // prints only the objects for the current project tab
    const print = (obj) => {
        console.log(`${obj.project} and ${projectObj.projectArray[projectObj.returnCurrent()]}`)
        if (obj.project === projectObj.projectArray[projectObj.returnCurrent()]) { 
            const toDoContainer = document.createElement('div');
            toDoContainer.classList.add('printObj');
            toDoContainer.setAttribute('id', `${obj.title}`);
            
            const checkBox = document.createElement('input')
            checkBox.classList.add('checkStatus');
            checkBox.setAttribute('type', 'checkbox');
            checkBox.setAttribute('value', 'true')
            
            const box = document.createElement('div');
            box.classList.add('box');
            box.innerText = `${obj.title} | ${obj.date}\n${obj.description}\nPriority ${obj.priority}`;

            containerList.appendChild(toDoContainer);
            toDoContainer.appendChild(checkBox);
            toDoContainer.appendChild(box);
            console.log('done printing');
        }
    }

    // removes container from DOM
    const removeDiv = (obj) => {
        const parent = obj.parentElement;
        containerList.removeChild(parent);
    }

    // clears all of toDoContainer
    function clear() {
        while (containerList.firstChild) {
            containerList.removeChild(containerList.firstChild);
        }
        console.log('done clear');
    }

    return {
        clearForm,
        printArray,
        clear,
        removeDiv,
    }
})();

// modifies modal, DOM and prints new tab objects (function used in buttonClicker)
const addProjectTab = () => {
    const newProject = document.querySelector('#project').value;
    const tabsContainer = document.querySelector('.todo-tabs');
    const openModal = document.querySelector('#open-modal');
    const modal = document.getElementById("myModal");

    const newDiv = document.createElement('div');
    newDiv.classList.add('tabs');
    const newSpan = document.createElement('span');
    newSpan.innerText = `${newProject}`
    projectObj.newP(`${newProject}`);
    tabsContainer.insertBefore(newDiv, openModal);
    newDiv.appendChild(newSpan); 
    modal.style.display = "none";
}

// all buttons and clickable items will refer to this function to work appropriately
const buttonClicker = (target) => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    let priority = document.querySelector('input[name="priority"]:checked');
    const newProject = document.querySelector('#project').value;
    const modal = document.getElementById("myModal");
    const projectTabs = document.querySelectorAll('tabs')

    // checks if form is empty before running functions to modify DOM
    if (target.classList == 'form-bttn') {
        if (title.value == '' || 
        description.value == '' ||
        date.value == '' ||
        priority.value == false) {
            return;
        } 

        toDoArray.add();
        toDoContainer.clearForm();
        toDoContainer.clear();
        toDoContainer.printArray();
    } else if (target.classList == 'modal-form-bttn') {
        if (newProject == '') {
            return
        }
        addProjectTab();
        toDoContainer.clear();
        toDoContainer.printArray();
        //modifies animations of modal
    } else if (target.id == 'open-modal') {
        modal.style.display = "block";
    } else if (target.classList == 'close') {
        modal.style.display = "none";
    } else if (target == modal) {
        modal.style.display = "none";
    } else if (target.classList == 'tabs') {
        console.log(target.textContent);
        projectObj.newP(`${target.textContent}`);
        toDoContainer.clear();
        toDoContainer.printArray();
    } else if (target.classList == 'checkStatus') {
        console.log(target.checked);
        let nextSibling = target.nextElementSibling;
        console.log(nextSibling);
        if (target.checked == true) {
            //nextSibling.classList.add('box-done');
            // KEEP AN EYE ON THIS
            toDoArray.removeObj(target);
            toDoContainer.removeDiv(target);
        }
    }
}

document.addEventListener('click', (event) => {
    const { target } = event;
    buttonClicker(target);
});
