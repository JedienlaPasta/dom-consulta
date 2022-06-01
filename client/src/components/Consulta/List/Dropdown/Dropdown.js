import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { getLogs } from '../../../../actions/logs'
import { isAuthenticated } from '../../../../actions/users'
import { DataContext } from '../../../../context/DataContext'
import './Dropdown.css'

export default function Dropdown() {
    const [selectedOption, setSelectedOption] = useState('todos')
    const [selectedAction, setSelectedAction] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const { setMessage, setRolIndex, setCrudFilter, crudFilter, setUser, setIsAuth, setSearching, setShowPopup, dispatch } = useContext(DataContext)
    
    const options = [
        { value: 'todos', label: 'Todos'},
        { value: 'tipo', label: 'Por tipo'},
        { value: 'fecha', label: 'Por fecha'},
        { value: 'fecha_tipo', label: 'Por fecha y tipo'},
    ]
    const actionsOptions = [
        { value: 'crear', label: 'Crear'},
        { value: 'editar', label: 'Editar'},
        { value: 'eliminar', label: 'Eliminar'}
    ]

    useEffect(() => {
        if (selectedOption === 'todos') {
            setSelectedDate('')
            setSelectedAction('')
        }
        if (selectedOption === 'tipo') {
            setSelectedDate('')
        }
        if (selectedOption === 'fecha') {
            setSelectedAction('')
        }
    }, [selectedOption])

    const readLogs = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        isAuthenticated().then(data => {
            setCrudFilter({...crudFilter, type: 'read'})
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                setSearching(true)
                setShowPopup(true)
                getLogs(selectedOption, selectedAction, selectedDate, dispatch, setMessage, setShowPopup, setSearching)
            }
        })
    }
    
    return (
        <>
            <span className={`logs-grid-inputs ${selectedOption === 'tipo' && 'fullw_tipo' || selectedOption === 'fecha' && 'fullw_fecha' || selectedOption === 'fecha_tipo' && 'fullw_fecha_tipo'}`}>
                <Select className='dropdown-menu option-dropdown' options={options} defaultValue={options[0]} onChange={(e) => setSelectedOption(e.value)} />
                { (selectedOption === 'fecha' || selectedOption === 'fecha_tipo') && <input type="date" className='dropdown-input date-input' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /> }
                { (selectedOption === 'tipo' || selectedOption === 'fecha_tipo') && <Select className='dropdown-menu action-dropdown' options={actionsOptions} onChange={(e) => setSelectedAction(e.value)} /> }
                <button className='blue-btn logs-btn' onClick={readLogs}>Buscar</button>
            </span>
        </>
    )
}
