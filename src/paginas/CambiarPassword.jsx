import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

const CambiarPassword = () => {
    const{auth, guardarPassword} = useAuth()
    const[password, setPassword] = useState('')
    const[nuevoPassword, setNuevoPassword] = useState('')
    const[confirmar, setConfirmar] = useState('')


    const[alerta, setAlerta] = useState({})
  

    const handleSubmit = async e => {
      e.preventDefault()
      if([password,nuevoPassword,confirmar].includes('')){
        setAlerta({msg:'Todos los campos son obligatorios', error:true})
        return;
      }
      if(nuevoPassword !== confirmar){
        setAlerta({msg:'La contraseña nueva no coincide con la confirmación.', error:true})
        return;
      }

     const respuesta = await guardarPassword({password, nuevoPassword})
     setAlerta(respuesta)

    }
     const {msg} = alerta

  return (
    <div className=' text-gray-500 w-full'>
        <h2 className=' font-medium text-xl text-gray-600 '>Editar Perfil</h2>
        <p className=' my-2'>Modifica tu Información</p>
        {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
        <div className=' w-full flex flex-wrap mt-5'>
            
            <form action="" className=' w-full  bg-white p-7'>
                <p className=' mb-4 font-medium text-gray-800 text-lg'>Modificar Contraseña</p>
                <div className=' flex gap-10'>
                    <Input type={'password'} label={'Contraseña Actual'} setValor={setPassword} valor={password}/>
                    <Input type={'password'} label={'Nueva Contraseña'} setValor={setNuevoPassword} valor={nuevoPassword}/>
                </div>
                <div className=' w-1/2 pr-4 justify-end flex gap-10'>
                    <Input type={'password'} label={'Confirmar nueva contraseña'} setValor={setConfirmar} valor={confirmar}/>
                    
                </div>
                
                <div className=' flex justify-between items-center'>
                    
                    <button onClick={ e => handleSubmit(e)} className=' w-1/3 bg-cyan-800 py-2 h-fit px-4 rounded-md text-white'>Guardar Cambios</button>
                    <p className=' my-5'>Modificar mi <Link className=' text-cyan-700 font-medium underline' to={'/admin/perfil'}>perfil</Link></p>
                </div>

                
            </form>

        </div>
    </div>
  )
}

export default CambiarPassword