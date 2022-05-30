import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'

export default function Item({ rol }) {
    const { roles, page } = useContext(DataContext)

    // Para calcular el digito verificador del RUT
    const getDV = () => {
        if (roles?.length) {
            const arr = []
            const mArr = [2, 3, 4, 5, 6, 7]
            if ( rol?.RUT !== 0 && !isNaN(rol?.RUT)) {
                // console.log(roles[0]?.MATRIZ)
                const inverted = rol?.RUT.toString().split("").reverse().join("")
                for (let i = 0; i < inverted.length; i++) {
                    arr[i] = inverted.charAt(i)
                    if(i < mArr.length) {
                        arr[i] = arr[i] * mArr[i]
                    }
                    else {
                        let n = i - mArr.length
                        arr[i] = arr[i] * mArr[n]
                    }
                }
            }
            const firstTot = arr.reduce((prev, curr) => prev + curr, 0)
            const secondTot = firstTot - Math.floor(firstTot / 11) * 11
            let dv = (11 - secondTot).toString()
            if (dv > 9) {
                if (dv === '11') {
                    return dv = '0'
                }
                return dv = 'k'
            }
            return dv
        }
    }

    const dv = getDV() || ''

    const currencyFormat = (val) => {
        let newVal = val?.toString().replace(/[.]/g, ',')
        newVal = newVal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return newVal
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
                            <td className='result-list-row'>{rol?.RUT + rol?.RUT && '-' + rol?.RUT && dv}</td>
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
                            <th>U. INGRESO NÚM:</th>
                            <td className='result-list-row'>{rol?.UI_NUM}</td>
                        </tr>
                        <tr>
                            <th>U. INGRESO AÑO:</th>
                            <td className='result-list-row'>{rol?.UI_ANO}</td>
                        </tr>
                        <tr>
                            <th>TIPO EXPEDIENTE:</th>
                            <td className='result-list-row'>{rol?.TIPO_EXPEDIENTE}</td>
                        </tr>
                        <tr>
                            <th>ESTADO:</th>
                            <td className='result-list-row'>{rol?.ESTADO}</td>
                        </tr>
                        <tr>
                            <th>DESDE:</th>
                            <td className='result-list-row'>{rol?.DESDE}</td>
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
                            <td>{rol?.RUT + '-' + dv}</td>
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
                            <td>{rol?.NA}</td>
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
                            <td>{rol?.UBICACION}</td>
                        </tr>
                        <tr>
                            <th>DESTINO:</th>
                            <td>{rol?.DESTINO}</td>
                        </tr>
                    </tbody>
                </table>
            }
        </>
    )
}