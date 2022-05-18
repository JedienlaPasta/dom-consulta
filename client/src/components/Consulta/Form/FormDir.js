import React, { useContext, useState } from 'react'
import { getPermisosByDIR } from '../../../actions/permisos'
import { getRolesByDIR } from '../../../actions/roles'
import { isAuthenticated } from '../../../actions/users'
import { DataContext } from '../../../context/DataContext'
import Message from './Message/Message'

export default function FormRut({ search }) {
    const [dir, setDir] = useState('')

    const { page, dispatch, setUser, setIsAuth, message, setMessage, setRolIndex, crudFilter, setCrudFilter, setShowPopup, setSearching } = useContext(DataContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        search()
        isAuthenticated().then(data => {
            setCrudFilter({...crudFilter, type: 'read'})
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                if (page === 'permisos') {
                    getPermisosByDIR(dir, dispatch, setMessage, setShowPopup, setSearching)
                }
                else if (page === 'rolcobro') {
                    getRolesByDIR(dir, dispatch, setMessage, setShowPopup, setSearching)
                }
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
            </span>
            <br />
            <button type='submit'>Buscar</button>
            { message && <Message message={message} /> }
        </form>
    )
}
