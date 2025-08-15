import user_img from '../../assets/image/user.png'
import logo from '../../assets/image/logo.png'
import { BsCardList } from 'react-icons/bs'
import Navbar from './Navbar'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaRegBell } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react'
import { getUserData } from '../../helper/Helper'
import Login from '../../pages/Login'
import { logout } from '../../states/authenticationSlice'
import { useDispatch } from 'react-redux'

export default function Header() {

  const userData = getUserData()
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);

  const toggleDropdown = () => {
    if(Object.keys(userData).length == 0){
      setIsShowLoginModal(true);
    }else{
      setShowUserDropdown(!showUserDropdown);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setShowUserDropdown(!showUserDropdown);
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='gap-3 flex'>
          DB Train Ticket
        </div>
        
        <div>
          <Navbar />
        </div>

        {/* Right Side User Navigation */}
        <div className='px-1 sm:px-3 py-1 rounded-md flex gap-3 items-center'>
          <div>
            <button 
              className='p-2 bg-gray-200 dark:bg-dark rounded-full'
              onClick={toggleTheme}
            >
              {theme === "dark" ?
                <MdDarkMode />
                :
                <MdOutlineLightMode />
              }
            </button>
          </div>
        
          <div className='relative'>
            <button className='p-2 bg-gray-200 dark:bg-dark rounded-full relative'>
              <FaRegBell />
              <div className='h-2 w-2 bg-red-500 rounded-full absolute top-1 right-2'></div>
            </button>
          </div>
          <div className='items-center relative'>
            <button onClick={toggleDropdown}>
              <img src={user_img} loading="lazy" className='rounded-full h-8 w-8'></img>          
            </button>
            <div 
              className={`absolute bg-white dark:bg-dark-light border min-w-[150px] py-1 px-2 rounded-md ${showUserDropdown ? 'block' : 'hidden'}`}>
              <ul>
                <li className='py-1 border-b'>{userData?.display_name}</li>
                <li className='py-1.5'>
                  <button className='hover:text-red-500' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {isShowLoginModal && 
        <Login openModal={isShowLoginModal} closeModal={()=>{setIsShowLoginModal(false)}} />
      }
    </>
  )
}
