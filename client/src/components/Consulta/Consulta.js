import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import FormRol from './Form/FormRol'
import FormRut from './Form/FormRut'
import FormDir from './Form/FormDir'
import FormAP from './Form/FormAP'
import Filter from './Filter/FIlter'
import Popup from './Popup/Popup'
import List from './List/List'
import './style.css'

export default function Consulta() {
    const {roles, user, page, isAuth, dispatch, showPopup, setShowPopup, crudFilter, setCrudFilter, setNewPermiso, permisoInitialValue, setSearching } = useContext(DataContext)
    const history = useNavigate()
    
    useEffect(() => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        setNewPermiso(permisoInitialValue)  // se reestablece el valor de newPermiso a su estado original (vacio)
        if (!isAuth) return history('/auth')
    }, [isAuth, crudFilter.crudType])

    // Estas funciones son para abrir un Popup, el cual verificará que el usuario desee continuar con la operación, o simplemente entregará información adicional

    const search = () => {
        setSearching(true)
        setShowPopup(true)
    }

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

    // Estos son los elementos que se renderizaran

    const filters = [['ROL', <FormRol key={'rol'} search={search}/>], page === 'rolcobro' ? ['RUT', <FormRut key={'rut'} search={search}/>] : ['AP', <FormAP key={'ap'} search={search}/>], ['DIR', <FormDir key={'dir'} search={search}/>]]

    const displayCrudFilters = crudFilter.filters.map(item => <Filter key={item} val={item} type='crud' />)
    const displayFilters = filters.map(item => <Filter key={item} val={item[0]} />) // si la pagina de consulta es rol de cobro, no mandar type y si es de permisos, mandar type='crud'
    const displayForm = filters.map(item => item[0] === crudFilter.filter ? item[1] : null)

    return (
        <div className='super-body-container'>
            { showPopup && <Popup /> }
            {   page === 'permisos' && user.role === 'dom_admin' &&
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
                        { roles.length > 0 && ( page === 'permisos' ? <List save={save} deletePermiso={deletePermiso}/> : <List/>) }
                    </>
                    : <List save={save} downloadFile={downloadFile} />
                }
            </div>
        </div>
    )
}