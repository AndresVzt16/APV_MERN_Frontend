// useContext permite extraer los datos del context
import { useContext } from "react";
//Es necesario identificar el context a extraer
import AuthContext from "../context/AuthProvider";


//crear un hook

const useAuth = () => {
    //Hacer disponible el provider o Context
    return useContext(AuthContext)

}

export default useAuth