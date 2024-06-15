import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { usePacientes } from '../hooks/usePacientes'


const Paciente = ({paciente , limit}) => {
  const navigate = useNavigate('./pacientes')
  const{editarPaciente, pacientes } = usePacientes()
  const{nombre, propietario, telefono, sintomas, fechaIngreso, email, _id, fechaAlta} = paciente

  const[ingreso, setIngreso] = useState('')

  const [activo, setActivo] = useState('')
  useEffect(()=>{
    if(fechaAlta !== null){
      setActivo(false)
    }else{
      setActivo(true)
    }
  },[])

  useEffect(()=> {
    formatearFecha()
  },[pacientes])
  const formatearFecha =  ()=>{
    if(fechaIngreso){
      const fechaFormateada = fechaIngreso.split('T')[0]
      setIngreso(fechaFormateada)
    }

  }

  const handleEditarPaciente = async (paciente) => {
    editarPaciente({})
    navigate(`/admin/pacientes/${paciente._id}`)
  }

  return (
    <>
        
        <p className=' w-full m-0 text-gray-500 text-sm    '>{nombre}</p>
        {limit? null :(
          <p className=' w-full m-0 text-gray-500 text-sm '>{propietario}</p>
        )}
        
        
        <p className={` w-fit h-fit text-xs font-medium py-1 px-2  rounded-md ${activo?"bg-green-100 text-green-600":"bg-yellow-100 text-yellow-600"} `}>{activo?"Activo":"Finalizado"}</p>
        <p className=' w-full  m-0 text-gray-500 text-sm'>{ingreso}</p>
        {limit? null :(
          <p className=' w-full m-0 text-gray-500 text-sm '>{fechaAlta? fechaAlta:"No definida"}</p>
        )}
        <div className='w-full flex '>
          <button type='button' onClick={ e => handleEditarPaciente(paciente)} className={`w-full border border-cyan-500  px-2 py-1  h-fit text-cyan-500 font-medium  text-xs rounded-md `}>Ingresar</button>
        </div>
      
   

 

    </>
  )
}

export default Paciente