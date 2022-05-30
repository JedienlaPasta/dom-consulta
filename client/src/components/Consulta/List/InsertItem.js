import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'

export default function InsertItem({ type }) {
    const { page, newPermiso, setNewPermiso, incompleteFields } = useContext(DataContext)

    const title = type === 'insert' ? 'Nuevo Registro' : 'Actualizar Registro'
    const name = type === 'update' ? 'insert-list-input' /*faded-text*/ : 'insert-list-input'

    const nameIncomplete = incompleteFields ? 'insert-list-input incomplete-field' : 'insert-list-input'
    
    const handleOnChangeT = (e) => {
        setNewPermiso(prev => ({...prev, [e.target.name]: (e.target.value).toUpperCase()}))
    }

    const handleOnChangeN = (e) => {
        if (e.target.name === 'RUT' || e.target.name === 'MATRIZ_A' || e.target.name === 'DIGITO_A') {
            return e.target.value < 0 ? setNewPermiso(prev => ({...prev, [e.target.name]: '' })) : setNewPermiso(prev => ({...prev, [e.target.name]: e.target.value }))
        }
        // else =>
        e.target.value < 0 ? setNewPermiso(prev => ({...prev, [e.target.name]: 0 })) : setNewPermiso(prev => ({...prev, [e.target.name]: parseFloat(e.target.value) }))
        if (e.target.name === 'M2_C_RECEP' || e.target.name === 'M2_S_PERM') {
            setNewPermiso(prev => ({...prev, M2_TOTAL: (parseFloat(prev.M2_C_RECEP) || 0) + (parseFloat(prev.M2_S_PERM) || 0)}))
        }
    }

    const parseValue = (val) => {
        if (!isNaN(val)) {
            return parseFloat(val).toString()
        }
        return ('').toString()
    }

    return (
        <>
            {   page === 'permisos' &&
                <>
                    <h4 className={`titulo-consulta ${type === 'insert' && 'new-record'}`}>{title}</h4>
                    {type === 'insert' && <p className='warning marg-top-warning'>Por favor rellene todos los campos posibles, tenga en cuenta que esto facilitará la búsqueda de registros a futuro.</p>}
                    <table className='insert-list-container'>
                        <thead>
                            <tr className='list-header-title'>
                                <th className='text-center'>ROL DE AVALÚO</th>
                            </tr>
                        </thead>
                        <tbody className='insert-list-body'>
                            <tr>
                                <th className='text-right'>VIGENTE:</th>
                                <td className='insert-list-input-row input insert-list-rol'>
                                    <input type="text" required name='MATRIZ_V' className={`${name} ${incompleteFields && 'incomplete-field'} `} value={newPermiso?.MATRIZ_V} placeholder='MZ...' onChange={handleOnChangeT} /*readOnly={type === 'update'}*/ />
                                    <input type="text" required name='DIGITO_V' className={`${name} ${incompleteFields && 'incomplete-field'} `} value={newPermiso?.DIGITO_V} placeholder='PD...' onChange={handleOnChangeT} /*readOnly={type === 'update'}*/ />
                                </td>
                            </tr>
                            <tr>
                                <th className='text-right'>ASIGNADO:</th>
                                <td className='insert-list-input-row input insert-list-rol'>
                                    <input type="number" name='MATRIZ_A' className={name} value={newPermiso?.MATRIZ_A} placeholder='MZ...' onChange={handleOnChangeN} /*readOnly={type === 'update'}*/ />
                                    <input type="number" name='DIGITO_A' className={name} value={newPermiso?.DIGITO_A} placeholder='PD...' onChange={handleOnChangeN} /*readOnly={type === 'update'}*/ />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='insert-list-container'>
                        <thead>
                            <tr className='list-header-title'>
                                <th className='text-center'>INFORMACIÓN PROPIETARIO</th>
                            </tr>
                        </thead>
                        <tbody className='insert-list-body'>
                            <tr>
                                <th className='text-right'>NOMBRE:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='NOMBRE' className='insert-list-input' value={newPermiso?.NOMBRE} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>APELLIDO P:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_P' className='insert-list-input' value={newPermiso?.APELLIDO_P} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>APELLIDO M:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_M' className='insert-list-input' value={newPermiso?.APELLIDO_M} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>RUT:</th>
                                <td className='insert-list-input-row input'><input type="number" /*required*/ name='RUT' className='insert-list-input' placeholder='Sin puntos ni DV...' value={newPermiso?.RUT} onChange={handleOnChangeN} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='insert-list-container'>
                        <thead>
                            <tr className='list-header-title'>
                                <th className='text-center'>DOMICILIO PARTICULAR</th>
                            </tr>
                        </thead>
                        <tbody className='insert-list-body'>
                            <tr>
                                <th className='text-right'>CALLE / N°:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='DOMICILIO' className='insert-list-input' value={newPermiso?.DOMICILIO} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>COMUNA:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='COMUNA' className='insert-list-input' value={newPermiso?.COMUNA} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>TELÉFONO:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='TELEFONO' className='insert-list-input' value={newPermiso?.TELEFONO} onChange={handleOnChangeT} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='insert-list-container'>
                        <thead>
                            <tr className='list-header-title'>
                                <th className='text-center'>DIRECCIÓN PREDIAL</th>
                            </tr>
                        </thead>
                        <tbody className='insert-list-body'>
                            <tr>
                                <th className='text-right'>CALLE:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='CALLE' className='insert-list-input' value={newPermiso?.CALLE} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>N°/St/Pc:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='NSTPC' className='insert-list-input' value={newPermiso?.NSTPC} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>MZ:</th>
                                <td className='insert-list-input-row input'><input type="text" name='MZ' className='insert-list-input' value={newPermiso?.MZ} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>SECT / LOT:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='SECTOR' className='insert-list-input' value={newPermiso?.SECTOR} onChange={handleOnChangeT} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='insert-list-container'>
                        <thead>
                            <tr className='list-header-title'>
                                <th className='text-center'>DETALLE DE EXPEDIENTE</th>
                            </tr>
                        </thead>
                        <tbody className='insert-list-body'>
                            <tr>
                                <th className='text-right'>DESTINO:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='DESTINO' className='insert-list-input' value={newPermiso?.DESTINO} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>N° VIV:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='N_VIV' className={nameIncomplete} value={parseValue(newPermiso?.N_VIV)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>M2 C/RECEP:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='M2_C_RECEP' className={nameIncomplete} value={parseValue(newPermiso?.M2_C_RECEP)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>M2 C/PERM:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='M2_C_PERM' className={nameIncomplete} value={parseValue(newPermiso?.M2_C_PERM)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>M2 S/PERM:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='M2_S_PERM' className={nameIncomplete} value={parseValue(newPermiso?.M2_S_PERM)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>M2 TOTAL:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='M2_TOTAL' className={nameIncomplete} value={parseValue(newPermiso?.M2_TOTAL)} readOnly /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>ULT ING NUM:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='UI_NUM' className={nameIncomplete} value={parseValue(newPermiso?.UI_NUM)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>ULT ING AÑO:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='UI_ANO' className={nameIncomplete} value={parseValue(newPermiso?.UI_ANO)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>TIPO EXPED:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='TIPO_EXPEDIENTE' className='insert-list-input' value={newPermiso?.TIPO_EXPEDIENTE} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>ESTADO:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='ESTADO' className='insert-list-input' value={newPermiso?.ESTADO} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>DESDE:</th>
                                <td className='insert-list-input-row input'><input type="text" /*required*/ name='DESDE' className='insert-list-input' value={newPermiso?.DESDE} onChange={handleOnChangeT} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>DERECHOS:</th>
                                <td className='insert-list-input-row input'><input type="number" required name='DERECHOS' className={nameIncomplete} value={parseValue(newPermiso?.DERECHOS)} onChange={handleOnChangeN} /></td>
                            </tr>
                            <tr>
                                <th className='text-right'>COMENTARIO:</th>
                                <td className='insert-list-input-row input'><textarea type="text" /*required*/ name='COMENTARIO' className='insert-list-input' value={newPermiso?.COMENTARIO} onChange={handleOnChangeT}></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='warning'>Los datos quedarán almacenados en la base de datos.</p>
                </>
            }
        </>
    )
}