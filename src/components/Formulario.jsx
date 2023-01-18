import { useState, useEffect } from "react";

import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  // Seteamos los campos del formulario mediante el UseState
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintomas] = useState("");

  // Creamos la alerta
  const [error, setError] = useState(false);

  // useEffect
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fechaRandom = Date.now();

    return random + fechaRandom;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar el formulario
    if ([nombre, propietario, email, fecha, sintomas].includes("")) {
      console.log("Todos los campos son obligatorios");

      setError(true);

      setTimeout(() => {
        setError(false);
      }, 5000);

      return;
    }

    setError(false);

    //Construir objetoPaciente

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    };

    // Verificar si estamos editando o creanndo un nuevo registro

    if (paciente.id) {
      // Editando
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // Nuevo
      //Setear el objeto con los datos a la variable de pacientes en el App.jsx
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);
    }

    // Reiniciar el formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mb-10 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento de Pacientes
      </h2>

      <p className="mb-10 text-xl mt-5 text-center">
        Añade Pacientes y{" "}
        <span className="text-indigo-600 font-bold ">Adminístralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-10 px-5"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Mascota
          </label>
          <input
            id="mascota"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre de la mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Propietario
          </label>
          <input
            id="propietario"
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="fecha"
          >
            Fecha de Alta
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Fecha de alta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Síntomas
          </label>
          <textarea
            id="sintomas"
            rows={5}
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Síntomas de la mascota"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-all"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
