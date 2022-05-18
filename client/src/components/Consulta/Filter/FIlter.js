import React, { useContext } from 'react'
import { ACTIONS, DataContext } from '../../../context/DataContext'

export default function FIlter({ val, type }) {
    const { page, dispatch, setMessage, crudFilter, setCrudFilter } = useContext(DataContext)
    const base = type === 'crud' ? 'crud-filter-link' : 'filter-link'
    const name = crudFilter.crudType === val || crudFilter.filter === val ? `${base} marked` : `${base}`

    const handleClick = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setMessage('')
        if (type === 'crud' && page === 'permisos') {
            if (val === 'Ingresar') {
                setCrudFilter({...crudFilter, crudType: val, type: 'insert'})
            }
            else {
                setCrudFilter({...crudFilter, crudType: val, type: 'read'})
            }
        }
        else {
            setCrudFilter({...crudFilter, filter: val, type: 'read'})
        }
    }
    
    return (
        <li className={name} onClick={handleClick}>{val}</li>
    )
}