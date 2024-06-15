import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePacientes } from "../hooks/usePacientes";
const Card = ({ datos, Componente, titulo, totales }) => {
    const[porcentaje,setPorcentaje] = useState(0)
    const{pacientes, obtenerPacientes} = usePacientes()
    useEffect(()=>{
        obtenerPacientes()
    },[])

    useEffect(()=>{
        obtenerPorcentaje()
    },[pacientes])
    const obtenerPorcentaje = () =>{
        const valorPorcentaje = (datos * 100) / totales
        if(valorPorcentaje){
            setPorcentaje(Math.round(valorPorcentaje))
        }
        
    }
  return (
    <div className="bg-white shadow-md w-full rounded-md px-3">
      <div className="flex justify-between py-5 border-b ">
        {Componente && <Componente className=" size-10 text-white bg-gray-800 relative -top-8 p-2 rounded-lg"/>}
        <div className="">
            <p className=" text-gray-400 text-sm ">{titulo}</p>
            <p className=" text-3xl text-gray-600  text-right font-bold">{datos}</p>
        </div>
      </div>
      {
        titulo =="Totales"?
        <div className=" text-base  flex justify-center py-2 items-center" >
            <Link to={'/admin/crear-pacientes'} className=" text-cyan-700 underline" >Crear nuevos pacientes</Link>
        </div>

        :
        <div>
            <p className=" py-3 text-base text-gray-400"> <span className=" font-bold text-green-600">{porcentaje}%</span> Citas {titulo} </p>
        </div>

      }
               
      
  
    </div>
  );
};

export default Card;
