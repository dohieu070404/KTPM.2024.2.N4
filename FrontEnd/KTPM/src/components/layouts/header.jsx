import './header.css'
import { CustomDropdown } from '../a/customdropdown';

const Header = () => {
    return(
<>
<div className='header'>
	<div className='header-icon'>
	<a href='http://localhost:3000/' className='header-icon-logopage'><img src="/assets/logopage.jpg" alt="" /></a>

		<a href='#' className='header-icon-user'><CustomDropdown
        // label="Dropdown button" 
		label={<img src="/public/assets/user.png" />}
        items={['login', 'register']}
      /></a>
		
	</div>
	<div className='header-bar-box'>
	<a href="#" className='header-btn header-btn-white header-btn-animated'>Khách sạn </a>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>Vé máy bay</a>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>vé xe khách</a>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>Đặt Tour </a>
	</div>
	<div className='header-text-box'>
		<h1 className ='heading-primary'>
			<span className='heading-primary-main'>Chạm tay vào thế giới đặt vé ngay hôm nay</span>
			
		</h1>
    
    
	</div>
    </div>
</>
    )
}
export default Header;
