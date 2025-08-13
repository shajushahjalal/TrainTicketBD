import React, { useState } from 'react'
import RouteConstant from '../../route/RouteConstant';
import { Link } from 'react-router-dom';
import { checkPermission } from '../../helper/Permission';

export default function Navbar() {
  
  const [activePage, setActivePage] = useState("Dashboard");
  const menuList = [
    
  ];

  return (
    <>
      <div className='w-full py-1 flex gap-5'>
        {menuList?.map((menu, index) => (
          ((menu?.permission == undefined || menu?.permission?.length == 0) || checkPermission(menu?.permission)) &&
            <div key={index} >
              <Link 
                to={menu?.link}
                className={location.pathname === menu.link ? 'text-primary border-b-2 border-primary pb-1.5' : "text-gray-500"}
                onClick={()=> setActivePage(menu?.name)}
              >
                {menu?.name}
              </Link>
            </div>          
        ))}
      </div>
    </>
  )
}
