import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getTodos() {
    // tạo tham chiến đến collection "todos" trong firestore
    const getTodos = await getDocs(collection(db, "todos"));
    return getTodos.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addTodo(title: string) {
    const newTodo={
        title,
        completed: false,
        createdAt: new Date(),
    }
    const docRef = await addDoc(collection(db, "todos"), newTodo);
    return { id: docRef.id, ...newTodo };
}

export async function updateTodo(id: string, title: string, completed: boolean) {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, { title, completed });
    return { id, title, completed };
}

export async function deleteTodo(id: string) {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
    return { id };
}
