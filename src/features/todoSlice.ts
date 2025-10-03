import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./todosAPI";
import { Todo, TodosState } from "./todosTypes";

const initialState: TodosState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    return await getTodos();
});

export const addTodoAction = createAsyncThunk("todos/addTodo", async (title: string) => {
    return await addTodo(title);
});

export const updateTodoAction = createAsyncThunk("todos/updateTodo", async (todo: Todo) => {
    return await updateTodo(todo.id, todo.title, todo.completed);
});

export const deleteTodoAction = createAsyncThunk("todos/deleteTodo", async (id: string) => {
    return await deleteTodo(id);
});

const slice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    //dùng extra reduers để xử lý bất đồng bộ thay vì reducers
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload as Todo[];
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch todos";
        });
        
    builder.addCase(addTodoAction.fulfilled,(state, action)=>{
        state.loading = false;
        state.items.push(action.payload as Todo);
    })
    builder.addCase(addTodoAction.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.error.message || "Failed to add todo";
    })

    builder.addCase(updateTodoAction.pending,(state)=>{
        state.loading = true;
    })
    builder.addCase(updateTodoAction.fulfilled,(state, action)=>{
        state.loading = false;
        state.items = state.items.map((item)=>item.id === action.payload.id ? action.payload as Todo : item);
    })
   
    builder.addCase(deleteTodoAction.fulfilled,(state, action)=>{
        state.loading =false;
        state.items = state.items.filter((item)=>item.id !== action.payload.id);
   }) 
}
})
export default slice.reducer;