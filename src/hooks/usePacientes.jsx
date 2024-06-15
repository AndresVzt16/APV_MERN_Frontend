import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

export const usePacientes = () => {
    return useContext(PacientesContext)
}