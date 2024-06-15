import React, { useEffect, useState } from 'react';
import Formulario from '../components/Formulario';
import ListaPacientes from '../components/ListaPacientes';
import MenuLateral from '../components/MenuLateral';
import GridDemo from '../components/GridDemo';
import Card from '../components/Card';
import CircularProgress from '../components/ProgressCirlcle';


import { usePacientes } from '../hooks/usePacientes';
import { DocumentIcon, DocumentCheckIcon, UserIcon, ClipboardDocumentIcon  } from '@heroicons/react/24/solid';


const AdministrarPacientes = () => {
  const { obtenerPacientes, pacientes } = usePacientes();
  const[pendientes, setPendientes] = useState(0)
  const[totales, setTotales] = useState(0)
  const[cerradas, setCerradas] = useState(0)
  const[porcentaje, setPorcentaje] = useState(0)
  

  useEffect(()=>{
    contarCitas()
  },[pacientes])

  const contarCitas= () => {
    const citasPendientes = pacientes.filter( paciente => paciente.fechaAlta == null)
    const citasCerradas = pacientes.filter( paciente => paciente.fechaAlta !== null)
    setTotales(pacientes.length)
    setPendientes(citasPendientes.length)
    setCerradas(citasCerradas.length)
    
    if(totales !==0){
      setPorcentaje(Math.round((cerradas*100) / totales))
    }
    
   
  }
  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <div className='lg:flex w-full h-fit flex-wrap justify-between  pb-5'>
      <div className='my-5 lg:flex gap-5 justify-center w-full'>
       <Card   Componente={DocumentCheckIcon} titulo={'Cerradas'} datos={cerradas} totales = {totales}  />
        <Card   Componente={DocumentIcon} titulo={'Pendientes'} datos={pendientes} totales = {totales} />
        
        <Card   Componente={UserIcon} titulo={'Pacientes'} datos={totales} totales = {totales}  />
        <Card   Componente={ClipboardDocumentIcon} titulo={'Totales'} datos={totales} totales = {totales}  />

      </div> 
      <div className='lg:flex w-full gap-5'>
        <div className='w-full min-w-fit md:w-7/12'>
          <ListaPacientes limit={8} />
        </div>
        <div className='lg:w-full min-w-fit  p-5  md:w-5/12  bg-white rounded-md shadow-md'>
          <p className=' w-full mb-3 text-cyan-700 font-medium'>Indice estadistico de trabajo</p>
          <div className='flex justify-center items-center mt-10 '>
            <CircularProgress progress={porcentaje}/>
          </div>
          
        </div>
      
      </div>
    </div>
  );
};

export default AdministrarPacientes;
