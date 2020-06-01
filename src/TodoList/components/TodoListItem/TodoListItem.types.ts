export interface TodoListEntity {
  id: string,
  text: string,
  done: boolean
}

export interface TodoListItemProps {
  inProgress: boolean,
  id: string,
  text: string,
  done: boolean,
  onClick: (item: TodoListEntity) => void
  onRemove: (id: string) => void
}