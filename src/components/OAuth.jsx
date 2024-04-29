import {FcGoogle} from 'react-icons/fc'
import { toast } from 'react-toastify';
import { app } from '../firebase'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { signInFailure, signInSuccess, signInStart } from '../redux/user/userSlice';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider()
    provider.setCustomParameters({prompt: 'select_account'})
    dispatch(signInStart())
    try {
        const resultFromGoogle = await signInWithPopup(auth, provider)
        const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoUrl
            })
        })
        const data = await res.json()
        if(data.success === false) {
            dispatch(signInFailure(data))
            toast.error(data.message)
        }
        if(res.ok){
            dispatch(signInSuccess(data))
            toast.success('Sign in successful',{
                position: 'top-center'
            })
            navigate('/')
        }
    } catch (error) {
        dispatch(signInFailure(error.message))
    }
    }
  return (
    <div className='cursor-pointer'>
        <FcGoogle onClick={handleGoogleClick} className='w-7 h-7 '/>
    </div>
  )
}

export default OAuth