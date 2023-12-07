let body = document.querySelector("body");
let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");
let addTodo = document.querySelector(".add-todo");
let todoAddText = document.querySelector(".todo-add-text");
let main = document.querySelector("main");
let department = document.querySelector(".departments");
let todoFirst = document.querySelector(".first-todo");
let todoSecond = document.querySelector(".second-todo");
let todoThird = document.querySelector(".third-todo");
let todoFourth = document.querySelector(".fourth-todo");
let todoFifth = document.querySelector(".fifth-todo");
let todoSixth = document.querySelector(".sixth-todo");
let darkBack = document.querySelector(".dark-back-mob");
let lighBack = document.querySelector(".light-back-mob");
let tools = document.querySelector(".tools");



let unclickedElements = [
    document.querySelector(".unclicked-1"),
    document.querySelector(".unclicked-2"),
    document.querySelector(".unclicked-3"),
    document.querySelector(".unclicked-4"),
    document.querySelector(".unclicked-5"),
    document.querySelector(".unclicked-6")
];




updateLeftTodoCount();

document.querySelectorAll('.todo-item').forEach(function (todoItem) {
    todoItem.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', todoItem.classList[1]);
        event.effectAllowed = 'move';
    });

    todoItem.addEventListener('dragenter', function (event) {
        event.preventDefault();
    });

    todoItem.addEventListener('dragover', function (event) {
        event.preventDefault();
        const draggedTodoClass = event.dataTransfer.getData('text/plain');
        const draggedTodo = document.querySelector(`.${draggedTodoClass}`);
        const rect = todoItem.getBoundingClientRect();

        if (event.clientY - rect.top > rect.height / 2) {
            todoItem.parentNode.insertBefore(draggedTodo, todoItem.nextSibling);
        } else {
            todoItem.parentNode.insertBefore(draggedTodo, todoItem);
        }
    });
});

document.addEventListener('dragend', function (event) {
    const draggedTodoClass = event.dataTransfer.getData('text/plain');
    const draggedTodo = document.querySelector(`.${draggedTodoClass}`);
    const newTodoList = Array.from(draggedTodo.parentNode.children).map(todo => todo.classList[1]);
    console.log('New todo order:', newTodoList);
});


function handleUnclickedClick(index) {
    const unclickedSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9.5" fill="white" stroke="#E3E4F1"/>
            <circle opacity="0.01" cx="10" cy="10" r="10" fill="url(#paint0_linear_0_343)"/>
            <path opacity="0.01" d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5" stroke="white" stroke-width="2"/>
            <defs>
                <linearGradient id="paint0_linear_0_343" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#55DDFF"/>
                    <stop offset="1" stop-color="#C058F3"/>
                </linearGradient>
            </defs>
        </svg>`;

    const clickedSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9.5" fill="#3CB4AC" stroke="#3CB4AC"/>
            <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_0_371)"/>
            <path d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5" stroke="white" stroke-width="2"/>
            <defs>
                <linearGradient id="paint0_linear_0_371" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#55DDFF"/>
                    <stop offset="1" stop-color="#C058F3"/>
                </linearGradient>
            </defs>
        </svg>`;

    const unclickedElement = unclickedElements[index];
    const isClicked = unclickedElement.classList.contains('clicked');
    let todoText = [
        document.querySelector(".first-todo-text"),
        document.querySelector(".second-todo-text"),
        document.querySelector(".third-todo-text"),
        document.querySelector(".fourth-todo-text"),
        document.querySelector(".fifth-todo-text"),
        document.querySelector(".sixth-todo-text"),
    ][index];
    
    

    if (isClicked) {

        unclickedElement.classList.remove('clicked');
        unclickedElement.innerHTML = unclickedSvg;
        todoText.style.textDecoration = "none";
        todoText.style.color = "#494C6B";
        

    } else {
        unclickedElement.classList.add('clicked');
        unclickedElement.innerHTML = clickedSvg;
        todoText.style.textDecoration = "line-through";
        todoText.style.color = "#D1D2DA";
        const todoElement = unclickedElement.closest('.todo-item');
        todoElement.classList.toggle('completed');

    }


}


unclickedElements.forEach((unclickedElement, index) => {
    unclickedElement.addEventListener('click', () => {
        handleUnclickedClick(index);
        updateLeftTodoCount();
    });
});

