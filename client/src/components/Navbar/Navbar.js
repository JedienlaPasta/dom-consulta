import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/users'
import { ACTIONS, DataContext } from '../../context/DataContext'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { CgMenu } from 'react-icons/cg'
import './style.css'
import img from '../../images/algarrobo.png'

export default function Navbar() {
    const [showMenu, setShowMenu] = useState(!window.innerWidth > 749)
    const { user, setUser, setIsAuth, dispatch, page, setPage, setMessage, toggleMenu, setToggleMenu } = useContext(DataContext)
    const toggleMenuBtnName = toggleMenu ? 'toogle-menu-btn marked' : 'toogle-menu-btn'

    const handleLogout = () => {
        setMessage('')
        logout().then(data => {
            setUser(data.user)
            setIsAuth(data.isAuthenticated)
            dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
        })
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 749) {
                setToggleMenu(false)
                return setShowMenu(false)
            }
            return setShowMenu(true)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    })

    const toggle = () => {
        setToggleMenu(prev => !prev)
    }

    const changePage = (val) => {
        setPage(val)
        dispatch({ type: ACTIONS.FETCH_MATCHES, payload: [] })
    }

    return (
        <header className='nav-header'>
            <div className="logo">
                <img className='logo-img' src={img} alt="0" />
                <h2 className='logo-title'>DOM ALGARROBO</h2>
            </div>
            <nav className='nav'>
                <ul className='nav-links'>
                    <li className='link'>
                        <Link className={`${page === 'rolcobro' ? 'link-item marked-link-item' : 'link-item'}`} to='/' onClick={() => changePage('rolcobro')}><span>Rol_Cobro</span></Link>
                    </li>
                    {   (user.role === 'dom_admin' || user.role === 'dom_user') &&
                        <li className='link'>
                        <Link className={`${page === 'permisos' ? 'link-item marked-link-item' : 'link-item'}`} to='/permisos' onClick={() => changePage('permisos')}><span>Permisos</span></Link>
                        </li>
                    }
                    {/* <li className='link'>
                        <Link className='link-item logout' to='/auth' onClick={handleLogout}><RiLogoutBoxRLine/></Link>
                    </li> */}
                    {   showMenu &&
                        <li className='link'>
                            <button className={toggleMenuBtnName} to='/auth' onClick={toggle}><CgMenu/></button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}