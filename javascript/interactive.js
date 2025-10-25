const nameTodoInput = document.getElementById("input__noteName")
const addTodoButton = document.getElementById("input_addTodo")
const todoContainer = document.getElementById("notesField")

const todoList = []

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
todoContainer.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});