import React, { useContext, useState } from 'react'
import { getPermisosByApellidoP } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormRut() {
    const [apellido, setApellido] = useState('')

    const { dispatch, setUser, setIsAuth, message, setMessage } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                getPermisosByApellidoP(apellido, dispatch, setMessage)
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-full'>
                <div className="input">
                    <label className='hint'>Apellido Paterno</label>
                    <input type='text' name='rut' required placeholder='Ingresar Apellido Paterno...' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}
