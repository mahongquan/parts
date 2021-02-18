import {
   useQuery,
   useMutation,
   useQueryClient,
   QueryClient,
   QueryClientProvider,
 } from 'react-query'
 import axios, { AxiosError } from 'axios'
  // Create a client
 const queryClient = new QueryClient()
 async function postTodo(data){
  const res=await axios.post('/rest/Todo', data);
  return res.data;
}
 
 async function getTodos(){
  const res = await axios.get('/rest/Todo');
  // console.log(res);
  return res.data
}
 export default function App() {
   return (
     // Provide the client to your App
     <QueryClientProvider client={queryClient}>
       <Todos />
     </QueryClientProvider>
   )
 }
 
 function Todos() {
   // Access the client
   const queryClient = useQueryClient()
 
   // Queries
   const query = useQuery('todos', getTodos)
 
   // Mutations
   const mutation = useMutation(postTodo, {
     onSuccess: () => {
       // Invalidate and refetch
       queryClient.invalidateQueries('todos')
     },
   })
   console.log(query);
   let show_query=null;
   if(query.isSuccess){
    // console.log(query);
    show_query= query.data.data.map(todo => (
           <li key={todo.id}>{todo.text}</li>
    ));
   }
   return (
     <div>
       <ul>
         {show_query}
       </ul>
 
       <button
         onClick={() => {
           mutation.mutate({
             text: 'Do Laundry',
             completed:false,
           })
         }}
       >
         Add Todo
       </button>
     </div>
   )
 }

