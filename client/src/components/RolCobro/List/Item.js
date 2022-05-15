import React, { useContext } from 'react'
import { DataContext } from '../../../context/DataContext'

export default function Item({ rol, index, tot }) {
    const { roles } = useContext(DataContext)
        
    // Para calcular el digito verificador del RUT
    const getDV = () => {
        if (roles?.length) {
            const arr = []
            const mArr = [2, 3, 4, 5, 6, 7]
            if ( rol?.RUT !== 0 && !roles[0]?.MATRIZ) {
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
        return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    
    return (
        <>
            <table className='list-container'>
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
                        <th>SEMSTRE:</th>
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
                        <th>DESTINO:</th>
                        <td>{rol?.DESTINO}</td>
                    </tr>
                    <tr>
                        <th>UBICACIÓN:</th>
                        <td>{rol?.UBICACION}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}