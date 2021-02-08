import { useState, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'

import { Todo } from './useTodos'

export const useTodo = (id: number) => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')
  // const [data, setData] = useState<Todo | null>(null)

  // const fetchTodo = useCallback(async () => {
  //   try {
  //     setIsLoading(true)

  //     const resData = await fetch(
  //       `http://localhost:4000/todos/${id}`
  //     ).then((res) => res.json())

  //     setData(resData)
  //     setIsLoading(false)
  //   } catch (err) {
  //     setError('Sorry, something went wrong.')
  //     setIsLoading(false)
  //   }
  // }, [id])

  // useEffect(() => {
  //   fetchTodo()
  // }, [fetchTodo])

  // return { data, isLoading, error }

  return useQuery<Todo, { message: string }>(['todo', id], () =>
    fetch(`http://localhost:8000/rest/Todo/${id}`).then((res) => res.json())
  )
}
