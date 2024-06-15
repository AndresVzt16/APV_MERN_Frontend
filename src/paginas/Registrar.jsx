import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault();
    if([nombre, email, password, confirmarPassword].includes('')){
      setAlerta({msg:'Hay campos vacios', error: true})
      return;
    }

    if(password !== confirmarPassword) {
      setAlerta({msg:'Los passwords no son inguales', error: true});
      return
    }

    if(password.length < 6) {
      setAlerta({msg:'Es necesario establecer una contraseña con minimo 7 caracteres', error: true})
      return
    }
    setAlerta({})

    try {
      const url = `/veterinarios`
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({msg:'Usuario registrado correctamente. Verifica tu email para activar la cuenta.', 
      error: false})
      
    } catch (error) {
      //Para acceder al mensaje de backend con response.data.msg
      setAlerta({msg: error.response.data.msg, 
      error:true})
    }
  }
  const {msg} = alerta

  return (
    <>
        <div className=" place-content-center flex flex-col items-center md:w-1/3 my-0 mx-auto justify-center">
          <img className=" w-20"  src="./src/assets/img/Pets.png" alt="" />
          <h1 className=" text-2xl font-bold text-gray-700 mt-3">Bienvenido a Pets<span  className=" text-cyan-600">Life</span></h1>
          <h2 className=" text-2xl mt-2 text-cyan-800 font-semibold ">Registrarse</h2>
          
          { msg && 
          <Alerta alerta={alerta} setAlerta={setAlerta}/>}
          <form 
            action="" 
            className=" w-full"
            onSubmit={handleSubmit}
          >
            <div className=" mt-5">
              <label className=" block mb-2 font-semibold">Nombre</label>
              <input 
                className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3 text-cyan-800 " 
                value={nombre}  
                type="text" 
                placeholder="" 
                onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="mt-5">
              <div className=" mb-2 lg:flex items-center justify-between">
                <label className=" block font-semibold">Correo electronico</label>
              </div>
              <input 
                className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3 text-cyan-800 " 
                type="email" 
                placeholder=""
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-5">
              <div className=" mb-2 lg:flex items-center justify-between">
                <label className=" block font-semibold">Contraseña</label>
              </div>
              <input 
                className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3  text-cyan-800 " 
                type="password" 
                placeholder=""
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-5">
              <div className=" mb-2 lg:flex items-center justify-between">
                <label className=" block font-semibold">Confirmar Contraseña</label>
              </div>
              <input 
                className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3 text-cyan-800 " 
                type="password" 
                placeholder="" 
                value={confirmarPassword}
                onChange={e => setConfirmarPassword(e.target.value)}
                />
            </div>
            <input className=" cursor-pointer mt-7 text-white font-semibold rounded-md bg-cyan-700 w-full py-2" type="submit" value= 'Registrarme' />
          </form>
          <p className="mt-5 text-gray-500">¿Ya tienes una cuenta? <Link to='/' className=" text-cyan-600 font-semibold">Iniciar Sesión</Link></p>
        </div>
    </>
  )
}

export default Registrar