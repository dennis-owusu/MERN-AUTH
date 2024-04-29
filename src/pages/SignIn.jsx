import { useState } from 'react';
import {Alert, Button, Spinner, TextInput} from 'flowbite-react'
import { toast } from 'react-toastify';
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';
const SignIn = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!formData.email || !formData.password){
     setErrorMessage('Please fill out all fields')
     return
    }
    setLoading(true)
    dispatch(signInStart())
    try {
     const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
     })
      const data = await res.json()
      if(data.success === false){
        dispatch(signInFailure(data.message))
        setLoading(false)
    }
        if(res.ok){
          dispatch(signInSuccess(data))
          toast.success('Sign in successful',{
            position: 'top-center'
          })
          navigate('/')
        }
      
    } catch (error) {
      setLoading(false)
      return setErrorMessage(error.message)
      
    }
  }
  return (
    <div className='flex flex-row-reverse gap-5'>
      {/* left */}
      <motion.div className='flex-1 bg-[#9E07F0] rounded-l-[200px] min-h-screen hidden lg:inline'
      initial={{rotate: 0, scale:0, x:-250}} animate={{rotate:-360, scale:1, x:0}} transition={{duration:1}}>
        <h1 className='md:text-3xl text-2xl text-center text-white mt-72 font-medium'>
          Hello, Friends
        </h1>
        <p className='text-white text-center font-semibold text-xl'>
          Create an account with your details and enjoy all features
        </p>
        <div className='flex justify-center px-20 mx-56 mt-20 border-4'>
          <button className='py-3 text-white'>Sign</button>
        </div>
      </motion.div>
      <div className='flex-1'>
        {/* right */}
        <h1 className=' mt-7 text-center text-3xl font-semibold'>Sign In</h1>
        <div className='flex gap-3 justify-center my-5 border-gray-300'>
          <OAuth/>
          <FaFacebookF className='w-7 h-7 text-blue-500'/>
          <FaYoutube className='w-7 h-7 text-red-600'/>
          <FaLinkedinIn className='w-7 h-7 text-blue-500'/>
        </div>
        <span className='flex justify-center text-gray-400'>or use your gmail and password</span>
        <motion.div className='my-8 max-w-68 mx-auto'
        initial={{rotate: 180, scale:0}} animate={{rotate:0, scale:1}} transition={{duration:0.5}}>
         <form onSubmit={handleSubmit} className=' space-y-5 max-w-96 mx-auto'>
         <TextInput type='email' id='email' placeholder='Email'onChange={handleChange}/>
          <TextInput type='password' id='password' placeholder='Password'onChange={handleChange}/>
        <span className='flex justify-center text-gray-400 mb-4'>Forgot your password?</span>
        <Button type='submit' className='mx-auto w-full' gradientDuoTone='purpleToPink' outline disabled={loading}>
        {
            loading ? (
              <>
              <Spinner size='sm'/>
              <span>Loading...</span>
              </>
            ): ('SIGN IN')
          }
        </Button>
         {errorMessage && (
          <Alert color='failure' className='mt-3'>{errorMessage}</Alert>
         )}
         </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;


/*git remote add origin https://github.com/dennis-owusu/MERN-AUTH.git
git branch -M main
git push -u origin main
*/