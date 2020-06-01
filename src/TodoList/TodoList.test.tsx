import React from 'react'
import { render, fireEvent, screen, getByText } from '@testing-library/react'

import { IntlProvider } from 'react-intl'

import { v4 as uuidv4 } from 'uuid'
jest.mock('uuid')

import TodoList from './TodoList'

import { TodoListProps } from './TodoList.types'

jest.mock('')

const items = [
	{
		id: '1',
		text: 'First task',
		done: false,
		inProgress: false,
	},
	{
		id: '2',
		text: 'Second task',
		done: true,
		inProgress: false,
	},
	{
		id: '3',
		text: 'Third task',
		done: true,
		inProgress: false,
	},
]

const messages = {
	tr: {
		'todoList.entryForm.addButton': 'Ekle',
		'todoList.entryForm.inputPlaceholder':
			'Yapmak istediginiz seyi buraya girin',
		'todoList.header': 'Todo Listem',
	},
	en: {
		'todoList.entryForm.addButton': 'Add',
		'todoList.entryForm.inputPlaceholder': 'What do you need to do?',
		'todoList.header': 'My Todo List',
	},
}

describe('Test Component', () => {
	let props: TodoListProps

	beforeEach(() => {
		props = {
			items: [...items],
			itemsLoading: false,
		}
	})

	const onChangeMock = jest.fn()

	const renderComponent = () =>
		render(
			<IntlProvider locale="en" messages={messages['en']}>
				<TodoList {...props} onChange={onChangeMock} />
			</IntlProvider>
		)

	describe('<TodoList>', () => {
		beforeEach(() => {
			onChangeMock.mockReset()
		})

		describe('When items are passed to component', () => {
			let renderer  = null
			beforeEach(() => {
				renderer = renderComponent()
			})

			it('should have correct wrapper', () => {
				const { getByTestId } = renderer
				const TodoList = getByTestId('todolist-component')
				expect(TodoList).toHaveClass('todoList-wrapper')
			})

			it('should have 3 list items', () => {
				const { container } = renderer
				expect(container.querySelectorAll('li').length).toBe(3)
			})

			it('should 2 items have been selected', () => {
				const { container } = renderer
				expect(container.querySelectorAll('li').length).toBe(3)
			})

			it('should show correct language on header', () => {				
				expect(screen.getByText('Add')).toBeInTheDocument()
			})

			test('second item should be selected', () => {
				const checkBox = renderer.getByTestId('item_2')
				expect(checkBox.checked).toBeTruthy()
			})
		})

		describe('when remove item is clicked', () => {
			test('regarding item should be removed', () => {
				const renderer = renderComponent()
				fireEvent.click(renderer.container.querySelector('li>button'))
				expect(onChangeMock).toHaveBeenCalledWith({
					action: 'DELETE',
					id: '1',
					done: false,
					text: ''
				})
			})
		})

		describe('when an uncompleted item is clicked', () => {
			test('regarding item should be done', () => {
				const renderer = renderComponent()
				fireEvent.click(renderer.container.querySelector('li>label'))
				expect(onChangeMock).toHaveBeenCalledWith({
					action: 'UPDATE',
					id: '1',
					done: true,
					text: 'First task'
				})
			})
		})

		describe('when a completed item is clicked', () => {
			test('regarding item should be uncompleted', () => {
				const renderer = renderComponent()
				fireEvent.click(renderer.container.querySelectorAll('li>label')[1])
				expect(onChangeMock).toHaveBeenCalledWith({
					action: 'UPDATE',
					id: '2',
					done: false,
					text: 'Second task'
				})
			})
		})
	})

	describe('when a new item is added', () => {
		beforeAll(() => {
			onChangeMock.mockReset()
		})

		test('new item should be added', () => {
			uuidv4.mockImplementation(() => 'newId')
			const renderer = renderComponent()
			const newTask = 'clean the house'
			fireEvent.change(renderer.getByTestId('todoEntry-input'), {
				target: { value: newTask },
			})
			fireEvent.click(renderer.getByTestId('todoEntry-add-btn'))

			expect(onChangeMock).toHaveBeenCalledWith({
				action: 'ADD',
				id: 'newId',
				done: false,
				text: newTask
			})
		})
	})
})
