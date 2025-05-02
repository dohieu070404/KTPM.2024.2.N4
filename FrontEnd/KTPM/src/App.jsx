import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/layouts/header'
import './App.css'
const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
<Header/>
      <div className='nav-box'>
        <div>
          <ul className='horizontal-menu'>
            <li>
              <a href="#" className='btn btn-white btn-animated'>khach san</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated' >ve may bay</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>ve xe khach</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>icon</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>khac</a>
            </li>
          </ul>
        </div>
        <div>
          <ul className='horizontal-menu'>
            <li>
              <a href="#" className='btn btn-white btn-animated'>dia diem</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>nhap phong</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>tra phong </a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>so khach</a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>icon</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
