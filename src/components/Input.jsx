import React, { useEffect, useState } from 'react'

const Input = ({setValor, valor, label, type}) => {
    const[focus,setFocus] = useState(false)

    const handleChange = (info)=>{
        setValor(info)
    }
    const hadleBlur = () => {
        if(valor.length === 0 && focus ){
            setFocus(false)

        }
        if(valor.length>0){
            setFocus(true)
        }

    }
    useEffect(()=>{
       hadleBlur()
    },[valor])
    
  return (
    <div className=' w-full relative lg:flex items-center my-5'>
                <label onFocus={ e => setFocus(true)} onClick= {e =>setFocus(true)} onBlur={ e => hadleBlur()} className={`text-left transition-all z-10 ${focus? "text-cyan-600 scale-90 -top-4 -left-1 " : "text-gray-400 top-1/3 left-0 " } absolute`}>{label}</label>
                <input 
                    value={valor}
                    onChange={e => handleChange(e.target.value)}
                    onFocus={ e => setFocus(true)}
                    onBlur={ e => hadleBlur()}
                    type={`${type? type: "text"}`} 
                    className='z-20 border-b border-gray-300 w-full py-2  h-10 bg-transparent outline-none text-gray-400 focus:border-cyan-500' 
                />
    </div>
    
  )
}

export default Input