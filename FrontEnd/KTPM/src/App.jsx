// import {useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/icondesigns.css'
import Header from './components/layouts/header'
import './App.css'

import Footer from './components/layouts/footer'

import { Outlet } from 'react-router-dom'
import HeaderBar from './components/layouts/headerbar'
const App = () => {

  return (
    <>
<HeaderBar/>
<Outlet/>
<Footer/>
    </>
  )
}

export default App
