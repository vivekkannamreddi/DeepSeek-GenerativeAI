import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Sidenavbar = ({expand , setExpand}) => {
  return (
    <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand?'p-4 w-64':'md:w-20 w-0 max-md:overflow-hidden'}`}>
        <div>
            <div className={`flex ${expand? 'flex-row gap-10':'flex-col items-center gap-8'}`}>
                <Image  className={expand?'w-36':'w-10'} src={expand?assets.logo_text:assets.logo_icon} alt=''/>
                <div onClick={()=>expand?setExpand(false):setExpand(true)} className='group relative flex items-center justify-center hover:bg-gray-500/20 transitiion-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer '>
                    <Image src={assets.menu_icon} alt='' className='md:hidden'/>
                    <Image src={expand ?assets.sidebar_close_icon:assets.sidebar_icon} alt='' className='hidden md:block w-7'/>
                    <div className={`absolute w-max ${expand?'left-1/2 top-12 -translate-x-1/2':'-top-12 left-0' } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
                        {expand?'Close Sidebar':'Open Sidebar'}
                        <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand?'left-1/2 -top-1.5 -translate-x-1/2':'left-4 -bottom-1.5'}`}>

                        </div>
                    </div>
                </div>
            </div>


            <button className={`mt-8 flex items-center justify-center cursor-pointer ${expand?'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max':'group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg'}`}>
                <Image className={expand?'w-6':'w-7'} src={expand?assets.chat_icon:assets.chat_icon_dull} alt=''/>
                <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>
                    New chat
                    <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
                </div>
                {expand && <p className='text-white text font-medium'>New chat</p>}
            </button>
            <div className={`mt-8 text-white/25 text-sm ${expand?'block':'hidden'}`}>
                <p className='my-1'>Recents</p>
                {/* chatlabel */}
            </div>
        </div>
        <div className='relative'>
            <div className={`flex items-center cursor-pointer group relative ${expand?'gap-1 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10 cursor-pointer':'h-10 w-10 max-auto hover:bg-gray-500/30 rounded-lg absolute left-5.5'}`}>
                <Image className={expand?'w-5':'w-6.5 max-auto absolute left-1.5'} src={expand?assets.phone_icon:assets.phone_icon_dull} alt=''/>
                <div className={`absolute -top-60 pb-8 ${!expand&&'-right-40'} opacity-0 group-hover:opacity-100 hidden group-hover:block transition`}>
                    <div className='relative w-max bg-black text-white text-sm p-3 rounded-lg shadow-lg'>
                        <Image className='w-44'src={assets.qrcode} alt=''/>
                        <p>Scan to get DeepSeek App</p>
                        <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand?'right-1/2':'left-4'} -bottom-1.5`}></div>
                    </div>
                </div>
                {expand &&<><span>Get App</span><Image alt='' src={assets.new_icon}/></>}
            </div>
            <div className={`flex items-center ${expand?'hover:bg-gray-500/30 hover:rounded-lg':'justify-center w-full'}gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`} >
                <Image src={assets.profile_icon} alt='' className='w-7'/>
                {expand && <span>My Profile</span>}
            </div>
            
        </div>
    </div>
  )
}

export default Sidenavbar