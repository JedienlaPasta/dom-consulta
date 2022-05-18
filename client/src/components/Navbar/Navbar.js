import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/users'
import { ACTIONS, DataContext } from '../../context/DataContext'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import './style.css'

export default function Navbar() {
    const { user, setUser, setIsAuth, dispatch, page, setPage, setMessage } = useContext(DataContext)

    const handleLogout = () => {
        setMessage('')
        logout().then(data => {
            setUser(data.user)
            setIsAuth(data.isAuthenticated)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        })
    }

    const changePage = (val) => {
        setPage(val)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
    }

    return (
        <header className='nav-header'>
            { page === 'rolcobro' ? <h2>ROL COBRO</h2> : <h2>PERMISOS DOM</h2> }
            <nav className='nav'>
                <ul className='nav-links'>
                    <li className='link'>
                        <Link className={`${page === 'rolcobro' ? 'link-item marked-link-item' : 'link-item'}`} to='/' onClick={() => changePage('rolcobro')}><span>ROL_COBRO</span></Link>
                    </li>
                    {   (user.role === 'dom_admin' || user.role === 'dom_user') &&
                        <li className='link'>
                        <Link className={`${page === 'permisos' ? 'link-item marked-link-item' : 'link-item'}`} to='/permisos' onClick={() => changePage('permisos')}><span>PERMISOS</span></Link>
                        </li>
                    }
                    <li className='link'>
                        <Link className='link-item logout' to='/auth' onClick={handleLogout}><RiLogoutBoxRLine/></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}