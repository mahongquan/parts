// import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'

export type Todo = {
  id: number
  title: string
  completed: boolean
  userId: number
}

export const useTodos = () => {
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState('')
  // const [data, setData] = useState<Todo[] | null>(null)

  // const fetchTodos = async () => {
  //   try {
  //     setIsLoading(true)
  //     const resData = await fetch('http://localhost:4000/todos').then((res) =>
  //       res.json()
  //     )

  //     setData(resData)
  //     setIsLoading(false)
  //   } catch (err) {
  //     setError('Sorry, something went wrong.')
  //     setIsLoading(false)
  //   }
  // }

  // useEffect(() => {
  //   fetchTodos()
  // }, [])

  // return { data, isLoading, error }
  return useQuery<Todo[], { message: string }>('todos', () =>
    fetch('http://localhost:8000/rest/Todo').then((res) => {
      console.log(res);
      return res.json()
    })
  )
}
