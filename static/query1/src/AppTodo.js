import * as React from 'react'
import axios, { AxiosError } from 'axios'

import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
  UseQueryOptions,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Client from './Client';
const client = new QueryClient()

async function fetchTodos(): Promise<Todos> {
  const res = await axios.get('/rest/Todo');
  console.log(res);
  return res.data
}

function useTodos<TData = Todos>(
  options?: UseQueryOptions<Todos, AxiosError, TData>
) {
  return useQuery('todos', fetchTodos, options)
}

// function TodoCounter() {
//   // subscribe only to changes in the 'data' prop, which will be the
//   // amount of todos because of the select function
//   const counterQuery = useTodos({
//     select: data => data.data.length,
//     notifyOnChangeProps: ['data'],
//   })

//   React.useEffect(() => {
//     console.log('rendering counter')
//   })

//   return <div>TodoCounter: {counterQuery.data ?? 0}</div>
// }

function Example() {
  const queryClient = useQueryClient()
  const [text, setText] = React.useState('')
  const { isFetching, ...queryInfo } = useTodos()
  const addTodoMutation = useMutation(
    newTodo => axios.post('/rest/Todo', { text: newTodo,completed:false }),
    {
      // When mutate is called:
      onMutate: async (newTodo: string) => {
        setText('')
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await queryClient.cancelQueries('todos')

        // Snapshot the previous value
        const previousTodos = queryClient.getQueryData('todos')

        // Optimistically update to the new value
        if (previousTodos) {
          queryClient.setQueryData('todos', {
            ...previousTodos,
            data: [
              ...previousTodos.data,
              { id: Math.random().toString(), text: newTodo },
            ],
          })
        }

        return { previousTodos }
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, variables, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData('todos', context.previousTodos)
        }
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  return (
    <div>
      <p>
        In this example, new items can be created using a mutation. The new item
        will be optimistically added to the list in hopes that the server
        accepts the item. If it does, the list is refetched with the true items
        from the list. Every now and then, the mutation may fail though. When
        that happens, the previous list of items is restored and the list is
        again refetched from the server.
      </p>
      <form
        onSubmit={e => {
          e.preventDefault()
          addTodoMutation.mutate(text)
        }}
      >
        <input
          type="text"
          onChange={event => setText(event.target.value)}
          value={text}
        />
        <button disabled={addTodoMutation.isLoading}>Create</button>
      </form>
      <br />
      {queryInfo.isSuccess && log(queryInfo) && (
        <>
          <div>
            {/* The type of queryInfo.data will be narrowed because we check for isSuccess first */
            //Updated At: {new Date(queryInfo.data.ts).toLocaleTimeString();
            }
          </div>
          <ul>
            {queryInfo.data.data.map(todo => (
              <li key={todo.id}>{todo.text}</li>
            ))}
          </ul>
          {isFetching && <div>Updating in background...</div>}
        </>
      )}
      {queryInfo.isLoading && 'Loading'}
      {queryInfo.error?.message}
    </div>
  )
}
function log(queryInfo){
  console.log(queryInfo);
  return true;
}
export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Example />
      {
        //<TodoCounter />
      }
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}
