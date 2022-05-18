import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'

export default function InsertItem({ type }) {
    const { newPermiso, setNewPermiso} = useContext(DataContext)

    const title = type === 'insert' ? 'Nuevo Registro' : 'Actualizar Registro'
    const name = type === 'update' ? 'insert-list-input' /*faded-text*/ : 'insert-list-input'
    
    const handleOnChange = (e) => {
        setNewPermiso(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    return (
        <>
            <h4 className={`titulo-resultado ${type === 'insert' && 'new-record'}`}>{title}</h4>
            {type === 'insert' && <p className='warning'>Todos los campos son obligatorios, a excepción de 'Mz' </p>}
            <table className='insert-list-container'>
                <tbody className='insert-table-body'>
                    <tr>
                        <th className='text-right'>MATRIZ:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='MATRIZ' className={name} value={newPermiso?.MATRIZ} onChange={handleOnChange} /*readOnly={type === 'update'}*/ /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>DÍGITO:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='DIGITO' className={name} value={newPermiso?.DIGITO} onChange={handleOnChange} /*readOnly={type === 'update'}*/ /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>NOMBRE:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='NOMBRE' className='insert-list-input' value={newPermiso?.NOMBRE} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>APELLIDO P:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_P' className='insert-list-input' value={newPermiso?.APELLIDO_P} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>APELLIDO M:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='APELLIDO_M' className='insert-list-input' value={newPermiso?.APELLIDO_M} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>Mz:</th>
                        <td className='insert-list-input-row input'><input type="text" name='MZ' className='insert-list-input' value={newPermiso?.MZ} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>N°/St/Pc:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='NSTPC' className='insert-list-input' value={newPermiso?.NSTPC} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>CALLE:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='CALLE' className='insert-list-input' value={newPermiso?.CALLE} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>SECTOR:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='SECTOR' className='insert-list-input' value={newPermiso?.SECTOR} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>N° VIV:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='N_VIV' className='insert-list-input' value={newPermiso?.N_VIV} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>M2 C/RECEP:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='M2_C_RECEP' className='insert-list-input' value={newPermiso?.M2_C_RECEP} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>M2 C/PERM:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='M2_C_PERM' className='insert-list-input' value={newPermiso?.M2_C_PERM} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>M2 S/PERM:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='M2_S_PERM' className='insert-list-input' value={newPermiso?.M2_S_PERM} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>M2 TOTAL:</th>
                        <td className='insert-list-input-row input'><input type="number" /*required*/ name='M2_TOTAL' className='insert-list-input' value={newPermiso?.M2_TOTAL} onChange={handleOnChange} /></td>
                    </tr>
                    <tr>
                        <th className='text-right'>ESTADO:</th>
                        <td className='insert-list-input-row input'><input type="text" /*required*/ name='ESTADO' className='insert-list-input' value={newPermiso?.ESTADO} onChange={handleOnChange} /></td>
                    </tr>
                </tbody>
            </table>
            <p className='warning'>Los datos quedarán almacenados en una base de datos</p>
        </>
    )
}