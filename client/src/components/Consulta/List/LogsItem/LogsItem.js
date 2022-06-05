import React from 'react'

export default function LogsItem({ rol, type, currencyFormat }) {

    let value
    let keys

    if (type === 'prev') {
        value = rol?.previousVal[0]
    }
    else if (type === 'new') {
        value = rol?.newVal[0]
    }
    
    if (value) {
        // console.log(Object?.keys(value))
        keys = Object?.keys(value)
    }

    return (
        <>
            {   value &&
                <table className='list-container'>
                    <thead>
                        <tr className='list-header-title'>
                            <th className='text-center'>{type === 'new' ? 'VALORES NUEVOS' : 'VALORES ELIMINADOS' }</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   keys.includes('MATRIZ_V') && keys.includes('DIGITO_V') &&
                            <tr>
                                <th>VIGENTE:</th>
                                <td className='result-list-row result-list-rol'>
                                    <p>{value?.MATRIZ_V || ''}</p><p className='text-center'>{value?.MATRIZ_V && '-' || ''}</p><p>{value?.DIGITO_V || ''}</p>
                                </td>
                            </tr>
                        }
                        {   keys.includes('MATRIZ_A') && keys.includes('DIGITO_A') &&
                            <tr>
                                <th>ASIGNADO:</th>
                                <td className='result-list-row result-list-rol'>
                                    <p>{value?.MATRIZ_A || ''}</p><p className='text-center'>{value?.MATRIZ_A && '-' || ''}</p><p>{value?.DIGITO_A || ''}</p>
                                </td>
                            </tr>
                        }
                        {   keys.includes('NOMBRE') &&
                            <tr>
                                <th>NOMBRE:</th>
                                <td className='result-list-row'>{value?.NOMBRE || ''}</td>
                            </tr>
                        }
                        {   keys.includes('APELLIDO_P') &&
                            <tr>
                                <th>APELLIDO P:</th>
                                <td className='result-list-row'>{value?.APELLIDO_P || ''}</td>
                            </tr>
                        }
                        {   keys.includes('APELLIDO_M') &&
                            <tr>
                                <th>APELLIDO M:</th>
                                <td className='result-list-row'>{value?.APELLIDO_M || ''}</td>
                            </tr>
                        }
                        {   keys.includes('RUT') &&
                            <tr>
                                <th>RUT:</th>
                                <td className='result-list-row'>{currencyFormat(value?.RUT) || ''}</td>
                            </tr>
                        }
                        {   keys.includes('DOMICILIO') &&
                            <tr>
                                <th>CALLE / N°:</th>
                                <td className='result-list-row'>{value?.DOMICILIO || ''}</td>
                            </tr>
                        }
                        {   keys.includes('COMUNA') &&
                            <tr>
                                <th>COMUNA:</th>
                                <td className='result-list-row'>{value?.COMUNA || ''}</td>
                            </tr>
                        }
                        {   keys.includes('TELEFONO') &&
                            <tr>
                                <th>TELÉFONO:</th>
                                <td className='result-list-row'>{value?.TELEFONO || ''}</td>
                            </tr>
                        }
                        {   keys.includes('CALLE') &&
                            <tr>
                                <th>CALLE:</th>
                                <td className='result-list-row'>{value?.CALLE || ''}</td>
                            </tr>
                        }
                        {   keys.includes('NSTPC') &&
                            <tr>
                                <th>N°/St/Pc:</th>
                                <td className='result-list-row'>{value?.NSTPC || ''}</td>
                            </tr>
                        }
                        {   keys.includes('MZ') &&
                            <tr>
                                <th>MZ:</th>
                                <td className='result-list-row'>{value?.MZ || ''}</td>
                            </tr>
                        }
                        {   keys.includes('SECTOR') &&
                            <tr>
                                <th>SECTOR:</th>
                                <td className='result-list-row'>{value?.SECTOR || ''}</td>
                            </tr>
                        }
                        {   keys.includes('DESTINO') &&
                            <tr>
                                <th>DESTINO:</th>
                                <td className='result-list-row'>{value?.DESTINO || ''}</td>
                            </tr>
                        }
                        {   keys.includes('N_VIV') &&
                            <tr>
                                <th>N° VIV:</th>
                                <td className='result-list-row'>{value?.N_VIV || 0}</td>
                            </tr>
                        }
                        {   keys.includes('M2_C_RECEP') &&
                            <tr>
                                <th>M2 C/RECEP:</th>
                                <td className='result-list-row'>{value?.M2_C_RECEP || 0}</td>
                            </tr>
                        }
                        {   keys.includes('M2_C_PERM') &&
                            <tr>
                                <th>M2 C/PERM:</th>
                                <td className='result-list-row'>{value?.M2_C_PERM || 0}</td>
                            </tr>
                        }
                        {   keys.includes('M2_S_PERM') &&
                            <tr>
                                <th>M2 S/PERM:</th>
                                <td className='result-list-row'>{value?.M2_S_PERM || 0}</td>
                            </tr>
                        }
                        {   keys.includes('M2_TOTAL') &&
                            <tr>
                                <th>M2 TOTAL:</th>
                                <td className='result-list-row'>{value?.M2_TOTAL || 0}</td>
                            </tr>
                        }
                        {   keys.includes('UI_NUM') &&
                            <tr>
                                <th>ULT ING NUM:</th>
                                <td className='result-list-row'>{value?.UI_NUM || 0}</td>
                            </tr>
                        }
                        {   keys.includes('UI_ANO') &&
                            <tr>
                                <th>ULT ING AÑO:</th>
                                <td className='result-list-row'>{value?.UI_ANO || 0}</td>
                            </tr>
                        }
                        {   keys.includes('TIPO_EXPEDIENTE') &&
                            <tr>
                                <th>TIPO EXPED:</th>
                                <td className='result-list-row'>{value?.TIPO_EXPEDIENTE || ''}</td>
                            </tr>
                        }
                        {   keys.includes('ESTADO') &&
                            <tr>
                                <th>ESTADO:</th>
                                <td className='result-list-row'>{value?.ESTADO || ''}</td>
                            </tr>
                        }
                        {   keys.includes('DESDE') &&
                            <tr>
                                <th>DESDE:</th>
                                <td className='result-list-row'>{value?.DESDE || ''}</td>
                            </tr>
                        }
                        {   keys.includes('DERECHOS') &&
                            <tr>
                                <th>DERECHOS:</th>
                                <td className='result-list-row'>{value?.DERECHOS || 0}</td>
                            </tr>
                        }
                        {   keys.includes('COMENTARIO') &&
                            <tr>
                                <th>COMENTARIO:</th>
                                <td className='result-list-row'>{value?.COMENTARIO || ''}</td>
                            </tr>
                        }
                        
                    </tbody>
             </table>
            }
        </>
    )
}
