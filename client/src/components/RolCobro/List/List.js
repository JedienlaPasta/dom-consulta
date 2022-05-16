import React, { useContext, useState } from 'react'
import { DataContext } from '../../../context/DataContext'
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi'
import Item from './Item'

export default function List() {
    const { roles, rolIndex, setRolIndex } = useContext(DataContext)
    const totRoles = roles.length

    const displayItems = roles.map((rol, index) => ( index === rolIndex ?
        <Item key={rol._id} rol={rol} /> : null
    ))

    const goForward = () => {
        setRolIndex(prev => {
            if (prev === roles.length - 1) return 0
            return prev + 1
        })
    }

    const goBackwards = () => {
        setRolIndex(prev => {
            if (prev === 0) return roles.length - 1
            return prev - 1
        })
    }

    return (
        <>
            { totRoles > 1 && 
                <div className="list-items-btns">
                    <h4 className='titulo-resultado'>Resultado #{rolIndex + 1}</h4>
                    <button className="list-btn btn-left" onClick={goBackwards}><FiChevronsLeft/></button>
                    <button className="list-btn btn-right" onClick={goForward}><FiChevronsRight/></button>
                </div>
            }
            {displayItems}
        </>
    )
}