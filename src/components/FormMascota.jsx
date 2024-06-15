import React, { useEffect, useState } from 'react'
import{PlusIcon, XCircleIcon,CheckCircleIcon } from '@heroicons/react/24/solid'
import Input from './Input'
import Alerta from './Alerta'
import Calendario from './Calendario'
import clienteAxios from '../config/axios'
import { usePacientes } from '../hooks/usePacientes'
import dayjs from "dayjs";
import { useParams } from 'react-router-dom'

const FormMascota = ({nombre, setNombre, fechaIngreso, sintomas, setSintomas, sintoma ,setSintoma}) => {
    const{pacienteEditar, guardarPaciente} = usePacientes()
    const[alerta, setAlerta]= useState({})
    const[sintomasCita, setSintomasCita] = useState([])



    useEffect(()=>{
        if(pacienteEditar._id){
            
        }
    },[pacienteEditar])


  
    const handleEliminarSintoma = (e, sintomaEliminar) => {
        e.preventDefault()
        const nuevosSintomas = sintomas.filter(sint =>(sint._id !== sintomaEliminar))
        setSintomas(nuevosSintomas)
    }
    const handleCerrarSintoma = (e, sintomaCerrar) => {
        e.preventDefault()
        
        sintomas.map(sint =>{
            if(sint._id === sintomaCerrar){
                sint.completado = true
                guardarPaciente({sintomas})
            }
            
        }            
        )
        
    }

    useEffect(()=>{
        setSintomasCita(sintomas)
    },[sintomas])

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

        
        <div className='lg:flex bg-white p-5  rounded-md shadow-md  md:flex-col'>
        <p className=' text-gray-700 font-semibold text-lg mb-4'>Paciente</p>
        <form   className='w-full  flex flex-wrap  mb-5 gap-2 justify-between' action="">
           
            <div className='flex w-1/2 justify-between'>
                <Input valor={nombre} setValor={setNombre} label={'Nombre'}/>
                
            </div>
            {msg &&(
                <div className='w-full'>
                    <Alerta alerta={alerta} setAlerta={setAlerta} />
                </div>

            ) }

           
            <div className=' w-full '>
                <div className=' w-fullflex flex-wrap gap-2'>
                    <p className='w-full text-gray-700 font-medium mt-5 mb-3'>Sintomas:</p>
                    <div className=' flex flex-wrap w-full border rounded-md px-2 py-1'>
                        <div className='flex w-full text-gray-500 mb-3 border-b py-1'>
                            <p className='w-1/2'>Sintoma</p>
                            <p className='w-1/2 '>Accion</p>
                        </div>
                        
                        {sintomasCita.map(sintoma => (
                        <div key={sintoma._id||Math.random()} className={`${sintoma.completado?"text-green-600":"text-yellow-600"} rounded-md w-full justify-between text-sm mb-2 flex gap-2 items-center`}>
                            <p>{sintoma.sintoma}</p>
                            <div className='flex gap-10 md:gap-5'>
                                <button onClick={e => handleEliminarSintoma(e, sintoma._id)}  className='flex items-center border border-red-400 px-2 rounded-md justify-center'>
                                    <XCircleIcon className={`size-5 md:size-5 text-red-400 cursor-pointer`}/>
                                    <p className='w-full text-center text-red-600 text-xs'>Eliminar</p>
                                </button>
                                {
                                pacienteEditar&&
                                !sintoma.completado &&
                                (
                                <button onClick={e => handleCerrarSintoma(e, sintoma._id)} className='flex items-center bg-green-200 px-2 rounded-md justify-center'>
                                    <CheckCircleIcon  className='size-7 md:size-6 text-green-600 cursor-pointer'/>
                                    <p className='w-full text-center text-green-700 text-xs'>Completar</p>
                                </button>
                                
                                )
                                }

                            </div>  
                        </div>
                        
                    ))}
                    </div>
                    
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
            


        </form>
        
        </div>

      

    </>

  )
}

export default FormMascota