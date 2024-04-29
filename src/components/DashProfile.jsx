/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, Button, Alert, Modal, Spinner } from 'flowbite-react';
import { AiOutlineDelete } from "react-icons/ai";
import {useNavigate} from 'react-router-dom'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';
import { toast } from 'react-toastify';
import { updateFailure, updateStart, updateSuccess, deleteFailure, deleteSuccess, signOutSuccess } from '../redux/user/userSlice';
const DashProfile = () => {
    const { currentUser } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef()
    const [imageFile, setImageFile] = useState(null)
    const [imageFileUrl, setImageFileUrl] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleImageChange = (e) =>{
        const file = e.target.files[0]
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
       
    }

    useEffect(() =>{
        if(imageFile){
            uploadImage()
        }
    }, [imageFile])

    dispatch(updateStart())
    const uploadImage = () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)
        
        uploadTask.on('state_changed', (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setImageUploadProgress(progress.toFixed(0))
        }, (error)=>{
            toast.error("Couldn't upload image (File must be less than 2MB)")
        }, ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageFileUrl(downloadURL);
                setFormData({ ...formData, profilePicture: downloadURL });
                setImageUploadProgress(null)
                setImageFile(null)
                setLoading(false)
                
            });
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setErrorMessage(null)
        if(Object.keys(formData).length === 0){
            setErrorMessage('No changes made')
            return
        }
        dispatch(updateStart())
        setLoading(true)
        try {
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok) {
                dispatch(updateFailure(data.message))
                toast.error(data.message, {
                    position: 'top-center'
                })
                setLoading(false)
            }
            if(!currentUser){
                setErrorMessage('Please login')
            }else if(res.ok){
                dispatch(updateSuccess(data))
                toast.success("User's profile updated successfully",{
                    position: 'top-center'
                })
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setErrorMessage(error.message)
            dispatch(updateFailure(error.message))
        }
    }

    const handleDelete = async()=>{
        try {
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            if(!res.ok){
                dispatch(deleteFailure(data.message))
            }else{
                dispatch(deleteSuccess(data))
                navigate('/sign-in')
                toast.success('Account has been deleted successfully', {
                    position: 'top-center'
                })
            }
        } catch (error) {
            dispatch(deleteFailure(error.message))
        }
    }

    const handleSignout = async() =>{
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            })
            const data = await res.json()
            if(!res.ok){
            return setErrorMessage(data.message)
            }else{
                dispatch(signOutSuccess(data))
                navigate('/sign-in')
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <div className='w-full'>
           <h1 className='font-semibold text-center text-3xl my-8 mt-16'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex gap-5 flex-col mt-6 max-w-xl mx-auto'>
           <input className='hidden' type='file' accept='image/*' hidden ref={filePickerRef} onChange={handleImageChange}/>
            <div className='flex relative justify-center rounded-full' >
                {
                    imageUploadProgress && (
                        <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root: {
                              width: '100%',
                              height: '100%',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            },
                            path: {
                              stroke: `rgba(62, 152, 199, ${
                                imageUploadProgress / 100
                              })`,
                            },
                          }}
                        />
                    )
                }
                <img onClick={()=> filePickerRef.current.click()} className='w-44 h-44 rounded-full border-[10px] dark:border-gray-400' src={imageFileUrl || currentUser.profilePicture} alt="Profile Picture" />
            </div>
                <TextInput type='text' id='username' defaultValue={currentUser.username} onChange={handleChange}/>
                <TextInput type='email' id='email' defaultValue={currentUser.email} onChange={handleChange}/>
                <TextInput value={currentUser.password} type='password' id='password' placeholder='password' onChange={handleChange}/>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    {
                        loading ? (
                            <>
                            <Spinner size='sm'/>
                            <span>Loading...</span>
                            </>
                        ): ('Update')
                    }
                </Button>
               <div className='flex justify-between text-lg'>
               <span className='text-red-500 cursor-pointer' onClick={()=> setShowModal(true)}>Delete Account</span>
                <span className='text-red-500 cursor-pointer' onClick={handleSignout}>Sign Out</span>
               </div>
            {
                errorMessage && (
                    <Alert color='failure'>{errorMessage}</Alert>
                )
            }
            </form>
            <Modal show={showModal} popup onClose={()=>setShowModal(false)} size='md'>
                <Modal.Header/>
                <Modal.Body>
                    <AiOutlineDelete className='mx-auto text-5xl'/>
                    <p className='text-lg mx-auto text-gray-500 mt-4 text-center'>Are you sure you want to delete this account</p>
                   <div className='flex justify-center gap-5 mt-5'>
                   <Button onClick={handleDelete} color='failure'>Yes I'm sure</Button>
                    <Button onClick={()=>setShowModal(false)} color='light'>No cancel</Button>
                   </div>
                </Modal.Body>
            </Modal>
           </div>
    );
};

export default DashProfile;
