import React, { useEffect, useState } from 'react'

import { usePacientes } from '../hooks/usePacientes'
import { useNavigate } from 'react-router-dom'
import FormMascota from '../components/FormMascota'
import FormPropietario from '../components/FormPropietario'
import FormContacto from '../components/FormContacto'
import Alerta from '../components/Alerta'


const CrearPacientes = () => {
  const navigate = useNavigate()
  const{obtenerPacientes, guardarPaciente, pacientes} = usePacientes()
  const[editando,setEditando] = useState(null)

  const[cita,setCita] = useState([])

  const[cargando, setCargando]= useState(false)
  const[nombre,setNombre] = useState('')
  const[propietario, setPropietario] = useState('')
  const[telefono, setTelefono] = useState('')
  const[email, setEmail] = useState('')

  const[sintoma, setSintoma] = useState('')
  const[sintomas, setSintomas] = useState([])
  const[alerta, setAlerta] = useState({})

  const[agregarSintoma, setAgregarSintoma] = useState(true)
  const[alta,setAlta] = useState(false)
  const[deshablitiado,setDeshabilitado] = useState(false)
  const[focus, setFocus] = useState(false)




  const handleSubmit = (e) => {
    e.preventDefault()
    validarDatos()
  }

  const validarDatos = () =>{
    if([nombre, propietario, email, telefono].includes('') || sintomas.length == 0){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true})
      return;
    }
    guardarPaciente({
      nombre,
      propietario,
      email,
      sintomas,
      telefono
    })
    setAlerta({msg:'Cita generada con exito'})
    setTimeout(()=>{
      navigate('/admin/pacientes')
    }, 2000)
    
  } 

  return (
    <>
    <div className=' mb-5 my-2 flex justify-between w-full'>
      <h1 className=' text-xl font-medium text-gray-700 '>Crear nuevas de Citas</h1>
      
      <div className=' flex gap-5'>
      <button type='submit' onClick={e => handleSubmit(e)} className=' shadow-md bg-gray-700 px-3 py-1 text-white rounded-md'>Crear Paciente</button>


      </div>
      
    </div>
    <div className=' w-full'>
    {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}

    </div>
    <div className='lg:flex w-full  justify-between gap-5 md:p-0 items-start '>
        <div className='w-full sm:4/12 md:w-4/12 mb-5'>
       
            <FormPropietario propietario={propietario} setPropietario={setPropietario}/>
        </div>
        <div className='w-full sm:4/12 md:w-8/12'>
            <FormMascota nombre={nombre} setNombre={setNombre} sintomas={sintomas} setSintomas={setSintomas} sintoma={sintoma} setSintoma={setSintoma} />
            <div className='mt-5 '>
              
              <FormContacto email={email} telefono={telefono} setEmail={setEmail} setTelefono={setTelefono} />
            </div>
            
        </div>
    
    </div>


    </>

  )
}

export default CrearPacientes