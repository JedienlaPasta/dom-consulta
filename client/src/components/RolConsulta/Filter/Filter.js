import React, { useContext } from "react";
import { ACTIONS, DataContext } from "../../../context/DataContext";

export default function Filter({val, crudFilter, setCrudFilter, type}) {
    const { dispatch } = useContext(DataContext)
    const base = type === 'crud' ? 'crud-filter-link' : 'filter-link'
    const name = crudFilter.crudType === val || crudFilter.filter === val ? `${base} marked` : `${base}`

    const handleClick = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        if (type === 'crud') {
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