import React, {useState, useEffect, useRef} from 'react';
import logo1 from "../../images/logo1.png"
import profile from "../../images/profile.png"
import { Link } from "react-router-dom"
import { ImSearch } from "react-icons/im"
import {BsBellFill} from "react-icons/bs"
import prof from "../../images/prof.png"
import settings from "../../images/setting.png"
import logout from "../../images/logout.png"
import helpCenter from "../../images/helpCenter.png"

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const[show,handleShow]=useState(false);

    const transitionHeader=()=>{
        if(window.scrollY > 0){
            handleShow(true);
        }
        else {handleShow(false)}
    }

    useEffect(()=>{
        window.addEventListener("scroll",transitionHeader);
        return ()=>window.removeEventListener("scroll",transitionHeader);
    },[]);

    // drop down
    const [open, setOpen] = useState(false);

    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          console.log(menuRef.current);
        }      
      };
      document.addEventListener("mousedown", handler);
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
    }
    )
    

    return (
        <nav className={`header ${show && "change"}`}>

            <img src={logo1} alt="logo" />

            <div>
                <Link to="/home" >Home</Link>
                <Link to="/tvshows" >TV Shows</Link>
                <Link to="/movies" >Movies</Link>
                <Link to="/new and popular" >New and Popular</Link>
                <Link to="/mylist" >My List</Link>
            </div>

            <div className="right flex a-center">
            <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
                <ImSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
              </div>
         
            <BsBellFill  className='bell'/>

            <div className='menu-container' ref={menuRef}>
            <div className='menu-trigger' onMouseEnter={()=>{setOpen(!open)}}>
            <img className="profile" src={profile} alt="profile"/>
            </div>

            <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img={prof} text = {"Manage Profile"} />
            <DropdownItem img={settings} className="set" text = {"Settings"}/>
            <DropdownItem img={helpCenter} text = {"Help"}/>
            <DropdownItem img={logout} text = {"Logout"}/>
          </ul>

        </div>
        </div>
        {/* <BsCaretDownFill className='down' /> */}

        </nav>
    )
}
function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img} alt="show" />
        <a> {props.text} </a>
      </li>
    );
  }
  

export default Header