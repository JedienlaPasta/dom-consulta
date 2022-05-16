import React, { useContext } from "react";
import { ACTIONS, DataContext } from "../../../context/DataContext";

export default function Filter({val, filter, setFilter}) {
    const { dispatch, setMessage } = useContext(DataContext)
    const name = filter === val ? 'filter-link marked' : 'filter-link'

    const handleClick = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setMessage('')
        setFilter(val)
    }
    
    return (
        <li className={name} onClick={handleClick}>{val}</li>
    )
}