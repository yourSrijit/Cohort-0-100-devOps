# React Deeper Derive
 React is a Dynamic Website (Re-render)
 Here is the Example of Rerendering .As the App use the state varible thats wht it will re-render all the component of the App Component
 ```
 import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [title, setTitle] = useState("Srijit")

  return (
    <div>
    <button onClick={()=>{
      setTitle("Name is "+Math.random());
    }}>Change</button>
        <Header title={title}></Header>
        
    </div>
  )
}
function Header({title}){
  return (
    <div>
      {title}
    </div>
  )
}

export default App

```
   
   To avoid re-rendering problem we can create an another componnet that only use the state variable
   ```
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  return (
    <div>
         <Button/>        
         <Header title="Srijit Bera"></Header>
         <Header title="Srijit Bera"></Header>
         <Header title="Srijit Bera"></Header>
    </div>
  )
}
function Button(){
  const [title, setTitle] = useState("Srijit")
  return(
    <div>
      <button onClick={()=>{
      setTitle("Name is "+Math.random());
    }}>Change</button>
    <Header title={title}></Header>
    </div>
  )
}

function Header({title}){
  return (
    <div>
      {title}
    </div>
  )
}

export default App

   ```

In this  case only the button and the 1st header will change as they only use the state variable. So put the state as the loswest as can


# Memo
`Memo` lets you skip re-rendering a component when its props are unchanged

<hr>

# Key is a special string attribute you need to include when creating lists of elements in React.
The ket define the unique componnet thats dont nedd to re-render again

 ```
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

 ```


## Hooks in React
These functions that start with `use` are calles hooks. This are nothing but javascript functions that allow you to hook into react state and lifycycle features from function componets
### useEffect
 ```
 useEffect(()=>{

 },[]) 
 ```
 - if the 2nd argument is empty them this will rneder every time anything change in the componnet
 - If this will be a empty array it will render only ones 
 - If the array is has any value it will re-render weh nthat vlaue changes
 
```
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

```


