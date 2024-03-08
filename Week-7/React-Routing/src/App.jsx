import { useContext, useState } from 'react'
import './App.css'
import { CountContext } from './context';



function App() { 
  const [count,setCount]=useState(0);
  return (
  <div>
  <CountContext.Provider value={{count,setCount}}>
    <Count/>
  </CountContext.Provider>
  
  </div>
  )
}
let Count=()=>{
  return(
    <div>
     <CountRender/>
     <Buttons/>
    </div>
  )

}
let CountRender=()=>{
  const {count}=useContext(CountContext);
  return(
    <div>
      Count is: {count}
    </div>
  )

}
let Buttons=()=>{
  const {count,setCount}=useContext(CountContext);
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>Increase</button>
      <button onClick={()=>setCount(count-1)}>Decrease</button>
    </div>
  )

}


export default App
