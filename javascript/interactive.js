const nameTodoInput = document.getElementById("input__noteName");
const addTodoButton = document.getElementById("input_addTodo");
const notesListContainer = document.getElementById("notes-list");
const todoContainer = document.getElementById("todo_container");
const noteNameElement = document.querySelector(".note__name");
const notesField = document.getElementById("notesField");
const noteCheckBox = document.getElementById("note__checkbox");
const deleteNoteButton = document.getElementById("delete_note");
const isDoneCheckBox = document.getElementById("input__checkbox");

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let currentIndex = -1;
let isDone = true;

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotesList() {
    notesListContainer.innerHTML = "";
    notes.forEach((note, index) => {
        const button = document.createElement("button");
        button.textContent = note.title;
        if (note.done) {
            button.classList.add("done");
        }
        button.addEventListener("click", () => selectNote(index));
        notesListContainer.appendChild(button);
    });
}

function selectNote(index) {
    currentIndex = index;
    const note = notes[index];
    noteNameElement.textContent = note.title;
    notesField.value = note.content;
    notesField.style.height = 'auto';
    notesField.style.height = (notesField.scrollHeight) + 'px';
    if (note.done) {
        noteCheckBox.classList.remove("checkbox-hidden");
    } else {
        noteCheckBox.classList.add("checkbox-hidden");
    }
    todoContainer.style.display = 'flex';
}

function clearNoteDisplay() {
    noteNameElement.textContent = "";
    notesField.value = "";
    notesField.style.height = 'auto';
    notesField.style.height = (notesField.scrollHeight) + 'px';
    noteCheckBox.classList.add("checkbox-hidden");
    todoContainer.style.display = 'none';
}

function updateInputCheckbox() {
    if (!isDone) {
        isDoneCheckBox.style.opacity = "0";
        isDoneCheckBox.style.transform = "scale(0.8)";
    } else {
        isDoneCheckBox.style.opacity = "1";
        isDoneCheckBox.style.transform = "scale(1)";
    }
}

addTodoButton.addEventListener("click", () => {
    const title = nameTodoInput.value.trim();
    if (title) {
        notes.push({ title, content: "", done: isDone });
        saveNotes();
        renderNotesList();
        selectNote(notes.length - 1);
        nameTodoInput.value = "";
    }
});

isDoneCheckBox.addEventListener("click", () => {
    isDone = !isDone;
    updateInputCheckbox();
});

noteCheckBox.addEventListener("click", () => {
    if (currentIndex >= 0) {
        notes[currentIndex].done = !notes[currentIndex].done;
        saveNotes();
        renderNotesList();
        if (notes[currentIndex].done) {
            noteCheckBox.classList.remove("checkbox-hidden");
        } else {
            noteCheckBox.classList.add("checkbox-hidden");
        }
    }
});

notesField.addEventListener('input', function() {
    if (currentIndex >= 0) {
        notes[currentIndex].content = this.value;
        saveNotes();
    }
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

deleteNoteButton.addEventListener("click", () => {
    if (currentIndex >= 0 && confirm("Вы уверены, что хотите удалить эту заметку?")) {
        notes.splice(currentIndex, 1);
        saveNotes();
        renderNotesList();
        currentIndex = -1;
        if (notes.length > 0) {
            selectNote(0);
        } else {
            clearNoteDisplay();
        }
    }
});

// Initial load
updateInputCheckbox();
renderNotesList();
if (notes.length > 0) {
    selectNote(0);
} else {
    clearNoteDisplay();
}