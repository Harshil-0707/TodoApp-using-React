import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Main = () => {

    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("Todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("Todos", JSON.stringify(todos));
    }, [todos]);

    function handleAdd() {
        if (todo.trim() !== "") {
            setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
            setTodo("");
        }
    }

    function handleCheckBox(e) {
        let id = e.target.name;
        const updatedTodos = todos.map(todoItem =>
            todoItem.id === id ? { ...todoItem, isCompleted: !todoItem.isCompleted } : todoItem
        );
        setTodos(updatedTodos);
    }

    function saveToLocalStorage() {
        localStorage.setItem("Todos", JSON.stringify(todos));
    }

    function handleEdit(id) {
        const t = todos.find(i => i.id === id);
        if (t) {
            setTodo(t.todo);
            setTodos(todos.filter(t => t.id !== id));
        }
    }

    const handleDelete = (todoId) => {
        setTodo("");
        setTodos(todos.filter(id => id.id !== todoId));
    }

    const handleChange = (e) => setTodo(e.target.value);

    return (
        <main className="grid place-items-center">
            <div className="w-10/12 p-5 rounded-xl bg-slate-200">
                <h3 className="text-xl font-semibold text-center mb-3">
                    iTask - Manage your todos at one place
                </h3>
                <div className="font-semibold text-lg">Add a Todo</div>
                <div className="submitInput flex my-2">
                    <input
                        type="text"
                        name="text"
                        id="getInput"
                        value={todo}
                        autoComplete='off'
                        onChange={handleChange}
                        className="mr-3 rounded-md w-full pl-3 outline-0"
                    />
                    <button onClick={handleAdd} className="btn-primary">Save</button>
                </div>
                <div className="flex">
                    <input
                        type="checkbox"
                        name="checkbox"
                        className="mr-1"
                        id="showFinished"
                    /> Show Finished
                </div>
                <div className="h-px bg-black opacity-25 w-11/12 mx-auto my-4"></div>
                <h3 className="text-xl font-semibold">Todos</h3>
                <div className="todos">
                    {!todos.length && <div>No Todos to display</div>}
                    {todos.map(item => {
                        return <div className="todo flex items-center justify-between mb-3" key={item.id}>
                            <div className="flex">
                                <input
                                    id="checkbox"
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
                                <button onClick={() => handleEdit(item.id)} className="btn-primary mx-2">Edit</button>
                                <button onClick={() => handleDelete(item.id)} className="btn-primary">Delete</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </main>
    )
};

export default Main;