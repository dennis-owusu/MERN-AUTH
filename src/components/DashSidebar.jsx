import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {Link} from 'react-router-dom'
import {HiUser} from 'react-icons/hi'
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
const DashSidebar = () => {
    const [tab, setTab] = useState('')

    useEffect(()=>{
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab')
      if(tabFromUrl){
        setTab(tab)
      }
    }, [location.search])
    
  return (
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className=''>
               <Link to='/dashboard?tab=profile'>
               <Sidebar.Item className=' text-lg font-medium' as={'div'} icon={HiUser} active={tab === 'profile'} label={'User'} labelColor='dark'>
                    Profile
                </Sidebar.Item>
               </Link>
                <Sidebar.Item className=' text-lg font-medium cursor-pointer' as={'div'} icon={HiOutlineArrowSmallLeft}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar