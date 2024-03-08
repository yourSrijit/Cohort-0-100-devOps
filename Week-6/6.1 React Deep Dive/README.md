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

<!-- #region drawnote -->

<svg id="svg" xmlns="http://www.w3.org/2000/svg" viewbox="85.73999786376953,34.89502716064453,310.80352783203125,251.72052001953125" style="height:251.72052001953125"><circle cx="267.74" cy="64" fill="none" stroke="#6190e8" stroke-width="2" r="19.1049731745428" d="M 248.6350268254572 64 a 19.1049731745428 19.1049731745428 0 1 0 38.2099463490856 0a 19.1049731745428 19.1049731745428 0 1 0 -38.2099463490856 0 Z"></circle><circle cx="227.74" cy="120" fill="none" stroke="#6190e8" stroke-width="2" r="20.591260281974" d="M 207.148739718026 120 a 20.591260281974 20.591260281974 0 1 0 41.182520563948 0a 20.591260281974 20.591260281974 0 1 0 -41.182520563948 0 Z"></circle><circle cx="363.74" cy="142" fill="none" stroke="#6190e8" stroke-width="2" r="22.80350850198276" d="M 340.93649149801723 142 a 22.80350850198276 22.80350850198276 0 1 0 45.60701700396552 0a 22.80350850198276 22.80350850198276 0 1 0 -45.60701700396552 0 Z"></circle><circle cx="155.74" cy="230" fill="none" stroke="#6190e8" stroke-width="2" r="22.47220505424423" d="M 133.26779494575578 230 a 22.47220505424423 22.47220505424423 0 1 0 44.94441010848846 0a 22.47220505424423 22.47220505424423 0 1 0 -44.94441010848846 0 Z"></circle><circle cx="246.74" cy="256" fill="none" stroke="#6190e8" stroke-width="2" r="20.615528128088304" d="M 226.1244718719117 256 a 20.615528128088304 20.615528128088304 0 1 0 41.23105625617661 0a 20.615528128088304 20.615528128088304 0 1 0 -41.23105625617661 0 Z"></circle><line x1="261.74" y1="75" x2="244.74" y2="102" fill="none" stroke="#6190e8" stroke-width="2" d="M 261.74 75 L 244.74 102"></line><line x1="217.74" y1="135" x2="166.74" y2="211" fill="none" stroke="#6190e8" stroke-width="2" d="M 217.74 135 L 166.74 211"></line><line x1="233.74" y1="140" x2="245.74" y2="234" fill="none" stroke="#6190e8" stroke-width="2" d="M 233.74 140 L 245.74 234"></line><line x1="285.74" y1="72" x2="352.74" y2="126" fill="none" stroke="#6190e8" stroke-width="2" d="M 285.74 72 L 352.74 126"></line><path d="M 95.74,168 L 96.74,168 L 97.74,168 L 98.74,168 L 99.74,169 L 100.74,169 L 102.74,170 L 105.74,171 L 107.74,172 L 109.74,173 L 112.74,174 L 114.74,175 L 115.74,176 L 116.74,177 L 117.74,178 L 119.74,179 L 120.74,180 L 120.74,181 L 121.74,182 L 122.74,183 L 123.74,184 L 124.74,186 L 125.74,186 L 126.74,187 L 127.74,188 L 128.74,189 L 129.74,190 L 129.74,191 L 129.74,192 L 130.74,193 L 130.74,194 L 131.74,195 L 132.74,196 L 132.74,197 L 132.74,198 L 132.74,199 L 133.74,200 L 133.74,201 L 134.74,202 L 135.74,203 L 135.74,204 L 134.74,204" fill="none" stroke="#6190e8" stroke-width="2"></path><path d="M 122.74,198 L 123.74,198 L 124.74,198 L 125.74,198 L 126.74,198 L 127.74,198 L 128.74,198 L 129.74,198 L 130.74,198 L 130.74,199 L 132.74,199 L 133.74,200 L 134.74,200 L 135.74,200 L 136.74,201 L 137.74,201 L 138.74,201 L 139.74,201 L 138.74,200 L 137.74,199 L 137.74,197 L 136.74,195 L 135.74,192 L 135.74,190 L 135.74,189" fill="none" stroke="#6190e8" stroke-width="2"></path></svg>  

<!-- #endregion -->

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
