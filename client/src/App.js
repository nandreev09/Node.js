import { useState, useEffect, useCallback } from "react";
import { useGetToDoList } from "./hooks/useGetTodoList.js";
import { TodoList } from "./components/TodoList";
import { AddTodoItem } from "./components/AddTodoItem";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTodoList = useGetToDoList();

  const updateTodoList = useCallback(async () => {
    try {
      setIsLoading(true);

      const result = await getTodoList();

      setTodoList(result.todos);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [getTodoList]);

  useEffect(() => {
    updateTodoList();
  }, [updateTodoList]);

  return (
    <div className="App">
      <h1>Мои задачи</h1>

      <TodoList
        todoList={todoList}
        isLoading={isLoading}
        updateTodoList={updateTodoList}
      />

      <br />

      <AddTodoItem updateTodoList={updateTodoList} />
    </div>
  );
}

export default App;
