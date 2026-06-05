import { useState } from "react";
import { useTodoItem } from "../../hooks/useTodoItem";

export const AddTodoItem = ({ updateTodoList }) => {
  const [title, setTitle] = useState("");

  const { execute: addTodo, isLoading } = useTodoItem(
    "http://localhost:3002/api/todos/add",
    "POST"
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTodo({ title });

      updateTodoList();
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Добавление..." : "Добавить"}
      </button>
    </form>
  );
};
