import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Consulta from '../Consulta/Consulta'
import Sidebar from './Sidebar/Sidebar'

export default function Permisos() {
    const { setPage, toggleMenu } = useContext(DataContext)
    const bodyName = toggleMenu ? 'body show-sidebar' : 'body'
    
    useEffect(() => {
        setPage('permisos')
    })

    return (
        <>
            <div className={bodyName}>
                <Sidebar/>
                <Consulta/>
            </div>
            <div className="background-blur"></div>
        </>
    )
}
