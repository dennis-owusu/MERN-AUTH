import { MdOutlineOndemandVideo } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
const Home = () => {
  return (
    <>
    <div className='flex'>
      <img className='w-full h-[500px] mt-7 mx-10' src='https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?t=st=1712767247~exp=1712770847~hmac=91ca0e7950e9fe4dc7e66f47bdf6a5016de94940d0f189037d6ee9fb18b66595&w=740'/>
    </div>
      <div className=' flex gap-5 flex-col sm:flex-row'>
        <div className='my-3 bg-gray-200 px-2 pr-7 ml-5 hidden sm:inline mx-auto max-h-44 pb-3'>
          {/* left */}
          <p className='mt-2 text-gray-900'>Alex Smith</p>
          <div className='flex gap-5 justify-between mt-3'>
            <button className='bg-black text-white px-3'>Follow</button>
            <MdOutlineOndemandVideo className='ml-12 font-semibold text-2xl'/>
          </div>
          <div className='flex mt-16 gap-16'>
            <div className='flex'><AiOutlineLike className='text-xl'/>1.5k</div>
            <div className='flex'><BiMessageDetail className='text-xl'/>7.3k</div>
            <FaRegBookmark className='text-2xl'/>
          </div>
        </div>
        {/* right */}
        <div>
        <h1 className='text-3xl font-semibold mt-6'>Welcome to our blog where we explore the dynamic fusion of buisness and technology</h1>
        <div className='flex gap-2 mt-6'>
        <img className='w-8 h-8 rounded-full' src='https://img.freepik.com/free-photo/young-adult-red-shirt-side-view_23-2148638763.jpg?t=st=1712771373~exp=1712774973~hmac=379a02688eb2e9e679c178c1d8638d3aa24756f2df9087a5498ddab78e8464a1&w=996'/>
        <span className='underline'>by Alex Smith,</span><span>April 10, 2024</span>
        </div>
       <div>
       <p className='text-lg font-normal'>We find a buisnessman at the heim of his domain, navigating the digital landscape with finesse. With a laptop 
          as his trusted companion, he embodies the synergy between professional prowess and technological innovation.
          Join us as we delve deeper into this captivating imagery, exploring the nuances of productivity, efficiency and 
          the seamless integration of technology into the fabric of contemporary workplaces. Let embark on a
        </p>
       </div>
        </div>
      </div>
    </>
    
  )
}

export default Home