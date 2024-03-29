import React, { useContext, useEffect, useState } from 'react'
import { getPermisosRolV, getPermisosRolA } from '../../../actions/permisos'
import { getRoles } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function Form({ search }) {
    const [rol, setRol] = useState({ 
        mz: '', 
        pd: '' 
    })

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching, preventNegative, isMobile } = useContext(DataContext)
    const inputType = crudFilter.filter === 'Rol Vigente' ? 'text' : 'number'
    const spanName = ``

    useEffect(() => {
        setRol({ mz: '', pd: '' })
    }, [crudFilter.filter])

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
                // me parece que voy a tener que separar la busqueda entre rol vigente y rol asignado
                if (page === 'permisos') {
                    if (crudFilter.filter === 'Rol Vigente') {
                        getPermisosRolV(rol, dispatch, setMessage, setShowPopup, setSearching)
                    }
                    else if (crudFilter.filter === 'Rol Asignado') {
                        getPermisosRolA(rol, dispatch, setMessage, setShowPopup, setSearching)
                    }
                }
                else if (page === 'rolcobro') {
                    getRoles(rol, dispatch, setMessage, setShowPopup, setSearching)
                }
            }
        })
    }
    
    return (
        <>
            {
                isMobile ?
                <form className='form-consulta' onSubmit={handleSubmit}>
                    <span className='inputs grid-inputs grid-inputs-even'>
                        <div className="input">
                            <label className='hint'>Rol-Matriz</label>
                            <input type='number' name='mz' required placeholder='Ingresar MZ...' className='form-input input-left' value={rol.mz} onChange={(e) => preventNegative(e, setRol, true)} />
                        </div>
                        <div className="input">
                            <label className='hint'>Rol-Dígito</label>
                            <input type={inputType} name='pd' placeholder='Ingresar PD...' className='form-input input-right' value={rol.pd} onChange={(e) => preventNegative(e, setRol, true)} />
                        </div>
                        <button type='submit' className='search-btn blue-btn btn-left-right'>Buscar</button>
                    </span>
                </form>
                :
                <form className='form-consulta' onSubmit={handleSubmit}>
                    <span className='inputs grid-inputs grid-inputs-even'>
                        {/* <p className='form-label'>{crudFilter.filter}:</p> */}
                        <div className="input left-form-input">
                            <input type='number' name='mz' required placeholder='Ingresar MZ...' className='form-input input-left' value={rol.mz} onChange={(e) => preventNegative(e, setRol, true)} />
                        </div>
                        <div className="input right-form-input">
                            <input type={inputType} name='pd' placeholder='Ingresar PD...' className='form-input input-right' value={rol.pd} onChange={(e) => preventNegative(e, setRol, true)} />
                        </div>
                        <button type='submit' className='search-btn blue-btn btn-left-right desktop-blue-btn'>Buscar</button>
                    </span>
                </form>
            }
        </>
    )
}