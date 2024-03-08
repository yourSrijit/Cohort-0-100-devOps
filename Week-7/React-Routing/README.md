# React Router
Example of how to use react route
```
import './App.css'
import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'


function App() { 
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/landing' element={<Landing/>}/>
      </Routes>
    </BrowserRouter>
  )
}
let Navbar=()=>{
  const navigate=useNavigate(); //you have to use this inside the BrowserRoute components
  return(
    <div>
      <button onClick={()=>{
        navigate("/landing")
      }}>Landing Page</button>
      <button onClick={()=>{
        navigate("/dashboard")
      }}>Dashboard Page</button>
    </div>
  )
}

export default App

```

# Lazy Loading in React
  
Lazy loading in React refers to a technique where components or other assets are loaded asynchronously, usually when they are needed, rather than being loaded immediately when the application starts. This can improve the performance of your application, especially if it contains a lot of components or heavy assets.

React provides a built-in lazy function that allows you to dynamically import components. When you use lazy, React automatically suspends rendering of the component until the component has been loaded, which is typically done asynchronously. This means that the component will only be loaded when it's actually needed, such as when a user navigates to a specific route or triggers an action that requires the component.

Here's a basic example of how you can use lazy loading with React:
```
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

export default App;

```

# Prop Drilling
Prop drilling, also known as "props drilling" or "component drilling," is a term used in React to describe the process of passing props (properties) through multiple layers of nested components in order to deliver the data to a deeply nested component that needs it.

### Here's how it typically works:

- Parent Component: The data originates from a parent component. This parent component may fetch the data from an API, manage it in its state, or receive it as props from a higher-level component.

- Intermediate Components: There might be one or more layers of intermediate components between the parent and the deeply nested child component that requires the data.

- Deeply Nested Child Component: Finally, the data is needed by a component deeply nested within the component hierarchy.

### Instead of passing the data directly from the parent component to the deeply nested child component, each intermediate component in the hierarchy needs to pass the data down as props, even if they don't use the data themselves. This is what's referred to as "prop drilling."

While prop drilling is a common pattern in React, it can lead to issues such as:

- Complexity: As the application grows, prop drilling can make the codebase harder to understand and maintain, especially if the data needs to be passed through many layers of components.

- Coupling: Prop drilling can create tight coupling between components, as components in the middle of the hierarchy need to be aware of the data they're passing down, even if they don't directly use it.

 To mitigate these issues, you can consider alternative solutions such as:

- Context API: React's Context API allows you to pass data through the component tree without explicitly passing props at every level. It's particularly useful for sharing global data that many components in the application need access to.

- State Management Libraries: Libraries like Redux or MobX provide centralized state management solutions that can help avoid prop drilling by storing data in a global state accessible to any component in the application.

- Composition: Instead of drilling props through multiple layers, you can refactor your components to use composition techniques such as render props, higher-order components, or custom hooks to encapsulate and share logic more effectively.

```
import { useState } from 'react'
import './App.css'



function App() { 
  const [count,setCount]=useState(0);
  return (
  <div>
  <Count count={count}/>
  <Buttons count={count} setCount={setCount}/>
  </div>
  )
}
let Count=({count})=>{
  return(
    <div>
      Count is: {count}
    </div>
  )

}
let Buttons=({count,setCount})=>{
  return(
    <div>
      <button onClick={()=>setCount(count+1)}>Increase</button>
      <button onClick={()=>setCount(count-1)}>Decrease</button>
    </div>
  )

}


export default App

```

# Context API
The Context API in React is a way to manage global state or share data across the component tree without having to pass props manually at every level. It provides a mechanism for components to consume values from a context without having to explicitly pass props through every level of the tree.

<!-- #region drawnote -->
<svg id="svg" xmlns="http://www.w3.org/2000/svg" viewbox="49.7400016784668,19.80000114440918,426,179.1999969482422" style="height:179.1999969482422"><rect x="282.74" y="47" fill="none" stroke="#6190e8" stroke-width="2" width="183" height="60" rx="10" ry="10" d="M 282.74 57 a 10 10 0 0 1 10 -10 h 163 a 10 10 0 0 1 10 10 v 40 a 10 10 0 0 1 -10 10 h -163 a 10 10 0 0 1 -10 -10 Z"></rect><text font-family="inherit" font-size="14" fill="#6190e8" x="302.74" y="60">CountContext</text><rect x="87.74" y="36" fill="none" stroke="#6190e8" stroke-width="2" width="109.00000000000001" height="45" rx="10" ry="10" d="M 87.74 46 a 10 10 0 0 1 10 -10 h 89.00000000000001 a 10 10 0 0 1 10 10 v 25 a 10 10 0 0 1 -10 10 h -89.00000000000001 a 10 10 0 0 1 -10 -10 Z"></rect><text font-family="inherit" font-size="14" fill="#6190e8" x="96.74" y="45">App</text><text font-family="inherit" font-size="14" fill="#6190e8" x="115.74" y="69">&lt;Count/&gt;</text><rect x="59.74" y="132" fill="none" stroke="#6190e8" stroke-width="2" width="117" height="55" rx="10" ry="10" d="M 59.74 142 a 10 10 0 0 1 10 -10 h 97 a 10 10 0 0 1 10 10 v 35 a 10 10 0 0 1 -10 10 h -97 a 10 10 0 0 1 -10 -10 Z"></rect><text font-family="inherit" font-size="14" fill="#6190e8" x="65.74" y="148">CountRender</text><rect x="250.74" y="192" fill="none" stroke="#6190e8" stroke-width="2" d="undefined"></rect><text font-family="inherit" font-size="14" fill="#6190e8" x="216.74" y="164">&lt;Button/&gt;</text><text font-family="inherit" font-size="14" fill="#6190e8" x="105.74" y="142">d.</text><rect x="210.74" y="140" fill="none" stroke="#6190e8" stroke-width="2" width="125" height="49" rx="10" ry="10" d="M 210.74 150 a 10 10 0 0 1 10 -10 h 105 a 10 10 0 0 1 10 10 v 29 a 10 10 0 0 1 -10 10 h -105 a 10 10 0 0 1 -10 -10 Z"></rect><line x1="142.5" y1="79" x2="121.9" y2="139.4" fill="none" stroke="#6190e8" stroke-width="2" d="M 142.5 79 L 121.9 139.4"></line><line x1="149.7" y1="78.2" x2="223.3" y2="138.2" fill="none" stroke="#6190e8" stroke-width="2"></line><line x1="222.5" y1="137.4" x2="222.5" y2="137.4" fill="none" stroke="#6190e8" stroke-width="2" d="M 222.5 137.4 L 222.5 137.4"></line><line x1="283.3" y1="73.4" x2="202.7" y2="64.2" fill="none" stroke="#6190e8" stroke-width="2" d="M 283.3 73.4 L 202.7 64.2"></line><line x1="215.3" y1="51" x2="200.3" y2="65.8" fill="none" stroke="#6190e8" stroke-width="2" d="M 215.3 51 L 200.3 65.8"></line><line x1="224.1" y1="86.2" x2="204.3" y2="68.2" fill="none" stroke="#6190e8" stroke-width="2" d="M 224.1 86.2 L 204.3 68.2"></line></svg>  
<!-- #endregion -->

## context.jsx file
```
import {createContext} from 'react';
export let CountContext=createContext();
```

## App.jsx file
```
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

```

