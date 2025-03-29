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
                    <div>
                        {expand?'Close Sidebar':'Open Sidebar'}
                        <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand?'left-1/2 -top-1.5 -translate-x-1/2':'left-4 -bottom-1.5'}`}>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidenavbar