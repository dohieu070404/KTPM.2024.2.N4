import './header.css'
const Header = () => {
    return(
<>
<div class="header">
	<div class="brand-box">
		<span class="brand">logo img</span>
	</div>
	
	<div class="text-box">
		<h1 class="heading-primary">
			<span class="heading-primary-main">Chạm tay vào thế giới đặt vé ngay hôm nay</span>
			
		</h1>
        <a href="#" class="btn btn-white btn-animated">Khách sạn </a>
        <a href="#" class="btn btn-white btn-animated">Vé máy bay</a>
        <a href="#" class="btn btn-white btn-animated">vé xe khách</a>
        <a href="#" class="btn btn-white btn-animated">Đặt Tour </a>
    
	</div>
    </div>
</>
    )
}
export default Header;
