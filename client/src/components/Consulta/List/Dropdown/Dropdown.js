import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { getLogs } from '../../../../actions/logs'
import { isAuthenticated } from '../../../../actions/users'
import { ACTIONS, DataContext } from '../../../../context/DataContext'
import './Dropdown.css'

export default function Dropdown() {
    const [selectedOption, setSelectedOption] = useState('todos')
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedRol, setSelectedRol] = useState({ mz: '', pd: '' })
    const [selectedId, setSelectedId] = useState('')
    // const [selected, setSelected] = useState({
    //     option: 'todos',
    //     date: '',
    //     rol: '',
    //     id: ''
    // })
    const { setMessage, setRolIndex, setCrudFilter, crudFilter, setUser, setIsAuth, setSearching, setShowPopup, dispatch } = useContext(DataContext)
    
    const options = [
        { value: 'todos', label: 'Todos'},
        { value: 'id', label: 'Por id'},
        { value: 'rol', label: 'Por rol'},
        { value: 'fecha', label: 'Por fecha'}
    ]

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        if (selectedOption === 'todos') {
            setSelectedDate('')
            setSelectedRol({ mz: '', pd: '' })
            setSelectedId('')
        }
        else if (selectedOption === 'id') {
            setSelectedDate('')
            setSelectedRol({ mz: '', pd: '' })
        }
        else if (selectedOption === 'rol') {
            setSelectedDate('')
            setSelectedId('')
        }
        else if (selectedOption === 'fecha') {
            setSelectedRol({ mz: '', pd: '' })
            setSelectedId('')
        }
    }, [selectedOption])

    const readLogs = (event) => {
        event.preventDefault()
        setMessage('')
        setRolIndex(0)
        // if selected state is empty, display error and don't send request to server
        isAuthenticated().then(data => {
            setCrudFilter({...crudFilter, type: 'read'})
            const { isAuthenticated, user } = data
            setUser(user)
            setIsAuth(isAuthenticated)
            if (isAuthenticated) {
                setSearching(true)
                setShowPopup(true)
                getLogs(selectedOption, selectedDate, selectedRol, selectedId, dispatch, setMessage, setShowPopup, setSearching)
            }
        })
    }
    
    return (
        <>
            <span className={`logs-grid-inputs ${(selectedOption === 'fecha' && 'fullw_fecha') || (selectedOption === 'id' && 'fullw_id') || (selectedOption === 'rol' && 'fullw_rol')}`}>
                <Select className='dropdown-menu option-dropdown' options={options} defaultValue={options[0]} onChange={(e) => setSelectedOption(e.value)} />
                { selectedOption === 'fecha' && <input type="date" className='dropdown-input date-input' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} /> }
                { selectedOption === 'id' && <input type='text' className='dropdown-input dropdown-input-id' placeholder='Id...' value={selectedId} onChange={(e) => setSelectedId(e.target.value)} /> }
                { selectedOption === 'rol' && 
                    <>
                        <input type='text' className='dropdown-input dropdown-input-left' placeholder='MZ...' value={selectedRol.mz} onChange={(e) => setSelectedRol({...selectedRol, mz: e.target.value})} />
                        <input type='text' className='dropdown-input dropdown-input-right' placeholder='PD...' value={selectedRol.pd} onChange={(e) => setSelectedRol({...selectedRol, pd: e.target.value})} />
                    </> 
                }
                {/* { (selectedOption === 'tipo' || selectedOption === 'tipo_fecha') && <Select className='dropdown-menu action-dropdown' options={actionsOptions} onChange={(e) => setSelectedAction(e.value)} /> } */}
                <button className='blue-btn logs-btn' onClick={readLogs}>Buscar</button>
            </span>
        </>
    )
}
