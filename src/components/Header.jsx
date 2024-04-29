import {Navbar, Button, Dropdown, Avatar} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {FaSun, FaMoon} from 'react-icons/fa'
import { CgMenuRightAlt } from "react-icons/cg";
import img1 from '/blogger.png'
import { toggleTheme } from '../redux/theme/themeSlice'
import {useDispatch, useSelector} from 'react-redux'
const Header = () => {
  const dispatch = useDispatch()
  const {theme} = useSelector(state => state.theme)
  const {currentUser} = useSelector(state => state.user)
  return (
    <Navbar className='border-2'>
       <div className='flex justify-between dark:bg-white dark:rounded-full'>
       <Link to='/'>  
      <img src={img1} className=' w-10 h-10'/>
        </Link>
  </div>
       <div>
       <h1 className='md:text-3xl text-2xl font-semibold'>BUISNESS AND TECHNOLOGY</h1>
       </div>
       <Button onClick={()=>dispatch(toggleTheme())} outline pill gradientDuoTone='purpleToBlue'>
        {
          theme === 'light'? <FaMoon/> : <FaSun/>
        }
       </Button>
        <div className='flex gap-6'>
          <div className=''>
          <CgMenuRightAlt className='w-8 h-8 hidden md:inline mt-1'/>
          <Navbar.Toggle/>
          </div>
          {
            currentUser && (
              <Dropdown inline arrowIcon={false} label={
                <Avatar img={currentUser.profilePicture} rounded/>
              }>
               <Dropdown.Header className=''>
                <span className='block'>@{currentUser.username}</span>
                <span className='font-semibold truncate'>{currentUser.email}</span>
                    <Link to='/dashboard?tab=profile' className=''>
                    <Dropdown.Item as={'div'} className='mt-3'>
                      Profile
                    </Dropdown.Item>
                    </Link>
                    <Dropdown.Divider/>
                    <Dropdown.Item as={'div'}>
                      Sign Out
                    </Dropdown.Item>
               </Dropdown.Header>
              </Dropdown>
            ) 
          }
        </div>
          <Button outline gradientDuoTone='purpleToBlue' className={`${currentUser ? "hidden": ""}`}>SIGN IN</Button>


    </Navbar>
  )
}

export default Header