import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  addTodo,
  removeTodo,
  editTodo,
  completedTodo,
} from "../redux/todoSlice";
import { useSelector, useDispatch } from "react-redux";

function Card() {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todo);
  const [showFinished, setShowFinished] = useState(false);

  function handleAdd() {
    if (todo.trim() === "") return;
    if (editId) {
      dispatch(editTodo({ id: editId, newText: todo }));
      setEditId(null);
    } else {
      dispatch(addTodo({ id: uuidv4(), todo, isCompleted: false }));
    }
    setTodo("");
  }

  function handleCheckBox(e) {
    let id = e.target.name;
    dispatch(completedTodo(id));
  }

  function handleEdit(id) {
    const t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    setEditId(id);
  }

  const handleDelete = (todoId) => {
    setTodo("");
    dispatch(removeTodo(todoId));
  };

  function handleShowFinishedChange() {
    setShowFinished(!showFinished);
  }

  const handleChange = (e) => setTodo(e.target.value);

  return (
    <main className="grid place-items-center">
      <div className="w-10/12 p-5 rounded-xl bg-slate-200">
        <h3 className="text-2xl font-semibold text-center mb-3">
          Manage your todos at one place
        </h3>
        <div className="font-semibold text-lg">Add a Todo</div>
        <div className="submitInput flex my-2">
          <input
            type="text"
            name="text"
            id="getInput"
            value={todo}
            autoComplete="off"
            onChange={handleChange}
            className="mr-3 rounded-md w-full pl-3 outline-0"
          />
          <button onClick={handleAdd} className="btn-primary">
            {editId ? "Add" : "Save"}
          </button>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            name="checkbox"
            className="mr-1"
            id="showFinished"
            checked={showFinished}
            onChange={handleShowFinishedChange}
          />{" "}
          Show Finished
        </div>
        <div className="h-px bg-black opacity-25 w-11/12 mx-auto my-4"></div>
        <h3 className="text-xl font-semibold">Todos</h3>
        <div className="todos">
          {!todos.length && <div>No Todos to display</div>}
          {todos
            .filter((item) =>
              showFinished ? item.isCompleted : !item.isCompleted
            )
            .map((item) => {
              return (
                <div
                  className="todo flex items-center justify-between mb-3"
                  key={item.id}
                >
                  <div className="flex">
                    <input
                      id="checkbox1"
                      name={item.id}
                      type="checkbox"
                      className="mr-4"
                      onChange={handleCheckBox}
                      checked={item.isCompleted}
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn-primary mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn-primary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default Card;
