import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import Filter from './Filter/Filter'
import FormRol from './Form/FormRol'
import FormRut from './Form/FormRut'
import FormDir from './Form/FormDir'
import List from './List/List'
import './style.css'
import Popup from './Popups/Popup'

export default function AppBody() {
    const { roles, user, isAuth, dispatch, setPage, showPopup, setShowPopup, crudFilter, setCrudFilter, setNewPermiso, permisoInitialValue } = useContext(DataContext)
    const history = useNavigate()
    const filters = [
        ['ROL', <FormRol key={'rol'} crudFilter={crudFilter} setCrudFilter={setCrudFilter}/>], 
        ['RUT', <FormRut key={'rut'} crudFilter={crudFilter} setCrudFilter={setCrudFilter}/>], 
        ['DIR', <FormDir key={'dir'} crudFilter={crudFilter} setCrudFilter={setCrudFilter}/>]
    ]
    
    // Ingresar - Consultar filter buttons
    const displayCrudFilters = crudFilter.filters.map(item => <Filter key={item} val={item} crudFilter={crudFilter} type='crud' setCrudFilter={setCrudFilter} />)
    // ROL - RUT - DIR filter buttons
    const displayFilters = filters.map(item => <Filter key={item} val={item[0]} crudFilter={crudFilter} type='filter' setCrudFilter={setCrudFilter} />)

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setNewPermiso(permisoInitialValue)  // se reestablece el valor de newPermiso a su estado original (vacio)
        if (!isAuth) return history('/auth')
    }, [isAuth, crudFilter.crudType])

    useEffect (() => {
        setPage('rolconsulta')
    })

    // Funciones de botones de accion ( guardar // cancelar )

    // quizas colocar editPermiso aqui tambien

    const save = (event) => {
        event.preventDefault()
        setShowPopup(true)
    }

    const deletePermiso = (event) => {
        event.preventDefault()
        setCrudFilter({...crudFilter, type: 'delete'})
        setShowPopup(true)
    }

    return (
        <div className='app-container'>
            { showPopup && <Popup showPopup={showPopup} setShowPopup={setShowPopup} crudFilter={crudFilter} setCrudFilter={setCrudFilter} /> }
            {   user.role === 'admin' &&
                <div className="crud-filters">
                    <ul className='crud-filter-links'>
                        {displayCrudFilters}
                    </ul>
                </div>
            }
            <div className='body-container'>
                {   crudFilter.crudType === 'Consultar' ?
                    (<>
                        <ul className='filter-links'>
                            {displayFilters}
                        </ul>
                        <h4 className='titulo-consulta'>Haga su consulta</h4>
                        {   // aqui se define que formulario de renderiza, dependiendo de la opcion elegida: ['ROL', 'RUT', 'DIR']
                            filters.map(item => item[0] === crudFilter.filter ? item[1] : null)
                        }
                        { roles.length > 0 && <List crudFilter={crudFilter} setCrudFilter={setCrudFilter} setShowPopup={setShowPopup} save={save} deletePermiso={deletePermiso} /> }
                    </>)
                    :
                    (<>
                        <List crudFilter={crudFilter} setCrudFilter={setCrudFilter} setShowPopup={setShowPopup} save={save} />
                    </>)
                }
            </div>
        </div>
    )
}