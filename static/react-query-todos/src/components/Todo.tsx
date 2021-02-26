import React from 'react'

import { useTodo } from '../hooks/useTodo'

interface Props {
  todoId: number
  setTodoId: (id: number) => void
}

const Todo: React.FC<Props> = ({ todoId, setTodoId }) => {
  const { data, isLoading, error } = useTodo(todoId)

  if (isLoading) return <h4 style={{ color: 'red' }}>Loading...</h4>

  // if (error) return <p>{error}</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <div>
        <a href='#' onClick={() => setTodoId(-1)}>
          Back
        </a>
      </div>

      <>
        {data ? (
          <div>
            <h3>Title: {data.title}</h3>
            <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Not found</p>
        )}
      </>
    </div>
  )
}

export default Todo
