import React, { useEffect, useState } from "react";
import { usePacientes } from "../hooks/usePacientes";
import { Navigate, useParams } from "react-router-dom";
import { UserIcon, PhoneIcon, CalendarDaysIcon, PencilIcon, TrashIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router-dom";
import CircularProgress from "./ProgressCirlcle";

const Cita = () => {
  const navigate = useNavigate()
  const params = useParams();
  const { id } = params;
  const { pacientes ,editarPaciente, pacienteEditar, guardarPaciente} = usePacientes();
  
  const [cita, setCita] = useState(null);  // Inicializamos cita como null para representar el estado de no cargado
  const [sintomasCita, setSintomasCita] = useState([]);
  const [fechaIngreso, setFechaIngreso] = useState('')
  

  useEffect(() => {
    const obtenerCita = () => {
      const citaAccedida = pacientes.find(paciente => paciente._id === id);
      if (citaAccedida) {
        setCita(citaAccedida);
        setSintomasCita(citaAccedida.sintomas);
        formatearFecha(citaAccedida.fechaIngreso)
      }
    };

    if (pacientes.length > 0) {
      obtenerCita();
    }
  }, [id, pacientes]);

  const handleCerrar = async(e) =>{
    e.preventDefault()
    const nuevaCita = cita
    nuevaCita.fechaAlta= `${new Date()}`
    setCita(nuevaCita)
    editarPaciente(cita)
    guardarPaciente(pacienteEditar)
    navigate('/admin/pacientes')
  }
  
  const formatearFecha = fecha => {
    const nuevaFecha = fecha.split('T')[0]
    const hora = fecha.split('T')[1]
    const nuevaHora = hora.split('.')[0]
    setFechaIngreso(`${nuevaFecha} ${nuevaHora}`)
  } 
  if (!cita) {
    return <p>Cargando...</p>; // Renderiza un mensaje de carga mientras se obtiene la cita
  }

  return (
    <>
      <div className="mt-9 border p-5 flex-grow h-full rounded-lg  bg-white shadow-md">
        <div className=" relative  flex  items-center justify-center h-14 rounded-md  ">
          <p className=" absolute bg-gray-800 h-24 -top-14 rounded-md flex items-center justify-center  w-full text-center text-4xl text-gray-200 uppercase font-bold">{cita.nombre}</p>
        </div>
        <div className="flex gap-2   items-center mb-5">
          <UserIcon className="size-4 text-gray-300"/>
          <p className="text-gray-500 text-sm "><span className="text-gray-600 font-medium ">Propietario: </span>{cita.propietario}</p>
        </div>
        <div className="flex gap-2  items-center mb-5">
          <PhoneIcon className="size-4 text-gray-300"/>
          <p className="text-gray-500 text-sm"><span className="text-gray-600  font-medium">Teléfono: </span>{cita.telefono}</p>
        </div>
        <div className="flex gap-2  items-center mb-5">
          <UserIcon className="size-4 text-gray-300"/>
          <p className="text-gray-500 text-sm"><span className="text-gray-600  font-medium">Email: </span>{cita.email}</p>
        </div>
        <div className="flex gap-2  items-center mb-5">
          <CalendarDaysIcon className="size-4 text-gray-300"/>
          <p className="text-gray-500  text-xs"><span className="text-gray-600  font-medium">Fecha de ingreso: </span>{fechaIngreso}</p>
        </div>
        <div className="flex gap-2  items-center mb-5">
          <CalendarDaysIcon className="size-4 text-gray-300"/>
          <p className="text-gray-500  text-xs"><span className="text-gray-600  font-medium">Fecha de Alta: </span>{cita.fechaAlta ? cita.fechaAlta : "No definida"}</p>
        </div>
   

        {!pacienteEditar.fechaAlta &&
          <button onClick={e => handleCerrar(e)} className="w-full bg-gray-800 font-medium text-white py-1 shadow-md rounded-md">
            Cerrar Cita
          </button>
        }
      
       
        
      </div>
  
      
    </>
  );
};

export default Cita;
