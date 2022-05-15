import React from 'react'
import './style.css'

export default function Message({ message }) {
    return (
        <div className="message">
            <div className='no-matches-message'>{message}</div>
        </div>
    )
}
