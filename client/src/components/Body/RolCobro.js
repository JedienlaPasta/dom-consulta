import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Consulta from '../Consulta/Consulta'

export default function RolCobro() {
    const { setPage } = useContext(DataContext)

    useEffect(() => {
        setPage('rolcobro')
    }, [])

    return (
        <>
            <Consulta/>
        </>
    )
}
