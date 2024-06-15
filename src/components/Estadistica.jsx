import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePacientes } from '../hooks/usePacientes';
import CircularProgress from './ProgressCirlcle';

const Estadistica = ({ tipo }) => {
  const { pacientes, obtenerPacientes } = usePacientes();
  const { id } = useParams();

  const [porcentaje, setPorcentaje] = useState(0);
  const [cita, setCita] = useState({});
  const [sintomasAbiertos, setSintomasAbiertos] = useState([]);
  const [sintomasCerrados, setSintomasCerrados] = useState([]);

  useEffect(() => {
    obtenerPacientes();
  }, []);

  useEffect(() => {
    if (pacientes.length > 0) {
      obtenerEstadisticas();
    }
  }, [pacientes, id]);

  useEffect(() => {
    if (cita._id) {
      obtenerSintomas();
      console.log(sintomasCerrados)
    }
  }, [cita]);

  const obtenerEstadisticas = () => {
    const pacienteCita = pacientes.find(paciente => paciente._id === id);
    if (pacienteCita) {
      setCita(pacienteCita);
    }
  };

  const obtenerSintomas = () => {
    if (cita.sintomas && cita.sintomas.length > 0) {
      const abiertos = cita.sintomas.filter(sintoma => !sintoma.completado);
      const cerrados = cita.sintomas.filter(sintoma => sintoma.completado);
      setSintomasAbiertos(abiertos);
      setSintomasCerrados(cerrados);

      const totalSintomas = cita.sintomas.length;
      const completado = (cerrados.length * 100) / totalSintomas;
      setPorcentaje(Math.round(completado));
    }
  };

  return (
    <div className={`w-full flex justify-between flex-wrap mb-20`}>
      
      <div className='w-full md:w-4/12   flex items-end justify-center'>
        <CircularProgress progress={porcentaje} />

      </div>
      <div className="w-full md:w-8/12 px-5">
        <p className=' w-full text-2xl font-semibold mb-5'>Sintomas</p>
        <div className="flex w-full md:flex-nowrap justify-center flex-wrap gap-10">
          <div className=' w-full md:w-6/12 text-center min-h-fit flex  border overflow-hidden rounded-xl '>
            
            {
              <ul className=' w-3/4'>{
                sintomasCerrados.map(sintoma => (

                  <li key={sintoma._id} className='text-left text-sm mx-5 my-3 text-gray-500  px-2  rounded flex items-center gap-3'> <div className='size-3 bg-green-500 rounded-sm'></div> {sintoma.sintoma}</li>
                ))
                }
                
              </ul>
            }
            
            <p className='w-2/4 py-5  bg-green-50  flex-wrap text-green-500 font-medium  flex items-center justify-center '>
              <span className='w-full text-6xl font-bold'>{sintomasCerrados.length}</span>
              Resueltos</p>
          </div>
          <div className='w-full md:w-6/12 text-center min-h-fit flex  border overflow-hidden rounded-xl '>
            
            {
              <ul className=' w-3/4'>{
                sintomasAbiertos.map(sintoma => (

                  <li className='text-left mx-5 text-sm my-3 text-gray-500  px-2  rounded  flex items-center gap-3'> <div className='size-3 bg-yellow-300 rounded-sm'></div> {sintoma.sintoma}</li>
                ))
                }
                
              </ul>
            }
            
            <p className='w-2/4 py-5  bg-yellow-50  flex-wrap text-yellow-500 font-medium  flex items-center justify-center '>
              <span className='w-full text-6xl font-bold'>{sintomasAbiertos.length}</span>
              Pendientes</p>
          </div>
      
        </div>

      </div>

    </div>
  );
};

export default Estadistica;
