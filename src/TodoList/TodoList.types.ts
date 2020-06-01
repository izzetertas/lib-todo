export interface TodoItem {
  id: string,
  text: string,
  done: boolean
  inProgress: boolean
}

export interface TodoListProps {
  addTodoInProgress?: boolean
  itemsLoading?: boolean
  items: TodoItem[]
  onChange?: (detail: TodoListDetail) => void
}

export enum TodoListAction {
  Add = 'ADD',
  Delete = 'DELETE',
  Update = 'UPDATE'
}

export interface TodoListDetail {
  id: string,
  text: string,
  done: boolean,
  action: TodoListAction
}
