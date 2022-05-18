import React, { useContext, useState } from 'react'
import { getPermisosByApellidoP } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormAP({ search }) {
    const [apellido, setApellido] = useState('')

    const { page, dispatch, setUser, setIsAuth, message, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        search()
        isAuthenticated().then(data => {
            setCrudFilter({...crudFilter, type: 'read'})
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                if (page === 'permisos') {
                    getPermisosByApellidoP(apellido, dispatch, setMessage, setShowPopup, setSearching)
                }
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs'>
                <div className="input">
                    <label className='hint'>Apellido Paterno</label>
                    <input type='text' name='apellido-paterno' required autoComplete='true' placeholder='Ingresar Apellido Paterno...' value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}