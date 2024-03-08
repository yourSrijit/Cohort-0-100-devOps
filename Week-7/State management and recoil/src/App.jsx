import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { countAtom } from './store/atoms/count';



function App() { 
  return (
  <div>
  <RecoilRoot>
    <Count/>
    </RecoilRoot>
  </div>
  )
}

let Count=()=>{
  return(
    <div>
     <CountRender/>
    </div>
  )
}
let CountRender=()=>{
  const count=useRecoilValue(countAtom);
  // const {count,setCount}=useRecoilValue(countAtom);

  return(
    <div>
      Count is:{count}
      <Buttons/>
    </div>
  )

}
let Buttons=()=>{
  // const [count,setCount]=useRecoilState(countAtom);  // fot the count whenver we click on the button the button will rerender everytime .so dont use count insted u can use this
  const setCount =useSetRecoilState(countAtom);
  console.log('Re rendering button');
// 1.setCount(count+1)       For this re-rendering will occure everytime we click on the button
// 2.setCount(c =>c+1)      In this case re-rendering will not occure
// 3.setCount((c)=>{ c+1})

  return(
    <div>
      <button onClick={()=>setCount((c)=>c +1)}>Increase</button>
      <button onClick={()=>setCount((c)=>c -1)}>Decrease</button>
    </div>
  )

}


export default App
