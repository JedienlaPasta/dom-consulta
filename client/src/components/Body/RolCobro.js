import React, { useContext, useEffect } from 'react'
import { DataContext } from '../../context/DataContext'
import Consulta from '../Consulta/Consulta'
import Sidebar from './Sidebar/Sidebar'
import './style.css'

export default function RolCobro() {
    const { setPage } = useContext(DataContext)

    useEffect(() => {
        setPage('rolcobro')
    }, [])

    return (
        <div className='body'>
            <Sidebar/>
            <Consulta/>
        </div>
    )
}
