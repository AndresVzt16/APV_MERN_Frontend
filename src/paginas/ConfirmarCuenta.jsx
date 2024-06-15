import React, { useEffect, useState } from 'react'
import {Link, useParams } from 'react-router-dom';
import clienteAxios from '../config/axios';

import Alerta from '../components/Alerta';
let i = 0;
const ConfirmarCuenta = () => {
  const[cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const[cargando, setCargando] = useState(true)
  const[alerta, setAlerta] = useState({})
  //obtener atributos de la URL con useParams()
  const params = useParams();
  const {id} = params
  useEffect(()=> {
    const confirmarCuenta = async() => {
      i+=1;
      if(i == 1){

        try {
          const url = `/veterinarios/confirmar/${id}`
          const{data} = await clienteAxios(url)
          setCuentaConfirmada(true)
          setAlerta({
            msg:data.msg,
            error:false
          })
         
        } catch (error) {
          setAlerta({
            msg:error.response.data.msg,
            error:true
          })
        }
        setCargando(false)
        setTimeout(() => {
          setCargando(true)
        }, 3000);
      }
      }

    confirmarCuenta()
  }, [])
  return (
    <>
        <div className=" place-content-center flex flex-col items-center justify-center md:w-1/3 my-0 mx-auto">
          
          <img className=" w-20"  src="../src/assets/img/Pets.png" alt=" Imagen logo" />
          <h1 className=" text-2xl font-bold text-gray-700 mt-3">Bienvenido a Pets<span  className=" text-cyan-600">Life</span></h1>
          <h2 className=" text-2xl mt-2 text-cyan-800 font-semibold text-center ">Activa tu cuenta y empieza a utilizar nuestros servicios</h2>
          {
            !cargando &&
            <Alerta 
            alerta={alerta}
            />
          }
          <p className="mt-10 text-gray-500">¿Tu cuenta se ha activado? <Link to='/' className=" text-cyan-600 font-semibold">Iniciar Sesión</Link></p>

        </div>
    </>
  )
}

export default ConfirmarCuenta