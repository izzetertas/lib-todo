import React from 'react'
import classNames from 'classnames'
import { MdDelete } from 'react-icons/md'
import ClipLoader from 'react-spinners/ClipLoader'

import { TodoListItemProps } from './TodoListItem.types'

import './TodoListItem.scss'

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
      {props.inProgress &&
        <div className='todo-list-item-loading'>
          <ClipLoader size={20} color={'#A2AFAD'} loading />
        </div>
      }
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
