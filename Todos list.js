import React from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, updateTodo, deleteTodo }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p>No todos added yet!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;