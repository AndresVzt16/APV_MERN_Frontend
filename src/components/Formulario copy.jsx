import React, { useEffect, useState } from 'react'
import{PlusIcon, XCircleIcon,CheckCircleIcon } from '@heroicons/react/24/solid'
import Calendario from './Calendario'
import Button from './Button'
import Alerta from './Alerta'
import Input from './Input'
import clienteAxios from '../config/axios'
import { usePacientes } from '../hooks/usePacientes'
import dayjs from "dayjs";
import { useParams } from 'react-router-dom'
const Formulario = () => {
    const params = useParams()
    const{id}= params
    const[cargando, setCargando]= useState(false)
    const[nombre,setNombre] = useState('')
    const[propietario, setPropietario] = useState('')
    const[telefono, setTelefono] = useState('')
    const[email, setEmail] = useState('')
    const[fechaAlta,setFechaAlta] = useState(dayjs(Date.now()));
    const[sintoma, setSintoma] = useState('')
    const[sintomas, setSintomas] = useState([])
    const[alerta, setAlerta] = useState({})
    const[mobile, setMobile] = useState(false)
    const[agregarSintoma, setAgregarSintoma] = useState(true)
    const{guardarPaciente, pacienteEditar,editarPaciente} = usePacientes()
    const[alta,setAlta] = useState(false)
    const[deshablitiado,setDeshabilitado] = useState(false)

    const dispositivo = () => {
        if( window.innerWidth < 768 ){
            setMobile(true)
        }else{
            setMobile(false)
        }
      };


    useEffect(()=>{
            
        if(pacienteEditar?.nombre && id){
            setDeshabilitado(false)
            setNombre(pacienteEditar.nombre)
            setPropietario(pacienteEditar.propietario)
            setTelefono(pacienteEditar.telefono)
            setEmail(pacienteEditar.email)
            setSintomas(pacienteEditar.sintomas)
        }else{
            !id ? setDeshabilitado(false) : setDeshabilitado(true)
                
             
        }

    },[pacienteEditar])
    useEffect(()=>{
        if(id){
            setDeshabilitado(true)
        }
        editarPaciente({})
    },[])

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        dispositivo()
        if([nombre,propietario,telefono, email].includes('') || sintomas.length == 0){
            setAlerta({msg:"Todos los campos son obligatorios", error:true})
            return;
        }
       
       setAlerta({})
       if(alta){
            const{$y,$M,$D} = fechaAlta

            const mes = $M + 1
            const año = $y
            const dia = $D
                
            const fechaSalida = new Date(`${año}-${mes}-${dia}`)

            guardarPaciente(
                {
                nombre,
                propietario,
                telefono,
                fechaAlta: fechaSalida,
                email,
                sintomas
            })
           
       }else{
        guardarPaciente(
            {
            nombre,
            propietario,
            telefono,
            email,
            sintomas
        })
       }
       
    setNombre(''),
    setPropietario('')
    setTelefono('')
    setEmail('')
    setSintomas([])
    editarPaciente({})
    !id ?
        setAlerta({msg:"Paciente agregado correctamente"})
    :
        setAlerta({msg:"Paciente editado correctamente"})
    }
    const handleEliminarSintoma = sintomaEliminar => {
        const nuevosSintomas = sintomas.filter(sint =>(sint._id !== sintomaEliminar))
        setSintomas(nuevosSintomas)
    }
    const handleCerrarSintoma = sintomaCerrar => {
        sintomas.map(sintoma =>{
            if(sintoma._id === sintomaCerrar){
                sintoma.completado = true
            }
        })
        guardarPaciente({
            nombre,
        propietario,
        telefono,
        email,
        sintomas
        })
    }


    const handleSintomas = () => {
        if(sintoma === ''){
            setAlerta({msg:"Ingresa un sintoma antes de continuar" ,error:true})
           
            return;
        }
        const sintomaState = {sintoma, id: Math.random()}
        setSintomas([...sintomas,sintomaState])
        setSintoma('')
    }

    const{msg} = alerta
  return (

    <>
    {!id &&
    <div className='flex gap-2 items-start'>
        <PlusIcon className=' bg-teal-100 rounded-full p-1 w-6 h-6 text-teal-800'/>
 
        <p className='text-cyan-700 font-medium mb-4'> Añadir nuevos Pacientes</p>
    </div>
    }
        
        <div className='flex  md:flex-col'>
        <form onSubmit={handleSubmit} className='w-full  flex flex-wrap px-10 mb-5 gap-2 justify-between' action="">
            {!mobile && (msg &&(
                <div className='w-full'>
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                </div>

            ) )}
            
           
            <div className=' w-full md:w-6/12'>
                <label className='text-gray-700 font-medium'>Paciente</label>
                <input 
                    type="text" 
                    className=' border border-gray-300 w-full h-10 px-4 py-2 mt-2 rounded-lg outline-none text-gray-600 focus:border-cyan-500' 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className=' w-full md:w-6/12'>
                <label className='text-gray-700 font-medium'>Propietario</label>
                <input 
                    type="text" 
                    className=' border border-gray-300 w-full h-10 px-4 py-2 mt-2 rounded-lg outline-none text-gray-600 focus:border-cyan-500' 
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>

            <div className='w-full md:w-5/12'>
                <label className='text-gray-700 font-medium'>Telefono</label>
                <input 
                    type="text" 
                    className=' border border-gray-300 w-full h-10 px-4 py-2 mt-2 rounded-lg outline-none text-gray-600 focus:border-cyan-500' 
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                />
            </div>
            <div className='w-full md:w-6/12'>
                <label className='text-gray-700 font-medium'>Email</label>
                <input 
                    type="text" 
                    className=' border border-gray-300 w-full h-10 px-4 py-2 mt-2 rounded-lg outline-none text-gray-600 focus:border-cyan-500' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className='flex justify-end gap-2 items-center my-5'>
                    <p className='text-gray-700 font-medium'>Asignar fecha de alta</p>
                    <input onChange={e => setAlta(!alta)} className=' size-4 border border-cyan-500 transition-all'  type="checkbox" name="" id="" />
            </div>
            {
            alta&&
            <Calendario fechaAlta={fechaAlta} setFechaAlta={setFechaAlta} />
            }
            <div className=' w-full '>
                <div className=' w-full flex flex-wrap gap-2'>
                    <p className='w-full text-gray-700 font-medium'>Sintomas:</p>
                        <div className='w-full'>
                            <p className='text-gray-500'>Leyenda</p>
                      
                        </div>
                    {sintomas.map(sintoma => (
                        <div key={sintoma._id||Math.random()} className={`${sintoma.completado?"bg-cyan-100":"bg-yellow-100"} rounded-md w-full justify-between md:w-fit px-4 text-cyan-600 flex gap-2 items-center py-2`}>
                            <p>{sintoma.sintoma}</p>
                            <div className='flex gap-10 md:gap-2'>
                                <div className='flex flex-wrap justify-center'>
                                    <XCircleIcon onClick={e => handleEliminarSintoma(sintoma._id)} className={`size-7 md:size-6 text-red-500 cursor-pointer`}/>
                                    <p className='w-full text-center text-red-800 text-xs'>Eliminar</p>
                                </div>

                            {
                            id&&
                            !sintoma.completado &&
                            (
                                <div className='flex flex-wrap justify-center'>
                                <CheckCircleIcon onClick={e => handleCerrarSintoma(sintoma._id)} className='size-7 md:size-6 text-green-400 cursor-pointer'/>
                                        <p className='w-full text-center text-green-700 text-xs'>Completar</p>
                                </div>
                                
                            )
                            }

                            </div>  
                        </div>
                        
                    ))}
                </div>

                <div className={` transition-all cursor-pointer`}  ></div>
                {
                    
                    <div className=' flex flex-wrap mt-5 items-center justify-between'>
                        <input
                            value={sintoma}
                            onChange={e => setSintoma(e.target.value)}
                            type="text" 
                            className=' border border-gray-300 w-8/12  px-4 py-2   rounded-lg outline-none text-gray-600 focus:border-cyan-500' 
                        />
                        <button  type='button'onClick={ e => handleSintomas()}  className='bg-cyan-800 py-2 mt-3 md:mt-0 text-cyan-50  px-4 h-10 m-0 rounded-lg'> Guardar sintoma </button>
                    </div>
                }


                

            </div>
            {mobile && (msg &&(
                <div className='w-full'>
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                </div>

            ) )}
            <div className='w-full'>

                <Button
                    texto={`${ id ? "Guardar Cambios" : "Crear registro"}`}
                    type='submit'
                    deshablitiado={deshablitiado}
                    cargando ={cargando}
                    />
            </div>

        </form>
        
        </div>

      

    </>

  )
}

export default Formulario