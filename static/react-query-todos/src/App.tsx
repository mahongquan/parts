import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import Todos from './components/Todos'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'

import './App.css'

const queryClient = new QueryClient()

function App() {
  const [todoId, setTodoId] = useState(-1)

  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <div className='add-todo'>
          <AddTodo />
        </div>

        <div>
          {todoId > -1 ? (
            <Todo todoId={todoId} setTodoId={setTodoId} />
          ) : (
            <Todos setTodoId={setTodoId} />
          )}
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
