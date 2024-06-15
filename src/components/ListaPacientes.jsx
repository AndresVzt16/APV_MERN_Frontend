import React, { useEffect } from 'react'
import clienteAxios from '../config/axios'
import { usePacientes } from '../hooks/usePacientes'
import {DocumentTextIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import Paciente from './Paciente'
import { Link } from 'react-router-dom'

const ListaPacientes = ({limit}) => {
  const {pacientes, obtenerPacientes} = usePacientes()
  useEffect(()=>{
   
  },[pacientes])
     // Número de registros que deseas mostrar
    const limite = pacientes.slice(0, limit);
  return (
    <>
      <div className=' flex  flex-wrap bg-white shadow-md p-5 border border-gray-100 rounded-lg'>
        <div className='flex justify-between w-full mb-5 items-center'>
          <p className=' text-cyan-800 font-bold mb-2'>Lista de pacientes</p>
          {
          limit ?
          <Link to={'/admin/pacientes'} className='font-medium bg-cyan-700 inline-block text-center text-sm py-1 text-white px-3 rounded-md'>Ver todos los registros</Link>
          :
          <div className=' flex items-center'>
            <input type="text" placeholder='Buscar paciente' className='border rounded-s-md px-2 py-1 outline-none' />
            <button><MagnifyingGlassIcon className=' size-8 rounded-e-md text-white p-2 bg-gray-800'/></button>
          </div>  
          }
        
        </div>
        
        <div className={`w-full text-gray-400  gap-4 justify-center grid ${limit?"grid-cols-4":"grid-cols-6"}`}>
          <p className='font-medium text-sm text mb-2'>Paciente</p>
          {
          limit ? null
          : 
          <p className='font-medium text-sm text mb-2'>Propietario</p>
          }
          
          <p className='font-medium text-sm text mb-2'>Estado</p>
          <p className='font-medium text-sm text mb-2'>Ingreso</p>
          {
          limit ? null
          : 
          <p className='font-medium text-sm text mb-2'>Salida</p>
          }
          <p className='font-medium text-sm text mb-2'>Acción</p>
          { limit ? 
              limite.map( paciente =>(
                <Paciente
                  key={paciente._id}
                  paciente = {paciente}
                  limit={true}
                />
              ))
              :
              pacientes.map( paciente =>(
                <Paciente
                  key={paciente._id}
                  paciente = {paciente}
                />
              ))
            }
        </div>
   
        
  
        </div>
        


    </>
    


  )
}

export default ListaPacientes