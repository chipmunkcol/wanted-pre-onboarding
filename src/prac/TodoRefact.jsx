import React, { useState } from "react";

const FilterType = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
};

const TodoRefact = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState("");

  // 액션
  const addTodo = () => {
    // 계산
    const nextTodos = TodosController(todos)
      .add({ text: input, completed: false, id: Math.random() })
      .get();
    // 액션
    setTodos(nextTodos);
    setInput("");
  };

  // 액션
  const toggleComplete = (targetTodo) => {
    // 계산
    const nextTodos = TodosController(todos).toggleComplete(targetTodo).get();
    // 액션
    setTodos(nextTodos);
  };

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <button onClick={() => setFilter("all")}>Show All</button>
      <button onClick={() => setFilter("completed")}>Show Completed</button>
      <button onClick={() => setFilter("incomplete")}>Show Incomplete</button>
      <input
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {/* 계산 */}
        {TodosController(todos)
          .filter(filter)
          .search(searchQuery)
          .get()
          .map((todo) => (
            <li key={todo.id}>
              {todo.text}{" "}
              <button onClick={() => toggleComplete(todo)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TodoRefact;

// ViewModel 역할 + 체이닝 스타일 적용을 위한 헬퍼 함수
const TodosController = (todos) => ({
  add: (todo) => {
    return TodosController([...todos, todo]);
  },
  search: (keyword) => {
    const searchedTodos = todos.filter((todo) =>
      todo.text.includes(keyword.toLowerCase())
    );
    return TodosController(searchedTodos);
  },
  filter: (filter) => {
    let filteredTodos = todos;
    if (filter === FilterType.COMPLETED) {
      filteredTodos = todos.filter((todo) => todo.completed);
    } else if (filter === FilterType.INCOMPLETE) {
      filteredTodos = todos.filter((todo) => !todo.completed);
    }
    return TodosController(filteredTodos);
  },
  toggleComplete: (targetTodo) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id === targetTodo.id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    return TodosController(nextTodos);
  },
  get: () => todos, // 최종 결과를 반환하는 메서드
});