import React, { useEffect, useState } from 'react'
import{PlusIcon, XCircleIcon,CheckCircleIcon } from '@heroicons/react/24/solid'
import Input from './Input'
import Alerta from './Alerta'
import Calendario from './Calendario'
import clienteAxios from '../config/axios'
import { usePacientes } from '../hooks/usePacientes'
import dayjs from "dayjs";
import { useParams } from 'react-router-dom'

const FormPropietario = ({propietario, setPropietario}) => {
    const{pacienteEditar, guardarPaciente} = usePacientes()
    const[alerta, setAlerta]= useState({})




    useEffect(()=>{
        if(pacienteEditar._id){
            
        }
    },[pacienteEditar])


 
    const{msg} = alerta
  return (

    <>

        
        <div className='lg:flex bg-white p-5  rounded-md shadow-md   md:flex-col'>
        <p className=' text-gray-700 font-semibold text-lg mb-4'>Propietario</p>
        <form   className='w-full  flex flex-wrap  mb-5 gap-2 justify-between' action="">
           
            <div className='flex  w-full justify-between'>
                <Input valor={propietario} setValor={setPropietario} label={'Nombre'}/>
                
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

export default FormPropietario