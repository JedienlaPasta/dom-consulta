import React, { useContext } from 'react'
import { ACTIONS, DataContext } from '../../../context/DataContext'

export default function Items({ val, type, crudType }) {
    const { dispatch, setMessage, crudFilter, setCrudFilter, setToggleMenu } = useContext(DataContext)
    const name = crudFilter.filter === val ? 'item-option marked' : 'item-option'
    
    const handleClick = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setMessage('')
        if (crudType === 'Ingresar') {
            setCrudFilter({...crudFilter, crudType: crudType, filter: val, type: 'insert'})
        }
        else {
            setCrudFilter({...crudFilter, crudType: crudType, filter: val, type: 'read'})
        }
        setToggleMenu(prev => !prev)
    }
    
    return (
        <div className={name} onClick={handleClick}>{val}</div>
    )
}