import { todoActions, todos, currentDate } from "./todoLogic.js";

const dateElement = document.getElementById("today-date");
const prevBtn = document.getElementById("prev-day");
const nextBtn = document.getElementById("next-day");
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");

//날짜
function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function getDateKey(date) {
  return date.toISOString().split("T")[0];
}

// 렌더링
function render() {
  //날짜 관련
  dateElement.innerText = formatDate(currentDate);
  const currentKey = getDateKey(currentDate);
  const filteredTodos = todos.filter((todo) => todo.date === currentKey);

  todoList.innerHTML = "";

  // map 함수 느낌
  filteredTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    li.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" class="todo-checkbox" ${
          todo.completed ? "checked" : ""
        }>
        <span class="checkmark"></span>
      </label>
      <p class="todo-text">${todo.text}</p>
      <button class="delete-button">삭제</button>
    `;

    // 체크박스 클릭 이벤트
    li.querySelector(".todo-checkbox").addEventListener("change", () => {
      todoActions.toggleTodo(todo.id);
      render();
    });

    // 삭제 버튼 클릭 이벤트
    li.querySelector(".delete-button").addEventListener("click", () => {
      todoActions.deleteTodo(todo.id);
      render();
    });

    todoList.appendChild(li);
  });

  const remaining = filteredTodos.filter((todo) => !todo.completed).length;
  todoCount.innerText = `${remaining}개`;
}

// 날짜 이동
prevBtn.addEventListener("click", () => {
  todoActions.changeDate(-1); // 전날
  render();
});

nextBtn.addEventListener("click", () => {
  todoActions.changeDate(1); // 다음날
  render();
});

//투두 등록
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todoActions.addTodo(text, getDateKey(currentDate));
    todoInput.value = "";
    render();
  }
});

render();
