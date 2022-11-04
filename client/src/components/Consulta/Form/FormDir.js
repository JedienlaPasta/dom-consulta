import React, { useContext, useEffect, useState } from 'react'
import { getPermisosByDIR, getM2Total, getPermisosBySector } from '../../../actions/permisos'
import { getRolesByDIR } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'

export default function FormRut({ search }) {
    const [dir, setDir] = useState('')

    const { page, dispatch, setUser, setIsAuth, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching, isMobile } = useContext(DataContext)

    useEffect(() => {
        setDir('')
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
                    if (crudFilter.filter === 'Dirección')
                        getPermisosByDIR(dir, dispatch, setMessage, setShowPopup, setSearching)
                    else if (crudFilter.filter === 'Sector')
                        getPermisosBySector(dir, dispatch, setMessage, setShowPopup, setSearching)
                    else if (crudFilter.filter === 'N° Viv & m2 Total')
                        getM2Total(dispatch, setMessage, setShowPopup, setSearching)
                }
                else if (page === 'rolcobro') {
                    getRolesByDIR(dir, dispatch, setMessage, setShowPopup, setSearching)
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
                        {   crudFilter.filter === 'Dirección' &&
                            <div className="input">
                                <label className='hint'>Dirección</label>
                                <input type='text' name='dir' required placeholder='Ingresar Dirección...' className='form-input' value={dir} onChange={(e) => setDir(e.target.value)} />
                            </div>
                        }
                        {
                            crudFilter.filter === 'Sector' &&
                            <div className="input">
                                <label className='hint'>Sector</label>
                                <input type='text' name='sector' required placeholder='Ingresar Sector...' className='form-input' value={dir} onChange={(e) => setDir(e.target.value)} />
                            </div>
                        }
                        <button type='submit' className='search-btn blue-btn'>Buscar</button>
                    </span>
                </form>
                :
                <form className='form-consulta' onSubmit={handleSubmit}>
                    {   crudFilter.filter !== 'N° Viv & m2 Total' ?
                        <span className='inputs grid-inputs'>
                            {   crudFilter.filter === 'Dirección' &&
                                <div className="input">
                                    <input type='text' name='dir' required placeholder='Ingresar Dirección...' className='form-input' value={dir} onChange={(e) => setDir(e.target.value)} />
                                </div>
                            }
                            {
                                crudFilter.filter === 'Sector' &&
                                <div className="input">
                                    <input type='text' name='sector' required placeholder='Ingresar Sector...' className='form-input' value={dir} onChange={(e) => setDir(e.target.value)} />
                                </div>
                            }
                            {
                                crudFilter.filter === 'N° Viv & m2 Total' &&
                                <p className='get-m2-text text-center'>Consultar el número de viviendas y m2 totales</p>
                            }
                            <button type='submit' className='search-btn blue-btn desktop-blue-btn'>Buscar</button>
                        </span>
                        :
                        <span className='inputs grid-inputs vertical-grid-inputs' >
                            <p className='get-m2-text text-center'>Consultar el número de viviendas y m2 totales</p>
                            <button type='submit' className='search-btn blue-btn'>Buscar</button>
                        </span>
                    }
                </form>
            }
        </>
    )
}