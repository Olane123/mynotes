const nameTodoInput = document.getElementById("input__noteName")
const addTodoButton = document.getElementById("input_addTodo")
const todoContainer = document.getElementById("notesField")
const isDoneCheckBox = document.getElementById("input__checkbox")

const todoList = []

let isDone = false;

addTodoButton.addEventListener("click", () => {
    if (nameTodoInput.value.trim()) {
        todoList.push(nameTodoInput.value)
        nameTodoInput.value = "";

        todoContainer.innerHTML = "";
        todoList.forEach((todo) =>
        {
            const todoElement = document.createElement("div");
            todoElement.textContent = todo;
            todoContainer.append(todoElement);
        })
    }
})

isDoneCheckBox.addEventListener("click", () => {
    isDone = !isDone


    if (isDone) {
        isDoneCheckBox.style.visibility = 'hidden'; // Скрывает только изображение
        // Или: isDoneCheckBox.style.opacity = '0';
    } else {
        isDoneCheckBox.style.visibility = 'visible'; // Показывает изображение
    }
})

todoContainer.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
})