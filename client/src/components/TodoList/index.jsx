import { useState } from "react";
import { useTodoItem } from "../../hooks/useTodoItem";

export const TodoList = ({ todoList, updateTodoList, isLoading }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const { execute: deleteTodo } = useTodoItem(
    "http://localhost:3002/api/todos/delete",
    "DELETE"
  );

  const { execute: updateTodo } = useTodoItem(
    "http://localhost:3002/api/todos/update",
    "PATCH"
  );

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
  };

  const handleSave = async (id) => {
    try {
      await updateTodo({
        id,
        title: editTitle,
      });

      setEditingId(null);
      setEditTitle("");

      updateTodoList();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo({ id });

      updateTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isLoading && <p>Загрузка...</p>}

      {!isLoading && !todoList.length && <p>Список задач пуст</p>}

      {!isLoading &&
        todoList.map((item) => (
          <div key={item._id}>
            {editingId === item._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleSave(item._id)}>Сохранить</button>{" "}
                <button onClick={handleCancel}>Отмена</button>
              </>
            ) : (
              <>
                {item.title}

                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => handleEdit(item)}
                >
                  Редактировать
                </button>

                <button
                  style={{ marginLeft: "15px" }}
                  onClick={() => handleDelete(item._id)}
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        ))}
    </>
  );
};
