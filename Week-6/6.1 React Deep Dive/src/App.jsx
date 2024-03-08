import { useState } from 'react'
import './App.css'
let count=4;
function App() {
  const [todos,setTodos]=useState([
    {
      id:1,
      title:"Gym",
      description:"Go to Gym"
    },
    {
      id:2,
      title:"Eat",
      description:"Time to Eat"
    },
    {
      id:3,
      title:"Food",
      description:"Time for Food"
    }
])
  
  return (
    <div>
        <button onClick={() => {
        setTodos([
          ...todos,
          {
            id: count++,
            title: Math.random().toString(),
            description: Math.random().toString()
          }
        ]);
      }}>Add</button>
      {todos.map((todo)=>
       ( <Display title={todo.title} description={todo.description} key={todo.id}></Display>)
      )}
    </div>
  )
}


function Display({title,description}){
  return (
    <div>
    <h2>{title} </h2>
    <h4>{description}</h4>
    </div>
  )
}

export default App
