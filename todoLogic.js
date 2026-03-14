export let todos = [];
export let currentDate = new Date();

export const todoActions = {
  //날짜 변경
  changeDate: (offset) => {
    currentDate.setDate(currentDate.getDate() + offset);
    return currentDate;
  },

  // 투두 추가
  addTodo: (text, dateStr) => {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
      date: dateStr,
    };
    todos = [...todos, newTodo];
    return todos;
  },

  deleteTodo: (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    return todos;
  },

  toggleTodo: (id) => {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    return todos;
  },
};
