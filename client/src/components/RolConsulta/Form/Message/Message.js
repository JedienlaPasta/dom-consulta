import React from 'react'
import './style.css'

export default function Message({ message }) {
    return (
        <div className="message">
            <div className='read-message'>{message}</div>
        </div>
    )
}