main.addEventListener('drop', function (event) {
    event.preventDefault();

    const draggedTodoClass = event.dataTransfer.getData('text/plain');

    const draggedTodo = document.querySelector(`.${draggedTodoClass}`);

    const dropTarget = event.target.closest('.todo-item');

    if (draggedTodo && dropTarget && draggedTodo !== dropTarget) {
        const rect = dropTarget.getBoundingClientRect();
        if (event.clientY - rect.top > rect.height / 2) {
            dropTarget.parentNode.insertBefore(draggedTodo, dropTarget.nextSibling);
        } else {
            dropTarget.parentNode.insertBefore(draggedTodo, dropTarget);
        }
    }
});


document.querySelector('.all').addEventListener('click', function () {
    showAllTodos();
});

document.querySelector('.active').addEventListener('click', function () {
    showActiveTodos();
});

document.querySelector('.completed').addEventListener('click', function () {
    showCompletedTodos();
});

function showActiveTodos() {
    document.querySelectorAll('.todo-item').forEach(function (todoItem) {
        const unclickedElement = todoItem.querySelector('.unclicked');
        if (unclickedElement && !unclickedElement.classList.contains('clicked')) {
            todoItem.style.display = 'flex';
        } else {
            todoItem.style.display = 'none';
        }
    });
}

function showCompletedTodos() {
    document.querySelectorAll('.todo-item').forEach(function (todoItem) {
        const unclickedElement = todoItem.querySelector('.unclicked');
        if (unclickedElement && unclickedElement.classList.contains('clicked')) {
            todoItem.style.display = 'flex';
        } else {
            todoItem.style.display = 'none';
        }
    });
}

document.querySelector('.all').addEventListener('click', function () {
    showAllTodos();
    setActiveDepartment('all');
});

document.querySelector('.active').addEventListener('click', function () {
    showActiveTodos();
    setActiveDepartment('active');
});

document.querySelector('.completed').addEventListener('click', function () {
    showCompletedTodos();
    setActiveDepartment('completed');
});

function handleDepartmentClick(department) {
    setActiveDepartment(department);

    if (department === 'all') {
        showAllTodos();
    } else if (department === 'active') {
        showActiveTodos();
    } else if (department === 'completed') {
        showCompletedTodos();
    }
}

// Add click event listeners to department elements
document.querySelector('.all').addEventListener('click', function () {
    handleDepartmentClick('all');
});

document.querySelector('.active').addEventListener('click', function () {
    handleDepartmentClick('active');
});

document.querySelector('.completed').addEventListener('click', function () {
    handleDepartmentClick('completed');
});


function setActiveDepartment(department) {
    document.querySelectorAll('.departments div').forEach(function (dept) {
        dept.classList.remove('active-department');
    });

    document.querySelector(`.${department}`).classList.add('active-department');
}

function showCompletedTodos() {
    document.querySelectorAll('.todo-item').forEach(function (todoItem) {
        const checkbox = todoItem.querySelector('input[type="checkbox"]');
        if (checkbox.checked) {
            todoItem.style.display = 'flex';
        } else {
            todoItem.style.display = 'none';
        }
    });
}

todoAddText.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const todoTextValue = todoAddText.value.trim();

        if (todoTextValue !== '') {
            const newTodo = createTodoElement(todoTextValue);
            main.appendChild(newTodo);
            todoAddText.value = '';
            updateLeftTodoCount();
        }
    }
});


document.querySelectorAll('.cancel').forEach(function (cancelButton) {
    cancelButton.addEventListener('click', function () {
        const todoItem = cancelButton.parentNode;
        todoItem.parentNode.removeChild(todoItem);
        checkedCount = document.querySelectorAll('input[type="checkbox"]:checked:not(.todo-add-check)').length;
        updateLeftTodoCount();
    });
});


function updateLeftTodoCount() {
    const leftTodoElement = document.querySelector('.left-todo span');
    const unclickedCount = unclickedElements.filter(el => !el.classList.contains('clicked')).length;
    leftTodoElement.textContent = unclickedCount;
}


