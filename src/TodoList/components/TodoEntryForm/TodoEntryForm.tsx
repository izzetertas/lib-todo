import React, { useState, ChangeEvent, FormEvent } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import ClipLoader from 'react-spinners/ClipLoader'


import { TodoEntryFormProps } from './TodoEntryForm.types'

import './TodoEntryForm.scss'


const TodoEntryForm: React.FC<TodoEntryFormProps> = (props) => {
  const [inputValue, setInputValue] = useState<string>('')
  
  let placeHolderMsg = ''
  try {
    const intl = useIntl()
    placeHolderMsg = intl.formatMessage({ id: 'todoList.entryForm.inputPlaceholder' })
  } catch { }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(inputValue) {
      props.onSubmit(inputValue)
      setInputValue('')
    }
  }

  return (
    <form noValidate>
      <input
        data-testid='todoEntry-input'
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder={placeHolderMsg}
        disabled={props.addTodoInProgress}
      />
      <button
        data-testid='todoEntry-add-btn'
        type='submit'
        onClick={handleSubmit}
        className={props.addTodoInProgress ? 'disabled' : null }
        disabled={Boolean(!inputValue.length) || props.addTodoInProgress}
      >
        <ClipLoader
          size={10}
          color={'#FFFFFF'}
          loading={Boolean(props.addTodoInProgress)}
        />{' '}
        <FormattedMessage
          id='todoList.entryForm.addButton'
          defaultMessage='Add'
        />
      </button>
    </form>
  )
}

export default TodoEntryForm
