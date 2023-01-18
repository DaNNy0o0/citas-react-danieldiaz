import { useState, useEffect } from "react";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoPacientes from "./components/ListadoPacientes";

function App() {

  const INITIAL = JSON.parse(localStorage.getItem('pacientes')) ?? [];

  const [pacientes, setPacientes] = useState(INITIAL)
  const [paciente, setPaciente] = useState({})

  const eliminarPaciente = id => {
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)

    setPacientes(pacientesActualizados);
  }

  // Agregar a Local Storage

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])
  

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario 
          setPacientes={setPacientes}
          pacientes={pacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          eliminarPaciente={eliminarPaciente}
          setPaciente={setPaciente}
        />
      </div>

    </div>
  );
}

export default App;
