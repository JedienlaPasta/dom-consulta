import React, { useContext, useEffect, useState } from 'react'
import { getPermisosById } from '../../../actions/permisos'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormRut({ search }) {
    const [id, setId] = useState('')

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching, isMobile } = useContext(DataContext)

    useEffect(() => {
        setId('')
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
                if (page === 'permisos') {
                    if (crudFilter.filter === 'Id')
                        getPermisosById(id, dispatch, setMessage, setShowPopup, setSearching)
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
                        {
                            crudFilter.filter === 'Id' &&
                            <div className="input">
                                <label className='hint'>Id</label>
                                <input type='text' name='Id' required autoComplete='false' placeholder='Ingresar Id...' className='form-input' value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                        }
                        <button type='submit' className='search-btn blue-btn'>Buscar</button>
                    </span>
                </form>
                :
                <form className='form-consulta' onSubmit={handleSubmit}>
                    <span className='inputs grid-inputs'>
                        {
                            crudFilter.filter === 'Id' &&
                            <div className="input">
                                <input type='text' name='Id' required autoComplete='false' placeholder='Ingresar Id...' className='form-input' value={id} onChange={(e) => setId(e.target.value)} />
                            </div>
                        }
                        <button type='submit' className='search-btn blue-btn desktop-blue-btn'>Buscar</button>
                    </span>
                </form>
            }
        </>
    )
}