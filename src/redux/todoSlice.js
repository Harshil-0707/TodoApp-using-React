import { createSlice } from "@reduxjs/toolkit";

const loadTodos = () => {
    const storedTodos = localStorage.getItem("Todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
}

const todoSlice = createSlice({
    name: "Todo",
    initialState: loadTodos(),
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("Todos", JSON.stringify(state));
        },
        removeTodo: (state, action) => {
            const newState = state.filter(todo => todo.id !== action.payload);
            localStorage.setItem("Todos", JSON.stringify(newState));
            return newState;
        },
        editTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todo = state.find(t => t.id === id);
            if (todo) {
                todo.todo = newText;
                localStorage.setItem("Todo", JSON.stringify(state));
            }
        },
        completedTodo: (state, action) => {
            const id = action.payload;
            const updatedTodos = state.map((todo) =>
                todo.id === id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
            );
            return updatedTodos;
        }
    }
});

export const { addTodo, removeTodo, editTodo, completedTodo } = todoSlice.actions;
export default todoSlice.reducer;