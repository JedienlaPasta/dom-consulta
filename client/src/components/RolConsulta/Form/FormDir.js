import React, { useContext, useState } from 'react'
import { getPermisosByDIR } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormRut({ crudFilter, setCrudFilter}) {
    const [dir, setDir] = useState('')
    const [quantity, setQuantity] = useState(5)

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
                getPermisosByDIR(dir, quantity, dispatch, setMessage)
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs'>
                <div className="input">
                    <label className='hint'>Dirección</label>
                    <input type='text' name='dir' required placeholder='Ingresar Dirección...' value={dir} onChange={(e) => setDir(e.target.value)} />
                </div>
                <div className="input">
                    <label className='hint'>Resultados</label>
                    <input type='number' name='quantity' className='text-center' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}
