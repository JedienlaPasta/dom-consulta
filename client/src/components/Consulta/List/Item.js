import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'
import LogsItem from './LogsItem/LogsItem'
import { Destino } from '../../../data/Destino'

export default function Item({ rol }) {
    const { roles, page, crudFilter, currencyFormat, getDV } = useContext(DataContext)

    const dv = getDV(rol) || ''
    const rutPermiso = rol?.RUT ? rol?.RUT + '-' + dv : ''
    const ubicacion = (rol?.UBICACION === 'U' && 'URBANO') || (rol?.UBICACION === 'E' && 'EXTENSIÓN URBANA') || (rol?.UBICACION === 'R' && 'RURAL')
    const destino = Destino.map(item => rol?.DESTINO === item.codigo && item.descripcion)
    const agricola = rol?.NA === 'A' ? 'AGRÍCOLA' : 'NO AGRÍCOLA'
    
    let formatedDate = ''
    if (page === 'permisos') {
        if (crudFilter.crudType === 'Ver Logs') {
            let date = rol?.date
            if (typeof(date) == 'string') {
                date = new Date(date)
            }
            const dateArray = date?.toString().split(" ")
            console.log(dateArray)
            formatedDate = (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[3]} - [${dateArray[4]}]`) || ''
        }
        else if (rol.DESDE) {
            const date = rol?.DESDE
            const dateArray = date?.toString().split("-")
            formatedDate = (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`) || ''
        }
    }

    // En el caso de que el servidor devuelva los M2 Totales, se muestra esto
    if (roles.length === 1 && roles[0]._id === 'M2_TOTALES') {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>N° VIV:</th>
                        <td className='result-list-row text-center'>{currencyFormat(rol?.N_VIV)}</td>
                    </tr>
                    <tr>
                        <th>M2 C/RECEP:</th>
                        <td className='result-list-row text-center'>{currencyFormat(rol?.M2_C_RECEP)}</td>
                    </tr>
                    <tr>
                        <th>M2 C/PERM:</th>
                        <td className='result-list-row text-center'>{currencyFormat(rol?.M2_C_PERM)}</td>
                    </tr>
                    <tr>
                        <th>M2 S/PERM:</th>
                        <td className='result-list-row text-center'>{currencyFormat(rol?.M2_S_PERM)}</td>
                    </tr>
                    <tr>
                        <th>M2 TOTAL:</th>
                        <td className='result-list-row text-center'>{currencyFormat(rol?.M2_TOTAL)}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    
    // Si devuelve los logs, se muestra esto
    if (roles.length > 0 && crudFilter.crudType === 'Ver Logs') {
        return (
            <>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>REGISTRO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>ID PERMISO:</th>
                            <td className='result-list-row'>{rol?.permisoId}</td>
                        </tr>
                        <tr>
                            <th>ROL VIGENTE:</th>
                            <td className='result-list-row result-list-rol'>
                                <p>{rol?.matriz}</p><p className='text-center'>{rol?.matriz && '-'}</p><p>{rol?.digito}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>FECHA:</th>
                            <td className='result-list-row'>{formatedDate}</td>
                        </tr>
                        <tr>
                            <th>USUARIO:</th>
                            <td className='result-list-row'>{rol?.user.toUpperCase()}</td>
                        </tr>
                        <tr>
                            <th>ACCIÓN:</th>
                            <td className='result-list-row'>{rol?.action}</td>
                        </tr>
                    </tbody>
                </table>
                <LogsItem rol={rol} type={'new'} currencyFormat={currencyFormat} />
                <LogsItem rol={rol} type={'prev'} currencyFormat={currencyFormat} />
            </>
        )
    }
    
    // En el caso de que el servidor devuelva los roles o los permisos, se muestra esto
    return (
        <>
            {   page === 'permisos' ?
            <>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>ROL DE AVALÚO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>VIGENTE:</th>
                            <td className='result-list-row result-list-rol'>
                                <p>{rol?.MATRIZ_V}</p><p className='text-center'>{rol?.MATRIZ_V && '-'}</p><p>{rol?.DIGITO_V}</p>
                            </td>
                        </tr>
                        <tr>
                            <th>ASIGNADO:</th>
                            <td className='result-list-row result-list-rol'>
                                <p>{rol?.MATRIZ_A}</p><p className='text-center'>{rol?.MATRIZ_A && '-'}</p><p>{rol?.DIGITO_A}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>INFORMACIÓN PROPIETARIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>NOMBRE:</th>
                            <td className='result-list-row'>{rol?.NOMBRE}</td>
                        </tr>
                        <tr>
                            <th>APELLIDO P:</th>
                            <td className='result-list-row'>{rol?.APELLIDO_P}</td>
                        </tr>
                        <tr>
                            <th>APELLIDO M:</th>
                            <td className='result-list-row'>{rol?.APELLIDO_M}</td>
                        </tr>
                        <tr>
                            <th>RUT:</th>
                            <td className='result-list-row'>{currencyFormat(rutPermiso)}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>DOMICILIO PARTICULAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>CALLE / N°:</th>
                            <td className='result-list-row'>{rol?.DOMICILIO}</td>
                        </tr>
                        <tr>
                            <th>COMUNA:</th>
                            <td className='result-list-row'>{rol?.COMUNA}</td>
                        </tr>
                        <tr>
                            <th>TELÉFONO:</th>
                            <td className='result-list-row'>{rol?.TELEFONO}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>DIRECCIÓN PREDIAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>CALLE:</th>
                            <td className='result-list-row'>{rol?.CALLE}</td>
                        </tr>
                        <tr>
                            <th>Nº/ST/PC:</th>
                            <td className='result-list-row'>{rol?.NSTPC}</td>
                        </tr>
                        <tr>
                            <th>MZ:</th>
                            <td className='result-list-row'>{rol?.MZ}</td>
                        </tr>
                        <tr>
                            <th>SECTOR / LOTEO:</th>
                            <td className='result-list-row'>{rol?.SECTOR}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>DETALLE DE EXPEDIENTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>DESTINO:</th>
                            <td className='result-list-row'>{rol?.DESTINO}</td>
                        </tr>
                        <tr>
                            <th>N° VIV:</th>
                            <td className='result-list-row'>{rol?.N_VIV}</td>
                        </tr>
                        <tr>
                            <th>M2 C/RECEP:</th>
                            <td className='result-list-row'>{currencyFormat(rol?.M2_C_RECEP)}</td>
                        </tr>
                        <tr>
                            <th>M2 C/PERM:</th>
                            <td className='result-list-row'>{currencyFormat(rol?.M2_C_PERM)}</td>
                        </tr>
                        <tr>
                            <th>M2 S/PERM:</th>
                            <td className='result-list-row'>{currencyFormat(rol?.M2_S_PERM)}</td>
                        </tr>
                        <tr>
                            <th>M2 TOTAL:</th>
                            <td className='result-list-row'>{currencyFormat(rol?.M2_TOTAL)}</td>
                        </tr>
                        <tr>
                            <th>ULT ING NÚM:</th>
                            <td className='result-list-row'>{rol?.UI_NUM}</td>
                        </tr>
                        <tr>
                            <th>ULT ING AÑO:</th>
                            <td className='result-list-row'>{rol?.UI_ANO}</td>
                        </tr>
                        <tr>
                            <th>TIPO EXPED:</th>
                            <td className='result-list-row'>{rol?.TIPO_EXPEDIENTE}</td>
                        </tr>
                        <tr>
                            <th>ESTADO:</th>
                            <td className='result-list-row'>{rol?.ESTADO}</td>
                        </tr>
                        <tr>
                            <th>DESDE:</th>
                            <td className='result-list-row'>{formatedDate}</td>
                        </tr>
                        <tr>
                            <th>DERECHOS:</th>
                            <td className='result-list-row'>${currencyFormat(rol?.DERECHOS)}</td>
                        </tr>
                        <tr>
                            <th>COMENTARIO:</th>
                            <td className='result-list-row'>{rol?.COMENTARIO}</td>
                        </tr>
                    </tbody>
                </table>
            </>
                :
                // roles
                <table>
                    <tbody>
                        <tr>
                            <th>COMUNA:</th>
                            <td>{rol?.COMUNA}</td>
                        </tr>
                        <tr>
                            <th>AÑO:</th>
                            <td>{rol?.ANO}</td>
                        </tr>
                        <tr>
                            <th>SEMESTRE:</th>
                            <td>{rol?.SEMESTRE}</td>
                        </tr>
                        <tr>
                            <th>ASEO:</th>
                            <td>{rol?.ASEO}</td>
                        </tr>
                        <tr>
                            <th>RUT:</th>
                            <td>{currencyFormat(rol?.RUT) + '-' + dv}</td>
                        </tr>
                        <tr>
                            <th>PROPIETARIO:</th>
                            <td>{rol?.PROPIETARIO}</td>
                        </tr>
                        <tr>
                            <th>DIRECCIÓN:</th>
                            <td>{rol?.DIRECCION}</td>
                        </tr>
                        <tr>
                            <th>ROL AVALÚO:</th>
                            <td>{rol?.ROL_AVALUO_1 + ' - ' + rol?.ROL_AVALUO_2}</td>
                        </tr>
                        <tr>
                            <th>N/A:</th>
                            <td>{agricola}</td>
                        </tr>
                        <tr>
                            <th>CONTRIBUCIÓN:</th>
                            <td>{'$' + currencyFormat(rol?.CONTRIBUCION)}</td>
                        </tr>
                        <tr>
                            <th>AVALÚO TOTAL:</th>
                            <td>{'$' + currencyFormat(rol?.AVALUO_TOTAL)}</td>
                        </tr>
                        <tr>
                            <th>AVALÚO EXENTO:</th>
                            <td>{'$' + currencyFormat(rol?.AVALUO_EXENTO)}</td>
                        </tr>
                        <tr>
                            <th>TER.EXEN:</th>
                            <td>{currencyFormat(rol?.TER_EXEN)}</td>
                        </tr>
                        <tr>
                            <th>UBICACIÓN:</th>
                            <td>{ubicacion}</td>
                        </tr>
                        <tr>
                            <th>DESTINO:</th>
                            <td>{destino}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}