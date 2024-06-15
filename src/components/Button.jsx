import React from 'react'

const Button = ({cargando, setCargando, texto, deshablitiado}) => {
  return (
    <button type='Sumbit' disabled={deshablitiado?true:false} className={` flex items-center justify-center gap-4 ${cargando ? "pr-3" : null} hover:bg-cyan-800 transition-all cursor-pointer mt-5 text-white font-semibold rounded-md bg-cyan-700 w-full py-2`}>
        {cargando && <div className='relative flex items-center justify-center rounded-full w-4 h-4  bg-indigo-100'>
            <div className=' w-3 h-3 bg-cyan-800 rounded-full'></div>
                <div className='animate-spin absolute w-4 h-1 bg-cyan-800'>
                </div>
            </div>
        
        }
        {texto}
    </button>

  )
}

export default Button