import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePacientes } from '../hooks/usePacientes'
import { useNavigate } from 'react-router-dom'

import Cita from '../components/Cita'
import FormMascota from '../components/FormMascota'
import FormPropietario from '../components/FormPropietario'
import FormContacto from '../components/FormContacto'

import Alerta from '../components/Alerta'
import AlertDialog from '../components/AlertDialog'


const VerCita = () => {
  const params = useParams()

  const navigate = useNavigate()
  const{obtenerPacientes, editarPaciente, guardarPaciente, pacienteEditar , pacientes, eliminarPaciente} = usePacientes()
  const[editando,setEditando] = useState(null)

  const[cita,setCita] = useState([])
  const{id} = params

  const[cargando, setCargando]= useState(false)
  const[nombre,setNombre] = useState('')
  const[propietario, setPropietario] = useState('')
  const[telefono, setTelefono] = useState('')
  const[email, setEmail] = useState('')
  const[fechaAlta,setFechaAlta] = useState('');
  const[sintoma, setSintoma] = useState('')
  const[sintomas, setSintomas] = useState([])
  const[alerta, setAlerta] = useState({})
  const[eliminar,setEliminar] = useState(false)



  

  const[agregarSintoma, setAgregarSintoma] = useState(true)
  const[alta,setAlta] = useState(false)
  const[deshablitiado,setDeshabilitado] = useState(false)
  const[focus, setFocus] = useState(false)

  useEffect(()=>{
    const citaAccedida = pacientes.find(paciente => paciente._id == id);
    if(citaAccedida){
      setCita(citaAccedida)
      
    }   
  },[id,pacientes])

  if (!cita) {
    return <p>Cargando...</p>; // Renderiza un mensaje de carga mientras se obtiene la cita
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setEditando(!editando)
   
  }
  useEffect(()=>{
    if(editando){
      console.log('Editando')
      console.log(cita)
      setNombre(cita.nombre)
      setSintomas(cita.sintomas)
      setPropietario(cita.propietario)
      setEmail(cita.email)
      setTelefono(cita.telefono)
      console.log(cita.sintomas)

    }else{
     
     if(cita._id){
      
      guardarPaciente(  
        {
        nombre,
        propietario,
        telefono,
        email,
        sintomas
      })
      
      setAlerta({msg:'Paciente Editado Correctamente'})

     }

    setNombre('')
    setSintomas([])
    setPropietario('')
    setTelefono('')
    setEmail('')
    
     
    }
  },[editando])


  useEffect(()=>{
    editarPaciente(cita)
  },[cita])


  useEffect(() => {
    if(eliminar){
      eliminarPaciente(id)
      navigate('/admin')
      
    }
  },[eliminar])

  return (
    <>
    <div className=' mb-5 my-2 flex justify-between w-full'>
      <h1 className=' text-xl font-medium text-gray-700 '>Información de Citas</h1>
      <div className=' flex gap-5'>
      <button type='submit' onClick={e => handleSubmit(e)} className=' shadow-md bg-gray-700 px-3 py-1 text-white rounded-md'>{editando? "Guardar Cambios": "Editar Cita"}</button>
      <AlertDialog eliminar ={eliminar} setEliminar={setEliminar}/>
      
      </div>
      
    </div>
    {alerta.msg && <Alerta setAlerta={setAlerta} alerta={alerta}/>}
    <div className='lg:flex w-full  justify-between gap-5 md:p-0 items-start '>
        <div className='w-full sm:4/12 md:w-4/12 mb-5'>
            <Cita  />
            <div className=' mt-5 '>
            <FormPropietario propietario={propietario} setPropietario={setPropietario}/>

            </div>
            
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

export default VerCita