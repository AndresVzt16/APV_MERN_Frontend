import React, { useEffect, useState } from 'react';
import Formulario from '../components/Formulario';
import ListaPacientes from '../components/ListaPacientes';
import { usePacientes } from '../hooks/usePacientes';
import { DocumentIcon, DocumentCheckIcon, UserIcon, ClipboardDocumentIcon  } from '@heroicons/react/24/solid';
import Card from '../components/Card';

const VerPacientes = () => {
  const { obtenerPacientes, pacientes } = usePacientes();
  const[pendientes, setPendientes] = useState(0)
  const[totales, setTotales] = useState(0)
  const[cerradas, setCerradas] = useState(0)

  

  useEffect(()=>{
    contarCitas()
  },[pacientes])

  const contarCitas= () => {
    const citasPendientes = pacientes.filter( paciente => paciente.fechaAlta == null)
    const citasCerradas = pacientes.filter( paciente => paciente.fechaAlta !== null)
    setTotales(pacientes.length)
    setPendientes(citasPendientes.length)
    setCerradas(citasCerradas.length)
    
 
   
  }
  useEffect(() => {
    obtenerPacientes();
  }, []);

  return (
    <div className='flex w-full h-fit flex-wrap justify-between px-5 md:p-0'>
      <div className='my-5 flex gap-5 justify-center w-full'>
        <Card Componente={DocumentCheckIcon} titulo={'Cerradas'} datos={cerradas} totales = {totales}  />
        <Card Componente={DocumentIcon} titulo={'Pendientes'} datos={pendientes} totales = {totales} />
        <Card Componente={UserIcon} titulo={'Pacientes'} datos={totales} totales = {totales}  />
        <Card Componente={ClipboardDocumentIcon} titulo={'Totales'} datos={totales} totales = {totales}  />

      </div>
      <div className='flex w-full gap-5'>
        <div className='w-full min-w-fit'>
          <ListaPacientes  />
        </div>
      
      </div>
 
    </div>
  );
};

export default VerPacientes;