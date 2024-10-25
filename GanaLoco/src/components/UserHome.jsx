import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/UserHome.css';
import { useNavigate } from 'react-router-dom';


function UserHome() {
  const [code, setCode] = useState('');
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://gana-loco-back-end.vercel.app/v1/routes/Registrar', { code });
      setCodes([...codes, response.data]);
      setCode('');
      setError('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('https://gana-loco-back-end.vercel.app/v1/routes/Codigos');
        setCodes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCodes();
  }, []);

  return (
    <div>
  <h1>Registro de Códigos</h1>
  <form onSubmit={handleSubmit}>
    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}required/>
    <button type="submit"id="btnCreateUser">Registrar</button>
    <button type="button" id="btnCreateUser" onClick={() => navigate('/')}>
                        Regresar
                    </button>
    {error && <p>{error}</p>}
  </form>
  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Fecha</th>
        <th>Ganador</th>
      </tr>
    </thead>
    <tbody>
      {codes.map((code) => (
        <tr key={code._id}>
          <td>{code.code}</td>
          <td>{code.fecha}</td>
          <td>{code.Ganador ? 'Sí' : 'No'}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}

export default UserHome;
/*import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        /*return <Navigate to="/" />
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');

    function goHome() {
        home("/");
    }

    async function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            fetch(`http://localhost:4000/v1/signos/${signo}`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        }
    }

    return (
        <div className="container">
            
            <div className="Informacion del usuario">

                <div id="Bienvenida"><h3>Bienvenido!!..</h3></div>



            </div>
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            
            <select id="selectgenero" onClick={handleSelect}>
                <option value="0">Seleciona un genero</option>
                <option value="hombre">hombre</option>
                <option value="mujer">mujer</option>
                <option value="niño">niño</option>
            </select>
            
            <select id="selectSignos" onClick={handleSelect}>
                <option value="0">Seleciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>
            

            <TextSigno texto={textoSigno} />
            <button id="btnHomeuh" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;*/