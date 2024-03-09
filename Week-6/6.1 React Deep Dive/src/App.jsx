import { useEffect, useState } from 'react'
import './App.css'
let count=4;
function App() {
  const [todos,setTodos]=useState([]);


  useEffect(()=>{
    setInterval(()=>{
      fetch("https://sum-server.100xdevs.com/todos")
      .then(async(res)=>{
        const json=await res.json();
        setTodos(json.todos);
      })
    },1000)
  },[]);
  
  return (
    <div>
    {todos.map((todo)=>
      <Display title={todo.title} description={todo.description}/>
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
