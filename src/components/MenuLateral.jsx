import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  UserIcon,
  ChevronDownIcon,
  UserCircleIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const MenuLateral = ({ user }) => {
  const{cerrarSesion} = useAuth()
  const [perfil, setPerfil] = useState(false);
  const [citas, setCitas] = useState(false);

  const togglePerfil = () => {
    setPerfil(!perfil);
  };
  const toggleCitas = () => {
    setCitas(!citas);
  };


  return (
    <div className="block h-full rounded-xl w-full bg-white shadow-md transition-all border-r p-5">
      <Link to="/admin" className="flex gap-2 pb-4 w-full items-center h-fit">
        <img src="/src/assets/img/logo-c.svg" className="size-10" alt="" />
        <p className="text-gray-500 font-semibold text-2xl">
          Pets<span className="text-cyan-700">Life</span>{" "}
          <span className="text-base">&copy;</span>
        </p>
      </Link>
      <div className="w-full flex items-center flex-wrap justify-between gap-1 py-4 border-b border-t">
        <div className="flex items-end gap-3">
          <UserIcon
            className={` shadow-md size-7 ${
              perfil ? "bg-cyan-700 text-white" : "bg-gray-100 "
            } transition-all p-1 rounded-md text-gray-600`}
          />
          <p className="capitalize text-gray-600  font-medium">{user.nombre}</p>
        </div>
        <button onClick={togglePerfil}>
          <ChevronDownIcon className={`size-5`} />
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            perfil ? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="flex items-end gap-3 mt-2">
            <div className="size-7"></div>
            <Link className="block mb-2 text-gray-400" to="/admin/perfil">
              
              Editar Perfil
            </Link>
          </div>
          <div className="flex items-end gap-3 mt-2">
            <div className="size-7"></div>
            <Link
              className="block  mb-2 text-gray-400"
              to="/admin/cambiar-password"
            >
              Modificar Contraseña
            </Link>
          </div>
          <div className="flex items-end gap-3 mt-2">
            <div className="size-7"></div>
            <Link className="block   text-gray-400" onClick={cerrarSesion}>
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center flex-wrap justify-between gap-1 py-4 border-b border-t">
        <div className="flex items-end gap-3">
          <DocumentChartBarIcon
            className={` shadow-md size-7 ${
              citas? "bg-cyan-700 text-white" : "bg-gray-100 "
            } transition-all p-1 rounded-md text-gray-600`}
          />
          <p className="capitalize text-gray-600  font-medium">Citas</p>
        </div>
        <button onClick={toggleCitas}>
          <ChevronDownIcon className={`size-5`} />
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            citas? "max-h-40" : "max-h-0"
          }`}
        >
          <div className="flex items-end gap-3 mt-2">
            <div className="size-7"></div>
            <Link className="block mb-2 text-gray-400" to="/admin/crear-pacientes">
              Crear nueva cita
            </Link>
          </div>
          <div className="flex items-end gap-3 mt-2">
            <div className="size-7"></div>
            <Link
              className="block  mb-2 text-gray-400"
              to="/admin/pacientes"
            >
              Ver todos los registros
            </Link>
          </div>
      
        </div>
      </div>
    </div>
  );
};

export default MenuLateral;
