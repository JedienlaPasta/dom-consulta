import React, { useContext, useState } from 'react'
import { getPermisosByApellidoP } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormAP({ search }) {
    const [apellido, setApellido] = useState('')

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching, isMobile } = useContext(DataContext)

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
                    getPermisosByApellidoP(apellido, dispatch, setMessage, setShowPopup, setSearching)
                }
            }
        })
    }

    return (
        <>
            {
                isMobile ?
                <form className='form-consulta' onSubmit={handleSubmit}>
                    <span className='inputs grid-inputs'>
                        <div className="input">
                            <label className='hint'>Apellido Paterno</label>
                            <input type='text' name='apellido-paterno' required autoComplete='true' placeholder='Ingresar Apellido Paterno...' className='form-input' value={apellido} onChange={(e) => setApellido((e.target.value).toUpperCase())} />
                        </div>
                        <button type='submit' className='search-btn blue-btn'>Buscar</button>
                    </span>
                </form>
                :
                <form className='form-consulta' onSubmit={handleSubmit}>
                    <span className='inputs grid-inputs'>
                        <div className="input">
                            <input type='text' name='apellido-paterno' required autoComplete='true' placeholder='Ingresar Apellido Paterno...' className='form-input' value={apellido} onChange={(e) => setApellido((e.target.value).toUpperCase())} />
                        </div>
                        <button type='submit' className='search-btn blue-btn desktop-blue-btn'>Buscar</button>
                    </span>
                </form>
            }
        </>
    )
}