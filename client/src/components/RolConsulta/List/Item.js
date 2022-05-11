import React from 'react'

export default function Item({ MATRIZ, DIGITO, NOMBRE, APELLIDO_P, APELLIDO_M, MZ, NSTPC, CALLE, SECTOR, N_VIV, M2_C_RECEP, M2_C_PERM, M2_S_PERM, M2_TOTAL, ESTADO, index, tot }) {
    
    return (
        <>
            {/* { tot > 1 && <h4 className='titulo-resultado'>Resultado #{index + 1}</h4>} */}
            <table className='list-container'>
                <tbody>
                    <tr>
                        <th>MATRIZ:</th>
                        <td>{MATRIZ}</td>
                    </tr>
                    <tr>
                        <th>DIGITO:</th>
                        <td>{DIGITO}</td>
                    </tr>
                    <tr>
                        <th>NOMBRE:</th>
                        <td>{NOMBRE}</td>
                    </tr>
                    <tr>
                        <th>APELLIDO_P:</th>
                        <td>{APELLIDO_P}</td>
                    </tr>
                    <tr>
                        <th>APELLIDO_M:</th>
                        <td>{APELLIDO_M}</td>
                    </tr>
                    <tr>
                        <th>MZ:</th>
                        <td>{MZ}</td>
                    </tr>
                    <tr>
                        <th>NSTPC:</th>
                        <td>{NSTPC}</td>
                    </tr>
                    <tr>
                        <th>CALLE:</th>
                        <td>{CALLE}</td>
                    </tr>
                    <tr>
                        <th>SECTOR:</th>
                        <td>{SECTOR}</td>
                    </tr>
                    <tr>
                        <th>N_VIV:</th>
                        <td>{N_VIV}</td>
                    </tr>
                    <tr>
                        <th>M2_C_RECEP:</th>
                        <td>{M2_C_RECEP}</td>
                    </tr>
                    <tr>
                        <th>M2_C_PERM:</th>
                        <td>{M2_C_PERM}</td>
                    </tr>
                    <tr>
                        <th>M2_S_PERM:</th>
                        <td>{M2_S_PERM}</td>
                    </tr>
                    <tr>
                        <th>M2_TOTAL:</th>
                        <td>{M2_TOTAL}</td>
                    </tr>
                    <tr>
                        <th>ESTADO:</th>
                        <td>{ESTADO}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}