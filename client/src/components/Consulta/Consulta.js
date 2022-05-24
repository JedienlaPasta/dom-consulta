import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import FormRol from './Form/FormRol'
import FormRut from './Form/FormRut'
import FormDir from './Form/FormDir'
import FormAP from './Form/FormAP'
import Popup from './Popup/Popup'
import List from './List/List'
import './Consulta.css'
// import './style.css'

export default function Consulta() {
    const {roles, user, page, isAuth, dispatch, showPopup, setShowPopup, crudFilter, setCrudFilter, setNewPermiso, permisoInitialValue, setSearching, newPermiso, setIsValid } = useContext(DataContext)
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
        const notRequired = ['NOMBRE', 'APELLIDO_P', 'APELLIDO_M', 'DOMICILIO', 'COMUNA', 'TELEFONO', 'MZ', 'NSTPC', 'CALLE', 'SECTOR', 'DESTINO', 'TIPO_EXPEDIENTE', 'ESTADO', 'DESDE', 'COMENTARIO', '_id']
        const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => !notRequired?.includes(key)))
        const checkPermiso = Object.values(permisoToCheck).every(val => val !== '' && !isNaN(val))
        setIsValid(checkPermiso)
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

    const permisosFilters = [
        ['Rol', <FormRol key={'rol'} search={search}/>], 
        ['Apellido Paterno', <FormAP key={'ap'} search={search}/>], 
        ['Dirección', <FormDir key={'dir'} search={search}/>], 
        ['Sector', <FormDir key={'dir'} search={search}/>], 
        ['N° Viv & m2 Total', <FormDir key={'dir'} search={search}/>]
    ]

    const rolCobroFilters = [
        ['Rol', <FormRol key={'rol'} search={search}/>], 
        ['Rut', <FormRut key={'rut'} search={search}/>], 
        ['Dirección', <FormDir key={'dir'} search={search}/>]
    ]

    // const displayFilters = filters.map(item => <Filter key={item} val={item[0]} />) // si la pagina de consulta es rol de cobro, no mandar type y si es de permisos, mandar type='crud'
    // const displayForm = filters.map(item => item[0] === crudFilter.filter ? item[1] : null)

    // Estos son los filters antiguos
    // const displayCrudFilters = crudFilter.filters.map(item => <Filter key={item} val={item} type='crud' />)

    // const displayF =
    //     page === 'rolcobro' ?
    //         rolCobroFilters.map(item => <Filter key={item} val={item[0]} />)
    //     :
    //         permisosFilters.map(item => <Filter key={item} val={item[0]} />)

    const displayFor =
        page === 'rolcobro' ?
            rolCobroFilters.map(item => item[0] === crudFilter.filter ? item[1] : null)
        :
            permisosFilters.map(item => item[0] === crudFilter.filter ? item[1] : null)
    

    return (
        <div className='super-body-container'>
            { showPopup && <Popup /> }
            <div className='body-container'>
                {   crudFilter.crudType === 'Consultar' 
                    ? <>
                        <ul className='filter-links'>
                            {/* {displayF} */}
                        </ul>
                        { crudFilter.type === 'read' && <h4 className='titulo-consulta'>Buscar Registros</h4> }
                        {displayFor}
                        { roles.length > 0 && ( page === 'permisos' ? <List save={save} deletePermiso={deletePermiso}/> : <List/>) }
                    </>
                    : <List save={save} downloadFile={downloadFile} />
                }
            </div>
        </div>
    )
}