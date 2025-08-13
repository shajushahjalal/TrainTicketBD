import user_img from '../../assets/image/user.png'
import logo from '../../assets/image/logo.png'
import { BsCardList } from 'react-icons/bs'
import Navbar from './Navbar'
import { MdDarkMode, MdOutlineLightMode } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { FaRegBell } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext';

export default function Header() {

  const { theme, toggleTheme } = useTheme();

  return (
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
      
        <div>
          <button className='p-2 bg-gray-200 dark:bg-dark rounded-full relative'>
            <FaRegBell />
            <div className='h-2 w-2 bg-red-500 rounded-full absolute top-1 right-2'></div>
          </button>
        </div>
        <div className='items-center'>
          <button>
            <img src={user_img} loading="lazy" className='rounded-full h-8 w-8'></img>          
          </button>
        </div>
      </div>

    </div>
  )
}
