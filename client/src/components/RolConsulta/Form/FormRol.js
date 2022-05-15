import React, { useContext, useState } from 'react'
import { getPermisos } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormRol({ crudFilter, setCrudFilter}) {
    const [rol, setRol] = useState({ 
        matriz: '', 
        digito: '' 
    })

    const { dispatch, setUser, setIsAuth, message, setMessage, setRolIndex } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                setCrudFilter({...crudFilter, type: 'read'})
                getPermisos(rol, dispatch, setMessage)
            }
        })
    }
    
    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-even'>
                <div className="input">
                    <label className='hint'>MZ</label>
                    <input type='number' name='rol_1' required placeholder='Ingresar MZ...' value={rol.matriz} onChange={(e) => setRol(item => ({...item, matriz: e.target.value}))} />
                </div>
                <div className="input">
                    <label className='hint'>PD</label>
                    <input type='number' name='rol_2' required placeholder='Ingresar PD...' value={rol.digito} onChange={(e) => setRol(item => ({...item, digito: e.target.value}))} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}