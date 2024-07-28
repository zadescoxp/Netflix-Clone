import Image from "next/image";
import logo from "./../../assets/logo.png";
import search_icon from "./../../assets/search_icon.svg";
import bell_icon from "./../../assets/bell_icon.svg";
import profile_img from "./../../assets/profile_img.png";
import caret_icon from "./../../assets/caret_icon.svg";
import './Navbar.css'
import { useEffect, useRef } from "react";
import { signout } from "./../../../firebase";

export default function Navbar() {

  const navRef = useRef(0)

  useEffect(() => {
    window.addEventListener('scroll' , () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark")
      }
      else {
        navRef.current.classList.remove("nav-dark")
      }
    })
  }, [])

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <Image src={logo} width={92.49} height={29.89} alt="Netlflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Language</li>
        </ul>
      </div>

      <div className="navbar-right">
        <Image src={search_icon} width={22} height={22} alt="Search Icon" className="icons" />
        <p>Children</p>
        <Image src={bell_icon} width={22} height={22} alt="Bell Icon" className="icons" />

        <div className="navbar-profile">
          <Image src={profile_img} width={32} height={32} alt="Search Icon" />
          <Image src={caret_icon} width={10} height={20} alt="Search Icon" />
          <div className="dropDown">
            <p></p>
            <p onClick={() => {signout()}}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>
    </div>
  );
}
