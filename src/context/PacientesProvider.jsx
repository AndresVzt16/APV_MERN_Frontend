import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {
    const[pacientes, setPacientes] = useState([])
    const[pacienteEditar, setPacienteEditar] = useState({})


    

    const guardarPaciente = async(paciente) => {


      

        try {
            const token = localStorage.getItem('token');


            if(!token) return;
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            
        if(pacienteEditar._id){
            //Cuando ya es una ruta en http privada y con auth necesitamos pasar el config
            const {data} = await clienteAxios.put(`/pacientes/${pacienteEditar._id}`,paciente, config);
            console.log(data)
            //Quitar elementos del response de con el Spread operator
            const{updatedAt, createdAt,__v , ...pacienteCreado} = await data
            setPacientes([pacienteCreado,...pacientes])
        }else{
           //Cuando ya es una ruta en http privada y con auth necesitamos pasar el config
           const {data} = await clienteAxios.post('/pacientes',paciente, config)

           //Quitar elementos del response de con el Spread operator
           const{updatedAt, createdAt,__v , ...pacienteCreado} = await data
           setPacientes([pacienteCreado,...pacientes])
        }
            

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }
    const token = localStorage.getItem('token');    

     const obtenerPacientes = async() => {
           setPacientes([])
            if(!token) return;
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const{data} = await clienteAxios('/pacientes', config)
                setPacientes(data)
                
                
            } catch (error) {
               
            }
            

        }
    useEffect(() => {
       
        obtenerPacientes()
        
        
    },[])

    const editarPaciente = (paciente) =>{
        setPacienteEditar(paciente)
    }
    const eliminarPaciente = async pacienteId =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return;

            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const{data} = await clienteAxios.delete(`/pacientes/${pacienteId}`, config)
            

        } catch (error) {
            
        }
    }

    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                obtenerPacientes,
                editarPaciente,
                pacienteEditar,
                eliminarPaciente 
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}




export default PacientesContext