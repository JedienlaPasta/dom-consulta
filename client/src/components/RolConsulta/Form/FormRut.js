import React, { useContext, useState } from 'react'
import { getRoles, getRolesByRUT } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormRut() {
    const [rut, setRut] = useState('')

    const { dispatch, setUser, setIsAuth } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                getRolesByRUT(rut, dispatch)
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-full'>
                <div className="input">
                    <label className='hint'>RUT</label>
                    <input type='number' name='rut' required placeholder='Ingresar RUT sin DV...' value={rut} onChange={(e) => setRut(e.target.value)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
        </form>
    )
}
