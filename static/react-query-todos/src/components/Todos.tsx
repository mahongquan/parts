import React from 'react'
import { useQueryClient } from 'react-query'

import { useTodos } from '../hooks/useTodos'

interface Props {
  setTodoId: (id: number) => void
}

const Todos: React.FC<Props> = ({ setTodoId }) => {
  const queryClient = useQueryClient()
  const { data, isLoading, error } = useTodos()

  if (isLoading) return <h4 style={{ color: 'red' }}>Loading...</h4>

  // if (error) return <p>{error}</p>
  if (error) return <p>{error.message}</p>

  return (
    <div>
      <h3>Todos</h3>

      {data &&
        data
          .sort((a, b) => b.id - a.id)
          .map((todo) => (
            <p key={todo.id}>
              <a
                href='#'
                onClick={() => setTodoId(todo.id)}
                style={
                  queryClient.getQueryData(['todo', todo.id])
                    ? { color: 'green', fontWeight: 'bold' }
                    : {}
                }
              >
                {todo.title}
              </a>
            </p>
          ))}
    </div>
  )
}

export default Todos
