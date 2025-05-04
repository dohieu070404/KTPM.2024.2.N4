import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/icondesigns.css'
import Header from './components/layouts/header'
import './App.css'
import ContentMain from './components/designs/contentmain'
import Footer from './components/layouts/footer'
import TabWrap from './components/designs/tabwarp'
const App = () => {

  return (
    <>
<Header/>
      <div className='nav-box'>
        <div className='div-with-border'>
          <ul className='horizontal-menu'>
          <li>
              <a href="#" className='btn btn-white btn-animated'><span className='icon-travel'></span><span>Tour trọn gói</span></a>
            </li>
            <li>
            <a href="#" className='btn btn-white btn-animated'><span id='icon-hotel-bed'></span><span >Khách sạn</span></a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated' > <span className='icon-airplane-ticket'></span><span>Vé máy bay</span></a>
            </li>
            <li>
              <a href="#" className='btn btn-white btn-animated'>ve xe khach</a>
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
<ContentMain/>
<TabWrap
  groupName="tabGroup1"
  tabs={[
    {
      label: "Short",
      title: "Short Section",
      content: ["Nội dung ngắn ở đây..."]
    },
    {
      label: "Medium",
      title: "Medium Section",
      content: [
        "Dòng 1 medium...",
        "Dòng 2 medium..."
      ]
    },
    {
      label: "Long",
      title: "Long Section",
      content: [
        "Dòng 1 dài...",
        "Dòng 2 dài...",
        "Dòng 3 dài...",
        "Dòng 4 dài..."
      ]
    }
  ]}
/>

<Footer/>
    </>
  )
}

export default App
