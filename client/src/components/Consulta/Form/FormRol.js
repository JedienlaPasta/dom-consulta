import React, { useContext, useState } from 'react'
import { getPermisos } from '../../../actions/permisos'
import { getRoles } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function Form({ search }) {
    const [rol, setRol] = useState({ 
        mz: '', 
        pd: '' 
    })

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching, preventNegative } = useContext(DataContext)

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
                search()
                if (page === 'permisos') {
                    getPermisos(rol, dispatch, setMessage, setShowPopup, setSearching)
                }
                else if (page === 'rolcobro') {
                    getRoles(rol, dispatch, setMessage, setShowPopup, setSearching)
                }
            }
        })
    }
    
    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs grid-inputs-even'>
                <div className="input">
                    <label className='hint'>Rol-Matriz</label>
                    <input type='number' name='mz' required placeholder='Ingresar MZ...' value={rol.mz} onChange={(e) => preventNegative(e, setRol, true)} />
                </div>
                <div className="input">
                    <label className='hint'>Rol-Dígito</label>
                    <input type='number' name='pd' placeholder='Ingresar PD...' value={rol.pd} onChange={(e) => preventNegative(e, setRol, true)} />
                </div>
            </span>
            <br />
            <button type='submit'>Buscar</button>
        </form>
    )
}