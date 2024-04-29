import { useState } from 'react';
import {Alert, Button, Spinner, TextInput} from 'flowbite-react'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import { FaFacebookF, FaSlack, FaLinkedinIn } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';
const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields')
    }
    
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if(data.success === false){
        return setErrorMessage(data.message)
      }else{
        toast.success('Account has been created successfully',{
          position: 'top-center'
        })
        navigate('/sign-in')
        setErrorMessage(null)
      }

    } catch (error) {
      return setErrorMessage(error.message)
    }
  }
  return (
    <div className='flex gap-5'>
      {/* left */}
      <motion.div className='flex-1 bg-[#9E07F0] rounded-r-[200px] min-h-screen hidden lg:inline'
      initial={{rotate: 0, scale:0, x:-180}} animate={{rotate:360, scale:1, x:0}} transition={{duration:1}}>
        <h1 className='md:text-3xl text-2xl text-center text-white mt-56 font-medium'>
          Welcome Back
        </h1>
        <p className='text-white text-center'>
          Create an account with your details and enjoy all features
        </p>
        <div className='flex justify-center px-20 mx-56 mt-20 border-4'>
          <button className='py-3 text-white'>Sign</button>
        </div>
      </motion.div>
      <div className='flex-1'>
        {/* right */}
        <h1 className=' mt-7 text-center text-3xl font-semibold'>Create Account</h1>
        <div className='flex gap-3 justify-center my-5 border-gray-300'>
          <OAuth/>
          <FaFacebookF className='w-7 h-7 text-blue-500'/>
          <FaSlack className='w-7 h-7'/>
          <FaLinkedinIn className='w-7 h-7 text-blue-500'/>
        </div>
        <span className='flex justify-center text-gray-400'>or use your gmail and password</span>
        <motion.div className='my-8 max-w-68 mx-auto'
        initial={{rotate: -180, scale:0}} animate={{rotate:0, scale:1}} transition={{duration:0.5}}>
         <form onSubmit={handleSubmit} className='space-y-5 max-w-96 mx-auto'>
         <TextInput type='username'id='username' placeholder='Username' onChange={handleChange}/>
          <TextInput type='email' id='email' placeholder='name@gmail.com' onChange={handleChange}/>
          <TextInput type='password' id='password' placeholder='Password' onChange={handleChange}/>
        <Button type='submit' className='mx-auto w-full' gradientDuoTone='purpleToPink' outline disabled={loading}>
          {
            loading ? (
              <>
              <Spinner size='sm'/>
              <span>Loading...</span>
              </>
            ): ('SIGN UP')
          }
        </Button>
         </form>
         {errorMessage && (
          <Alert color='failure' className='mt-3'>{errorMessage}</Alert>
         )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;