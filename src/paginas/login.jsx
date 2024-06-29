//mejorar el performance con link de RRD
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import Button from "../components/Button"
import { usePacientes } from "../hooks/usePacientes"
const Login= () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const {setAuth, auth} = useAuth()

  const{obtenerPacientes} = usePacientes()

  useEffect(()=>{
    const{data} = auth
   
  },[])

  const handleSubmit = async(e) => {
    setCargando(true)
    e.preventDefault()

    if([email, password].includes('')){
      setAlerta({msg:'Hay campos vacios', error:true})
      setCargando(false)
      return;
    }

    try {
      const{data} = await clienteAxios.post('/veterinarios/login',{email,password})
      //verificar si existe el token
      localStorage.setItem("token", data.token)
      await setAuth(data)
      await obtenerPacientes()
      navigate('/admin')
    } catch (error) {
      setAlerta({msg:error.response.data.msg, error:true})
      
    }
    setCargando(false)

  }
  const {msg} = alerta


  return (
    

    <>
        <div className=" transition-all place-content-center flex flex-col items-center justify-center ">
          <img className=" w-20"  src="/src/assets/img/Pets.png" alt="" />
          <h1 className=" text-2xl font-bold text-gray-700 mt-3">Bienvenido a Pets<span  className=" text-cyan-600">Life</span></h1>
          <h2 className=" text-2xl mt-2 text-cyan-800 font-semibold ">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} action="" className=" transition-all w-full md:w-1/3">
            {
            msg && <Alerta alerta={alerta} setAlerta={setAlerta} />
            }
            <div className=" mt-7">
              <label className="text-gray-600 block mb-2 font-semibold">Correo electronico</label>
              <input 
               className=" text-gray-800 focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3  " 
               type="text" 
               placeholder="" 
               value={email}
               onChange={e => setEmail(e.target.value)}
               />
            </div>
            <div className="mt-5">
              <div className=" mb-2 lg:flex items-center justify-between">
                <label className=" text-gray-600 block font-semibold">Contraseña</label>
                <Link to='/olvide-password ' className=" text-cyan-700 font-semibold">¿Olvidaste tu contraseña?</Link>
              </div>
              <input 
                className=" text-gray-800 focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3   " 
                type="password" 
                placeholder=""
                value={password}
                onChange={e => setPassword(e.target.value)} 
                />
            </div>
            <Button 
            type="submit" 
            value= 'Iniciar Sesión' 
            cargando ={cargando}
            texto={"Iniciar Sesion"}
            />
          </form>
          <p className="mt-10 text-gray-500">¿No tienes una cuenta <Link to='/registrar' className=" text-cyan-600 font-semibold">Registrate</Link></p>
        </div>
    </>

  )
}

export default Login