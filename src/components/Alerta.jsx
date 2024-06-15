import { useEffect, useState } from "react"
import{XCircleIcon,CheckCircleIcon } from '@heroicons/react/24/solid'
const Alerta = ({alerta, setAlerta, permanente}) => {
  const[show, setShow] = useState('scale-0 opacity-0')

  useEffect(()=> {

    setTimeout(() => {
      setShow('scale-100 opacity-1')
      if(!permanente){
        setTimeout(()=> {
          setShow('scale-0 opacity-0')
          setTimeout(() => {
            setAlerta({})
          },[100])
       
        },[2000])
      }

    },100);
  },[])
  return (
    <ul className={`${show} w-full transition-all  top-0 right-0 mt-5 rounded-md px-5 py-2
        ${alerta.error ? '  bg-red-100  text-red-700 '
        :
        " bg-green-100  text-green-700"
    }
    `}>
      {
      alerta.error ?
        <div className=" flex gap-2 items-center">
          <XCircleIcon className="text-red-500 size-5"/>

          <p className=" font-semibold ">Error</p>
        </div> 
        
        : 
        <div className=" flex gap-2">
          <CheckCircleIcon className="text-green-500 size-5 "/>
          <p className=" font-semibold ">Proceso realizado exitosamente</p>
        </div>

      }
   
        <li className=" ml-12 text-sm mt-1 list-disc ">{alerta.msg}</li>
   
      
      
    </ul>
  )
}

export default Alerta