function createTodoElement(text) {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo-item', 'light-new-todo');

    const unclickedSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9.5" fill="white" stroke="#E3E4F1"/>
    <circle opacity="0.01" cx="10" cy="10" r="10" fill="url(#paint0_linear_0_343)"/>
    <path opacity="0.01" d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5" stroke="white" stroke-width="2"/>
    <defs>
      <linearGradient id="paint0_linear_0_343" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
        <stop stop-color="#55DDFF"/>
        <stop offset="1" stop-color="#C058F3"/>
      </linearGradient>
    </defs>
  </svg>`;

    const clickedSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="9.5" fill="white" stroke="#E3E4F1"/>
    <circle cx="10" cy="10" r="10" fill="url(#paint0_linear_0_371)"/>
    <path d="M6.66675 10.2534L8.91333 12.5L13.9133 7.5" stroke="white" stroke-width="2"/>
    <defs>
      <linearGradient id="paint0_linear_0_371" x1="-10" y1="10" x2="10" y2="30" gradientUnits="userSpaceOnUse">
        <stop stop-color="#55DDFF"/>
        <stop offset="1" stop-color="#C058F3"/>
      </linearGradient>
    </defs>
  </svg>`;

    const unclickedElement = document.createElement('div');
    unclickedElement.classList.add('unclicked');
    unclickedElement.innerHTML = unclickedSvg;

    unclickedElement.addEventListener('click', () => {
        handleUnclickedClick(newTodo);
        updateLeftTodoCount();
        saveTodos();
    });

    const todoText = document.createElement('div');
    todoText.textContent = text;
    todoText.classList.add('todo-item-text');

    const cancelIcon = document.createElement('img');
    cancelIcon.src = "./Assets/cancel.svg";
    cancelIcon.alt = "";
    cancelIcon.classList.add('cancel');

    newTodo.appendChild(unclickedElement);
    newTodo.appendChild(todoText);
    newTodo.appendChild(cancelIcon);

    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);
        const matchingTodo = todos.find(todo => todo.text === text);
        if (matchingTodo && matchingTodo.checked) {
            newTodo.classList.add('completed');
            unclickedElement.classList.add('clicked');
            unclickedElement.innerHTML = clickedSvg;
        }
    }

    newTodo.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', newTodo.classList[1]);
    });

    const tools = document.querySelector('.tools');
    tools.insertAdjacentElement('beforebegin', newTodo);

    cancelIcon.addEventListener('click', function () {
        newTodo.parentNode.removeChild(newTodo);
        updateLeftTodoCount();
        saveTodos();
    });

    return newTodo;
}



function toggleTheme() {
    body.classList.toggle("dark");

    const isDarkTheme = body.classList.contains("dark");

    if (isDarkTheme) {
        moon.style.display = "none";
        sun.style.display = "block";
        addTodo.classList.toggle("black-div");
        todoAddText.classList.toggle("black-div");
        todoAddText.classList.toggle("dark-theme-text-input");
        main.classList.toggle("black-div");
        todoFirst.classList.toggle("dark-border");
        todoSecond.classList.toggle("dark-border");
        todoThird.classList.toggle("dark-border");
        todoFourth.classList.toggle("dark-border");
        todoFifth.classList.toggle("dark-border");
        todoSixth.classList.toggle("dark-border");
        main.classList.toggle("light-text");
        department.classList.toggle("black-div");
        todoFirst.classList.toggle("line-through");
        lighBack.style.display = "none";
        darkBack.classList.toggle("dark-photo-background");
        darkBack.style.display = "block";
        tools.classList.toggle("black-div");

    } else {
        moon.style.display = "block";
        sun.style.display = "none";
        addTodo.classList.remove("black-div");
        todoAddText.classList.remove("black-div");
        main.classList.remove("black-div");
        main.classList.remove("light-text");
        department.classList.remove("black-div");
        todoFirst.classList.remove("dark-border");
        todoSecond.classList.remove("dark-border");
        todoThird.classList.remove("dark-border");
        todoFourth.classList.remove("dark-border");
        todoFifth.classList.remove("dark-border");
        todoSixth.classList.remove("dark-border");
        todoFirst.classList.remove("line-through");
        darkBack.style.display = "none";
        lighBack.style.display = "block";
        darkBack.classList.remove("dark-photo-background");
        todoAddText.classList.remove("dark-theme-text-input");
        tools.classList.remove("black-div");
    }
}



document.querySelector('.clear-completed').addEventListener('click', function () {
    document.querySelectorAll('.todo-item.completed').forEach(function (completedTodo) {
        completedTodo.parentNode.removeChild(completedTodo);
    });

    // Update the left todo count and save todos
    updateLeftTodoCount();
});


moon.addEventListener("click", toggleTheme);
sun.addEventListener("click", toggleTheme);