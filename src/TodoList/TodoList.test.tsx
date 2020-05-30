import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'

import TodoList from './TodoList'
import { TodoListProps } from './TodoList.types'

const items = [{
  id: '1',
  text: 'First task',
  done: false
},{
  id: '2',
  text: 'Second task',
  done: true
},{
  id: '3',
  text: 'Third task',
  done: true
}]

const messages = {
  'tr': {
    'todoList.entryForm.addButton': 'Ekle',
    'todoList.entryForm.inputPlaceholder': 'Yapmak istediginiz seyi buraya girin',
    'todoList.header': 'Todo Listem',
    
  },
  'en': {
    'todoList.entryForm.addButton': 'Add',
    'todoList.entryForm.inputPlaceholder': 'What do you need to do?',
    'todoList.header': 'My Todo List',
  }
}

describe('Test Component', () => {
  let props: TodoListProps

  beforeEach(() => {
    props = {
      items: [...items]
    }
  })

  const renderComponent = () => render(
    <IntlProvider locale='en' messages={messages['en']}>
      <TodoList {...props} />
    </IntlProvider>
    )

  it('should have primary className with default props', () => {
    const { getByTestId } = renderComponent()

    const TodoList = getByTestId('todolist-component')

    expect(TodoList).toHaveClass('wrapper')
  })
})
