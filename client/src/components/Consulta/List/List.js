import React, { useContext } from 'react'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import InsertItem from './InsertItem'
import Item from './Item'
import { FiDownloadCloud } from 'react-icons/fi'

export default function List({ save, deletePermiso, downloadFile }) {
    const { roles, page, dispatch, user, rolIndex, setRolIndex, crudFilter, setCrudFilter } = useContext(DataContext)
    const totRoles = roles.length
    const type = crudFilter.type
    // quizas cambiar type a 'read' cada vez que se cambia de pagina tambien (no se si esta hecho)
    // Displayed items

    let displayItems
    if (type === 'insert') { displayItems = <InsertItem type={type} /> }
    else if (type === 'update') { displayItems = roles.map((rol) => <InsertItem type={type} key={rol._id} />) }
    else { displayItems = roles.map((rol, index) => ( index === rolIndex ? <Item key={rol._id} rol={rol} /> : null ))}

    // Funciones

    const goForward = (event) => {
        event.preventDefault()
        setRolIndex(prev => {
            if (prev === roles.length - 1) return 0
            return prev + 1
        })
    }

    const goBackwards = (event) => {
        event.preventDefault()
        setRolIndex(prev => {
            if (prev === 0) return roles.length - 1
            return prev - 1
        })
    }

    const editPermiso = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [roles[rolIndex]] })
        setRolIndex(0)
        if (crudFilter) {
            setCrudFilter({...crudFilter, type: 'update'})
        }
    }

    const cancel = (event) => {
        event.preventDefault()
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        if (crudFilter) {
            setCrudFilter({...crudFilter, crudType: 'Consultar', type: 'read'})
        }
    }
    
    return (
        <form className='form'>
            {   page === 'permisos' && user.role === 'dom_admin' && type !== 'insert' && type !== 'update' && crudFilter.crudType !== 'Descargar' &&
                <div>
                    <p className='warning'>Cuidado, usted tiene permisos para editar y eliminar registros</p>
                    <div className="crud-btns-container">
                        <button className='crud-btn delete' onClick={deletePermiso}>Eliminar</button>
                        <button className='crud-btn edit' onClick={editPermiso}>Editar</button>
                    </div>
                </div>
            }
            {/* Esto se ve en ambas paginas */}
            <div className="list-items">
                { totRoles > 1 && 
                    <div className="list-items-btns">
                        <h4 className='titulo-resultado'>Resultado #{rolIndex + 1}</h4>
                        <button className="list-btn btn-left" onClick={goBackwards}><FiChevronsLeft/></button>
                        <button className="list-btn btn-right" onClick={goForward}><FiChevronsRight/></button>
                    </div>
                }
                {displayItems}
            </div>
            {/* ============================ */}
            {
                page === 'permisos' && type === 'insert' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {
                page === 'permisos' && type === 'update' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {
                page === 'permisos' && crudFilter.crudType === 'Descargar' &&
                <div>
                    <div className='download-container' onClick={downloadFile}>
                        <FiDownloadCloud className='download-img' />
                        <span className='download-text'>Descargar</span>
                    </div>
                </div>
            }
        </form>
    )
}