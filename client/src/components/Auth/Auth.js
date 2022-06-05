import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserAstronaut } from 'react-icons/fa'
import { DataContext } from '../../context/DataContext'
import { login } from '../../actions/users' 
import Message from './Message'
import './Auth.css'

export default function Auth() {
    const [authUser, setAuthUser] = useState({name: '', password: ''})
    const { message, setMessage, setUser, setIsAuth } = useContext(DataContext)
    const history = useNavigate()

    const inputName = message ? 'login-input red-border' : 'login-input'
    const labelName = message ? 'login-label red-border' : 'login-label'

    const handleLogin = (event) => {
        event.preventDefault()
        login(authUser, setMessage).then(data => {
            const { isAuthenticated, user } = data
            if (isAuthenticated) {
                setUser(user)
                setIsAuth(isAuthenticated)
                setMessage('')
                if (user.role === 'dom_admin' || user.role === 'dom_user') {
                    history('/permisos')
                }
                else {
                    history('/')
                }
            }
        })
    }

    return (
        <div className='login-container'>
            <div className="login-icon">
                <FaUserAstronaut />
            </div>
            <form className='login-form' onSubmit={handleLogin}>
                <h3 className='login-title'>Iniciar Sesión</h3>
                <div className="form-item">
                    <input type="text" id='user' placeholder=' ' className={inputName} autoComplete='off' required value={authUser.name} onChange={(e) => setAuthUser(val => ({...val, name: e.target.value }))} />
                    <label htmlFor='user' className={labelName}>Usuario</label>
                </div>
                <div className="form-item">
                    <input type="password" id='pass' placeholder=' ' className={inputName} required value={authUser.password} onChange={(e) => setAuthUser(val => ({...val, password: e.target.value }))} />
                    <label htmlFor='pass' className={labelName}>Contraseña</label>
                </div>
                { message && <Message message={message} /> }
                <button className='login-button'>Iniciar Sesión</button>
            </form>
        </div>
    )
}
