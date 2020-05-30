import React from 'react'
import classNames from 'classnames'
import { MdDelete } from 'react-icons/md'

import './TodoListItem.scss'

export interface TodoListItem {
  id: string,
  text: string,
  done: boolean
}

export interface TodoListItemProps {
  id: string,
  text: string,
  done: boolean,
  onClick: (item: TodoListItem) => void
  onRemove: (id: string) => void
}

const TodoListItem: React.FC<TodoListItemProps> = (props) => {
  const handleRemove = () => {
    props.onRemove(props.id)
  }

  const wrapperClasses = classNames(
    'todo-list-item',
    {
      'todo-list-item-done': props.done
    }
  )

  return (
    <li className={wrapperClasses}>
      <label>
        <input
          type='checkbox'
          onChange={() => props.onClick({
           id: props.id,
           text: props.text,
           done: !props.done
          })}
          checked={props.done}
        />
        {props.text}
      </label>
      <button type='submit' onClick={handleRemove}>
        <MdDelete size='16'/>
      </button>
    </li>
  )
}

export default TodoListItem
