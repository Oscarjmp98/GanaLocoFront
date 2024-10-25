import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function UserHome() {
  const [code, setCode] = useState('')
  const [codes, setCodes] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://gana-loco-back-end.vercel.app/v1/routes/Registrar', { code })
      setCodes([...codes, response.data])
      setCode('')
      setError('')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await axios.get('https://gana-loco-back-end.vercel.app/v1/routes/Codigos')
        setCodes(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchCodes()
  }, [])

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Registro de Códigos</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              placeholder="Ingrese el código"
              className="flex-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white">
              Registrar
            </Button>
          </div>
          <Button
            type="button"
            onClick={() => window.history.back()}
            className="w-full bg-gray-200 hover:bg-gray-300 text-black"
          >
            Regresar
          </Button>
          {error && <p className="text-red-500 font-bold">{error}</p>}
        </form>
        <div className="overflow-x-auto mt-8">
          <table className="w-full">
            <thead>
              <tr className="bg-purple-200">
                <th className="p-3 text-left font-bold text-purple-800">Código</th>
                <th className="p-3 text-left font-bold text-purple-800">Fecha</th>
                <th className="p-3 text-left font-bold text-purple-800">Ganador</th>
              </tr>
            </thead>
            <tbody>
              {codes.map((code, index) => (
                <tr key={code._id} className={index % 2 === 0 ? 'bg-white' : 'bg-purple-50'}>
                  <td className="p-3 border-t border-purple-100">{code.code}</td>
                  <td className="p-3 border-t border-purple-100">{code.fecha}</td>
                  <td className="p-3 border-t border-purple-100">{code.Ganador ? 'Sí' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



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