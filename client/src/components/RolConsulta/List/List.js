import React, { useContext } from 'react'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import InsertItem from './InsertItem'
import Item from './Item'
import { FiDownloadCloud } from 'react-icons/fi'

import axios from 'axios'
import fileDownload from 'js-file-download';

export default function List({ save, deletePermiso }) {
    const { roles, dispatch, user, rolIndex, setRolIndex, newPermiso, setNewPermiso, crudFilter, setCrudFilter } = useContext(DataContext)
    const totRoles = roles.length
    const type = crudFilter.type
    
    // Displayed items

    let displayItems
    if (type === 'insert') { displayItems = <InsertItem type={type} newPermiso={newPermiso} setNewPermiso={setNewPermiso} /> }
    else if (type === 'update') { displayItems = roles.map((rol) => <InsertItem type={type} newPermiso={newPermiso} setNewPermiso={setNewPermiso} data={rol} key={rol._id} />) }
    else {
        displayItems = roles.map((rol, index) => ( index === rolIndex ?
            <Item key={rol._id} {...rol} index={index} tot={totRoles} /> : null
        ))
    }

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
        console.log('cancel')
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        if (crudFilter) {
            setCrudFilter({...crudFilter, crudType: 'Consultar', type: 'read'})
        }
    }
    // refactor this ==============================================================>
    const downloadFile = async (event) => {
        event.preventDefault()
        await axios({
            url:'permisos/exportpermisos',
            method: 'GET',
            responseType: 'blob'
        }).then(res => {
            fileDownload(res.data, 'download.xlsx')
            return res.date.pipe(res)
        }).catch(err => console.log(err))
    }

    return (
        <form className='form'>
            {   user.role === 'admin' && type !== 'insert' && type !== 'update' && crudFilter.crudType !== 'Descargar' &&
                <div>
                    <p className='warning'>Cuidado, usted tiene permisos para editar y eliminar registros</p>
                    <div className="crud-btns-container">
                        <button className='crud-btn delete' onClick={deletePermiso}>Eliminar</button>
                        <button className='crud-btn edit' onClick={editPermiso}>Editar</button>
                    </div>
                </div>
            }
            <div className="list-items">
                { crudFilter.filter === 'DIR' && totRoles > 1 && 
                    <div className="list-items-btns">
                        <h4 className='titulo-resultado'>Resultado #{rolIndex + 1}</h4>
                        <button className="list-btn btn-left" onClick={goBackwards}><FiChevronsLeft/></button>
                        <button className="list-btn btn-right" onClick={goForward}><FiChevronsRight/></button>
                    </div>
                }
                {displayItems}
            </div>
            {
                type === 'insert' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {
                type === 'update' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {
                crudFilter.crudType === 'Descargar' &&
                <div>
                    <div className='download-container' onClick={(e) => downloadFile(e)}>
                        <FiDownloadCloud className='download-img' />
                        <span className='download-text'>Descargar</span>
                    </div>
                </div>
                
            }
        </form>
    )
}