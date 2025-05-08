import React, { useEffect, useState } from "react";
import {CustomDropdown} from "../designs/customdropdown"; 
import "./headerbar.css";
import '/src/styles/icondesigns.css'

const HeaderBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`headerbar-icon ${scrolled ? "scrolled" : ""}`}>
      <div href='http://localhost:3000/' className='headerbar-icon-logopage'>
      <img src="/assets/logopage.jpg" alt="" />
      </div>

      <div className='headerbar-item'>
		<ul>
		<li>
		<a href="#" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Khách sạn </a>
		</li>
		<li>
        <a href="#" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Vé máy bay</a>
		</li>
		<li>
        <a href="#" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>vé xe khách</a>
		</li>
		<li>
        <a href="#" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Đặt Tour </a>
		</li>
		</ul>
	</div>

      <div href='#' className='headerbar-icon-user '>
        <CustomDropdown
          label={<span className="icon-user-account headerbar-icon-user-color" />}
          items={['login', 'register']}
        />
      </div>
    </div>
  );
};

export default HeaderBar;