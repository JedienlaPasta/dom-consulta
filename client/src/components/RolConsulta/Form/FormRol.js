import React, { useContext, useState } from 'react'
import { getPermisos } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormRol() {
    const [rol, setRol] = useState({ 
        matriz: '', 
        digito: '' 
    })
    const [quantity, setQuantity] = useState(1)

    const { dispatch, setUser, setIsAuth, message, setMessage, setRolIndex, preventNegative } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                getPermisos(rol, quantity, dispatch, setMessage)
            }
        })
    }
    
    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-even'>
                <div className="input">
                    <label className='hint'>MZ</label>
                    <input type='number' name='matriz' required placeholder='Ingresar MZ...' value={rol.matriz} onChange={(e) => preventNegative(e, setRol, true)} />
                </div>
                <div className="input">
                    <label className='hint'>PD</label>
                    <input type='number' name='digito' placeholder='Ingresar PD...' value={rol.digito} onChange={(e) => preventNegative(e, setRol, true)} />
                </div>
                <div className="input">
                    <label className='hint'>Cantidad</label>
                    <input type='number' name='quantity' className='text-center' value={quantity} onChange={(e) => preventNegative(e, setQuantity)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}