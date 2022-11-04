import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ACTIONS, DataContext } from '../../context/DataContext'
import FormRol from './Form/FormRol'
import FormRut from './Form/FormRut'
import FormDir from './Form/FormDir'
import FormAP from './Form/FormAP'
import FormId from './Form/FormId'
import Popup from './Popup/Popup'
import List from './List/List'
import './Consulta.css'
import RecordPopup from './Popup/RecordPopup'
// import './style.css'

export default function Consulta() {
    const {roles, page, isAuth, dispatch, showPopup, setShowPopup, crudFilter, setCrudFilter, setNewPermiso, permisoInitialValue, setSearching, newPermiso, setIsValid, isMobile, showRecordPopup } = useContext(DataContext)
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
        const notRequired = ['MATRIZ_A', 'DIGITO_A', 'APELLIDO_P', 'APELLIDO_M', 'RUT', 'DOMICILIO', 'COMUNA', 'TELEFONO', 'MZ', 'NSTPC', 'CALLE', 'SECTOR', 'DESTINO', 'TIPO_EXPEDIENTE', 'ESTADO', 'DESDE', 'COMENTARIO', '_id']
        const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => !notRequired?.includes(key)))
        const checkPermiso = Object.keys(permisoToCheck).every(key => typeof permisoToCheck[key] == 'string' ? permisoToCheck[key] !== '' : !isNaN(permisoToCheck[key]))
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
        ['Rol Vigente', <FormRol key={'rol'} search={search}/>], 
        ['Rol Asignado', <FormRol key={'rol'} search={search}/>], 
        ['Rut', <FormRut key={'rut'} search={search}/>], 
        ['Apellido Paterno', <FormAP key={'ap'} search={search}/>], 
        ['Dirección', <FormDir key={'dir'} search={search}/>], 
        ['Sector', <FormDir key={'dir'} search={search}/>], 
        ['Id', <FormId key={'id'} search={search}/>], 
        ['N° Viv & m2 Total', <FormDir key={'dir'} search={search}/>]
    ]

    const rolCobroFilters = [
        ['Rol', <FormRol key={'rol'} search={search}/>], 
        ['Rut', <FormRut key={'rut'} search={search}/>], 
        ['Dirección', <FormDir key={'dir'} search={search}/>]
    ]

    const displayForm =
        page === 'rolcobro' ?
            rolCobroFilters.map(item => item[0] === crudFilter.filter ? item[1] : null)
        :
            permisosFilters.map(item => item[0] === crudFilter.filter ? item[1] : null)

    // Evita que se pueda usar la rueda del mouse cambiar el valor de los inputs numericos
    document.addEventListener('wheel', (e) => {
        if (document.activeElement.type === 'number') {
            document.activeElement.blur()
        }
    })

    console.log('crudType:',crudFilter.type)

    // Arreglar todo esto, esta algo confuso.
    return (
        <div className='super-body-container'>
            { showRecordPopup && <RecordPopup save={save} deletePermiso={deletePermiso} /> }
            { showPopup && <Popup /> }
            { !isMobile && 
                <>
                    <div className='search-form'>
                    {/* <h3>Buscar por {crudFilter.filter}</h3> */}
                        { crudFilter.type === 'read' && displayForm }
                    </div>
                </>
            }
            <div className='body-container'>
                {   crudFilter.crudType === 'Consultar' 
                    ? <>
                        {/* me parece que el isMobile aqui no es necesario ?, o con algunos cambios se podria sacar */}
                        { crudFilter.type === 'read' && isMobile && <h4 className='titulo-consulta'>Buscar Registros</h4> }
                        { crudFilter.type === 'read' && isMobile && displayForm }
                        { roles.length > 0 && ( page === 'permisos' ? <List save={save} deletePermiso={deletePermiso}/> : <List/>) }
                    </>
                    : 
                    <>
                        { crudFilter.crudType === 'Ver Logs' && <h4 className='titulo-consulta'>Buscar Logs</h4> }
                        <List save={save} downloadFile={downloadFile} />
                    </>                    
                }
            </div>
        </div>
    )
}