import React, { useState, useEffect } from 'react'

import { useAddTodo } from '../hooks/useAddTodo'

interface Props {}

const AddTodo: React.FC<Props> = () => {
  const [title, setTitle] = useState('')
  // const { addTodo, isLoading, isSuccess, error } = useAddTodo()
  const { mutate, isLoading, isSuccess, error } = useAddTodo()

  useEffect(() => {
    if (isSuccess) setTitle('')
  }, [isSuccess])

  return (
    <div>
      <div>
        <h4>Add Todo</h4>

        <input
          type='text'
          name='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <button
          style={{ cursor: 'pointer' }}
          disabled={isLoading || !title}
          onClick={() => {
            // addTodo({ title, completed: false, userId: 11 })
            mutate({ title, completed: false, userId: 11 })
          }}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>

      {error && <p>{error.message}</p>}
    </div>
  )
}

export default AddTodo
