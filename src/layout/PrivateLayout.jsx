import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuLateral from "../components/MenuLateral";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const PrivateLayout = () => {
  const { auth, load , autenticarUsuario } = useAuth();
  const [pagina, setPagina] = useState('')
  useEffect(()=>{
    autenticarUsuario()
  },[])
  if (load) return "Cargando";

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        
        <div className="flex flex-grow px-5 pt-5 gap-5  ">
          <div className=" hidden lg:flex  flex-grow w-1/3">
            <MenuLateral user={auth} />
          </div>
          <div className="w-full">
          <Header user={auth}  />
            {auth?._id ? (
              <main className="w-full container mx-auto flex flex-wrap">
                <Outlet />
              </main>
            ) : (
              <Navigate to="/" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivateLayout;
