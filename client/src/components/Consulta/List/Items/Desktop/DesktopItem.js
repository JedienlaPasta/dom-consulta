import React, { useContext } from 'react'
import { DataContext } from '../../../../../context/DataContext'
import LogsItem from '../../LogsItem/LogsItem'
// import { Destino } from '../../../../../data/Destino'

export default function DesktopItem({ currentPage, itemsPerPage }) {
    const { roles, page, crudFilter, currencyFormat, getDV, rolIndex, setRolIndex, setShowRecordPopup } = useContext(DataContext)
    console.log('read')

    // Aqui falta agregar estos valores de abajo

    // const rutPermiso = rol?.RUT ? rol?.RUT + '-' + dv : ''
    // const ubicacion = (rol?.UBICACION === 'U' && 'URBANO') || (rol?.UBICACION === 'E' && 'EXTENSIÓN URBANA') || (rol?.UBICACION === 'R' && 'RURAL')
    // const destino = Destino.map(item => rol?.DESTINO === item.codigo && item.descripcion)
    // const agricola = rol?.NA === 'A' ? 'AGRÍCOLA' : 'NO AGRÍCOLA'

    const showDetailedInfo = (index) => {
        setRolIndex(index)
        setShowRecordPopup(true)
    }

    const formatedDate = (rol) => {
        if (page === 'permisos') {
            if (crudFilter.crudType === 'Ver Logs') {
                let date = rol?.date
                if (typeof(date) == 'string') {
                    date = new Date(date)
                }
                const dateArray = date?.toString().split(" ")
                // console.log(dateArray)
                return (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[3]} - [${dateArray[4]}]`) || ''
            }
            else if (rol.DESDE) {
                const date = rol?.DESDE
                const dateArray = date?.toString().split("-")
                return (dateArray[0] !== '' && `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`) || ''
            }
        }
    }

    // En el caso de que el servidor devuelva los M2 Totales, se muestra esto
    if (roles.length === 1 && roles[0]._id === 'M2_TOTALES') {
        return (
            <div className='justify-list-container'>
                <table className='list-container-fullw-M2_TOT'>
                    <tbody>
                        <tr className='thead'>
                            <th>N° VIV:</th>
                            <th>M2 C/RECEP:</th>
                            <th>M2 C/PERM:</th>
                            <th>M2 S/PERM:</th>
                            <th>M2 TOTAL:</th>
                        </tr>
                        <tr className='tbody'>
                            <td>{currencyFormat(roles[0]?.N_VIV)}</td>
                            <td>{currencyFormat(roles[0]?.M2_C_RECEP)}</td>
                            <td>{currencyFormat(roles[0]?.M2_C_PERM)}</td>
                            <td>{currencyFormat(roles[0]?.M2_S_PERM)}</td>
                            <td>{currencyFormat(roles[0]?.M2_TOTAL)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    // Si devuelve los logs, se muestra esto
    else if (roles.length > 0 && crudFilter.crudType === 'Ver Logs') {
        return (
            <>
                <div className='justify-list-container'>
                    <table className='list-container-fullw-logs'>
                        <tbody>
                            <tr className='thead'>
                                <th className='prevent-select'>ID PERMISO</th>
                                <th className='prevent-select'>ROL VIGENTE</th>
                                <th className='prevent-select'>FECHA</th>
                                <th className='prevent-select'>USUARIO</th>
                                <th className='prevent-select'>ACCIÓN</th>
                            </tr>
                            {
                                roles.map((rol, index) => 
                                {
                                    return(
                                        (index < currentPage * itemsPerPage && index >= (currentPage - 1) * itemsPerPage) ?
                                        <tr key={index} className='tbody'>
                                            <td>{rol?.permisoId}</td>
                                            <td className='prevent-select'><p>{rol?.matriz}</p><p className='text-center'>{rol?.matriz && '-'}</p><p>{rol?.digito}</p></td>
                                            <td className='prevent-select'>{formatedDate(rol)}</td>
                                            <td className='prevent-select'>{rol?.user.toUpperCase()}</td>
                                            <td className='prevent-select'>{rol?.action}</td>
                                        </tr>
                                        :
                                        null
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </>
        )
    }

    console.log(rolIndex)

    // que es esto? por que hay un false?
    const displayResults =
            roles.map((rol, index) => {
                return (
                (index < currentPage * itemsPerPage && index >= (currentPage - 1) * itemsPerPage) ?
                <tr key={index} className='tbody' onClick={() => showDetailedInfo(index)}>
                    <td className='prevent-select'>{rol?.MATRIZ_V} - {rol?.DIGITO_V}</td>
                    <td className='prevent-select'>{rol?.MATRIZ_A} - {rol?.DIGITO_A}</td>
                    <td className='prevent-select'>{rol?.NOMBRE}</td>
                    <td className='prevent-select'>{rol?.APELLIDO_P}</td>
                    <td className='prevent-select'>{rol?.APELLIDO_M}</td>
                    <td className='prevent-select'>{currencyFormat(rol?.RUT) + '-' + (getDV(rol) || '')}</td>
                    {/* <td>{rol?.DOMICILIO}</td> */}
                    {/* <td>{rol?.COMUNA}</td> */}
                    {/* <td>{rol?.TELEFONO}</td> */}
                    <td className='prevent-select'>{rol?.CALLE}</td>
                    <td className='prevent-select'>{rol?.NSTPC}</td>
                    <td className='prevent-select'>{rol?.MZ}</td>
                    <td className='prevent-select'>{rol?.SECTOR}</td>
                    {/* <td>{rol?.DESTINO}</td> */}
                    {/* <td>{rol?.N_VIV}</td> */}
                    {/* <td>{rol?.M2_C_RECEP}</td> */}
                    {/* <td>{rol?.M2_C_PERM}</td> */}
                    {/* <td>{rol?.M2_S_PERM}</td> */}
                    {/* <td>{rol?.M2_TOTAL}</td> */}
                    {/* <td>{rol?.UI_NUM}</td> */}
                    {/* <td>{rol?.UI_ANO}</td> */}
                    {/* <td>{rol?.TIPO_EXPEDIENTE}</td> */}
                    <td className='prevent-select'>{rol?.ESTADO}</td>
                    {/* <td>{rol?.DESDE}</td> */}
                    {/* <td>{rol?.DERECHOS}</td> */}
                    {/* <td>{rol?.COMENTARIO}</td> */}
                </tr>
                :
                null
            )})

    return (
        <div className='justify-list-container'>
            <table className='list-container-fullw'>
                <tbody>
                    <tr className='thead'>
                        <th className='prevent-select'>VIGENTE</th>
                        <th className='prevent-select'>ASIGNADO</th>
                        <th className='prevent-select'>NOMBRE</th>
                        <th className='prevent-select'>APELLIDO_P</th>
                        <th className='prevent-select'>APELLIDO_M</th>
                        <th className='prevent-select'>RUT</th>
                        {/* <th>CALLE / N°</th> */}
                        {/* <th>COMUNA</th> */}
                        {/* <th>TELÉFONO</th> */}
                        <th className='prevent-select'>CALLE</th>
                        <th className='prevent-select'>Nº/ST/PC</th>
                        <th className='prevent-select'>MZ</th>
                        <th className='prevent-select'>SECTOR / LOTEO</th>
                        {/* <th>DESTINO</th> */}
                        {/* <th>N° VIV</th> */}
                        {/* <th>M2 C/RECEP</th> */}
                        {/* <th>M2 C/PERM</th> */}
                        {/* <th>M2 S/PERM</th> */}
                        {/* <th>M2 TOTAL</th> */}
                        {/* <th>ULT ING NÚM</th> */}
                        {/* <th>ULT ING AÑO</th> */}
                        {/* <th>TIPO EXPED</th> */}
                        <th className='prevent-select'>ESTADO</th>
                        {/* <th>DESDE</th> */}
                        {/* <th>DERECHOS</th> */}
                        {/* <th>COMENTARIO</th> */}
                    </tr>
                    {displayResults}
                </tbody>
            </table>
        </div>
    )
}
