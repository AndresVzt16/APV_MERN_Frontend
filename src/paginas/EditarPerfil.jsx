import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'

const EditarPerfil = () => {
    const{auth, actualizarPerfil} = useAuth()
    const[nombre, setNombre] = useState('')
    const[email, setEmail] = useState('')
    const[pagina, setPagina] = useState('')
    const[telefono, setTelefono] = useState('')

    const[alerta, setAlerta] = useState({})
    useEffect(() => {
        if(auth._id){
            setNombre(auth.nombre)
            setEmail(auth.email)
            setPagina(auth.web)
            setTelefono(auth.telefono)
        }
    },[auth])

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre, email].includes('')){
            setAlerta({msg:'Hay campos obligatorios vacios', error:true})
            return;
        }
        setAlerta({msg:'Editando perfil'})
        actualizarPerfil({nombre, email, web:pagina, telefono})

    }
     const {msg} = alerta

  return (
    <div className=' text-gray-500 w-full'>
        <h2 className=' font-medium text-xl text-gray-600 '>Editar Perfil</h2>
        <p className=' my-2'>Modifica tu Información</p>
        {alerta.msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
        <div className=' w-full flex flex-wrap mt-5'>
            
            <form action="" className=' w-full  bg-white p-7'>
                <p className=' mb-4 font-medium text-gray-800 text-lg'>Datos personales</p>
                <div className=' flex gap-10'>
                    <Input  label={'Nombre'} setValor={setNombre} valor={nombre}/>
                    <Input  label={'Email'} setValor={setEmail} valor={email}/>
                </div>
                <div className=' flex gap-10'>
                    <Input  label={'Pagina'} setValor={setPagina} valor={pagina? pagina: ""}/>
                    <Input  label={'Teléfono'} setValor={setTelefono} valor={telefono? telefono: ""}/>
                </div>
                
                <div className=' flex justify-between items-center'>
                    
                    <button onClick={ e => handleSubmit(e)} className=' w-1/3 bg-cyan-800 py-2 h-fit px-4 rounded-md text-white'>Guardar Cambios</button>
                    <p className=' my-5'>Modificar mi <Link className=' text-cyan-700 font-medium underline' to={'/admin/cambiar-password'}>contraseña</Link></p>
                </div>

                
            </form>

        </div>
    </div>
  )
}

export default EditarPerfil