import React, { useEffect, useState } from "react";
import {CustomDropdown} from "../designs/customdropdown"; 
import "./headerbar.css";
import '/src/styles/icondesigns.css'
import { Link } from "react-router-dom";

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
      <div  className='headerbar-icon-logopage'>
      <Link to="/">
      <img src="/assets/logopage.jpg" alt="" />
      </Link>
      </div>

      <div className='headerbar-item'>
		<ul>
		<li>
		<Link to="/HoltelPage" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Khách sạn </Link>
		</li>
		<li>
        <Link to="/" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Vé máy bay</Link>
		</li>
		<li>
        <Link to="/" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>vé xe khách</Link>
		</li>
		<li>
        <Link to="/" className='headerbar-btn headerbar-btn-white headerbar-btn-animated'>Đặt Tour </Link>
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