import React, { useState, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import TodoList from './TodoList'
import { TodoListAction, TodoItem, TodoListDetail } from './TodoList.types'

export default {
  title: 'TodoList'
}

const todoItems = [{
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

export const Default = () => {
  const [inProgress, setInProgress] = useState(true)
  const [addTodoInProgress, setAddTodoInProgress] = useState(false)
  const [items, setItems] = useState<Array<TodoItem>>(todoItems)
  const [language, setLanguage] =  useState('en')

  useEffect(() => {
    setTimeout(() =>  setInProgress(false), 2000)
  }, [])

  const handleOnChange = ({ action, ...updatedItem }: TodoListDetail) => {
    switch (action) {
      case TodoListAction.Add:
        setAddTodoInProgress(true)
        setTimeout(() => {
          setItems([ ...items, updatedItem ])
          setAddTodoInProgress(false)
        }, 1000)        
        break
         case TodoListAction.Update:
          setItems(items.map((item) => {
            if(item.id === updatedItem.id) {
              return updatedItem
            }
            return item
          }))
          break
      case TodoListAction.Delete:
        setItems(items.filter(({ id }) => id !== updatedItem.id))
        break
    }
  }

  const languageStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: 24,
    color: 'red',
    fontSize: 20
  }

  return (
    <IntlProvider locale='en' messages={messages[language]}>
      <div style={languageStyle}>
        Select a language: &nbsp;
        <select
          name='language'
          defaultValue='entryForm'
          onChange={(e) => setLanguage(e.target.value)}
          style={{ fontSize: 16 }}
        >
          <option value=''>Default</option>
          <option value='en'>English</option>
          <option value='tr'>Turkce</option>
        </select>
      </div>
      <TodoList
        items={items}
        onChange={handleOnChange}
        addTodoInProgress={addTodoInProgress}
        itemsLoading={inProgress}
      />
    </IntlProvider>
    
  )
}
