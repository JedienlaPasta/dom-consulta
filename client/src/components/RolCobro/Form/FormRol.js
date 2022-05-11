import React, { useContext, useState } from 'react'
import { getRoles } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormRol() {
    const [rol, setRol] = useState({ 
        rol1: '', 
        rol2: '' 
    })

    const { dispatch, setUser, setIsAuth } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                getRoles(rol, dispatch)
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-even'>
                <div className="input">
                    <label className='hint'>MZ</label>
                    <input type='number' name='rol_1' required placeholder='Ingresar MZ...' value={rol.rol1} onChange={(e) => setRol(item => ({...item, rol1: e.target.value}))} />
                </div>
                <div className="input">
                    <label className='hint'>PD</label>
                    <input type='number' name='rol_2' required placeholder='Ingresar PD...' value={rol.rol2} onChange={(e) => setRol(item => ({...item, rol2: e.target.value}))} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
        </form>
    )
}