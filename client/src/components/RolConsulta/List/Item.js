import React from 'react'

export default function Item({ rol }) {
    
    return (
        <>
            <table className='list-container'>
                <tbody>
                    <tr>
                        <th>MATRIZ:</th>
                        <td className='result-list-row'>{rol?.MATRIZ}</td>
                    </tr>
                    <tr>
                        <th>DIGITO:</th>
                        <td className='result-list-row'>{rol?.DIGITO}</td>
                    </tr>
                    <tr>
                        <th>NOMBRE:</th>
                        <td className='result-list-row'>{rol?.NOMBRE}</td>
                    </tr>
                    <tr>
                        <th>APELLIDO_P:</th>
                        <td className='result-list-row'>{rol?.APELLIDO_P}</td>
                    </tr>
                    <tr>
                        <th>APELLIDO_M:</th>
                        <td className='result-list-row'>{rol?.APELLIDO_M}</td>
                    </tr>
                    <tr>
                        <th>MZ:</th>
                        <td className='result-list-row'>{rol?.MZ}</td>
                    </tr>
                    <tr>
                        <th>NSTPC:</th>
                        <td className='result-list-row'>{rol?.NSTPC}</td>
                    </tr>
                    <tr>
                        <th>CALLE:</th>
                        <td className='result-list-row'>{rol?.CALLE}</td>
                    </tr>
                    <tr>
                        <th>SECTOR:</th>
                        <td className='result-list-row'>{rol?.SECTOR}</td>
                    </tr>
                    <tr>
                        <th>N_VIV:</th>
                        <td className='result-list-row'>{rol?.N_VIV}</td>
                    </tr>
                    <tr>
                        <th>M2_C_RECEP:</th>
                        <td className='result-list-row'>{rol?.M2_C_RECEP}</td>
                    </tr>
                    <tr>
                        <th>M2_C_PERM:</th>
                        <td className='result-list-row'>{rol?.M2_C_PERM}</td>
                    </tr>
                    <tr>
                        <th>M2_S_PERM:</th>
                        <td className='result-list-row'>{rol?.M2_S_PERM}</td>
                    </tr>
                    <tr>
                        <th>M2_TOTAL:</th>
                        <td className='result-list-row'>{rol?.M2_TOTAL}</td>
                    </tr>
                    <tr>
                        <th>ESTADO:</th>
                        <td className='result-list-row'>{rol?.ESTADO}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}