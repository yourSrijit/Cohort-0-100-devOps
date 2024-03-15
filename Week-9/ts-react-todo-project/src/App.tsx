import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Todo title='Time to Bed' description='Have a good sleep' isDone='true' />
    </>
  )
}
interface TodoProp{
  title:string,
  description:string,
  isDone:boolean
}

function Todo(props:TodoProp){
  return(
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h3>Done : {props.isDone}</h3>
    </div>
  )
}

export default App
