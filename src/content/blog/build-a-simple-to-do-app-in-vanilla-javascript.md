---
title: Build a Simple To-Do App in Vanilla JavaScript
description: Construct a clean, filterable task management app using only HTML, CSS, and JavaScript — no frameworks needed.
date: 2025-03-30
tag: "#javascript"
readTime: "2 min"
---

This tutorial walks through constructing a clean, filterable task management application using only HTML, CSS, and JavaScript — without relying on external libraries or frameworks.

## Key Learning Objectives

- Manage application state with JavaScript arrays
- Handle form submission events
- Dynamically manipulate the DOM
- Implement filtering functionality for task status

## The HTML Setup

Begin with this basic structure:

```html
<form id="todo-form">
  <input type="text" id="todo-input" placeholder="What needs to be done?" />
</form>

<ul id="todo-list"></ul>

<div>
  <button id="todo-all-filter">All</button>
  <button id="todo-active-filter">Active</button>
  <button id="todo-completed-filter">Completed</button>
</div>
```

## JavaScript Explained

### 1. Targeting DOM Elements

```javascript
let todoInput = document.getElementById("todo-input");
let todoList = document.getElementById("todo-list");
let todoForm = document.getElementById("todo-form");

let todoAllFilter = document.getElementById("todo-all-filter");
let todoActiveFilter = document.getElementById("todo-active-filter");
let todoCompletedFilter = document.getElementById("todo-completed-filter");
```

Use `getElementById()` to reference the input field, list container, form, and filter buttons.

### 2. Storing Todos

```javascript
let todos = [];
let filter = "all";
```

Initialize an empty array for task storage and a filter variable tracking the active view mode (all, active, or completed).

### 3. Rendering the To-Do List

```javascript
function renderTodos() {
  todoList.innerHTML = "";
  let filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.done;
    } else {
      return todo.done;
    }
  });

  filteredTodos.forEach((todo) => {
    let todoElement = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      renderTodos();
    });

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((t) => t !== todo);
      renderTodos();
    });

    todoElement.appendChild(checkbox);
    todoElement.appendChild(document.createTextNode(todo.value));
    todoElement.appendChild(deleteButton);

    todoList.appendChild(todoElement);
  });
}
```

Filter tasks based on the selected view, then create list item elements containing a checkbox for completion toggling and a delete button for removal.

### 4. Adding a New Todo

```javascript
function addTodo(e) {
  e.preventDefault();
  let value = todoInput.value;
  todos.push({ value, done: false });
  renderTodos();
}
```

On form submission, prevent the default page reload, extract the input value, append a new task object to the collection, and refresh the display.

### 5. Initialization & Event Binding

```javascript
function init() {
  todoForm.addEventListener("submit", addTodo);
  [todoAllFilter, todoActiveFilter, todoCompletedFilter].forEach((element) => {
    element.addEventListener("click", () => {
      filter = element.id.split("-")[1];
      renderTodos();
    });
  });
}
init();
```

Attach event listeners to the form and filter buttons. When a filter button is clicked, extract the filter name from its ID and update the display.

## View the Source Code on GitHub

Full project available: [Browse the complete project on GitHub](https://github.com/tarunranka/learning/tree/main/javascript/todo)

## Final Thoughts

This demonstration showcases what pure JavaScript can accomplish:

- No frameworks required
- No build tools needed
- Clean, straightforward DOM manipulation

**Bonus Challenge:** Implement `localStorage` to persist tasks across page refreshes.
