import React, { useContext } from 'react'
import { DataContext } from '../../../../../context/DataContext'
import './Items.css'

export default function DesktopInsertItem({ type }) {
    const { page, newPermiso, setNewPermiso, currencyFormat, getDV } = useContext(DataContext)

    const title = type === 'insert' ? 'Nuevo Registro' : 'Actualizar Registro'
    const name = type === 'update' ? 'insert-list-input text-center' /*faded-text*/ : 'insert-list-input'
    const dv = getDV(newPermiso) || ''

    const removeDots = (val) => val.replaceAll('.', '')
    
    const parseValue = (val) => {
        if (!isNaN(val)) {
            return parseFloat(val).toString()
        }
        return ('').toString()
    }

    const handleOnChangeT = (e) => {
        setNewPermiso(prev => ({...prev, [e.target.name]: (e.target.value).toUpperCase()}))
    }

    const handleOnChangeN = (e) => {
        if (e.target.name === 'MATRIZ_A' || e.target.name === 'DIGITO_A') {
            return e.target.value < 0 ? setNewPermiso(prev => ({...prev, [e.target.name]: '' })) : setNewPermiso(prev => ({...prev, [e.target.name]: e.target.value }))
        }
        else if (e.target.name === 'RUT') {
            return (e.target.value < 0 || e.target.value === '') ? setNewPermiso(prev => ({...prev, [e.target.name]: '' })) : setNewPermiso(prev => ({...prev, [e.target.name]: removeDots(e.target.value) }))
        }
        // else =>
        e.target.value < 0 ? setNewPermiso(prev => ({...prev, [e.target.name]: 0 })) : setNewPermiso(prev => ({...prev, [e.target.name]: parseFloat(e.target.value) }))
        if (e.target.name === 'M2_C_RECEP' || e.target.name === 'M2_S_PERM') {
            setNewPermiso(prev => ({...prev, M2_TOTAL: (parseFloat(prev.M2_C_RECEP) || 0) + (parseFloat(prev.M2_S_PERM) || 0)}))
        }
    }

    return (
        <>
            {   page === 'permisos' &&
                <>
                    <h4 className={`titulo-consulta ${type === 'insert' && 'new-record'}`}>{title}</h4>
                    {type === 'insert' && <p className='warning marg-top-warning'>Por favor rellene todos los campos posibles, tenga en cuenta que esto facilitará la búsqueda de registros a futuro.</p>}
                    <div className='insert-body'>
                        <div className='insert-body-left'>
                            <table className='list-container insert-list-container'>
                                <thead>
                                    <tr className='list-header-title'>
                                        <th className='text-center'>INFORMACIÓN PERSONAL</th>
                                    </tr>
                                </thead>
                                <tbody className='insert-list-body'>
                                    <tr>
                                        <th className='text-right'>ROL VIGENTE</th>
                                        <td className='insert-list-input-row input insert-list-rol'>
                                            <input type="text" required name='MATRIZ_V' autoComplete='new-password' className={`${name} ${newPermiso?.MATRIZ_V === '' && 'incomplete-field'} `} value={newPermiso?.MATRIZ_V} placeholder='MZ...' onChange={handleOnChangeT} /*readOnly={type === 'update'}*/ />
                                            <input type="text" required name='DIGITO_V' autoComplete='new-password' className={`${name} ${newPermiso?.DIGITO_V === '' && 'incomplete-field'} `} value={newPermiso?.DIGITO_V} placeholder='PD...' onChange={handleOnChangeT} /*readOnly={type === 'update'}*/ />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>ROL ASIGNADO</th>
                                        <td className='insert-list-input-row input insert-list-rol'>
                                            <input type="number" name='MATRIZ_A' autoComplete='new-password' className={name} value={newPermiso?.MATRIZ_A} placeholder='MZ...' onChange={handleOnChangeN} /*readOnly={type === 'update'}*/ />
                                            <input type="number" name='DIGITO_A' autoComplete='new-password' className={name} value={newPermiso?.DIGITO_A} placeholder='PD...' onChange={handleOnChangeN} /*readOnly={type === 'update'}*/ />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>NOMBRE</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='NOMBRE' autoComplete='new-password' className={`insert-list-input ${newPermiso?.NOMBRE === '' && 'incomplete-field'} `} value={newPermiso?.NOMBRE} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>APELLIDO P</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_P' autoComplete='new-password' className='insert-list-input' value={newPermiso?.APELLIDO_P} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>APELLIDO M</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_M' autoComplete='new-password' className='insert-list-input' value={newPermiso?.APELLIDO_M} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>RUT</th>
                                        <td className='insert-list-input-row input insert-list-rut'>
                                            <input type="text" /*required*/ name='RUT' autoComplete='new-password' className='insert-list-input text-center' value={currencyFormat(newPermiso?.RUT)} onChange={handleOnChangeN} />
                                            <p>-</p>
                                            <input type="text" /*required*/ name='DV' className='insert-list-input text-center' value={dv} readOnly />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>CALLE / N°</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='DOMICILIO' autoComplete='new-password' className='insert-list-input' value={newPermiso?.DOMICILIO} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>COMUNA</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='COMUNA' autoComplete='new-password' className='insert-list-input' value={newPermiso?.COMUNA} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>TELÉFONO</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='TELEFONO' autoComplete='new-password' className='insert-list-input' value={newPermiso?.TELEFONO} onChange={handleOnChangeT} /></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className='list-container insert-list-container'>
                                <thead>
                                    <tr className='list-header-title'>
                                        <th className='text-center'>DIRECCIÓN PREDIAL</th>
                                    </tr>
                                </thead>
                                <tbody className='insert-list-body'>
                                    <tr>
                                        <th className='text-right'>CALLE</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='CALLE' autoComplete='new-password' className='insert-list-input' value={newPermiso?.CALLE} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>N°/St/Pc</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='NSTPC' autoComplete='new-password' className='insert-list-input' value={newPermiso?.NSTPC} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>MZ</th>
                                        <td className='insert-list-input-row input'><input type="text" name='MZ' className='insert-list-input' autoComplete='new-password' value={newPermiso?.MZ} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>SECT / LOT</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='SECTOR' autoComplete='new-password' className='insert-list-input' value={newPermiso?.SECTOR} onChange={handleOnChangeT} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='insert-body-right'>
                            <table className='list-container insert-list-container'>
                                <thead>
                                    <tr className='list-header-title'>
                                        <th className='text-center'>DETALLE DE EXPEDIENTE</th>
                                    </tr>
                                </thead>
                                <tbody className='insert-list-body'>
                                    <tr>
                                        <th className='text-right'>DESTINO</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='DESTINO' autoComplete='new-password' className='insert-list-input' value={newPermiso?.DESTINO} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>N° VIV</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='N_VIV' className={`insert-list-input ${isNaN(newPermiso?.N_VIV) && 'incomplete-field'} `} value={parseValue(newPermiso?.N_VIV)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>M2 C/RECEP</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='M2_C_RECEP' className={`insert-list-input ${isNaN(newPermiso?.M2_C_RECEP) && 'incomplete-field'} `} value={parseValue(newPermiso?.M2_C_RECEP)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>M2 C/PERM</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='M2_C_PERM' className={`insert-list-input ${isNaN(newPermiso?.M2_C_PERM) && 'incomplete-field'} `} value={parseValue(newPermiso?.M2_C_PERM)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>M2 S/PERM</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='M2_S_PERM' className={`insert-list-input ${isNaN(newPermiso?.M2_S_PERM) && 'incomplete-field'} `} value={parseValue(newPermiso?.M2_S_PERM)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>M2 TOTAL</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='M2_TOTAL' className={`insert-list-input ${isNaN(newPermiso?.M2_TOTAL) && 'incomplete-field'} `} value={parseValue(newPermiso?.M2_TOTAL)} readOnly /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>ULT ING NUM</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='UI_NUM' className={`insert-list-input ${isNaN(newPermiso?.UI_NUM) && 'incomplete-field'} `} value={parseValue(newPermiso?.UI_NUM)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>ULT ING AÑO</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='UI_ANO' className={`insert-list-input ${isNaN(newPermiso?.UI_ANO) && 'incomplete-field'} `} value={parseValue(newPermiso?.UI_ANO)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>TIPO EXPED</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='TIPO_EXPEDIENTE' autoComplete='new-password' className='insert-list-input' value={newPermiso?.TIPO_EXPEDIENTE} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>ESTADO</th>
                                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='ESTADO' className='insert-list-input' value={newPermiso?.ESTADO} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>DESDE</th>
                                        <td className='insert-list-input-row input'><input type="date" /*required*/ name='DESDE' className='insert-list-input date-input' value={newPermiso?.DESDE} onChange={handleOnChangeT} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>DERECHOS</th>
                                        <td className='insert-list-input-row input'><input type="number" required name='DERECHOS' className={`insert-list-input ${isNaN(newPermiso?.DERECHOS) && 'incomplete-field'} `} value={parseValue(newPermiso?.DERECHOS)} onChange={handleOnChangeN} /></td>
                                    </tr>
                                    <tr>
                                        <th className='text-right'>COMENTARIO</th>
                                        <td className='insert-list-input-row input'><textarea type="text" /*required*/ name='COMENTARIO' className='insert-list-input' value={newPermiso?.COMENTARIO} onChange={handleOnChangeT}></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className='warning'>Los datos quedarán almacenados en la base de datos.</p>
                </>
            }
        </>
    )
}
