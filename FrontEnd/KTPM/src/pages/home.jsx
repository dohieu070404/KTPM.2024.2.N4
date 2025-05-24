import './home.css'
// import {useState} from 'react'
import ContentMain from '../components/designs/contentmain'
import HeaderBar from '../components/layouts/headerbar';
import Footer from '../components/layouts/footer'
import TabWrap from '../components/designs/tabwarp';
import GuestSelector from '../components/designs/GuestSelector';
import GuestSelectorCombo from '../components/designs/GuestSelectorCombo';
import CardContents from '../components/designs/CardContents';
import ScrollToTop from '../components/designs/ScrollToTop';
const HomePage = () => {
  return(
     <>
    
     <div className='header'>
     <div className='header-text-box'>
		<h1 className ='heading-primary'>
			<span className='heading-primary-main'>Chạm tay vào thế giới đặt vé ngay hôm nay</span>
			
		</h1>
    
    
	</div>
  </div>
     <TabWrap
  groupName="tabGroup1"
  tabs={[
    {
      key: "tour",
      label: [<span key="label-tour" className='App-homepage-box-item' ><span className='icon-travel'></span><span>Tour trọn gói</span></span>],
      title: [
        
          <form key="form-tour" className="tab-conent-search-form">
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
      key: "hotel",
      label: [<span key="label-hotel" className='App-homepage-box-item' ><span id='icon-hotel-bed'></span><span >Khách sạn</span></span>],
      title: [
        
          <form key="form-hotel" className="tab-conent-search-form">
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
      key: "transport",
      label: [<span key="label-transport" className='App-homepage-box-item'> <span className='icon-airplane-ticket'></span><span>Phương tiện </span></span>],
      title: [
        
      ],
      content: []
    },
    {
      key: "combo",
      label: [ <span key="label-combo" className='App-homepage-box-item'><span className='icon-travel'></span>+<span id='icon-hotel-bed'></span>+<span className='icon-airplane-ticket'></span> Combo</span>],
      title: [
        <form key="form-combo" className="tab-conent-search-form">
            <div className="tab-conent-search-group">
              <label>Từ <span>*</span></label>
              <input 
                type="text" 
                className="tab-conent-search-input" 
                placeholder="Khách sạn, địa đến, thành phô "
              />
            </div>
            <div className="tab-conent-search-group">
              <label>Đến <span>*</span></label>
              <input 
                type="text" 
                className="tab-conent-search-input" 
                placeholder="Khách sạn, địa đến, thành phô "
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
              <label>Số khách</label>
              <GuestSelectorCombo  
                 
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
      key: "other",
      label: [<span key="label-other" className='App-homepage-box-item'>Dịch vụ khac<span className='mdi-menu-up'></span></span>],
      title: "Long Section",
      content: [
        "Dòng 1 dài...",
        "Dòng 2 dài...",
        "Dòng 3 dài...",
        "Dòng 4 dài..."
      ]
    }
  ]}/>
      <div className='CardContents-backgroud'>
        <CardContents
      imageSrc="/assets/HaNoi.jpg"
      title="Hà Nội"
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="aaa"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/DaNang.avif"
      title="Đà Nẵng "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaLong.avif"
      title="Hạ Long "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HoiAn.jpg"
      title="Hội An "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/NhaTrang.avif"
      title="Nha Trang "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaNoi.jpg"
      title="Hà Nội"
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/DaNang.avif"
      title="Đà Nẵng "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaLong.avif"
      title="Hạ Long "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HoiAn.jpg"
      title="Hội An "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/NhaTrang.avif"
      title="Nha Trang "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaNoi.jpg"
      title="Hà Nội"
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/DaNang.avif"
      title="Đà Nẵng "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaLong.avif"
      title="Hạ Long "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HoiAn.jpg"
      title="Hội An "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/NhaTrang.avif"
      title="Nha Trang "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaNoi.jpg"
      title="Hà Nội"
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/DaNang.avif"
      title="Đà Nẵng "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HaLong.avif"
      title="Hạ Long "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/HoiAn.jpg"
      title="Hội An "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      <CardContents
      imageSrc="/assets/NhaTrang.avif"
      title="Nha Trang "
      desc="Thêm một số thông tin "
      actionText="Đặt Phòng "
      href="#"
      actionHref="#"
      />
      </div>
<ContentMain/>
<ScrollToTop />
     
     </>
  )
} 

export default HomePage;