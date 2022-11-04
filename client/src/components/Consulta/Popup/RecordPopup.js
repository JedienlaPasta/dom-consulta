import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { ACTIONS, DataContext } from '../../../context/DataContext'
import { Destino } from '../../../data/Destino'

export default function RecordPopup({ save, deletePermiso}) {
    const { roles, newPermiso, rolIndex, setRolIndex, setShowRecordPopup, crudFilter, setCrudFilter, dispatch, getDV, page } = useContext(DataContext)

    const current = rolIndex

    const dv = getDV(roles[current]) || ''
    const rutPermiso = roles[current]?.RUT ? roles[current]?.RUT + '-' + dv : ''
    const ubicacion = (roles[current]?.UBICACION === 'U' && 'URBANO') || (roles[current]?.UBICACION === 'E' && 'EXTENSIÓN URBANA') || (roles[current]?.UBICACION === 'R' && 'RURAL')
    const destino = Destino.map(item => roles[current]?.DESTINO === item.codigo && item.descripcion)
    const agricola = roles[current]?.NA === 'A' ? 'AGRÍCOLA' : 'NO AGRÍCOLA'

    let formatedDate = ''
    if (page === 'permisos') {
        if (crudFilter.crudType === 'Ver Logs') {
            let date = roles[current]?.date
            if (typeof(date) == 'string') {
                date = new Date(date)
            }
            const dateArray = date?.toString().split(" ")
            console.log(dateArray)
            formatedDate = (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[3]} - [${dateArray[4]}]`) || ''
        }
        else if (roles[current].DESDE) {
            const date = roles[current]?.DESDE
            const dateArray = date?.toString().split("-")
            formatedDate = (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`) || ''
        }
    }

    const editPermiso = () => {
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [roles[current]] })
        setRolIndex(0)
        if (crudFilter) {
            setCrudFilter({...crudFilter, type: 'update'})
        }
        setShowRecordPopup(false)
    }

    const close = () => {
        setShowRecordPopup(false)
    }

    return (
        <>
            <div className="record-popup-background" onClick={close}></div>
            <div className='record-popup-container'>
                <button className='popup-close-btn' onClick={close}><CgClose/></button>
                <div className='record-popup-left'>
                    <h4 className='record-popup-subtitle'>INFORMACIÓN PERSONAL</h4>
                    <table className='record-popup-table'>
                        <tbody>
                            <tr className='record-popup-row'>
                                <th>ROL VIGENTE:</th>
                                <td>{roles[current]?.MATRIZ_V} - {roles[current]?.DIGITO_V}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>ROL ASIGNADO:</th>
                                <td>{roles[current]?.MATRIZ_A} - {roles[current]?.DIGITO_A}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>NOMBRE:</th>
                                <td>{roles[current]?.NOMBRE}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>APELLIDO P:</th>
                                <td>{roles[current]?.APELLIDO_P}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>APELLIDO M:</th>
                                <td>{roles[current]?.APELLIDO_M}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>RUT:</th>
                                <td>{roles[current]?.RUT}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>CALLE / N°:</th>
                                <td>{roles[current]?.DOMICILIO}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>COMUNA:</th>
                                <td>{roles[current]?.COMUNA}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>TELÉFONO:</th>
                                <td>{roles[current]?.TELEFONO}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h4 className='record-popup-subtitle'>DIRECCIÓN PREDIAL</h4>
                    <table className='record-popup-table'>
                        <tbody>
                            <tr className='record-popup-row'>
                                <th>CALLE:</th>
                                <td>{roles[current]?.CALLE}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>Nº/ST/PC:</th>
                                <td>{roles[current]?.NSTPC}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>MZ:</th>
                                <td>{roles[current]?.MZ}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>SECTOR:</th>
                                <td>{roles[current]?.SECTOR}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="vertical-rule"></div>
                <div className='record-popup-right'>
                    <div className='crud-actions-section'>
                    <p className='warning'>Cuidado, usted tiene permisos para editar y eliminar registros.</p>
                        <div className="popup-crud-btns-container">
                            <button className='popup-crud-btn delete' onClick={deletePermiso}><MdDeleteForever/></button>
                            <div className="vertical-separation"></div>
                            <button className='popup-crud-btn edit' onClick={editPermiso}><MdEdit/></button>
                        </div>
                    </div>
                    <h4 className='record-popup-subtitle'>INFORMACIÓN ADICIONAL</h4>
                    <table className='record-popup-table'>
                        <tbody>
                            <tr className='record-popup-row'>
                                <th>DESTINO:</th>
                                <td>{roles[current]?.DESTINO}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>N° VIV:</th>
                                <td>{roles[current]?.N_VIV}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>M2 C/RECEP:</th>
                                <td>{roles[current]?.M2_C_RECEP}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>M2 C/PERM:</th>
                                <td>{roles[current]?.M2_C_PERM}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>M2 S/PERM:</th>
                                <td>{roles[current]?.M2_S_PERM}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>M2 TOTAL:</th>
                                <td>{roles[current]?.M2_TOTAL}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>ULT ING NÚM:</th>
                                <td>{roles[current]?.UI_NUM}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>ULT ING AÑO:</th>
                                <td>{roles[current]?.UI_ANO}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>TIPO EXPED:</th>
                                <td>{roles[current]?.TIPO_EXPEDIENTE}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>ESTADO:</th>
                                <td>{roles[current]?.ESTADO}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>DESDE:</th>
                                <td>{formatedDate}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>DERECHOS:</th>
                                <td>{roles[current]?.DERECHOS}</td>
                            </tr>
                            <tr className='record-popup-row'>
                                <th>COMENTARIO:</th>
                                <td>{roles[current]?.COMENTARIO}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
