import { useState,useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
let nums=new Array(30_000_000).fill(0).map((_,i) =>{
  return{
    index:i,
    isMagical: i=== 29_000_000
  }
})

function App() {
  const [count, setCount] = useState(0)
  const[number,setNumber]=useState(nums);

  // const magical=number.find((item => item.isMagical=== true))   // very Expensive operation 
  // as the count is useState variable when the count changes the whole page rerender again.so the expensive operation occure again. that is not efficient code.
  // To make this efficient use useMemo hook

  const magical = useMemo(()=>{
    return number.find((item => item.isMagical=== true))
  },[number])

  return (
    <>
      <div>
      <span>Magical number is {magical.index}</span>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
