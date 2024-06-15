
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { useEffect, useState } from 'react'
import Alerta from '../components/Alerta'
import { useParams } from 'react-router-dom'
import clienteAxios from '../config/axios'
const NuevoPassword = () => {
  const[password, setPassword] = useState('')
  const[confirmarPassword, setConfirmarPassword] = useState('')
  const[alerta,setAlerta] = useState({})
  const[cargando,setCargando] = useState(false)
  const[tokenValido, setTokenValido] = useState(false)
  const[mostrarAlerta,setMostrarAlerta] = useState(false)

  const params = useParams()
  const{token} = params

  useEffect(() => {
    const comprobarToken = async ()=> {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`)
        setAlerta({msg:"Coloca tu nueva contraseña"})
        setTokenValido(true)
        
      } catch (error) {
        setAlerta({msg:"Hubo un error con el enlace", error : true})
      }
    }
    comprobarToken()
  }, [])


  const handleSubmit = async(e) => {
    e.preventDefault();
    setCargando(true)
    if([password, confirmarPassword].includes('')){
      setAlerta({msg:'Todos los campos son obligatorios.', error:true})
      setMostrarAlerta(true)
      setCargando(false)
      return;
      
    }

    if(password !== confirmarPassword){
      setAlerta({msg: "Las contraseñas no coinciden" ,error:true})
      setMostrarAlerta(true)
      setCargando(false)
      return;
    }

    if(password.length < 6) {
      setAlerta({msg: "La contraseña debe contener al menos 6 caracteres" ,error:true})
      setMostrarAlerta(true)
      setCargando(false)
      return;
    }


    try {
      const {data} = await clienteAxios.post(`veterinarios/olvide-password/${token}`,{password});
      setAlerta({msg:data.msg})
      
    } catch (error) {
      setAlerta({msg:"Ocurrio un error", error:true})

    }
    setCargando(false)
  }

  


  const {msg} = alerta

  return (
    
    <>
        <div className=" place-content-center flex flex-col  items-center justify-center ">
          <img className=" w-20"  src="./src/assets/img/Pets.png" alt="" />
          <h1 className=" text-2xl font-bold text-gray-700 mt-3">Bienvenido a Pets<span  className=" text-cyan-600">Life</span></h1>
          <h2 className=" text-2xl mt-2 text-cyan-800 font-semibold ">Restablecer contraseña</h2>
          <div className=' w-1/3'>
          {msg &&
            <Alerta  alerta={alerta} setAlerta={setAlerta} permanente = {true}/>}
          </div>

          { tokenValido &&
          <form onSubmit={handleSubmit} action="" className=" w-full md:w-1/3">
          
          <div className=" mt-7">
            <label className=" block mb-2 font-semibold">Nueva contraseña</label>
            <input 
              className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3  " 
              type="password" 
              placeholder=""
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
          </div>
          <div className="mt-5">
            <div className=" mb-2 lg:flex items-center justify-between">
              <label className=" block font-semibold">Confirmar contraseña</label>
              
            </div>
            <input 
              className=" focus:outline-none border border-gray-300 w-full py-2 rounded-md px-3  " 
              type="password" 
              placeholder="" 
              value={confirmarPassword}
              onChange={e => setConfirmarPassword(e.target.value)}
              />
          </div>
          <Button cargando={cargando} texto = {'Aceptar'}/>
        </form>
          }

          <p className="mt-10 text-gray-500">¿No tienes una cuenta? <Link to='/registrar' className=" text-cyan-600 font-semibold">Registrate</Link></p>
          <p className="mt-10 text-gray-500">¿Ya tienes una cuenta? <Link to='/' className=" text-cyan-600 font-semibold">Iniciar Sesión</Link></p>
        </div>
    </>

  )
}

export default NuevoPassword