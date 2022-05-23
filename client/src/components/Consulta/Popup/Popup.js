import React, { useContext, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { delPermiso, downloadPermisos, patchPermiso, postPermiso } from '../../../actions/permisos'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import Loading from './Loading'
import SmallLoading from './SmallLoading'
import './style.css'

export default function Popup() {
    const [msg, setMsg] = useState('')
    const { message, setMessage, newPermiso, setNewPermiso, permisoInitialValue, dispatch, crudFilter, setCrudFilter, showPopup, setShowPopup, searching, setSearching } = useContext(DataContext)

    useEffect(() => {
        if (message) {
            setMsg(message)
        }
        else {
            if (!searching) {
                if (crudFilter.crudType !== 'Descargar') {
                    if (crudFilter.type === 'update' && !message) {
                        setMsg('Los datos se sobreescribiran, por lo que estos no se podran recuperar')
                    }
                    else if (crudFilter.type === 'insert') {
                        setMsg('Guardando...')
                        savePermiso()
                    }
                    else if (crudFilter.type === 'delete') {
                        setMsg('Los datos se eliminaran permanentemente')
                    }
                }
                else {
                    setMsg('Generando archivo...')
                    downloadPermisos(setMessage)
                    setTimeout(() => setMsg('Si la descarga no comienza automáticamente, intente recargar la página'), 20000)
                }
            }
            else {
                setMsg('Buscando...')
            }
        }
    }, [showPopup, message])

    const savePermiso = () => {
        // Se reviza si todos los campos del nuevo objeto son distintos de '' a excepción de MZ
        const notRequired = ['NOMBRE', 'APELLIDO_P', 'APELLIDO_M', 'DOMICILIO', 'COMUNA', 'TELEFONO', 'MZ', 'NSTPC', 'CALLE', 'SECTOR', 'DESTINO', 'TIPO_EXPEDIENTE', 'ESTADO', 'DESDE', 'COMENTARIO',]
        // const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => key !== 'MZ'))
        // const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => key !== notRequired.forEach(field => field)))
        const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => !notRequired?.includes(key) ))
        console.log(permisoToCheck)
        const isValid = Object.values(permisoToCheck).every(val => val !== '')
        console.log(isValid)
        if (isValid) {
            if (crudFilter.type === 'insert') {
                postPermiso(newPermiso, setMessage, setNewPermiso, permisoInitialValue)
            }
            else if (crudFilter.type === 'update') {
                setMsg('Guardando...')
                console.log(newPermiso)
                patchPermiso(newPermiso, setMessage, setNewPermiso, permisoInitialValue)
            }
        }
        else {
            setMessage('Campos incompletos, intente nuevamente')
        }
    }

    const deletePermiso = () => {
        setMsg('Eliminando...')
        delPermiso({ id: newPermiso._id }, setMessage)
    }

    const reset = () => {
        setShowPopup(false)
        setMsg('')
        setMessage('')
    }
    
    const finish = () => {
        reset()
        if (crudFilter.type === 'update' || crudFilter.type === 'delete' || crudFilter.crudType === 'Descargar') {
            setCrudFilter({...crudFilter, crudType: 'Consultar', type: 'read'})
        }
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
    }

    const showHeaderAndButtons = crudFilter.type !== 'insert' && crudFilter.type !== 'read' && msg !== 'Guardando...' && msg !== 'Eliminando...'

    return (
        <div className='popup-background'>
            { !message &&
                <div className="popup-container">
                    {/* Popup Header */}
                    <div className="popup-header">
                        { showHeaderAndButtons &&  <h4 className="popup-title">Estas seguro de que quieres continuar?</h4> }
                        { !searching && <button className='popup-close-btn' onClick={reset}><CgClose/></button>}
                    </div>
                    {/* Popup Body */}
                    <div className='popup-body-container'>
                        { crudFilter.crudType === 'Descargar' && <Loading /> }
                        { crudFilter.crudType !== 'Descargar' && searching && <SmallLoading/>}
                        <p className={`popup-body ${(crudFilter.crudType === 'Descargar' || msg === 'Buscando...') && 'text-center'}`}>{ msg ? msg : 'Cargando...' }</p>
                    </div>
                    {/* Popup Action Buttons */}
                    {   showHeaderAndButtons && 
                        <div className="popup-btns">
                            {   crudFilter.type === 'update' 
                                ? <button className='popup-continue-btn' onClick={savePermiso}>Continuar</button>
                                : <button className='popup-continue-btn' onClick={deletePermiso}>Continuar</button>
                            }
                            <button className='popup-cancel-btn' onClick={reset}>Cancelar</button>
                        </div>
                    }
                </div>
            }
            {   message &&
                <div className={`popup-container ${msg === 'No se encontraron coincidencias' && 'red-border'}`}>
                    {/* Popup Header */}
                    <div className="popup-header">
                        {   crudFilter.crudType !== 'Descargar' 
                            ? <button className='popup-close-btn' onClick={finish}><CgClose/></button>
                            : <button className='popup-close-btn' onClick={reset}><CgClose/></button>
                        }
                    </div>
                    {/* Popup Body */}
                    <div className='popup-body-container'>
                        <p className='popup-body'>{ msg ? msg : 'Cargando...' }</p>
                    </div>
                    {/* Popup Action Buttons */}
                    <div className="popup-btns">
                        {   crudFilter.crudType !== 'Descargar' 
                            ? <button className='popup-cancel-btn' onClick={finish}>Cerrar</button>
                            : <button className='popup-cancel-btn' onClick={reset}>Cerrar</button>
                        }
                    </div>
                </div>
            }
        </div>
    )
}