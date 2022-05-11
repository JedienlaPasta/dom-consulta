import React, { useContext, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { delPermiso, patchPermiso, postPermiso } from '../../../actions/permisos'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import './style.css'

export default function Popup({ showPopup, setShowPopup, crudFilter, setCrudFilter }) {
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(true)
    const { message, setMessage, newPermiso, setNewPermiso, permisoInitialValue, dispatch } = useContext(DataContext)

    useEffect(() => {
        setMsg(message)
    }, [message])

    useEffect(() => {
        if (message) {
            setMsg(message)
            setLoading(false)
        }
        else if (crudFilter.type === 'update' && !message) {
            setMsg('Los datos se sobreescribiran, por lo que estos no se podran recuperar')
            console.log(crudFilter.type)
            setLoading(false)
        }
        else if (crudFilter.type === 'insert') {
            // check if fields are not empty
            setMsg('Guardando...')
            console.log(crudFilter.type)
            setLoading(false)
            savePermiso()
        }
        else if (crudFilter.type === 'delete') {
            setMsg('Los datos se eliminaran permanentemente')
            console.log(crudFilter.type)
            setLoading(false)
            // deletePermiso()
        }
    }, [showPopup, message])

    const savePermiso = () => {
        const permisoToCheck = Object.fromEntries(Object.entries(newPermiso).filter(([key]) => key !== 'MZ'))
        // reviza si todos los campos del nuevo objeto son distintos de ''
        const isValid = Object.values(permisoToCheck).every(val => val !== '')
        if (isValid) {
            if (crudFilter.type === 'insert') {
                postPermiso(newPermiso, setMessage)
            }
            if (crudFilter.type === 'update') {
                setMsg('Guardando...')
                patchPermiso(newPermiso, setMessage)
            }
            // Se vacia el formulario una vez ingresado el permiso
            setNewPermiso(permisoInitialValue) // se reestablece el valor de newPermiso a su estado original (vacio)
        }
        else {
            if (crudFilter.type === 'insert' || crudFilter.type === 'update') {
                setMessage('Campos incompletos, intente nuevamente')
            }
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
        setLoading(true)
    }

    const close = () => {
        reset()
    }
    
    const finish = () => {
        reset()
        if (crudFilter.type === 'update' || crudFilter.type === 'delete') {
            setCrudFilter({...crudFilter, crudType: 'Consultar', type: 'read'})
        }
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
    }

    return (
        <div className='popup-background'>
            { !message &&
                <div className="popup-container">
                    <div className="popup-header">
                        { crudFilter.type !== 'insert' && crudFilter.type !== 'read' && msg !== 'Guardando...' && msg !== 'Eliminando...' && <h4 className="popup-title"> {/* !message && ... */}
                            Estas seguro de que quieres continuar?
                        </h4>}
                        <button className='popup-close-btn' onClick={close}><CgClose/></button>
                    </div>
                    <div className='popup-body-container'>
                        <p className='popup-body'>{ loading ? 'Loading...' : msg }</p>
                    </div>
                    { crudFilter.type !== 'insert' && crudFilter.type !== 'read' && msg !== 'Guardando...' && msg !== 'Eliminando...' && <div className="popup-btns"> {/* !message && ... */}
                        {   crudFilter.type === 'update' ?
                            <button className='popup-continue-btn' onClick={savePermiso}>Continuar</button>
                            :
                            <button className='popup-continue-btn' onClick={deletePermiso}>Continuar</button>
                        }
                        <button className='popup-cancel-btn' onClick={close}>Cancelar</button>
                    </div>}
                </div>
            }
            {   message &&
                <div className="popup-container">
                    <div className="popup-header">
                        <button className='popup-close-btn' onClick={finish}><CgClose/></button>
                    </div>
                    <div className='popup-body-container'>
                        <p className='popup-body'>{ loading ? 'Loading...' : msg }</p>
                    </div>
                    <div className="popup-btns">
                        <button className='popup-cancel-btn' onClick={finish}>Cerrar</button>
                    </div>
                </div>
            }
        </div>
    )
}
