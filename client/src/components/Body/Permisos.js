import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Consulta from '../Consulta/Consulta'

export default function Permisos() {
    const { setPage } = useContext(DataContext)

    useEffect(() => {
        setPage('permisos')
    })
    return (
        <>
            <Consulta/>
        </>
    )
}
