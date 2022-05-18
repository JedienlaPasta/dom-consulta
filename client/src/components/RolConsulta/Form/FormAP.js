import React, { useContext, useState } from 'react'
import { getPermisosByApellidoP } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormAP() {
    const [apellido, setApellido] = useState('')
    const [quantity, setQuantity] = useState(5)

    const { dispatch, setUser, setIsAuth, message, setMessage, setRolIndex, crudFilter, setCrudFilter, preventNegative } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        isAuthenticated().then(data => {
            setCrudFilter({...crudFilter, type: 'read'})
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                getPermisosByApellidoP(apellido, quantity, dispatch, setMessage)
            }
        })
    }

    // podria hacer un array con los input, correspondiente a cada uno de los form que se va a mostrar, y que se muestre dependiendo de la pagina y el crudFilter.filter
    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs'>
                <div className="input">
                    <label className='hint'>Apellido Paterno</label>
                    <input type='text' name='apellido-paterno' required autoComplete='true' placeholder='Ingresar Apellido Paterno...' value={apellido} onChange={(e) => setApellido(e.target.value)} />
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