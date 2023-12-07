// import { useEffect, useRef, useState } from "react";
// import styled from "styled-components";


// /**
//  * TodoList 를 데이터 / 계산 / 액션으로 구분해보자.
//  * @returns {ReactComponentElement}
//  */
// const TodoList = () => {

//   const [todos, setTodos] = useState([]); // {text: '', done: bool }
//   const [input, setInput] = useState('');
//   // const [filter, setFilter] = useState('all'); // all, done, incomplete
//   const [searchQuery, setSearchQuery] = useState('');

//   const addTodo = e => {
//     e.preventDefault();
//     const inputValue = input;
//     const newTodo = { text: inputValue, done: false };
//     setTodos([...todos, newTodo]);
//     setInput('');
//   };

//   const searchTodos = () => {
//     return todos.filter((todo) => todo.text.includes(searchQuery));
//   };

//   const onChangeInputValue = e => {
//     const inputValue = e.target.value;
//     setInput(inputValue);
//   };

//   const [filter, setFilter] = useState('')

//   const filterTodos = () => {
//     switch (filter) {
//       case 'done':
//         return todos.filter(todo => todo.done === true);
//       case 'incomplete':
//         return todos.filter(todo => todo.done === false);
//       default:
//         return todos;
//     }
//   }

//   const toggleTodo = index => {
//     const newTodos = [...todos];
//     newTodos[index].done = !newTodos[index].done;
//     setTodos(newTodos);
//   };

//   const inputRef = useRef(null);
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   return (
//     <>
//       <form>
//         <input value={input} onChange={onChangeInputValue} ref={inputRef} />
//         <button type="submit" onClick={addTodo}>Add</button>
//       </form>
//       <button onClick={() => setFilter('')}>Show All</button>
//       <button onClick={() => setFilter('done')}>Show done</button>
//       <button onClick={() => setFilter('incomplete')}>Show Incomplete</button>

//       <ul>
//         {filterTodos().map((todo, index) => {
//           return (
//             <>
//               <li>{todo.text}</li>
//               <TodoBtn done={todo.done} onClick={() => toggleTodo(index)}>{todo.done ? '취소' : '완료'}</TodoBtn>
//             </>
//           )
//         })}
//       </ul>
//       {/* <input
//         placeholder="Search..."
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <ul>
//         {searchTodos().map((todo, index) => (
//           <li key={index}>
//             {todo.text}{' '}
//             <button onClick={() => toggleComplete(index)}>
//               {todo.done ? 'Undo' : 'Complete'}
//             </button>
//           </li>
//         ))}
//       </ul> */}
//     </>
//   );
// };

// const TodoBtn = styled.button`
//   background-color: ${props => props.done ? 'gray' : 'tomato'};
// `;

// export default TodoList;

import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, done, incomplete
  const [searchQuery, setSearchQuery] = useState('');

  const clearInput = () => {
    setInput('');
  }

  /**
   * @param {void} callback // clearInput 
   */
  const addTodo = callback => {
    const todo = {
      text: input,
      done: false,
      id: Math.random()
    }
    const newTodo = todoController(todos).add(todo).get();
    setTodos(newTodo);
    callback();
  };

  const toggleComplete = todo => {
    const newTodos = todoController(todos).toggleDone(todo).get();
    setTodos(newTodos);
  };

  const todoController = todos => ({
    add: todo => {
      const newTodos = [...todos, todo];
      return todoController(newTodos);
    },
    toggleDone: todo => {
      const newTodos = [...todos];
      const targetIndex = newTodos.findIndex(v => v.id === todo.id);
      newTodos[targetIndex].done = !newTodos[targetIndex].done;
      return todoController(newTodos);
    },
    filter: filter => {
      if (filter === 'done') {
        return todoController(todos.filter(todo => todo.done));
      }
      if (filter === 'incomplete') {
        return todoController(todos.filter((todo) => !todo.done));
      }
      return todoController(todos);
    },
    search: (searchQuery) => {
      return todoController(todos.filter(todo => todo.text.includes(searchQuery)));
    },
    get: () => todos
  });

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => addTodo(clearInput)}>Add</button>
      <button onClick={() => setFilter('all')}>Show All</button>
      <button onClick={() => setFilter('done')}>Show done</button>
      <button onClick={() => setFilter('incomplete')}>Show Incomplete</button>
      <input
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {todoController(todos)
          .filter(filter)
          .search(searchQuery)
          .get()
          .map((todo, index) => (
            <li key={index}>
              {todo.text}{' '}
              <button onClick={() => toggleComplete(todo)}>
                {todo.done ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
};

export default TodoList;