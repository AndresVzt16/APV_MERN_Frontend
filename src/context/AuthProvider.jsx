import { useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import { Navigate } from "react-router-dom";
import { usePacientes } from "../hooks/usePacientes";
// Los context son similares a un state pero de forma global


const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [ auth, setAuth] = useState({})
    const [load, setLoad] = useState(true)


    useEffect(() => {
        
        autenticarUsuario()
    },[])

    const autenticarUsuario = async() => {
        const token = localStorage.getItem('token');
        if(!token){
            setLoad(false)
            return;
        } 
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const{data} = await clienteAxios('/veterinarios/perfil', config)
            setAuth(data)
            
            

        } catch (error) {
            setAuth({})
        }
        setLoad(false)
    }

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        
        setAuth({});
    }

    const actualizarPerfil = async(perfil) => {
        console.log(perfil)
        const token = localStorage.getItem('token')
        if(!token) {
            setLoad(false)
            return;
        }

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        const {data} =  await clienteAxios.put(`veterinarios/perfil/${auth._id}`,perfil, config)
        console.log(data)
        autenticarUsuario()
    }

    const guardarPassword = async(datos) => {
        const token = localStorage.getItem('token')
        if(!token){
            setLoad(false)
            return;
        }
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }

        try {
            const{data} = await clienteAxios.put("veterinarios/actualizar-password",datos, config)
            return{
                 msg:data.msg
            }
            
        } catch (error) {
            return({
                msg:error.response.data.msg,
                error:true

            })
        }
    }


    return (
        <AuthContext.Provider
        //A traves de value se pone a disposicion los valores que se pueden acceder
         value = {{
            auth,
            setAuth,
            load,
            cerrarSesion,
            actualizarPerfil,
            autenticarUsuario,
            guardarPassword
         }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext