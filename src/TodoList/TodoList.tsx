import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FormattedMessage } from 'react-intl'

import TodoEntryForm from './components/TodoEntryForm'
import TodoListItem from './components/TodoListItem'
import Loading from './components/Loading'

import { TodoListProps, TodoListAction } from './TodoList.types'

import './TodoList.scss'

const TodoList: React.FC<TodoListProps> = (props) => {

  const handleOnSubmit = (text) => {
    const newItem = {
      id: uuidv4(),
      text,
      done: false
    }

    if(props.onChange) {
      props.onChange({
        ...newItem,
        action: TodoListAction.Add
      })
    }
  }

  const handleItemClick = (item) => {
    if(props.onChange) {
      props.onChange({
        ...item,
        action: TodoListAction.Update
      })
    }
  }

  const handleItemRemove =  (id) => {
    if(props.onChange) {
      props.onChange({ id, text: '', done: false, action: TodoListAction.Delete })
    }
  }

  return (
    <div
      data-testid='todolist-component'
      className='todoList-wrapper'
    >
      <h1>
        <FormattedMessage id="todoList.header" defaultMessage="My todo list..." />
      </h1>
      <TodoEntryForm
        onSubmit={handleOnSubmit}
        addTodoInProgress={props.addTodoInProgress}
      />
      {props.itemsLoading
      ?
      <Loading />
      :
        <ul>
          {props.items.map((item) => (
            <TodoListItem
              {...item}
              onClick={handleItemClick}
              onRemove={handleItemRemove}
              key={item.id}
            />
          ))}
        </ul>
      }
    </div>
  )
}

export default TodoList
