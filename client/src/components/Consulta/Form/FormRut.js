import React, { useContext, useState } from 'react'
import { getPermisosByRUT } from '../../../actions/permisos'
import { getRolesByRUT } from '../../../actions/roles'

import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormRut({ search }) {
    const [rut, setRut] = useState('')

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, preventNegative, setShowPopup, setSearching } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        isAuthenticated().then(data => {
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                search()
                if (page === 'permisos') {
                    getPermisosByRUT(rut, dispatch, setMessage, setShowPopup, setSearching)
                }
                else if (page === 'rolcobro') {
                    getRolesByRUT(rut, dispatch, setMessage, setShowPopup, setSearching)
                }
            }
        })
    }

    return (
        <form className='form-consulta' onSubmit={handleSubmit}>
            <span className='inputs grid-inputs'>
                <div className="input">
                    <label className='hint'>RUT</label>
                    <input type='number' name='rut' required autoComplete='off' placeholder='Ingresar RUT sin DV...' value={rut} onChange={(e) => preventNegative(e, setRut)} />
                </div>
                <button type='submit'>Buscar</button>
            </span>
            {/* <br /> */}
            {/* <button type='submit'>Buscar</button> */}
        </form>
    )
}