import React, { useContext, useEffect, useState } from 'react'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { FiChevronsLeft, FiChevronsRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { RiBug2Fill } from 'react-icons/ri'
import MobileInsertItem from './Items/Mobile/MobileInsertItem'
import DesktopInsertItem from './Items/Desktop/DesktopInsertItem'
import MobileItem from './Items/Mobile/MobileItem'
import DesktopItem from './Items/Desktop/DesktopItem'
import { FiDownloadCloud } from 'react-icons/fi'
import Dropdown from './Dropdown/Dropdown'

export default function List({ save, deletePermiso, downloadFile }) {
    const { roles, page, dispatch, user, rolIndex, setRolIndex, crudFilter, setCrudFilter, crudDisabled, isMobile, listPage, setListPage } = useContext(DataContext)
    const totRoles = roles.length
    const type = crudFilter.type

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10
    const pagesCount = Math.ceil(roles.length / itemsPerPage)
    const pages = Array.apply(null, Array(pagesCount)).map(function (_, i) { return i + 1 })
    console.log('pages: ', pages)
    console.log('page: ', currentPage)

    // Displayed items

    let displayItems
    if (type === 'insert') { 
        console.log('insert')
        if (isMobile) {
            displayItems = <MobileInsertItem type={type} /> 
        }
        else {
            displayItems = <DesktopInsertItem type={type} /> 
        }
    }
    else if (type === 'update') { 
        console.log('update')
        console.log(roles)
        if (isMobile) {
            displayItems = roles.map((rol) => <MobileInsertItem type={type} key={rol._id} />)
        }
        else {
            displayItems = roles.map((rol) => <DesktopInsertItem type={type} key={rol._id} />)
        }
    }
    else { 
        console.log('read')
        displayItems = isMobile 
            ? roles.map((rol, index) => ( index === rolIndex ? <MobileItem key={rol._id} rol={rol} /> : null))
            : <DesktopItem key='DesktopItem' currentPage={currentPage} itemsPerPage={itemsPerPage} /> 
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

    const decrease = (event) => {
        event.preventDefault()
        setCurrentPage(prev => {
            if (prev === 1) return 1
            return prev - 1
        })
    }

    const increase = (event) => {
        event.preventDefault()
        setCurrentPage(prev => {
            if (prev === pagesCount) return pagesCount
            return prev + 1
        })
    }

    const goToFirst = (event) => {
        event.preventDefault()
        setCurrentPage(1)
    }

    const goToLast = (event) => {
        event.preventDefault()
        setCurrentPage(pagesCount)
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
            if (crudFilter.crudType !== 'Consultar') {
                setCrudFilter({...crudFilter, crudType: 'Consultar', filter: 'Rol Vigente', type: 'read'})
            }
            else {
                setCrudFilter({...crudFilter, crudType: 'Consultar', type: 'read'})
            }
        }
    }

    const resetIndex = (event) => {
        event.preventDefault()
        setRolIndex(0)
    }
    console.log('rolIndex: ' + rolIndex)

    const roundToNearest10 = (val) => {
        return Math.floor(val / 10) * 10
    }

    return (
        <form className={`form ${crudFilter.crudType === 'Ver Logs' && 'form-extended-height'}`}>
            {/* Botones de pagina y volver */}
            {   roles.length > 0 && !isMobile && crudFilter.type === 'read' &&
                <div className='body-footer-btns'>
                    {/* { rolIndex > 0 ? <button className='return-btn' onClick={resetIndex}>Volver</button> : null } */}
                    {   roles.length > 0 ?
                        <>
                            {/* Cantidad de registros por pagina */}
                            <div className="rows-count">
                                <span>{(currentPage * 10 - 10 + 1) + '-' + ((itemsPerPage * (currentPage - 1)) !== roundToNearest10(roles.length) ? itemsPerPage * currentPage : roles.length) + ' de ' + roles.length}</span>
                            </div>
                            <div className="separation-line"></div>
                            {/* Navegacion de paginas */}
                            <div className='pagination'>
                                <button className='pagination-page' onClick={goToFirst}><FiChevronsLeft/></button>
                                <button className='pagination-page' onClick={decrease}><FiChevronLeft/></button>
                                {
                                    pages.map((page, index) => {
                                        const pageName = `pagination-page ${currentPage === page && 'marked-page'}`
                                        const pagesLeft = currentPage < 3 ? (currentPage === 1 ? 5 : 4) : 3 
                                        const pagesRight = currentPage > pagesCount - 2 ? (currentPage === pagesCount ? 5 : 4) : 3
                                        if ((page < currentPage + pagesLeft && page >= currentPage) || (page > currentPage - pagesRight && page <= currentPage)) {
                                            return (
                                                <div key={index} className={pageName} onClick={() => setCurrentPage(page)}><span className='prevent-select'>{page}</span></div>
                                            )
                                        }})
                                }
                                <button className='pagination-page' onClick={increase}><FiChevronRight/></button>
                                <button className='pagination-page' onClick={goToLast}><FiChevronsRight/></button>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            }
            {/* Dropdown e imagen de la seccion de Logs */}
            {   page === 'permisos' && crudFilter.crudType === 'Ver Logs' &&
                <div className='logs-container'>
                    <Dropdown />
                    {   roles.length === 0 &&
                        <span className='bug-placeholder'>
                            <RiBug2Fill className='bug' />
                            <p className='prevent-select'>Sin resultados</p>
                        </span>
                    }
                </div>
            }
            {/* Botones de Editar y Eliminar */}
            {   page === 'permisos' && user.role === 'dom_admin' && type !== 'insert' && type !== 'update' && crudFilter.crudType !== 'Descargar' && roles[0]?._id !== 'M2_TOTALES' && crudFilter.filter !== 'Registro de Eventos' && isMobile &&
                <div>
                    <p className='warning'>Cuidado, usted tiene permisos para editar y eliminar registros</p>
                    <div className="crud-btns-container">
                        <button className='crud-btn delete' disabled={crudDisabled} onClick={deletePermiso}>Eliminar</button>
                        <button className='crud-btn edit' disabled={crudDisabled} onClick={editPermiso}>Editar</button>
                    </div>
                </div>
            }
            {/* Tabla de contenidos e ingreso de datos // Botones para cambiar de indice */}
            <div className="list-items">
                { totRoles > 1 && isMobile &&
                    <div className="list-items-btns">
                        <button className="list-btn btn-left" onClick={goBackwards}><FiChevronsLeft/></button>
                        <h4 className='titulo-resultado'>Resultado #{rolIndex + 1}</h4>
                        <button className="list-btn btn-right" onClick={goForward}><FiChevronsRight/></button>
                    </div>
                }
                { (roles.length > 0 && displayItems) || (page === 'permisos' && type === 'insert' && displayItems) }
            </div>
            {/* ============================ */}
            {/* Botones de guardar y cancelar - usado en ingreso y edicion de registros (no se podra usar los mismos para estas 2 acciones? ya que ambos se ven practicamente igual) */}
            {   page === 'permisos' && type === 'insert' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {   page === 'permisos' && type === 'update' &&
                <div className="crud-btns-container">
                    <button className='crud-btn save' onClick={save}>Guardar</button>
                    <button className='crud-btn cancel' onClick={cancel}>Cancelar</button>
                </div>
            }
            {/* Seccion de descarga */}
            {   page === 'permisos' && crudFilter.crudType === 'Descargar' &&
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