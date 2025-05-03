import './header.css'
const Header = () => {
    return(
<>
<div className='header'>
	<div className='header-icon'>
		<span className='header-brand'>logo img</span>
		<span className='header-icon'>icon login</span>
	</div>
	<div>
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
