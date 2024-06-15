import React from 'react'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'

const OlvidePassword = () => {

  const {auth} = useAuth()
  console.log(auth)

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const handleSubmit = async e => {
    e.preventDefault()
    setCargando(true)
    if(email === '' || email.length < 6){
      setAlerta({msg:'El email es obligatorio', error: true})
      setCargando(false)
      return;      
    }

    try {
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email});

      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    
  
    setCargando(false)
    

  }
  const{msg} = alerta



  return (
    <>
        <div className=" place-content-center flex flex-col items-center justify-center md:w-1/3 my-0 mx-auto">
          <img className=" w-20"  src="./src/assets/img/Pets.png" alt="" />
          <h1 className=" text-2xl font-bold text-gray-700 mt-3">Bienvenido a Pets<span  className=" text-cyan-600">Life</span></h1>
          <h2 className=" text-2xl mt-2 text-cyan-800 font-semibold ">Recuperar mi Contraseña</h2>
          { msg && 
          <Alerta alerta={alerta}  permanente={alerta.error?false:true} setAlerta={setAlerta}/>}
          <form onSubmit={handleSubmit} action="" className=" w-full">
            <div className=" mt-7">
              <label className=" block mb-2 font-semibold">Correo electronico</label>
              <input className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3  " type="text" placeholder="Correo electronico registrado"
              value={email}
              onChange={ e => setEmail(e.target.value)}
              />
            </div>
            <Button 
              cargando = {cargando}
              setCargando = {setCargando}
              texto = 'Restablecer Contraseña'
             />
          </form>
          <p className="mt-10 text-gray-500">¿No tienes una cuenta? <Link to='/registrar' className=" text-cyan-600 font-semibold">Registrate</Link></p>
          <p className="mt-5 text-gray-500">¿Ya tienes una cuenta? <Link to='/' className=" text-cyan-600 font-semibold">Iniciar Sesión</Link></p>
        </div>
    </>
  )
}

export default OlvidePassword