import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { 
    UserIcon, 
    DocumentIcon, 
    ArrowLeftEndOnRectangleIcon, 
    ChevronDoubleDownIcon,
    TableCellsIcon,
    IdentificationIcon,
    DocumentTextIcon,
    DocumentChartBarIcon 
} from '@heroicons/react/24/solid'




const Header = ({user}) => {
    const{cerrarSesion} = useAuth()
    const [menu, setMenu] = useState(false)
    const [desplegar, setDesplegar] = useState('h-0')
    const[textShow, setTextShow] = useState(false)
    const[mobile, setMobile] = useState(false)
    const dispositivo = () => {
        if( window.innerWidth < 768 ){
            setMobile(true)
        }else{
            setMobile(false)
        }
      };

    useEffect(() =>{
        dispositivo()
        if(menu){
            setDesplegar(' h-fit  px-3 py-2 border')
            setTimeout(() => {
                setTextShow(true)
            }, 100);
        }else{
            setTextShow(false)
            
            setTimeout(() => {
                setDesplegar('h-0  p-0 border-none')
            }, 100);
        }

    },[menu])

    const handleMenu = () =>{
        setMenu(!menu)
    }



  return (
    <>
    <header className=' w-full  border-b container mx-auto  '>
        <div className='max-w-7xl my-0 mx-auto flex justify-end py-4 items-center '>

            <div className='relative left-0 w-full md:w-1/3 flex justify-end gap-4 items-center'>
                
                <p className=' capitalize m-0 text-cyan-900 font-medium'>{user.nombre}</p>
                <ChevronDoubleDownIcon onClick={e => handleMenu()} className=" transition-all hover:bg-cyan-700 rounded-full hover:transition-all bg-cyan-100 cursor-pointer  p-1 size-7 text-cyan-800 hover:text-cyan-50" />
                <nav className={` box-border transition-all ${desplegar} rounded-lg shadow-lg absolute bottom-0 top-full bg-white `}>

                    <Link className={`text-gray-500  ${textShow ? " scale-100": " scale-0 "} transition-all hover:bg-gray-100 rounded-md flex gap-1 items-center py-2 px-4`}><UserIcon className="p-1 size-7 text-cyan-500 " /> Perfil</Link>
                    
                    <Link className={`${textShow ? " scale-100": " scale-0 "} hover:bg-gray-100 rounded-md hover:transition-all py-2 px-4 transition-all  text-gray-500  flex gap-1 items-center`}><DocumentIcon className="p-1 size-7 text-cyan-500 " /> Citas</Link>
                    {
                        mobile && (
                            <>
                            <Link className={`${textShow ? " scale-100": " scale-0 "} hover:transition-all hover:bg-gray-100 rounded-md py-2 px-4 transition-all text-gray-500  flex gap-1 items-center`}>
                                <TableCellsIcon className="p-1 size-7 text-cyan-500 " /> 
                                Registros
                            </Link>
                            <Link className={`${textShow ? " scale-100": " scale-0 "} hover:transition-all hover:bg-gray-100 rounded-md py-2 px-4 transition-all text-gray-500  flex gap-1 items-center`}>
                                <IdentificationIcon className="p-1 size-7 text-cyan-500 " /> 
                                Pacientes
                            </Link>
                            <Link className={`${textShow ? " scale-100": " scale-0 "} hover:transition-all hover:bg-gray-100 rounded-md py-2 px-4 transition-all text-gray-500  flex gap-1 items-center`}>
                                <DocumentTextIcon className="p-1 size-7 text-cyan-500 " /> 
                                Datos
                            </Link>
                            </>
                        )
                    }

                    <button
                        type='button'
                        onClick={cerrarSesion}
                        className={`${textShow ? " scale-100": " scale-0 "} 
                        hover:transition-all hover:bg-gray-100 rounded-md py-2 px-4 transition-all text-gray-500  flex gap-1 items-center`}>
                        <ArrowLeftEndOnRectangleIcon className="p-1 size-7 text-cyan-500 " />
                         
                        Cerrar Sesión
                    </button>

                </nav>

            </div>
        </div>


    </header>
    </>

  )
}

export default Header