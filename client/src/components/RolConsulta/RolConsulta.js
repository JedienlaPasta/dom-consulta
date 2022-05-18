import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import Filter from './Filter/Filter'
import FormRol from './Form/FormRol'
import FormAP from './Form/FormAP'
import FormDir from './Form/FormDir'
import List from './List/List'
import './style.css'
import Popup from './Popups/Popup'

export default function AppBody() {
    const { roles, user, isAuth, dispatch, showPopup, setShowPopup, crudFilter, setCrudFilter, setNewPermiso, permisoInitialValue } = useContext(DataContext)
    const history = useNavigate()
    const filters = [['ROL', <FormRol key={'rol'}/>], ['AP', <FormAP key={'ap'}/>], ['DIR', <FormDir key={'dir'}/>]]
    
    // Ingresar - Consultar - Descargar filter buttons
    const displayCrudFilters = crudFilter.filters.map(item => <Filter key={item} val={item} type='crud' />)
    // ROL - AP - DIR filter buttons
    const displayFilters = filters.map(item => <Filter key={item} val={item[0]} type='filter' />)
    // Aqui se define que formulario de renderiza, dependiendo de la opcion elegida: ['ROL', 'AP', 'DIR']
    const displayForm = filters.map(item => item[0] === crudFilter.filter ? item[1] : null)

    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setNewPermiso(permisoInitialValue)  // se reestablece el valor de newPermiso a su estado original (vacio)
        if (!isAuth) return history('/auth')
    }, [isAuth, crudFilter.crudType])

    // Estas funciones son para abrir un Popup, el cual verificará que el usuario desee continuar con la operación, o simplemente entregará información adicional

    const save = (event) => {
        event.preventDefault()
        setShowPopup(true)
    }

    const deletePermiso = (event) => {
        event.preventDefault()
        setCrudFilter({...crudFilter, type: 'delete'})
        setShowPopup(true)
    }

    const downloadFile = (event) => {
        event.preventDefault()
        setShowPopup(true)
    }

    return (
        <div className='super-body-container'>
            { showPopup && <Popup /> }
            {   user.role === 'dom_admin' &&
                <div className="crud-filters">
                    <ul className='crud-filter-links'>
                        {displayCrudFilters}
                    </ul>
                </div>
            }
            <div className='body-container'>
                {   crudFilter.crudType === 'Consultar' 
                    ? <>
                        <ul className='filter-links'>{displayFilters}</ul>
                        <h4 className='titulo-consulta'>Haga su consulta</h4>
                        {displayForm}
                        { roles.length > 0 && <List save={save} deletePermiso={deletePermiso} /> }
                    </>
                    : <List save={save} downloadFile={downloadFile} />
                }
            </div>
        </div>
    )
}