import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

function createAdmin() {
    const [username, setUsername] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateAdmin = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post('https://gana-loco-back-end.vercel.app/v1/routes/createAdmin', {
                username,
                password,
                nombre,
            });

            if (response.data.success) {
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(response.data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCreateAdmin}>
                <div className='Bloque de registro'>
                    <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                    <input
                        type="text"
                        id="inputNombre"
                        placeholder="Nombre completo"
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <div className="email">
                        <input
                            type="text"
                            id="inputUsername"
                            placeholder="Nombre de usuario"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="inputPassword"
                            placeholder="Contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                       <button type="button" className="password-toggle-button" onClick={() => setShowPassword(!showPassword)}>
                            <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                        </button>
                    </div>
                    <button type="submit" id="btnCreateUser" >Crear Usuario</button>
                    <button type="button" id="btnCreateUser" onClick={() => navigate('/')}>
                        Regresar
                    </button>
                    {successMessage && <p className="success">{successMessage}</p>}
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}

export default createAdmin;