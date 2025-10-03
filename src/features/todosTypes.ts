export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: any;
}

export interface TodosState {
    items: Todo[];
    loading: boolean;
    error: string | null;
}