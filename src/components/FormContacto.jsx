import React, { useEffect, useState } from 'react'
import{PlusIcon, XCircleIcon,CheckCircleIcon } from '@heroicons/react/24/solid'
import Input from './Input'
import Alerta from './Alerta'
import Calendario from './Calendario'
import clienteAxios from '../config/axios'
import { usePacientes } from '../hooks/usePacientes'
import dayjs from "dayjs";
import { useParams } from 'react-router-dom'

const FormContacto = ({email,setEmail,telefono,setTelefono}) => {
    const{pacienteEditar, guardarPaciente} = usePacientes()
    const[alerta, setAlerta]= useState({})




    useEffect(()=>{
        if(pacienteEditar._id){
            
        }
    },[pacienteEditar])


 
    const{msg} = alerta
  return (

    <>

        
        <div className='flex bg-white p-5 flex-wrap  rounded-md shadow-md  mb-5 '>
        <p className=' text-gray-700 font-semibold text-lg mb-4'>Contacto</p>
        <form   className='w-full  flex mb-5 gap-5 justify-between' action="">
           
            <div className='flex w-1/2 justify-between'>
                <Input valor={email} setValor={setEmail} label={'Email'}/>
                
            </div>
            <div className='flex w-1/2 justify-between'>
                <Input valor={telefono} setValor={setTelefono} label={'Telefono'}/>
                
            </div>
            {msg &&(
                <div className='w-full'>
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                </div>

            ) }
        
        </form>
        
        </div>

      

    </>

  )
}

export default FormContacto