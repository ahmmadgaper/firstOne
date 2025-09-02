import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import Cart from './Cart.jsx'
function App() {
  const [count, setCount] = useState({itemCount:{},itemPushed:0,itemSelected:{},storageKey:{}})

  return (
    <>
      <Routes>
        <Route path='/hello' element={<h1>Hello</h1>}/>
        <Route path='/' element={<Cart count={count} setCount={setCount} />
}/>
      </Routes>
    </>
  )
}

export default App
