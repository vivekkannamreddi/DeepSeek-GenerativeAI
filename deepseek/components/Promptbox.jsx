import React from 'react'

const Promptbox = () => {
  return (
    <form className={`w-full ${false?'max-w-3xl':'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>
        <textarea name="" id="" className='outline-none w-full resize-none overflow-hidden break-words bg-transparent' rows={2} placeholder='Message Deepseek ' required></textarea>
        <div>
            <div>
                <p>
                    
                </p>
            </div>
        </div>

    </form>
  )
}

export default Promptbox