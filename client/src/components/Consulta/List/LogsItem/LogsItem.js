import React from 'react'

export default function LogsItem({ rol, type }) {

    let value
    if (type === 'prev') {
        value = rol?.previousVal[0]
        console.log(value)
    }
    else if (type === 'new') {
        value = rol?.newVal[0]
    }

    // const permisoToCheck = Object.fromEntries(Object.entries(value).filter(([key]) => value[key] !== ''))
    // const keys = Object.keys(value)
    // const checkPermiso = Object.keys(permisoToCheck).every(key => typeof permisoToCheck[key] == 'string' ? permisoToCheck[key] !== '' : !isNaN(permisoToCheck[key]))
    // console.log(keys)
    console.log(value)
    // console.log(Object?.keys(value))

    if (value) {
        console.log(Object?.keys(value))
    }

    // const data = Object.keys(value).map((key) => {
    //     console.log(key)
    //     return value
    // })

    return (
        <>
            {   value &&
                <table>
                    <tbody>
                        {   value?.MATRIZ_V &&
                            <tr>
                                <th>MATRIZ_V:</th>
                                <td className='result-list-row'>{value?.MATRIZ_V}</td>
                            </tr>
                        }
                        {   value?.DIGITO_V &&
                            <tr>
                                <th>DIGITO_V:</th>
                                <td className='result-list-row'>{value?.DIGITO_V}</td>
                            </tr>
                        }
                        {   value?.NOMBRE &&
                            <tr>
                                <th>NOMBRE:</th>
                                <td className='result-list-row'>{value?.NOMBRE}</td>
                            </tr>
                        }
                        {   value?.APELLIDO_P &&
                            <tr>
                                <th>APELLIDO P:</th>
                                <td className='result-list-row'>{value?.APELLIDO_P}</td>
                            </tr>
                        }
                        {   value?.APELLIDO_M &&
                            <tr>
                                <th>APELLIDO P:</th>
                                <td className='result-list-row'>{value?.APELLIDO_M}</td>
                            </tr>
                        }
                        {   value?.RUT &&
                            <tr>
                                <th>RUT:</th>
                                <td className='result-list-row'>{value?.RUT}</td>
                            </tr>
                        }
                        {   value?.CALLE &&
                            <tr>
                                <th>CALLE:</th>
                                <td className='result-list-row'>{value?.CALLE}</td>
                            </tr>
                        }
                        {   value?.COMUNA &&
                            <tr>
                                <th>COMUNA:</th>
                                <td className='result-list-row'>{value?.COMUNA}</td>
                            </tr>
                        }
                        {   value?.TELÉFONO &&
                            <tr>
                                <th>TELÉFONO:</th>
                                <td className='result-list-row'>{value?.TELÉFONO}</td>
                            </tr>
                        }
                        {   value?.CALLE &&
                            <tr>
                                <th>CALLE:</th>
                                <td className='result-list-row'>{value?.CALLE}</td>
                            </tr>
                        }
                        {   value?.NSTPC &&
                            <tr>
                                <th>NSTPC:</th>
                                <td className='result-list-row'>{value?.NSTPC}</td>
                            </tr>
                        }
                        {   value?.MZ &&
                            <tr>
                                <th>MZ:</th>
                                <td className='result-list-row'>{value?.TELÉFONO}</td>
                            </tr>
                        }
                        {   value?.SECTOR &&
                            <tr>
                                <th>SECTOR:</th>
                                <td className='result-list-row'>{value?.SECTOR}</td>
                            </tr>
                        }
                        {   value?.DESTINO &&
                            <tr>
                                <th>DESTINO:</th>
                                <td className='result-list-row'>{value?.DESTINO}</td>
                            </tr>
                        }
                        {   value?.N_VIV &&
                            <tr>
                                <th>N VIV:</th>
                                <td className='result-list-row'>{value?.N_VIV}</td>
                            </tr>
                        }
                        {   value?.M2_C_RECEP &&
                            <tr>
                                <th>M2_C_RECEP:</th>
                                <td className='result-list-row'>{value?.M2_C_RECEP}</td>
                            </tr>
                        }
                        {   value?.M2_C_PERM &&
                            <tr>
                                <th>M2_C_PERM:</th>
                                <td className='result-list-row'>{value?.M2_C_PERM}</td>
                            </tr>
                        }
                        {   value?.M2_S_PERM &&
                            <tr>
                                <th>M2_S_PERM:</th>
                                <td className='result-list-row'>{value?.M2_S_PERM}</td>
                            </tr>
                        }
                        {   value?.M2_TOTAL &&
                            <tr>
                                <th>M2_TOTAL:</th>
                                <td className='result-list-row'>{value?.M2_TOTAL}</td>
                            </tr>
                        }
                        {   value?.UI_NUM &&
                            <tr>
                                <th>UI_NUM:</th>
                                <td className='result-list-row'>{value?.UI_NUM}</td>
                            </tr>
                        }
                        {   value?.UI_ANO &&
                            <tr>
                                <th>UI_ANO:</th>
                                <td className='result-list-row'>{value?.UI_ANO}</td>
                            </tr>
                        }
                        {   value?.TIPO_EXPEDIENTE &&
                            <tr>
                                <th>TIPO_EXPEDIENTE:</th>
                                <td className='result-list-row'>{value?.TIPO_EXPEDIENTE}</td>
                            </tr>
                        }
                        {   value?.ESTADO &&
                            <tr>
                                <th>ESTADO:</th>
                                <td className='result-list-row'>{value?.ESTADO}</td>
                            </tr>
                        }
                        {   value?.DESDE &&
                            <tr>
                                <th>DESDE:</th>
                                <td className='result-list-row'>{value?.DESDE}</td>
                            </tr>
                        }
                        {   value?.DERECHOS &&
                            <tr>
                                <th>DERECHOS:</th>
                                <td className='result-list-row'>{value?.DERECHOS}</td>
                            </tr>
                        }
                        {   value?.COMENTARIO &&
                            <tr>
                                <th>COMENTARIO:</th>
                                <td className='result-list-row'>{value?.COMENTARIO}</td>
                            </tr>
                        }
                        
                    </tbody>
             </table>
            }
        </>
    )
}
