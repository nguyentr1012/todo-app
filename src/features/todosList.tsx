import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos, addTodoAction, updateTodoAction, deleteTodoAction } from './todoSlice'
import { Todo } from './todosTypes'
import { RootState, AppDispatch } from '../app/store'

const TodosList = () => {
    const [newTitle, setNewTitle] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error} = useSelector((state: RootState) => state.todos);
    useEffect(()=>{
        dispatch(fetchTodos());
    },[dispatch]);

    const startEdit = (todo: Todo) => {
        setEditingId(todo.id);
        setEditingTitle(todo.title);
    }

    const saveEdit = (todo: Todo) => {
        const title = editingTitle.trim();
        if (title && title !== todo.title) {
            dispatch(updateTodoAction({ ...todo, title }));
        }
        setEditingId(null);
        setEditingTitle("");
    }

 
    if(error){
        return <div>Error: {error}</div>;
    }
    return (
        <>
        <div className="flex gap-2 mb-3">
            <input
                type="text"
                placeholder="Enter todo title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && newTitle.trim()) {
                        dispatch(addTodoAction(newTitle.trim()));
                        setNewTitle("");
                    }
                }}
                className="flex-1 border rounded px-3 py-2"
            />
            <button
                onClick={() => {
                    if (!newTitle.trim()) return;
                    dispatch(addTodoAction(newTitle.trim()));
                    setNewTitle("");
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
                Add
            </button>
        </div>
        <ul className="space-y-2">
          {items.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(updateTodoAction({
                  ...todo,
                  completed: !todo.completed
                }))}
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={() => saveEdit(todo)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(todo);
                    if (e.key === "Escape") { setEditingId(null); setEditingTitle(""); }
                  }}
                  autoFocus
                  style={{ marginLeft: 8, padding: 4, width: 220 }}
                />
              ) : (
                <span
                  style={{ textDecoration: todo.completed ? "line-through" : "none", marginLeft: 8, cursor: "pointer" }}
                  onDoubleClick={() => startEdit(todo)}
                  title="Double-click để chỉnh sửa"
                >
                  {todo.title}
                </span>
              )}
              <button className="ml-auto text-red-600 hover:text-red-700" onClick={() => dispatch(deleteTodoAction(todo.id))}>❌</button>
            </li>
          ))}
        </ul>
        </>
      );
    };
export default TodosList;