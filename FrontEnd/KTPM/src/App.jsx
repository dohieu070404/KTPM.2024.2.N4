import {useState} from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/icondesigns.css'
import Header from './components/layouts/header'
import './App.css'
import ContentMain from './components/designs/contentmain'
import Footer from './components/layouts/footer'
import TabWrap from './components/designs/tabwarp'
import GuestSelector from './components/designs/GuestSelector'
const App = () => {

  return (
    <>
<Header/>
<TabWrap
  groupName="tabGroup1"
  tabs={[
    {
      label: [<span className='App-homepage-box-item' ><span className='icon-travel'></span><span>Tour trọn gói</span></span>],
      title: [
        
          <form className="tab-conent-search-form">
            <div className="tab-conent-search-group">
              <label>Bạn muốn đi đâu? <span>*</span></label>
              <input 
                type="text" 
                className="tab-conent-search-input" 
                placeholder="Khám phá cuộc phiêu lưu tiếp theo của bạn..."
              />
            </div>

            <div className="tab-conent-search-group">
              <label>Ngày đi</label>
              <input 
                type="date" 
                className="tab-conent-date-input"
                defaultValue="2025-05-21" // Thay value bằng defaultValue
              />
            </div>

            <div className="tab-conent-search-group">
              <label>Ngân sách</label>
              <select className="tab-conent-budget-select">
                <option value="">Chọn mức giá</option>
                <option value="low">Dưới 5 triệu</option>
                <option value="medium">5 - 10 triệu</option>
                <option value="high">Trên 10 triệu</option>
              </select>
            </div>

             <button type="submit" className="tab-conent-search-submit">
              Tìm kiếm
            </button>
          </form>
        
      ],
      content: []
    },
    {
      label: [<span className='App-homepage-box-item' ><span id='icon-hotel-bed'></span><span >Khách sạn</span></span>],
      title: [
        
          <form className="tab-conent-search-form">
            <div className="tab-conent-search-group">
              <label>Địa điểm ? <span>*</span></label>
              <input 
                type="text" 
                className="tab-conent-search-input" 
                placeholder="Khách sạn, địa đến, thành phô "
              />
            </div>

            <div className="tab-conent-search-group">
              <label>Nhận phòng </label>
              <input 
                type="date" 
                className="tab-conent-date-input"
                defaultValue="2025-05-21" // Thay value bằng defaultValue
              />
            </div>
            <div className="tab-conent-search-group">
              <label>Trả phòng </label>
              <input 
                type="date" 
                className="tab-conent-date-input"
                defaultValue="2025-05-21" // Thay value bằng defaultValue
              />
            </div>

           <div className="tab-conent-search-group">
              <label>Số khách</label>
              <GuestSelector 
                rooms={1} 
                adults={1} 
                children={0} 
                onChange={(data) => console.log(data)}
              />
            </div>

             <button type="submit" className="tab-conent-search-submit">
              Tìm kiếm
            </button>
          </form>
        
      ],
      content: []
    },
    {
      label: [<span className='App-homepage-box-item'> <span className='icon-airplane-ticket'></span><span>Phương tiện </span></span>],
      title: "Short Section",
      content: ["Nội dung ngắn ở đây..."]
    },
    {
      label: [ <span className='App-homepage-box-item'><span className='icon-travel'></span>+<span id='icon-hotel-bed'></span>+<span className='icon-airplane-ticket'></span> Combo</span>],
      title: "Medium Section",
      content: [
        "Dòng 1 medium...",
        "Dòng 2 medium..."
      ]
    },
    {
      label: [<span className='App-homepage-box-item'>Dịch vụ khac<span className='mdi-menu-up'></span></span>],
      title: "Long Section",
      content: [
        "Dòng 1 dài...",
        "Dòng 2 dài...",
        "Dòng 3 dài...",
        "Dòng 4 dài..."
      ]
    }
  ]}/>
      {/* <div className='nav-box'>
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
              <a href="#" className='btn btn-white btn-animated'><span className='icon-travel'></span>+<span id='icon-hotel-bed'></span>+<span className='icon-airplane-ticket'></span> Combo</a>
            </li>
            
            <li>
              <a href="#" className='btn btn-white btn-animated'>Dịch vụ khac <span className='mdi-menu-up'></span></a>
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
      </div> */}
<ContentMain/>


<Footer/>
    </>
  )
}

export default App
