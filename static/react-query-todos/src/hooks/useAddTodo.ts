// import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { Todo } from './useTodos'

export const useAddTodo = () => {
  const queryClient = useQueryClient()
  // const [isLoading, setIsLoading] = useState(false)
  // const [isSuccess, setIsSuccess] = useState(false)
  // const [error, setError] = useState('')

  // const addTodo = async (newTodo: Omit<Todo, 'id'>) => {
  //   try {
  //     setIsLoading(true)

  //     const resData = await fetch('http://localhost:4000/todos', {
  //       method: 'POST',
  //       body: JSON.stringify(newTodo),
  //       headers: {
  //         'Content-type': 'application/json; charset=UTF-8',
  //       },
  //     }).then((res) => res.json())

  //     if (resData) {
  //       setIsSuccess(true)
  //       setIsLoading(false)
  //     }
  //   } catch (err) {
  //     setError('Sorry, something went wrong.')
  //     setIsLoading(false)
  //     setIsSuccess(false)
  //   }
  // }

  // return { addTodo, isLoading, isSuccess, error }

  return useMutation<Todo, { message: string }, any>(
    (newTodo: Omit<Todo, 'id'>) =>
      fetch('http://localhost:8000/rest/Todo', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => res.json()),
    { onSuccess: () => queryClient.invalidateQueries('todos') }
  )
}
