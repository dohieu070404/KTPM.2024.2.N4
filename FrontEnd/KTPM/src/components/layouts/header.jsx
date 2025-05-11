import './header.css'
// import { CustomDropdown } from '../designs/customdropdown';
import HeaderBar from './headerbar';

const Header = () => {
    return(
<>
<div className='header'>
{/* <div>
	<div className='header-icon'>
	<div href='http://localhost:3000/' className='header-icon-logopage'><img src="/assets/logopage.jpg" alt="" /></div>

		<div href='#' className='header-icon-user'><CustomDropdown
        // label="Dropdown button" 
		label={<img src="/assets/user.png" />}
        items={['login', 'register']}
      /></div>
		
	</div>
	<div className='header-bar-box'>
		<ul>
		<li>
		<a href="#" className='header-btn header-btn-white header-btn-animated'>Khách sạn </a>
		</li>
		<li>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>Vé máy bay</a>
		</li>
		<li>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>vé xe khách</a>
		</li>
		<li>
        <a href="#" className='header-btn header-btn-white header-btn-animated'>Đặt Tour </a>
		</li>
		</ul>
	</div>
	</div> */} {/* chuyen thanh component */}

	<HeaderBar/>
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
